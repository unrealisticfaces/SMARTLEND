import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ArrowRightLeft, X, Activity, ClipboardCheck, ArrowUpRight } from 'lucide-react';

export default function SaoDashboard() {
  const { transactions, setTransactions, inventory, setInventory, showToast, user } = useApp();
  const [activeTab, setActiveTab] = useState('console'); // Menu Tabs State
  
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approveTx, setApproveTx] = useState(null);

  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnTx, setReturnTx] = useState(null);
  const [returnCondition, setReturnCondition] = useState('Available');
  
  const pendingRequests = transactions.filter(tx => tx.status === 'Pending');
  const activeBorrowings = transactions.filter(tx => tx.status === 'Borrowed');

  const openApproveModal = (tx) => {
    setApproveTx(tx);
    setApproveModalOpen(true);
  };

  const handleApprove = () => {
    setTransactions(transactions.map(tx => tx.transaction_id === approveTx.transaction_id ? { ...tx, status: 'Borrowed', processed_by: user.id } : tx));
    setInventory(inventory.map(item => item.id === approveTx.item_id ? { ...item, status: 'Borrowed' } : item));
    showToast('Transaction approved and logged.');
    setApproveModalOpen(false);
  };

  const openReturnModal = (tx) => {
    setReturnTx(tx);
    setReturnCondition('Available');
    setReturnModalOpen(true);
  };

  const handleProcessReturn = () => {
    setTransactions(transactions.map(tx => tx.transaction_id === returnTx.transaction_id ? { ...tx, status: 'Returned', processed_by: user.id } : tx));
    setInventory(inventory.map(item => item.id === returnTx.item_id ? { ...item, status: returnCondition } : item));
    showToast(`Asset successfully logged as ${returnCondition}.`);
    setReturnModalOpen(false);
  };

  const last30Days = useMemo(() => {
    return Array.from({length: 30}, (_, i) => {
      const dateStr = `2026-09-${String(i + 1).padStart(2, '0')}`;
      const dayTxs = transactions.filter(tx => tx.request_date === dateStr);
      return {
        day: i + 1,
        processed: dayTxs.filter(tx => tx.processed_by !== null).length,
        pending: dayTxs.filter(tx => tx.status === 'Pending').length
      };
    });
  }, [transactions]);
  
  const maxTraffic = Math.max(...last30Days.map(d => d.processed + d.pending), 5);

  return (
    <div className="space-y-6 pb-12 font-sans text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SAO Operations Desk</h2>
          <p className="text-sm text-gray-500 dark:text-tabler-muted mt-1">Review pending requests and manage book conditions on return.</p>
        </div>
      </div>

      {/* Tabbed Menu Navigation */}
      <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm flex overflow-x-auto">
        <button onClick={() => setActiveTab('console')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'console' ? 'border-tabler-primary text-tabler-primary bg-gray-50 dark:bg-tabler-body/50' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
          <Activity className="w-4 h-4" /> Traffic Console
        </button>
        <button onClick={() => setActiveTab('approvals')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'approvals' ? 'border-tabler-primary text-tabler-primary bg-gray-50 dark:bg-tabler-body/50' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
          <ClipboardCheck className="w-4 h-4" /> Approvals <span className="bg-tabler-warning/10 text-tabler-warning px-1.5 rounded-full text-[10px] ml-1">{pendingRequests.length}</span>
        </button>
        <button onClick={() => setActiveTab('returns')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'returns' ? 'border-tabler-primary text-tabler-primary bg-gray-50 dark:bg-tabler-body/50' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
          <ArrowUpRight className="w-4 h-4" /> Field Books
        </button>
      </div>

      {/* View 1: Console / Chart */}
      {activeTab === 'console' && (
        <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm p-6 flex flex-col h-96 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-sm">30-Day Processing Volume</h3>
            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 dark:text-tabler-muted uppercase">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-tabler-warning"></div> Pending</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-tabler-primary"></div> Processed</span>
            </div>
          </div>
          <div className="relative flex-1 w-full mt-2">
            {[0, 25, 50, 75, 100].map(pct => (
              <div key={pct} className="absolute w-full flex items-center z-0" style={{ bottom: `${pct}%` }}>
                <div className="text-[10px] text-gray-400 dark:text-tabler-muted w-6">{Math.round((pct/100)*maxTraffic)}</div>
                <div className="flex-1 border-b border-gray-100 dark:border-tabler-border border-dashed"></div>
              </div>
            ))}
            <div className="absolute inset-0 left-6 flex items-end justify-between px-2 pb-0 pt-4 z-10">
              {last30Days.map((day, i) => (
                <div key={i} className="flex flex-col-reverse w-2 sm:w-4 h-full justify-start group relative cursor-pointer mx-auto">
                  <div className="w-full bg-tabler-primary rounded-t-sm transition-all duration-500" style={{ height: `${(day.processed/maxTraffic)*100}%` }}></div>
                  <div className="w-full bg-tabler-warning transition-all duration-500" style={{ height: `${(day.pending/maxTraffic)*100}%` }}></div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-medium shadow-lg pointer-events-none">
                    Sept {day.day}: {day.processed} Prc, {day.pending} Pnd
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 dark:text-tabler-muted ml-6 mt-3 font-medium uppercase tracking-wider">
            <span>01 Sep</span><span>15 Sep</span><span>30 Sep</span>
          </div>
        </div>
      )}

      {/* View 2: Approvals Table */}
      {activeTab === 'approvals' && (
        <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[400px] animate-in fade-in duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-tabler-border bg-gray-50 dark:bg-tabler-body/50 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Action Required: Pending Approvals</h3>
            <span className="bg-tabler-warning/10 text-tabler-warning px-2 py-0.5 rounded text-xs font-bold">{pendingRequests.length} pending</span>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-gray-200 dark:border-tabler-border bg-gray-50 dark:bg-tabler-card">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Book Subject</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Student ID</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-tabler-border">
                {pendingRequests.map(tx => {
                  const item = inventory.find(i => i.id === tx.item_id);
                  return (
                    <tr key={tx.transaction_id} className="hover:bg-gray-50 dark:hover:bg-tabler-border/30 transition-colors">
                      <td className="px-5 py-3 flex items-center gap-3">
                         <img src={item?.image} className="w-8 h-8 rounded object-cover border border-gray-200 dark:border-tabler-border" />
                         <div>
                           <div className="font-medium">{item?.name}</div>
                           <div className="text-[10px] text-gray-500 dark:text-tabler-muted mt-0.5 font-mono">{tx.transaction_id}</div>
                         </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600 dark:text-tabler-muted font-mono text-xs">{tx.student_id}</td>
                      <td className="px-5 py-3 text-right">
                        <button onClick={() => openApproveModal(tx)} className="px-3 py-1.5 bg-tabler-success text-white hover:bg-green-600 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ml-auto shadow-sm">
                          <Check className="w-3 h-3" /> Approve
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {pendingRequests.length === 0 && <div className="p-8 text-center text-sm text-gray-500 dark:text-tabler-muted">No pending records found.</div>}
          </div>
        </div>
      )}

      {/* View 3: Active Returns */}
      {activeTab === 'returns' && (
        <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-tabler-border bg-gray-50 dark:bg-tabler-body/50">
            <h3 className="font-semibold text-sm">Active Borrowings (Pending Return)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-gray-200 dark:border-tabler-border bg-gray-50 dark:bg-tabler-body/50">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Book Subject</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Student Data</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Date Borrowed</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-tabler-border">
                {activeBorrowings.map(tx => {
                  const item = inventory.find(i => i.id === tx.item_id);
                  return (
                    <tr key={tx.transaction_id} className="hover:bg-gray-50 dark:hover:bg-tabler-border/30 transition-colors">
                      <td className="px-5 py-3 flex items-center gap-4">
                        <img src={item?.image} className="w-10 h-10 rounded object-cover border border-gray-200 dark:border-tabler-border shadow-sm" />
                        <div>
                          <div className="font-medium">{item?.name}</div>
                          <div className="text-[10px] text-gray-500 dark:text-tabler-muted font-mono mt-0.5">{item?.inventory_code}</div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-mono text-xs text-gray-600 dark:text-gray-300">{tx.student_id}</div>
                        <div className="text-[10px] text-tabler-primary font-bold mt-0.5">{tx.department}</div>
                      </td>
                      <td className="px-5 py-3 text-gray-500 dark:text-tabler-muted">{tx.request_date}</td>
                      <td className="px-5 py-3 text-right">
                        <button onClick={() => openReturnModal(tx)} className="px-3 py-1.5 bg-tabler-primary/10 text-tabler-primary hover:bg-tabler-primary hover:text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ml-auto border border-tabler-primary/20 hover:border-tabler-primary">
                          <ArrowRightLeft className="w-3 h-3" /> Process Return
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {activeBorrowings.length === 0 && <div className="p-8 text-center text-sm text-gray-500 dark:text-tabler-muted">No active books in the field.</div>}
          </div>
        </div>
      )}

      {/* SAO Approve Confirmation Modal */}
      {approveModalOpen && approveTx && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-tabler-body/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-tabler-border flex justify-between items-center bg-gray-50 dark:bg-tabler-body/50">
              <h3 className="font-semibold text-sm">Confirm Approval</h3>
              <button onClick={() => setApproveModalOpen(false)} className="text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 dark:text-tabler-muted mb-4">You are approving a borrowing request for:</p>
              <div className="bg-gray-50 dark:bg-tabler-body p-4 rounded-lg border border-gray-200 dark:border-tabler-border text-sm">
                <div className="flex justify-between border-b border-gray-200 dark:border-tabler-border pb-2 mb-2">
                  <span className="text-gray-500 dark:text-tabler-muted">Student ID:</span>
                  <span className="font-mono font-medium">{approveTx.student_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-tabler-muted">Book:</span>
                  <span className="font-medium text-right">{inventory.find(i => i.id === approveTx.item_id)?.name}</span>
                </div>
              </div>
            </div>
            <div className="px-5 py-4 bg-gray-50 dark:bg-tabler-body/50 border-t border-gray-200 dark:border-tabler-border flex justify-end gap-3">
              <button onClick={() => setApproveModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-tabler-card border border-gray-300 dark:border-tabler-border rounded hover:bg-gray-50 dark:hover:bg-tabler-border/50 transition-colors">Cancel</button>
              <button onClick={handleApprove} className="px-4 py-2 text-sm font-medium text-white bg-tabler-success rounded hover:bg-green-600 transition-colors shadow-sm">Accept Request</button>
            </div>
          </div>
        </div>
      )}

      {/* Process Return Modal */}
      {returnModalOpen && returnTx && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-tabler-body/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-tabler-border flex justify-between items-center bg-gray-50 dark:bg-tabler-body/50">
              <h3 className="font-semibold text-sm">Log Return Condition</h3>
              <button onClick={() => setReturnModalOpen(false)} className="text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <label className="block text-xs font-bold text-gray-500 dark:text-tabler-muted mb-2 uppercase tracking-wide">Inspect Physical Condition</label>
              <select value={returnCondition} onChange={(e) => setReturnCondition(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-tabler-body border border-gray-300 dark:border-tabler-border rounded text-sm focus:border-tabler-primary outline-none transition-colors">
                <option value="Available">Good / Available</option>
                <option value="Damaged">Damaged (Requires Action)</option>
                <option value="Maintenance">Under Maintenance / Repair</option>
              </select>
            </div>
            <div className="px-5 py-4 bg-gray-50 dark:bg-tabler-body/50 border-t border-gray-200 dark:border-tabler-border flex justify-end gap-3">
              <button onClick={() => setReturnModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-tabler-card border border-gray-300 dark:border-tabler-border rounded hover:bg-gray-50 dark:hover:bg-tabler-border/50 transition-colors">Cancel</button>
              <button onClick={handleProcessReturn} className="px-4 py-2 text-sm font-medium text-white bg-tabler-primary rounded hover:bg-[#1d5fb3] transition-colors shadow-sm">Confirm Return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}