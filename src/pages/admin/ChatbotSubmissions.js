import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ChatbotSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const submissionsRef = ref(db, 'chatbot-submissions');
    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const submissionList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
        setSubmissions(submissionList);
      } else {
        setSubmissions([]);
      }
      setLoading(false);
    });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const submissionRef = ref(db, `chatbot-submissions/${id}`);
    update(submissionRef, { status: newStatus });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this submission permanently?');
    if (!confirmed) return;
    try {
      setDeletingId(id);
      await remove(ref(db, `chatbot-submissions/${id}`));
      // onValue listener will refresh the table automatically
  toast.success('Submission deleted.', { position: 'top-center', autoClose: 1500 });
    } catch (e) {
      console.error('Failed to delete submission:', e);
  toast.error('Failed to delete. Please try again.', { position: 'top-center' });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading submissions...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Chatbot Submissions</h1>
      
      {submissions.length === 0 ? (
        <p className="text-gray-400">No submissions yet.</p>
      ) : (
  <div className="overflow-x-auto h-scroll custom-scrollbar bg-gray-800 rounded-lg shadow">
    <table className="min-w-[820px] sm:min-w-full text-xs sm:text-sm text-left text-gray-300">
            <thead className="bg-gray-700 text-xs text-gray-200 uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-3">Timestamp</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">City</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Mobile</th>
                <th scope="col" className="px-6 py-3">Service</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr key={sub.id} className="border-b border-gray-700 hover:bg-gray-600/50">
      <td className="px-6 py-4 whitespace-nowrap">{new Date(sub.timestamp).toLocaleString()}</td>
      <td className="px-6 py-4 font-medium break-words">{sub.name}</td>
      <td className="px-6 py-4 break-words">{sub.city}</td>
      <td className="px-6 py-4 whitespace-pre-wrap break-words max-w-[12rem] sm:max-w-xs">{sub.address || '-'}</td>
      <td className="px-6 py-4 whitespace-nowrap">
                    <a href={`https://wa.me/91${sub.mobile}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300">
                      <FaWhatsapp />
                      {sub.mobile}
                    </a>
                  </td>
      <td className="px-6 py-4 break-words">{sub.service}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${sub.status === 'New' ? 'bg-blue-500' : sub.status === 'Contacted' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select 
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={deletingId === sub.id}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deletingId === sub.id}
                        aria-label={`Delete submission ${sub.id}`}
                      >
                        {deletingId === sub.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChatbotSubmissions;
