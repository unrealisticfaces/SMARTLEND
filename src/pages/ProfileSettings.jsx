import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Hash, Camera, Shield, Key, Lock } from 'lucide-react';

export default function ProfileSettings() {
  const { user, updateProfile, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({ name: user.name, email: user.email, id: user.id });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.current !== user.password) {
      showToast("Current password incorrect", "error");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showToast("New passwords do not match", "error");
      return;
    }
    updateProfile({ password: passwords.new });
    showToast("Security protocol updated successfully");
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleAvatarChange = () => {
    const newAvatar = `https://ui-avatars.com/api/?name=${formData.name.replace(/ /g, '+')}&background=random&color=fff&t=${Date.now()}`;
    updateProfile({ avatar: newAvatar });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans text-gray-900 dark:text-gray-100 pb-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-sm text-gray-500 dark:text-tabler-muted mt-1">Manage your public profile and private security protocols.</p>
      </div>

      <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-tabler-border bg-gray-50 dark:bg-tabler-body/50 p-4 shrink-0">
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-tabler-primary/10 text-tabler-primary' : 'text-gray-600 dark:text-tabler-muted hover:bg-gray-100 dark:hover:bg-tabler-border/50 hover:text-gray-900 dark:hover:text-gray-200'}`}>
              <User className="w-4 h-4" /> Edit Profile
            </button>
            <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-tabler-primary/10 text-tabler-primary' : 'text-gray-600 dark:text-tabler-muted hover:bg-gray-100 dark:hover:bg-tabler-border/50 hover:text-gray-900 dark:hover:text-gray-200'}`}>
              <Shield className="w-4 h-4" /> Security & Password
            </button>
          </nav>
        </div>

        <div className="flex-1 p-6 sm:p-10">
          
          {activeTab === 'profile' && (
            <div className="max-w-2xl animate-in fade-in">
              <h3 className="text-lg font-semibold mb-6">Edit Profile Details</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                  <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-sm border border-gray-200 dark:border-tabler-border" />
                  <button onClick={handleAvatarChange} className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Profile Avatar</h4>
                  <p className="text-xs text-gray-500 dark:text-tabler-muted mt-1 mb-3">Click the image to randomly generate a new avatar.</p>
                  <button onClick={handleAvatarChange} className="px-4 py-2 text-sm font-medium bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-tabler-border/50 transition-colors">
                    Change avatar
                  </button>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-body rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-1.5">Identification Number</label>
                    <div className="relative">
                      <Hash className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                      <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-body rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none transition-colors" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-body rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none transition-colors" />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-tabler-border">
                  <button type="submit" className="bg-tabler-primary text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-[#1d5fb3] transition-colors shadow-sm">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-lg animate-in fade-in">
              <h3 className="text-lg font-semibold mb-2">Security & Password</h3>
              <p className="text-sm text-gray-500 dark:text-tabler-muted mb-6">Ensure your account is using a long, random password to stay secure.</p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-1.5">Current Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                    <input type="password" required value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-body rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-1.5">New Password</label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                    <input type="password" required value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-body rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                    <input type="password" required value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-body rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none transition-colors" />
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-tabler-border">
                  <button type="submit" className="bg-tabler-primary text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-[#1d5fb3] transition-colors shadow-sm">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}