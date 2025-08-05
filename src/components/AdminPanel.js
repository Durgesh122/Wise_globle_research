import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const AdminPanel = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const entriesRef = ref(db, 'contactEntries');
    const unsubscribe = onValue(
      entriesRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, record]) => ({
          id,
          ...record
        }));
        setEntries(list);
      },
      (error) => {
        console.error('Failed to load submissions:', error);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const submissionsRef = ref(db, 'homeFormSubmissions');
    onValue(submissionsRef, snapshot => {
      setSubmissions(snapshot.val() || {});
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            {['Name','Mobile','City','Experience','Newsletter','Submitted At'].map(h => (
              <th key={h} className="px-4 py-2 border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e.id} className="even:bg-gray-100 odd:bg-white">
              <td className="px-4 py-2 border">{e.name}</td>
              <td className="px-4 py-2 border">{e.mobile}</td>
              <td className="px-4 py-2 border">{e.city}</td>
              <td className="px-4 py-2 border">{e.experience}</td>
              <td className="px-4 py-2 border">{e.newsletter ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border">{new Date(e.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;