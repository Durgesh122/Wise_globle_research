import { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '@/firebase';
import { sendPopupEmailWithRetry } from '@/utils/email';

/**
 * Hook to submit popup lead with RTDB + optional email.
 */
export function usePopupLead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function submitLead({ name='', mobile='', city='', interest='' }) {
    setLoading(true); setError(null); setSuccess(false);
    try {
      await push(ref(db, 'popupSubmissions'), {
        name, mobile, city, interest,
        createdAt: serverTimestamp(),
        source: 'popup-hook'
      });
      if (mobile) {
        try {
          await sendPopupEmailWithRetry({
            name,
            phone: mobile,
            message: `City: ${city} | Interest: ${interest}`,
            source: 'popup-hook'
          }, { retries: 1 });
        } catch (e) {
          console.warn('Email failed in hook (continuing):', e);
        }
      }
      setSuccess(true);
    } catch (e) {
      setError(e.message || 'Submit failed');
    } finally {
      setLoading(false);
    }
  }

  return { submitLead, loading, error, success };
}
