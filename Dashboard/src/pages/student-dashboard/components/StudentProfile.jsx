import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const StudentProfile = ({ user, onUpdateName }) => {
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      localStorage.setItem('studentName', trimmed);
      onUpdateName?.(trimmed);
      alert('Profile updated');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-heading font-semibold text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information.</p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 rounded-xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Display Name</label>
            <input
              id="name"
              type="text"
              className="w-full rounded-lg border border-border bg-white/80 p-3 outline-none focus:ring-2 focus:ring-ring"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full rounded-lg border border-border bg-white/60 p-3 text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Student ID</label>
            <input value={user?.studentId || ''} disabled className="w-full rounded-lg border border-border bg-white/60 p-3 text-muted-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Member Since</label>
            <input value={user?.joinDate?.toLocaleDateString?.() || ''} disabled className="w-full rounded-lg border border-border bg-white/60 p-3 text-muted-foreground" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => window.location.replace('/student-dashboard')}>Back</Button>
          <Button type="submit" loading={saving} iconName="Save">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
