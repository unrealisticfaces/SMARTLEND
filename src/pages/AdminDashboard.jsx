import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Package, ShieldCheck, RefreshCcw, Users, TrendingUp, TrendingDown, Edit, Trash2, Database, Search, ChevronDown, X, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const { inventory, transactions, usersList, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // Tabs to divide the page
  const [searchQuery, setSearchQuery] = useState('');
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({ name: '', inventory_code: '', category: 'Computer Science', status: 'Available', image: '' });

  const stats = {
    total: inventory.length,
    available: inventory.filter(i => i.status === 'Available').length,
    borrowed: inventory.filter(i => i.status === 'Borrowed').length,
    users: usersList.length
  };

  const deptStats = useMemo(() => {
    const counts = transactions.reduce((acc, tx) => { acc[tx.department] = (acc[tx.department] || 0) + 1; return acc; }, {});
    const maxCount = Math.max(...Object.values(counts), 1);
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, percent: (count / maxCount) * 100 }))
      .sort((a,b) => b.count - a.count);
  }, [transactions]);

  const last30Days = useMemo(() => {
    return Array.from({length: 30}, (_, i) => {
      const dateStr = `2026-09-${String(i + 1).padStart(2, '0')}`;
      const dayTxs = transactions.filter(tx => tx.request_date === dateStr);
      return {
        day: i + 1,
        borrowed: dayTxs.filter(tx => tx.status === 'Borrowed' || tx.status === 'Pending').length,
        returned: dayTxs.filter(tx => tx.status === 'Returned').length,
        total: dayTxs.length
      };
    });
  }, [transactions]);

  const maxTraffic = Math.max(...last30Days.map(d => d.borrowed + d.returned), 5);
  const linePoints = last30Days.map(d => d.total);
  const maxLine = Math.max(...linePoints, 10);
  
  const buildSmoothPath = (points, maxHeight) => {
    if(points.length === 0) return '';
    let d = `M0,${maxHeight - (points[0]/maxLine)*maxHeight} `;
    for (let i = 1; i < points.length; i++) {
      const prevY = maxHeight - (points[i-1]/maxLine)*maxHeight;
      const currY = maxHeight - (points[i]/maxLine)*maxHeight;
      const startX = ((i-1)/(points.length-1)) * 800;
      const endX = (i/(points.length-1)) * 800;
      const cpX = startX + (endX - startX)/2;
      d += `C${cpX},${prevY} ${cpX},${currY} ${endX},${currY} `;
    }
    return d;
  };

  const devPathD = buildSmoothPath(linePoints, 100);

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.inventory_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (editingItem) updateInventoryItem({ ...editingItem, ...itemForm });
    else addInventoryItem({ id: Date.now(), rating: 5.0, reviews: 0, ...itemForm });
    setIsItemModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-gray-900 dark:text-gray-100">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Administrator</h2>
          <p className="text-sm text-gray-500 dark:text-tabler-muted mt-1">Manage overall portal operations and book database.</p>
        </div>
      </div>

      {/* Tabbed Menu */}
      <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm flex overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-tabler-primary text-tabler-primary bg-gray-50 dark:bg-tabler-body/50' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
          <LayoutDashboard className="w-4 h-4" /> Overview Dashboard
        </button>
        <button onClick={() => setActiveTab('inventory')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'inventory' ? 'border-tabler-primary text-tabler-primary bg-gray-50 dark:bg-tabler-body/50' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
          <Database className="w-4 h-4" /> Book Database
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Books', val: stats.total, trend: '+9.5%', color: 'text-tabler-success', icon: Package, fill: 'bg-tabler-primary', line: 'stroke-tabler-primary', data: [10, 15, 12, 18, 14, 20, 22] },
              { label: 'Available', val: stats.available, trend: '+14%', color: 'text-tabler-success', icon: ShieldCheck, fill: 'bg-tabler-success', line: 'stroke-tabler-success', data: [8, 10, 9, 14, 12, 15, 16] },
              { label: 'Borrowed', val: stats.borrowed, trend: 'Stable', color: 'text-tabler-warning', icon: RefreshCcw, fill: 'bg-tabler-warning', line: 'stroke-tabler-warning', data: [5, 4, 6, 5, 5, 6, 5] },
              { label: 'System Users', val: stats.users, trend: '+4%', color: 'text-tabler-success', icon: Users, fill: 'bg-purple-500', line: 'stroke-purple-500', data: [20, 22, 23, 24, 24, 25, 27] }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-md text-white shadow-sm ${stat.fill}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-0.5">{stat.label}</div>
                      <div className="text-2xl font-bold leading-none">{stat.val}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-bold ${stat.color} flex items-center`}>
                    {stat.trend} {stat.trend !== 'Stable' && <TrendingUp className="w-3 h-3 ml-1"/>}
                  </div>
                </div>
                <svg viewBox="0 0 100 20" className={`w-full h-8 mt-auto fill-none ${stat.line} stroke-[2]`} preserveAspectRatio="none">
                  <path d={`M0,${20-stat.data[0]} ` + stat.data.map((d, idx) => `L${(idx/6)*100},${20-d}`).join(' ')} />
                </svg>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-semibold text-sm">Traffic Summary</h3>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-600 dark:text-tabler-muted">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-tabler-primary"></div> Borrowed</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-tabler-success"></div> Returned</span>
                </div>
              </div>
              <div className="relative h-48 w-full flex items-end gap-1 sm:gap-2">
                {[0, 25, 50, 75, 100].map(pct => (
                  <div key={pct} className="absolute w-full flex items-center z-0" style={{ bottom: `${pct}%` }}>
                    <div className="text-[10px] text-gray-400 dark:text-tabler-muted w-6">{Math.round((pct/100)*maxTraffic)}</div>
                    <div className="flex-1 border-b border-gray-100 dark:border-tabler-border border-dashed"></div>
                  </div>
                ))}
                <div className="absolute inset-0 left-6 flex items-end justify-between z-10 pt-4">
                  {last30Days.map((day, i) => (
                    <div key={i} className="flex flex-col-reverse w-2 sm:w-3 h-full justify-start group relative cursor-pointer">
                      <div className="w-full bg-tabler-success rounded-t-sm transition-all duration-500" style={{ height: `${(day.returned/maxTraffic)*100}%` }}></div>
                      <div className="w-full bg-tabler-primary transition-all duration-500" style={{ height: `${(day.borrowed/maxTraffic)*100}%` }}></div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-medium">
                        Sept {day.day}: {day.borrowed} B, {day.returned} R
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 dark:text-tabler-muted ml-6 mt-3 font-medium uppercase tracking-wider">
                <span>01 Sep</span><span>10 Sep</span><span>20 Sep</span><span>30 Sep</span>
              </div>
            </div>

            <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
              <div className="w-full text-left mb-6">
                <div className="text-[10px] font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-widest mb-1">Active Books</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{stats.borrowed}</span>
                  <span className="text-xs font-bold text-tabler-danger flex items-center">-1% <TrendingDown className="w-3 h-3 ml-0.5"/></span>
                </div>
              </div>
              <div className="relative w-48 h-24 mt-4">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <path d="M 5 45 A 40 40 0 0 1 95 45" fill="none" className="stroke-gray-100 dark:stroke-tabler-border" strokeWidth="10" strokeLinecap="round" />
                  <path d="M 5 45 A 40 40 0 0 1 95 45" fill="none" className="stroke-tabler-primary" strokeWidth="10" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - ((stats.borrowed/stats.total)*100 || 0)} />
                </svg>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-2">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-widest mb-0.5">Utilization</span>
                  <span className="text-3xl font-bold">{Math.round((stats.borrowed/stats.total)*100 || 0)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-tabler-border">
                <h3 className="font-semibold text-sm">Department Traffic</h3>
              </div>
              <table className="w-full text-left text-sm flex-1">
                <thead className="border-b border-gray-200 dark:border-tabler-border text-[10px] text-gray-500 dark:text-tabler-muted uppercase tracking-wider bg-gray-50 dark:bg-tabler-body/50">
                  <tr>
                    <th className="px-5 py-3 font-medium">Department</th>
                    <th className="px-5 py-3 font-medium">Transactions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-tabler-border">
                  {deptStats.map(dept => (
                    <tr key={dept.name} className="hover:bg-gray-50 dark:hover:bg-tabler-border/30 transition-colors">
                      <td className="px-5 py-3 font-medium">{dept.name}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-gray-600 dark:text-tabler-muted w-8 font-medium">{dept.count}</span>
                          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-tabler-border rounded-full overflow-hidden">
                            <div className="h-full bg-tabler-primary rounded-full" style={{ width: `${dept.percent}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-200 dark:border-tabler-border flex items-center justify-between z-10 relative bg-white dark:bg-tabler-card">
                <div>
                  <h3 className="font-semibold text-sm">System Activity Logs</h3>
                  <div className="text-xs text-tabler-success font-medium flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/> System nominal</div>
                </div>
              </div>
              <div className="w-full h-28 -mt-8 relative z-0">
                <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradAct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#206bc4" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#206bc4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${devPathD} L800,100 L0,100 Z`} fill="url(#gradAct)" />
                  <path d={devPathD} fill="none" stroke="#206bc4" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="flex-1 overflow-x-auto border-t border-gray-200 dark:border-tabler-border relative z-10 bg-white dark:bg-tabler-card">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-50 dark:bg-tabler-body/50 text-[10px] text-gray-500 dark:text-tabler-muted uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3 font-medium">User</th>
                      <th className="px-5 py-3 font-medium">Action Log</th>
                      <th className="px-5 py-3 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-tabler-border">
                    {transactions.slice(0, 5).map(tx => (
                      <tr key={tx.transaction_id} className="hover:bg-gray-50 dark:hover:bg-tabler-border/30 transition-colors">
                        <td className="px-5 py-3 flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-tabler-primary/10 text-tabler-primary flex items-center justify-center text-[10px] font-bold">
                            {tx.student_id.substring(0,2)}
                          </div>
                          <span className="font-medium">{tx.student_id}</span>
                        </td>
                        <td className="px-5 py-3 text-gray-600 dark:text-tabler-muted">
                          {tx.status === 'Pending' ? `Requested Book ID: ${tx.item_id}` : tx.status === 'Returned' ? `Returned Book ID: ${tx.item_id}` : `Checked out Book ID: ${tx.item_id}`}
                        </td>
                        <td className="px-5 py-3 text-right text-gray-500 dark:text-tabler-muted font-mono text-xs">{tx.request_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-tabler-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-tabler-body/30">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Database className="w-5 h-5 text-gray-400 dark:text-tabler-muted" />
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
                <input type="text" placeholder="Search database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 pl-9 pr-3 py-1.5 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm outline-none focus:border-tabler-primary transition-colors" />
              </div>
            </div>
            <button onClick={() => { setEditingItem(null); setItemForm({name:'', inventory_code:'', category:'Computer Science', status:'Available', image: ''}); setIsItemModalOpen(true); }} className="px-4 py-1.5 bg-tabler-primary text-white rounded text-sm font-medium hover:bg-[#1d5fb3] flex items-center gap-1.5 shadow-sm transition-colors">
              <Plus className="w-4 h-4" /> Add Book
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-tabler-body/50 border-b border-gray-200 dark:border-tabler-border">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Book Subject</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-tabler-border">
                {filteredInventory.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-tabler-border/30 transition-colors">
                    <td className="px-5 py-3 flex items-center gap-4">
                      <img src={item.image} className="w-10 h-10 rounded object-cover border border-gray-200 dark:border-tabler-border" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-[10px] text-gray-500 dark:text-tabler-muted font-mono mt-0.5">{item.inventory_code}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{item.category}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.status === 'Available' ? 'bg-tabler-success' : item.status === 'Borrowed' ? 'bg-tabler-warning' : 'bg-tabler-danger'}`}></span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">{item.status}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex items-center bg-white dark:bg-tabler-body border border-gray-200 dark:border-tabler-border rounded overflow-hidden">
                        <button onClick={() => { setEditingItem(item); setItemForm(item); setIsItemModalOpen(true); }} className="px-3 py-1.5 text-gray-500 dark:text-tabler-muted hover:text-tabler-primary border-r border-gray-200 dark:border-tabler-border transition-colors"><Edit className="w-3.5 h-3.5"/></button>
                        <button onClick={() => deleteInventoryItem(item.id)} className="px-3 py-1.5 text-gray-500 dark:text-tabler-muted hover:text-tabler-danger transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-tabler-body/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-tabler-border flex justify-between items-center bg-gray-50 dark:bg-tabler-body/50">
              <h3 className="font-semibold text-sm">{editingItem ? 'Edit Book Data' : 'Provision New Book'}</h3>
              <button onClick={() => setIsItemModalOpen(false)} className="text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleItemSubmit}>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted mb-1.5 uppercase tracking-wide">Book Name</label>
                  <input required type="text" value={itemForm.name} onChange={(e) => setItemForm({...itemForm, name: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm focus:border-tabler-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted mb-1.5 uppercase tracking-wide">System Code</label>
                  <input required type="text" value={itemForm.inventory_code} onChange={(e) => setItemForm({...itemForm, inventory_code: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm uppercase focus:border-tabler-primary outline-none font-mono transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted mb-1.5 uppercase tracking-wide">Category</label>
                  <select value={itemForm.category} onChange={(e) => setItemForm({...itemForm, category: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm focus:border-tabler-primary outline-none transition-all">
                    <option>Computer Science</option>
                    <option>Academics</option>
                    <option>Mathematics</option>
                    <option>Fiction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted mb-1.5 uppercase tracking-wide">Image URL</label>
                  <input required type="url" value={itemForm.image} onChange={(e) => setItemForm({...itemForm, image: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm focus:border-tabler-primary outline-none transition-all" />
                </div>
                {editingItem && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted mb-1.5 uppercase tracking-wide">Status</label>
                    <select value={itemForm.status} onChange={(e) => setItemForm({...itemForm, status: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm focus:border-tabler-primary outline-none transition-all">
                      <option>Available</option><option>Maintenance</option><option>Damaged</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="px-5 py-4 bg-gray-50 dark:bg-tabler-body/50 border-t border-gray-200 dark:border-tabler-border flex justify-end gap-3">
                <button type="button" onClick={() => setIsItemModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-tabler-card border border-gray-300 dark:border-tabler-border rounded hover:bg-gray-50 dark:hover:bg-tabler-border/50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-tabler-primary rounded hover:bg-[#1d5fb3] transition-colors shadow-sm">Save Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}