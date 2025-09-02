import React, { useEffect, useState } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const ComplaintBox = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDesc, setExpandedDesc] = useState({});
  const [expandedRes, setExpandedRes] = useState({});

  const isLong = (text) => (text?.length || 0) > 180;
  const toggleDesc = (id) =>
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleRes = (id) =>
    setExpandedRes((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const complaintsRef = ref(db, 'complaints');
    const unsub = onValue(
      complaintsRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, v]) => ({ id, ...v }));
        list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setComplaints(list);
        setLoading(false);

        // Auto-delete complaints that are Closed for >= 48 hours
        const now = Date.now();
        const ttlMs = 48 * 60 * 60 * 1000; // 48 hours
        list.forEach((c) => {
          if ((c.status || '').toLowerCase() === 'closed') {
            const baseTime = c.closedAt || c.statusUpdatedAt || c.timestamp || 0;
            if (baseTime && now - baseTime >= ttlMs) {
              remove(ref(db, `complaints/${c.id}`)).catch(() => {});
            }
          }
        });
      },
      (error) => {
        toast.error('Failed to load complaint submissions: ' + error.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    try {
      const complaintRef = ref(db, `complaints/${id}`);
      const now = Date.now();
      const updatePayload = {
        status: newStatus,
        statusUpdatedAt: now,
      };
      if ((newStatus || '').toLowerCase() === 'closed') {
        updatePayload.closedAt = now;
      } else {
        // If reopening, clear closedAt
        updatePayload.closedAt = null;
      }
      update(complaintRef, updatePayload);
      toast.success('Status updated');
    } catch (err) {
      toast.error('Failed to update status: ' + (err?.message || err));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch ((status || 'New').toLowerCase()) {
      case 'new':
        return 'bg-blue-500';
      case 'in review':
      case 'in-progress':
      case 'in progress':
        return 'bg-yellow-500';
      case 'resolved':
        return 'bg-green-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Complaint Box Submission</h2>

      {loading ? (
        <div className="p-6 bg-gray-800 rounded-lg shadow"><LoadingSpinner /></div>
      ) : complaints.length === 0 ? (
        <div className="p-6 bg-gray-800 rounded-lg shadow text-gray-300">No complaints submitted yet.</div>
      ) : (
        <>
          {/* Desktop / Tablet table */}
          <div className="hidden md:block overflow-x-auto bg-gray-800 rounded-lg shadow custom-scrollbar">
            <table className="min-w-[1000px] md:min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-700 text-xs text-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email / Client ID</th>
                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Preferred Resolution</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-600/50 align-top">
                    <td className="px-6 py-4 whitespace-nowrap">{c.timestamp ? new Date(c.timestamp).toLocaleString() : '-'}</td>
                    <td className="px-6 py-4 font-medium break-words">{c.name || '-'}</td>
                    <td className="px-6 py-4 break-words">{c.email || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.mobile || '-'}</td>
                    <td className="px-6 py-4 break-words">{c.complaintType || '-'}</td>
                    <td className="px-6 py-4 max-w-xs">
                      <div
                        className={`relative whitespace-pre-wrap break-words break-all ${
                          expandedDesc[c.id] ? '' : 'max-h-24 overflow-hidden'
                        }`}
                        title={c.description || ''}
                      >
                        {c.description || '-'}
                      </div>
                      {isLong(c.description) && (
                        <button
                          type="button"
                          onClick={() => toggleDesc(c.id)}
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300 focus:outline-none"
                        >
                          {expandedDesc[c.id] ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div
                        className={`relative whitespace-pre-wrap break-words break-all ${
                          expandedRes[c.id] ? '' : 'max-h-24 overflow-hidden'
                        }`}
                        title={c.resolution || ''}
                      >
                        {c.resolution || '-'}
                      </div>
                      {isLong(c.resolution) && (
                        <button
                          type="button"
                          onClick={() => toggleRes(c.id)}
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300 focus:outline-none"
                        >
                          {expandedRes[c.id] ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadgeClass(c.status)}`}>
                        {c.status || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={c.status || 'New'}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-md p-1 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {complaints.map((c) => (
              <div key={c.id} className="bg-gray-800 rounded-lg shadow p-4 text-gray-200">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm text-gray-400">{c.timestamp ? new Date(c.timestamp).toLocaleString() : '-'}</div>
                    <div className="font-semibold">{c.name || '-'}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white h-fit ${getStatusBadgeClass(c.status)}`}>
                    {c.status || 'New'}
                  </span>
                </div>

                <div className="mt-2 text-sm break-words break-all"><span className="text-gray-400">Email/ID:</span> {c.email || '-'}</div>
                <div className="mt-1 text-sm break-words break-all"><span className="text-gray-400">Mobile:</span> {c.mobile || '-'}</div>
                <div className="mt-1 text-sm break-words break-all"><span className="text-gray-400">Type:</span> {c.complaintType || '-'}</div>

                <div className="mt-3">
                  <div className="text-gray-300 text-xs uppercase">Description</div>
                  <div className={`mt-1 text-sm whitespace-pre-wrap break-words break-all ${expandedDesc[c.id] ? '' : 'max-h-24 overflow-hidden'}`}>{c.description || '-'}</div>
                  {isLong(c.description) && (
                    <button
                      type="button"
                      onClick={() => toggleDesc(c.id)}
                      className="mt-1 text-xs text-blue-400 hover:text-blue-300"
                    >
                      {expandedDesc[c.id] ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <div className="text-gray-300 text-xs uppercase">Preferred Resolution</div>
                  <div className={`mt-1 text-sm whitespace-pre-wrap break-words break-all ${expandedRes[c.id] ? '' : 'max-h-24 overflow-hidden'}`}>{c.resolution || '-'}</div>
                  {isLong(c.resolution) && (
                    <button
                      type="button"
                      onClick={() => toggleRes(c.id)}
                      className="mt-1 text-xs text-blue-400 hover:text-blue-300"
                    >
                      {expandedRes[c.id] ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <label className="text-xs text-gray-400 mr-2">Update status:</label>
                  <select
                    value={c.status || 'New'}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ComplaintBox;
