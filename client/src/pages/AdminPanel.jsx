import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiCheck, FiX } from 'react-icons/fi';
import api from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';

const ADMIN_PASSWORD = 'admin123';

const emptyProject = { title: '', description: '', image: '', technologies: '', github: '', demo: '', featured: false };
const emptySkill = { name: '', category: 'Languages', icon: '', level: 80, color: '#6366f1' };
const categories = ['Languages', 'Web Technologies', 'Tools & Platforms', 'Databases'];

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ ...emptyProject });
  const [skillForm, setSkillForm] = useState({ ...emptySkill });
  const [editing, setEditing] = useState(null);

  const login = () => {
    if (pwd === ADMIN_PASSWORD) { setAuthed(true); } else { toast.error('Wrong password'); }
  };

  useEffect(() => {
    if (!authed) return;
    api.get('/projects').then((r) => setProjects(r.data)).catch(() => {});
    api.get('/skills').then((r) => setSkills(r.data)).catch(() => {});
    api.get('/contact').then((r) => setMessages(r.data)).catch(() => {});
  }, [authed]);

  const saveProject = async () => {
    const data = { ...form, technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean) };
    if (editing) {
      const r = await api.put(`/projects/${editing}`, data);
      setProjects((p) => p.map((x) => (x._id === editing ? r.data : x)));
      toast.success('Project updated!');
    } else {
      const r = await api.post('/projects', data);
      setProjects((p) => [...p, r.data]);
      toast.success('Project added!');
    }
    setForm({ ...emptyProject }); setEditing(null);
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects((p) => p.filter((x) => x._id !== id));
    toast.success('Project deleted!');
  };

  const saveSkill = async () => {
    if (editing) {
      const r = await api.put(`/skills/${editing}`, skillForm);
      setSkills((s) => s.map((x) => (x._id === editing ? r.data : x)));
      toast.success('Skill updated!');
    } else {
      const r = await api.post('/skills', skillForm);
      setSkills((s) => [...s, r.data]);
      toast.success('Skill added!');
    }
    setSkillForm({ ...emptySkill }); setEditing(null);
  };

  const deleteSkill = async (id) => {
    await api.delete(`/skills/${id}`);
    setSkills((s) => s.filter((x) => x._id !== id));
    toast.success('Skill deleted!');
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="glass-card p-8 w-full max-w-sm">
          <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">Admin Login</h2>
          <input
            type="password" placeholder="Enter password" value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="w-full px-4 py-3 bg-dark-700 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
          />
          <button onClick={login} className="btn-primary w-full">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text">Portfolio Admin</h1>
          <button onClick={() => setAuthed(false)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <FiLogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {['projects', 'skills', 'messages'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-primary-500 text-white' : 'bg-dark-700 text-gray-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <div className="space-y-3">
                {['title', 'description', 'image', 'github', 'demo'].map((f) => (
                  <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f]}
                    onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))}
                    className="w-full px-3 py-2 bg-dark-700 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                ))}
                <input placeholder="Technologies (comma-separated)" value={form.technologies}
                  onChange={(e) => setForm((p) => ({ ...p, technologies: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 accent-primary-500" />
                  Featured project
                </label>
                <div className="flex gap-2">
                  <button onClick={saveProject} className="btn-primary text-sm flex items-center gap-1"><FiCheck size={14} />{editing ? 'Update' : 'Add'}</button>
                  {editing && <button onClick={() => { setForm({ ...emptyProject }); setEditing(null); }} className="btn-outline text-sm flex items-center gap-1"><FiX size={14} />Cancel</button>}
                </div>
              </div>
            </div>

            {/* List */}
            <div className="glass-card p-6 overflow-y-auto max-h-[500px]">
              <h3 className="text-lg font-bold mb-4">Projects ({projects.length})</h3>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p._id} className="flex items-center justify-between gap-3 p-3 bg-dark-700/50 rounded-xl">
                    <span className="text-sm font-medium text-gray-200 truncate">{p.title}</span>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { setEditing(p._id); setForm({ ...p, technologies: p.technologies.join(', ') }); }}
                        className="p-1.5 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/40 transition-colors"><FiEdit2 size={14} /></button>
                      <button onClick={() => deleteProject(p._id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {tab === 'skills' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">{editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <div className="space-y-3">
                <input placeholder="Skill Name" value={skillForm.name}
                  onChange={(e) => setSkillForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                <select value={skillForm.category}
                  onChange={(e) => setSkillForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="Icon key (e.g. react, python)" value={skillForm.icon}
                  onChange={(e) => setSkillForm((p) => ({ ...p, icon: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-700 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1 block">Level: {skillForm.level}%</label>
                    <input type="range" min={0} max={100} value={skillForm.level}
                      onChange={(e) => setSkillForm((p) => ({ ...p, level: +e.target.value }))}
                      className="w-full accent-primary-500" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Color</label>
                    <input type="color" value={skillForm.color}
                      onChange={(e) => setSkillForm((p) => ({ ...p, color: e.target.value }))}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={saveSkill} className="btn-primary text-sm flex items-center gap-1"><FiCheck size={14} />{editing ? 'Update' : 'Add'}</button>
                  {editing && <button onClick={() => { setSkillForm({ ...emptySkill }); setEditing(null); }} className="btn-outline text-sm flex items-center gap-1"><FiX size={14} />Cancel</button>}
                </div>
              </div>
            </div>
            <div className="glass-card p-6 overflow-y-auto max-h-[480px]">
              <h3 className="text-lg font-bold mb-4">Skills ({skills.length})</h3>
              <div className="space-y-2">
                {skills.map((s) => (
                  <div key={s._id} className="flex items-center justify-between gap-3 p-3 bg-dark-700/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-sm text-gray-200">{s.name}</span>
                      <span className="text-xs text-gray-500">{s.level}%</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditing(s._id); setSkillForm(s); }}
                        className="p-1.5 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/40 transition-colors"><FiEdit2 size={14} /></button>
                      <button onClick={() => deleteSkill(s._id)}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Contact Messages ({messages.length})</h3>
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m._id} className={`p-4 rounded-xl border ${m.read ? 'border-white/10 bg-dark-700/30' : 'border-primary-500/30 bg-primary-500/5'}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="font-semibold text-white">{m.name}</span>
                        <span className="text-gray-400 text-sm ml-2">{m.email}</span>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
