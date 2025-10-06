// src/utils/api.js
// Lightweight API helper used by components. It writes known routes to Firebase
// Realtime Database and falls back to fetch for any other backend route.

import { db } from '../firebase';
import { ref, push, set } from 'firebase/database';

const writeToDb = async (collection, payload) => {
  const nodeRef = push(ref(db, collection));
  const data = {
    ...payload,
    // Ensure a numeric timestamp for indexing/rules
    timestamp: payload?.timestamp ?? Date.now(),
    ...(collection === 'chatbot-submissions' && typeof payload?.message !== 'string'
      ? { message: 'Chatbot submission' }
      : {}),
  };
  try {
    await set(nodeRef, data);
    return nodeRef.key;
  } catch (err) {
    // If RTDB write is blocked by permission rules (common on production),
    // fallback to posting the submission to the server's /send-email endpoint
    const isPermission = err && (err.code === 'PERMISSION_DENIED' || /permission_denied/i.test(String(err.message || '')));
    if (isPermission) {
      try {
        // Best-effort POST to server email endpoint so admins receive a copy
        await fetch('https://wise-globle-research-2.onrender.com/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name || '',
            email: data.email || data.emailAddress || '',
            mobile: data.mobile || data.phone || '',
            interest: collection,
            message: JSON.stringify(data),
            source: `${collection}-fallback`
          }),
        });
        // Return a synthetic key to indicate fallback path
        return `fallback-${Date.now()}`;
      } catch (postErr) {
        console.warn('Fallback POST to /send-email failed', postErr);
        throw err; // rethrow original DB error to surface to caller
      }
    }
    throw err;
  }
};

export const api = {
  post: async (path, payload) => {
    try {
      // Handle known logical routes directly via Firebase
      if (path === '/chatbot-submissions') {
        const id = await writeToDb('chatbot-submissions', payload);
        return { ok: true, status: 200, json: async () => ({ id }) };
      }
      if (path === '/popup') {
        // RTDB rules use the node name 'popoForms'
        const id = await writeToDb('popoForms', payload);
        return { ok: true, status: 200, json: async () => ({ id }) };
      }

      // Fallback to standard POST (e.g., your Express server routes under /api)
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload ?? {}),
      });
      return res;
    } catch (err) {
      console.error('api.post error:', err);
      // Normalize to a Response-like shape expected by callers
      return {
        ok: false,
        status: 500,
        json: async () => ({ error: err?.message || 'Unknown error' }),
      };
    }
  },
};

export default api;
