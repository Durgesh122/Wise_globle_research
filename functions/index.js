const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Resend } = require('resend');

admin.initializeApp();
const db = admin.firestore();

// Use secret (set via: firebase functions:secrets:set RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: IST now and aligned windows
function getISTDate(now = new Date()) {
  // IST = UTC +5:30
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + (5.5 * 60 * 60000));
}

// Windows: 9-12,12-15,15-18,18 cutoff (only run at 9,12,15,18 IST)
// Schedule Cloud Functions in UTC equivalent times: 03:30,06:30,09:30,12:30 UTC
// We still guard internally with hour checks to avoid accidental multiple executions.

async function buildDigestHTML(submissions) {
  if (!submissions.length) {
    return '<p>No new popup submissions in this window.</p>';
  }
  const rows = submissions.map(s => {
    const d = s.createdAt ? s.createdAt.toDate ? s.createdAt.toDate() : s.createdAt : null;
    const when = d ? d.toISOString().replace('T',' ').substring(0,16) : '';
    return `<tr>
      <td style="border:1px solid #ddd;padding:6px;">${when}</td>
      <td style="border:1px solid #ddd;padding:6px;">${(s.name||'').replace(/</g,'&lt;')}</td>
      <td style="border:1px solid #ddd;padding:6px;">${(s.email||'').replace(/</g,'&lt;')}</td>
      <td style="border:1px solid #ddd;padding:6px;">${(s.phone||'').replace(/</g,'&lt;')}</td>
      <td style="border:1px solid #ddd;padding:6px;">${(s.message||'').replace(/</g,'&lt;')}</td>
    </tr>`;
  }).join('');
  return `<!DOCTYPE html><html><body>
    <h2 style="font-family:Arial;margin:0 0 12px;">Popup Submissions Digest</h2>
    <p style="font-family:Arial;margin:0 0 16px;">Window summary of latest leads.</p>
    <table style="border-collapse:collapse;font-family:Arial;font-size:13px;min-width:600px;">
      <thead>
        <tr>
          <th style="border:1px solid #ddd;padding:6px;text-align:left;">Time (UTC)</th>
          <th style="border:1px solid #ddd;padding:6px;text-align:left;">Name</th>
          <th style="border:1px solid #ddd;padding:6px;text-align:left;">Email</th>
          <th style="border:1px solid #ddd;padding:6px;text-align:left;">Phone</th>
          <th style="border:1px solid #ddd;padding:6px;text-align:left;">Message</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

exports.popupDigest = functions
  .runWith({ secrets: ["RESEND_API_KEY"], timeoutSeconds: 120, memory: '256MB' })
  .pubsub.schedule('30 3,6,9,12 * * *') // 03:30,06:30,09:30,12:30 UTC = 09:00,12:00,15:00,18:00 IST (WITHOUT DST confusion for IST)
  .timeZone('UTC')
  .onRun(async () => {
    const nowIST = getISTDate();
    const hour = nowIST.getHours();
    if (![9,12,15,18].includes(hour)) {
      console.log('Guard hour mismatch, skipping', hour);
      return null;
    }

    const metaRef = db.collection('_meta').doc('popupDigest');
    const metaSnap = await metaRef.get();
    let lastSent = null;
    if (metaSnap.exists) {
      lastSent = metaSnap.data().lastSent?.toDate ? metaSnap.data().lastSent.toDate() : metaSnap.data().lastSent;
    }

    // Determine window start: if lastSent within 2h -> use that, else current hour-3
    let windowStartIST = new Date(nowIST.getTime());
    windowStartIST.setHours(hour - 3, 0, 0, 0);
    if (lastSent) {
      // ensure we don't overlap backwards: use max(lastSent, windowStartIST)
      if (lastSent > windowStartIST) windowStartIST = lastSent;
    }

    // Convert to UTC timestamp for querying
    const windowStartUTC = new Date(windowStartIST.getTime() - (5.5 * 60 * 60000));

    const submissionsRef = db.collection('popupSubmissions');
    const qs = await submissionsRef
      .where('createdAt', '>=', admin.firestore.Timestamp.fromDate(windowStartUTC))
      .orderBy('createdAt', 'asc')
      .get();

    const submissions = qs.docs.map(d => d.data());
    console.log(`Found ${submissions.length} submissions in window.`);

    if (submissions.length === 0) {
      console.log('No submissions this window; skipping email send.');
      // Still update lastSent to avoid re-scanning same empty window repeatedly
      await metaRef.set({ lastSent: admin.firestore.FieldValue.serverTimestamp(), lastHour: hour, lastEmpty: true }, { merge: true });
      return null;
    }

    const html = await buildDigestHTML(submissions);
    const subject = `Popup Digest ${hour - 3}-${hour} IST (${submissions.length} new)`;

    try {
      await resend.emails.send({
        from: 'Wise Global <no-reply@yourdomain.com>',
        to: ['hemraj8087@gmail.com'],
        subject,
        html
      });
      await metaRef.set({ lastSent: admin.firestore.FieldValue.serverTimestamp(), lastHour: hour, lastEmpty: false }, { merge: true });
      console.log('Digest sent');
    } catch (err) {
      console.error('Failed to send digest', err);
    }

    return null;
  });
