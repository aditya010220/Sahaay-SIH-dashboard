import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const STORAGE_KEY = 'studentSettings';

const defaultSettings = {
  notifyEmail: true,
  notifyPush: false,
  anonForumByDefault: true,
  shareJournalDefault: false,
};

const StudentSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      alert('Settings saved');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-xl font-heading font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Control notifications and privacy.</p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <div className="glass-card p-6 rounded-xl">
          <CheckboxGroup label="Notifications" description="Choose how you want to be notified.">
            <Checkbox
              checked={settings.notifyEmail}
              onChange={(e) => setSettings((s) => ({ ...s, notifyEmail: e.target.checked }))}
              label="Email notifications"
              description="Receive updates and reminders via email"
            />
            <Checkbox
              checked={settings.notifyPush}
              onChange={(e) => setSettings((s) => ({ ...s, notifyPush: e.target.checked }))}
              label="Push notifications"
              description="Enable browser push notifications"
            />
          </CheckboxGroup>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <CheckboxGroup label="Privacy" description="Manage your visibility preferences.">
            <Checkbox
              checked={settings.anonForumByDefault}
              onChange={(e) => setSettings((s) => ({ ...s, anonForumByDefault: e.target.checked }))}
              label="Post anonymously by default"
              description="Your display name will be hidden in forum posts"
            />
            <Checkbox
              checked={settings.shareJournalDefault}
              onChange={(e) => setSettings((s) => ({ ...s, shareJournalDefault: e.target.checked }))}
              label="Share new journal entries with counselor by default"
              description="Can be changed per entry in the Journal section"
            />
          </CheckboxGroup>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => window.location.replace('/student-dashboard')}>Back</Button>
          <Button type="submit" loading={saving} iconName="Save">Save Settings</Button>
        </div>
      </form>
    </div>
  );
};

export default StudentSettings;
