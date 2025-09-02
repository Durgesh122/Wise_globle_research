import React, { useEffect, useMemo, useState } from 'react';
import { auth, db } from '../../firebase';
import { ref as dbRef, onValue, push, remove, set, update, query, orderByChild, equalTo } from 'firebase/database';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaList } from 'react-icons/fa';

const emptyJob = { title: '', location: '', description: '', requirements: '', active: true };

export default function JobsManager() {
  const [jobs, setJobs] = useState({});
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState(null);
  const [viewAppsFor, setViewAppsFor] = useState(null); // jobId to view applications
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [appsError, setAppsError] = useState('');
  const appsUnsubRef = React.useRef(null);

  useEffect(() => {
    const r = dbRef(db, 'jobs');
    const off = onValue(r, (snap) => {
      setJobs(snap.val() || {});
    });
    return () => off();
  }, []);

  const jobList = useMemo(() => Object.entries(jobs).map(([id, j]) => ({ id, ...j })), [jobs]);

  const resetForm = () => { setForm(emptyJob); setEditingId(null); };

  const saveJob = async (e) => {
    e.preventDefault();
    try {
    const uid = auth.currentUser ? auth.currentUser.uid : null;
      const payload = {
        title: String(form.title || ''),
        location: String(form.location || ''),
        description: String(form.description || ''),
        requirements: String(form.requirements || ''), // comma or newline separated
        active: Boolean(form.active),
  updatedAt: Date.now(),
  updatedBy: uid,
      };
      if (editingId) {
        await update(dbRef(db, `jobs/${editingId}`), payload);
        toast.success('Job updated');
      } else {
        const node = push(dbRef(db, 'jobs'));
  await set(node, { ...payload, createdAt: Date.now(), createdBy: uid });
        toast.success('Job created');
      }
      resetForm();
    } catch (e) {
      toast.error(`Failed to save job: ${e?.message || e}`);
    }
  };

  const editJob = (job) => {
    setEditingId(job.id);
    setForm({
      title: job.title || '',
      location: job.location || '',
      description: job.description || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      active: job.active !== false,
    });
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job? Applications remain in submissions.')) return;
    try { await remove(dbRef(db, `jobs/${id}`)); toast.success('Job deleted'); }
    catch (e) { toast.error(`Failed: ${e?.message || e}`); }
  };

  const loadApplications = async (jobId) => {
    // Clean previous listener if any
    if (appsUnsubRef.current) {
      try { appsUnsubRef.current(); } catch (_) {}
      appsUnsubRef.current = null;
    }
    setViewAppsFor(jobId);
    setApps([]);
    setAppsError('');
    setLoadingApps(true);
    try {
      // Read from jobApplications filtered by jobId
      const q = query(dbRef(db, 'jobApplications'), orderByChild('jobId'), equalTo(jobId));
      const unsub = onValue(
        q,
        (snap) => {
          const val = snap.val() || {};
          const list = Object.entries(val)
            .map(([id, v]) => ({ id, ...v }))
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          setApps(list);
          setAppsError('');
          setLoadingApps(false);
        },
        (err) => {
          const msg = err?.message || String(err);
          setAppsError(msg);
          toast.error(msg);
          setLoadingApps(false);
        }
      );
      appsUnsubRef.current = unsub;
    } catch (e) {
      const msg = e?.message || String(e);
      setAppsError(msg);
      toast.error(`Failed to load applications: ${msg}`);
      setLoadingApps(false);
    }
  };

  // Cleanup listener on unmount
  useEffect(() => {
    return () => {
      if (appsUnsubRef.current) {
        try { appsUnsubRef.current(); } catch (_) {}
        appsUnsubRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Jobs Manager</h1>

      {/* Create / Edit Form */}
      <form onSubmit={saveJob} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-4 rounded">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Location</label>
          <input className="w-full p-2 rounded bg-gray-700 text-white" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Description</label>
          <textarea className="w-full p-2 rounded bg-gray-700 text-white" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Requirements (one per line)</label>
          <textarea className="w-full p-2 rounded bg-gray-700 text-white" rows={4} value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})} />
        </div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} />
          <span>Active</span>
        </label>
        <div className="md:col-span-2 flex gap-2">
          <button className="px-4 py-2 bg-green-600 rounded text-white flex items-center gap-2" type="submit">
            {editingId ? (<><FaEdit/> Update</>) : (<><FaPlus/> Create</>)}
          </button>
          {editingId && (
            <button type="button" className="px-3 py-2 bg-gray-600 rounded" onClick={resetForm}>Cancel</button>
          )}
        </div>
      </form>

      {/* Jobs List */}
      <div className="bg-white/10 rounded">
        <div className="p-4 border-b border-white/10 font-semibold">All Jobs</div>
        <div className="divide-y divide-white/10">
          {jobList.length === 0 && (
            <div className="p-4 text-white/70">No jobs yet. Create one above.</div>
          )}
          {jobList.map(job => (
            <div key={job.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <div className="flex-1">
                <div className="font-bold">{job.title} {job.active === false && <span className="ml-2 text-xs bg-red-600 px-2 py-0.5 rounded">Inactive</span>}</div>
                <div className="text-white/80 text-sm">{job.location}</div>
                <div className="text-white/80 text-sm line-clamp-2">{job.description}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-blue-600 rounded flex items-center gap-2" onClick={()=>editJob(job)}><FaEdit/> Edit</button>
                <button className="px-3 py-2 bg-red-600 rounded flex items-center gap-2" onClick={()=>deleteJob(job.id)}><FaTrash/> Delete</button>
                <button className="px-3 py-2 bg-emerald-600 rounded flex items-center gap-2" onClick={()=>loadApplications(job.id)}><FaList/> Applications</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applications drawer */}
      {viewAppsFor && (
        <div className="bg-white/10 rounded">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="font-semibold">Applications for Job #{viewAppsFor}</div>
            <button
              className="text-sm underline"
              onClick={() => {
                if (appsUnsubRef.current) {
                  try { appsUnsubRef.current(); } catch (_) {}
                  appsUnsubRef.current = null;
                }
                setViewAppsFor(null);
                setApps([]);
                setAppsError('');
              }}
            >
              Close
            </button>
          </div>
          {loadingApps ? (
            <div className="p-4">Loading…</div>
          ) : (
            <div className="divide-y divide-white/10">
              {appsError && (
                <div className="p-4 text-red-300 text-sm">{appsError}</div>
              )}
              {apps.length === 0 && <div className="p-4 text-white/70">No applications yet.</div>}
              {apps.map(a => (
                <div key={a.id} className="p-4">
                  <div className="font-semibold">{a.name} • {a.email} • {a.phone}</div>
                  <div className="text-white/80 text-sm mb-2">{new Date(a.timestamp||0).toLocaleString()}</div>
                  {a.resumeData && a.resumeMeta && (
                    <a
                      className="text-blue-300 underline"
                      href={`data:${a.resumeMeta.contentType||'application/octet-stream'};base64,${a.resumeData}`}
                      download={a.resumeMeta.name || 'resume'}
                    >
                      Download Resume
                    </a>
                  )}
                  {a.whyHire && <p className="mt-2 whitespace-pre-wrap">{a.whyHire}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
