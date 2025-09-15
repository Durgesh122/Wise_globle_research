import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../../firebase';

const A11yFeedback = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    const r = ref(db, 'accessibilityFeedback');
    const unsub = onValue(r, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, v]) => ({ id, ...v }));
      setItems(list);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = items.slice();
    if (term) {
      list = list.filter((r) =>
        [r.name, r.email, r.subject, r.message, r.pageUrl, r.type, r.severity, r.device, r.browser, r.assistiveTech]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(term)
      );
    }
    list.sort((a, b) => (sortDesc ? (b.timestamp || 0) - (a.timestamp || 0) : (a.timestamp || 0) - (b.timestamp || 0)));
    return list;
  }, [items, q, sortDesc]);

  const exportCsv = useCallback(() => {
    const cols = ['name','email','subject','pageUrl','type','severity','device','browser','assistiveTech','message','timestamp'];
    const lines = [cols.join(',')];
    filtered.forEach((r) => {
      const row = cols.map((c) => {
        const v = c === 'timestamp' ? (r.timestamp ? new Date(r.timestamp).toLocaleString() : '') : (r[c] ?? '');
        const s = String(v).replaceAll('"', '""');
  return `"${s}"`;
      }).join(',');
      lines.push(row);
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'a11y_feedback.csv'; a.click(); URL.revokeObjectURL(url);
  }, [filtered]);

  const onDelete = useCallback(async (id) => {
    if (!id) return;
    const ok = window.confirm('Delete this feedback entry permanently? This cannot be undone.');
    if (!ok) return;
    try {
      await remove(ref(db, `accessibilityFeedback/${id}`));
    } catch (e) {
      alert('Failed to delete. Please try again.');
    }
  }, []);

  return (
    <div className="space-y-4 p-4 rounded-lg" style={{ background: '#ffffff4d', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-semibold text-adaptive">A11y Feedback</h2>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="rounded-md border border-gray-300 bg-white/80 px-3 py-2 text-sm text-adaptive placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <button onClick={() => setSortDesc((v) => !v)} className="rounded-md border border-gray-300 bg-white/80 px-3 py-2 text-sm text-adaptive hover:bg-gray-50">Sort {sortDesc ? '↓' : '↑'}</button>
          <button onClick={exportCsv} className="rounded-md border border-gray-300 bg-white/80 px-3 py-2 text-sm text-adaptive hover:bg-gray-50">Export CSV</button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Loading…</div>
      ) : (
        <>
    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white/80 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white/80">
                <tr>
      {['Name','Email','Type','Severity','Device','Page','Message','Submitted','Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-adaptive">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="align-top hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-adaptive break-words">{r.name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-adaptive break-all">{r.email || '—'}</td>
                    <td className="px-4 py-3 text-sm text-adaptive">{r.type || '—'}</td>
                    <td className="px-4 py-3 text-sm text-adaptive">{r.severity || '—'}</td>
                    <td className="px-4 py-3 text-sm text-adaptive">{r.device || '—'}</td>
                    <td className="px-4 py-3 text-sm text-blue-700 underline break-all">{r.pageUrl ? <a href={r.pageUrl} target="_blank" rel="noreferrer">{r.pageUrl}</a> : '—'}</td>
                    <td className="px-4 py-3 text-sm text-adaptive max-w-xs truncate break-words" title={r.message}>{r.message || '—'}</td>
                    <td className="px-4 py-3 text-sm text-adaptive">{r.timestamp ? new Date(r.timestamp).toLocaleString() : '—'}</td>
                    <td className="px-4 py-3 text-sm">
                      <button onClick={() => onDelete(r.id)} className="rounded-md border border-red-300 bg-white px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-sm text-adaptive">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-adaptive break-words">{r.name || '—'}</p>
                    <p className="text-xs text-gray-500">{r.timestamp ? new Date(r.timestamp).toLocaleString() : '—'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">{(r.type || '—')}/{(r.severity || '—')}</span>
                    <button onClick={() => onDelete(r.id)} className="rounded-md border border-red-300 bg-white px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-adaptive break-all">{r.email}</div>
                {r.pageUrl && <a className="mt-1 inline-block text-sm text-blue-700 underline break-all" href={r.pageUrl} target="_blank" rel="noreferrer">{r.pageUrl}</a>}
                <div className="mt-2 text-sm text-adaptive whitespace-pre-wrap">{r.message}</div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-adaptive">No records found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default A11yFeedback;
