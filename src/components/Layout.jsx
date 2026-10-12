import { Outlet, useNavigate, Link } from 'react-router-dom';
import { LogOut, Moon, Sun, Check, AlertCircle, Settings, Bell, Calendar, History, X, Library, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Layout() {
  const { user, logout, isDarkMode, setIsDarkMode, toast, clearToast, notifications, markNotificationsRead, isLoading, transactions, inventory } = useApp();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-tabler-light dark:bg-tabler-body transition-colors duration-200 font-sans">
      
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gray-200 dark:bg-[#2f3e4e] overflow-hidden">
          <div className="h-full bg-tabler-primary animate-pulse w-full origin-left transform transition-transform duration-1000 scale-x-50"></div>
        </div>
      )}

      <header className="bg-white dark:bg-tabler-card border-b border-gray-200 dark:border-tabler-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <Link to={user ? `/${user.role}` : '/login'} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-br from-tabler-primary to-[#8b5cf6] text-white p-1.5 rounded-lg shadow-md">
                <Library className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-tabler-primary to-[#8b5cf6] tracking-tight hidden sm:block">
                SmartLend
              </span>
            </Link>

            {user && (
              <nav className="hidden md:flex items-center gap-2">
                <button onClick={() => setIsCalendarOpen(true)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-tabler-muted hover:bg-gray-50 dark:hover:bg-tabler-body rounded-md transition-colors">
                  <Calendar className="w-4 h-4" /> Reservation Calendar
                </button>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-md"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user && (
              <>
                <div className="relative">
                  <button 
                    onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); if(!notifOpen) markNotificationsRead(); }} 
                    className="relative text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white p-2 rounded-md transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tabler-danger rounded-full border-2 border-white dark:border-tabler-card"></span>
                    )}
                  </button>

                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-md shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-tabler-border bg-gray-50 dark:bg-tabler-body/50">
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</h3>
                        </div>
                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                          {notifications.map(n => (
                            <div key={n.id} className={`p-4 border-b border-gray-100 dark:border-tabler-border/50 hover:bg-gray-50 dark:hover:bg-tabler-body/50 transition-colors ${!n.read ? 'bg-blue-50/50 dark:bg-tabler-primary/5' : ''}`}>
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{n.title}</h4>
                                <span className="text-[10px] text-gray-500 dark:text-tabler-muted">{n.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{n.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button 
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} 
                    className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-tabler-border/30 p-1.5 rounded-md transition-colors outline-none"
                  >
                    <img src={user.avatar} className="w-8 h-8 rounded-full object-cover shadow-sm border border-gray-200 dark:border-tabler-border" alt="Profile" />
                    <div className="hidden sm:block text-left pr-1">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white leading-none mb-1">{user.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-gray-500 dark:text-tabler-muted leading-none uppercase font-bold tracking-wider">{user.role}</div>
                    </div>
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-md shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-tabler-body transition-colors">
                          <Settings className="w-4 h-4 text-gray-400 dark:text-tabler-muted" /> Account Settings
                        </Link>
                        <button onClick={() => setProfileOpen(false)} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-tabler-body transition-colors">
                          <History className="w-4 h-4 text-gray-400 dark:text-tabler-muted" /> Borrowing History
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-tabler-border my-1"></div>
                        <button onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-tabler-danger hover:bg-red-50 dark:hover:bg-tabler-danger/10 transition-colors">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        <Outlet />
      </main>

      {/* Equipment Reservation Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-tabler-body/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-tabler-border flex justify-between items-center bg-gray-50 dark:bg-tabler-body/50">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Equipment Reservation Calendar</h3>
              <button onClick={() => setIsCalendarOpen(false)} className="text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">September 2026</h4>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase">{day}</div>
                ))}
                <div className="h-24 rounded-md border border-transparent"></div>
                <div className="h-24 rounded-md border border-transparent"></div>
                {Array.from({length: 30}, (_, i) => {
                  const dateStr = `2026-09-${String(i + 1).padStart(2, '0')}`;
                  const dayTxs = transactions?.filter(tx => tx.request_date === dateStr && (tx.status === 'Pending' || tx.status === 'Borrowed')) || [];
                  return (
                    <div key={i} className={`h-24 rounded-md border border-gray-200 dark:border-tabler-border p-2 overflow-y-auto custom-scrollbar ${dayTxs.length > 0 ? 'bg-tabler-primary/5 dark:bg-tabler-primary/10 border-tabler-primary/30' : 'bg-white dark:bg-tabler-card'}`}>
                      <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">{i + 1}</div>
                      <div className="space-y-1">
                        {dayTxs.map(tx => {
                           const item = inventory?.find(item => item.id === tx.item_id);
                           return (
                             <div key={tx.transaction_id} className="text-[9px] leading-tight p-1 bg-white dark:bg-tabler-body border border-gray-200 dark:border-tabler-border rounded truncate text-tabler-primary font-medium" title={`${tx.student_id} - ${item?.name}`}>
                               {item?.name}
                             </div>
                           )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Centered Pop-up Modal for Toasts */}
      {toast && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-[#182433]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              toast.type === 'success' ? 'bg-tabler-success/10 text-tabler-success' : 
              toast.type === 'warning' ? 'bg-tabler-warning/10 text-tabler-warning' : 
              'bg-tabler-danger/10 text-tabler-danger'
            }`}>
              {toast.type === 'success' ? <Check className="w-7 h-7" /> : 
               toast.type === 'warning' ? <AlertTriangle className="w-7 h-7" /> : 
               <AlertCircle className="w-7 h-7" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {toast.type === 'success' ? 'Success!' : toast.type === 'warning' ? 'Attention' : 'Error'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-tabler-muted mb-8">{toast.message}</p>
            <button 
              onClick={clearToast} 
              className="w-full py-2.5 bg-gray-100 dark:bg-tabler-body hover:bg-gray-200 dark:hover:bg-tabler-border/50 text-gray-800 dark:text-gray-200 rounded-md text-sm font-bold transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}