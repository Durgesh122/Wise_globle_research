import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, get } from 'firebase/database';

// Determines if current user is an admin by checking RTDB: /admins/{uid} === true
export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isHrOnly, setIsHrOnly] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        setIsSupport(false);
        setChecking(false);
        return;
      }
      // Compute support role by email and RTDB flag
      const email = (user.email || '').toLowerCase();
      let support = email === 'support@wiseglobalresearch.com';
    // HR-only role via explicit email match
    const hrOnly = email === 'carrier@wiseglobalresearch.com';
      try {
        const s = await get(ref(db, `supportUsers/${user.uid}`));
        if (s.exists() && s.val() === true) support = true;
      } catch (_) {}
      setIsSupport(support);
    setIsHrOnly(hrOnly);
      try {
        const snap = await get(ref(db, `admins/${user.uid}`));
        setIsAdmin(snap.exists() && snap.val() === true);
      } catch (_) {
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    });
    return () => unsub();
  }, []);

  return { isAdmin, isSupport, isHrOnly, checking };
};

export default useAdmin;
