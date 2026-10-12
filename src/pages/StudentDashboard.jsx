import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackageSearch, List, History, X, Search, Star, BookOpen, Clock, FileText, Bookmark } from 'lucide-react';

export default function StudentDashboard() {
  const { inventory, transactions, setTransactions, user, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('available');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Computer Science', 'Academics', 'Mathematics', 'Fiction'];

  // Top Rated Books for Auto-Scrolling Showcase
  const topBooks = inventory.filter(item => item.rating >= 4.7 && item.status === 'Available');

  const filteredItems = inventory.filter(item => {
    if (item.status !== 'Available') return false;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => b.rating - a.rating);

  const myTransactions = transactions.filter(tx => tx.student_id === user.id);
  const activeBorrowings = myTransactions.filter(tx => ['Pending', 'Borrowed'].includes(tx.status));
  const borrowingHistory = myTransactions.filter(tx => ['Returned', 'Cancelled'].includes(tx.status));

  const handleCreateRequest = () => {
    if (!termsAccepted) return;
    const newTxId = `TXN-${Math.floor(Math.random() * 10000)}`;
    setTransactions([{ transaction_id: newTxId, student_id: user.id, department: user.department || 'BSIT', item_id: selectedItem.id, status: 'Pending', request_date: new Date().toISOString().split('T')[0], processed_by: null }, ...transactions]);
    showToast('Borrow request submitted successfully! Awaiting SAO approval.');
    setSelectedItem(null);
    setTermsAccepted(false);
    setActiveTab('active');
  };

  const handleCancelRequest = (txId) => {
    setTransactions(transactions.map(tx => tx.transaction_id === txId ? { ...tx, status: 'Cancelled' } : tx));
    showToast('Request cancelled.');
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  return (
    <div className="space-y-8 pb-12 font-sans bg-gray-50 dark:bg-tabler-body text-gray-900 dark:text-gray-100 min-h-screen">
      
      <style>
        {`
          @keyframes scrollCarousel {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-carousel {
            animation: scrollCarousel 40s linear infinite;
          }
        `}
      </style>

      {/* Adapted Light/Dark Mode Auto-Scrolling Showcase */}
      <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-2xl overflow-hidden shadow-sm relative pt-8 pb-10">
        <div className="px-8 flex items-center gap-2 mb-6">
          <Bookmark className="w-5 h-5 text-tabler-primary fill-current" />
          <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Highly Recommended Materials</h2>
        </div>
        
        <div className="flex overflow-hidden group">
          <div className="flex space-x-6 px-4 animate-carousel group-hover:[animation-play-state:paused] w-max">
            {/* Double the list to create a seamless infinite loop */}
            {[...topBooks, ...topBooks, ...topBooks].map((book, idx) => (
              <div 
                key={`${book.id}-${idx}`} 
                onClick={() => setSelectedItem(book)}
                className="w-36 h-56 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative group/poster border border-gray-200 dark:border-tabler-border hover:border-tabler-primary/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <img src={book.image} alt={book.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/poster:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="text-white text-xs font-bold leading-tight mb-1">{book.name}</div>
                  <div className="flex items-center gap-1 text-tabler-warning text-[10px] font-bold"><Star className="w-3 h-3 fill-current" /> {book.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg p-8 shadow-sm relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-2 relative z-10">Welcome back, {firstName}!</h2>
        <p className="text-gray-500 dark:text-tabler-muted text-lg max-w-2xl relative z-10">Search our entire catalog to find the materials you need to succeed.</p>
        
        <div className="mt-8 relative max-w-xl z-10 flex gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-tabler-muted" />
            <input 
              type="text" 
              placeholder="Search for book titles, authors, or genres..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-tabler-body border border-gray-200 dark:border-tabler-border rounded-lg text-sm outline-none focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-tabler-card border border-gray-200 dark:border-tabler-border rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-tabler-border bg-gray-50 dark:bg-tabler-body/50">
          <button onClick={() => setActiveTab('available')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'available' ? 'border-tabler-primary text-tabler-primary bg-white dark:bg-tabler-card' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
            <PackageSearch className="w-4 h-4" /> Discover Books
          </button>
          <button onClick={() => setActiveTab('active')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'active' ? 'border-tabler-primary text-tabler-primary bg-white dark:bg-tabler-card' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
            <List className="w-4 h-4" /> Active Requests
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-tabler-primary text-tabler-primary bg-white dark:bg-tabler-card' : 'border-transparent text-gray-500 dark:text-tabler-muted hover:text-gray-900 dark:hover:text-white'}`}>
            <History className="w-4 h-4" /> Borrowing History
          </button>
        </div>

        {activeTab === 'available' && (
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${activeCategory === cat ? 'bg-tabler-primary border-tabler-primary text-white shadow-sm' : 'bg-white dark:bg-tabler-body border-gray-200 dark:border-tabler-border text-gray-600 dark:text-tabler-muted hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white dark:bg-tabler-body border border-gray-200 dark:border-tabler-border rounded-xl shadow-sm hover:shadow-md flex flex-col group overflow-hidden hover:-translate-y-1 hover:border-tabler-primary/50 transition-all duration-300 cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-tabler-card">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <div className="px-2.5 py-1 bg-white/95 dark:bg-tabler-card/90 backdrop-blur rounded text-[10px] font-black text-tabler-success uppercase tracking-wider shadow-sm border border-gray-100 dark:border-tabler-border flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-tabler-success animate-pulse"></span> Available
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 dark:bg-tabler-body/80 backdrop-blur border border-gray-200 dark:border-tabler-border rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-tabler-warning fill-current" /> {item.rating}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-[10px] text-tabler-primary uppercase tracking-widest font-bold bg-tabler-primary/10 w-max px-2 py-0.5 rounded mb-2">{item.category}</div>
                    <div className="text-base font-bold leading-tight">{item.name}</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-tabler-muted mt-1.5 mb-2">
                      {item.author && <span className="font-sans text-gray-600 dark:text-gray-400">By {item.author}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'active' || activeTab === 'history') && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-tabler-body/50 border-b border-gray-200 dark:border-tabler-border">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Book Information</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Txn ID</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Date Requested</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider">Status</th>
                  {activeTab === 'active' && <th className="px-6 py-4 font-semibold text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-tabler-border">
                {(activeTab === 'active' ? activeBorrowings : borrowingHistory).map(tx => {
                  const item = inventory.find(i => i.id === tx.item_id);
                  return (
                    <tr key={tx.transaction_id} className="hover:bg-gray-50 dark:hover:bg-tabler-border/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={item?.image} className="w-12 h-12 rounded object-cover border border-gray-200 dark:border-tabler-border shadow-sm" />
                        <div>
                          <div className="font-medium text-base">{item?.name}</div>
                          <div className="text-gray-500 dark:text-tabler-muted text-[10px] uppercase tracking-wider mt-0.5">{item?.category} • {item?.inventory_code}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-tabler-muted font-mono text-xs">{tx.transaction_id}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-tabler-muted">{tx.request_date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${tx.status === 'Pending' ? 'bg-tabler-warning/10 text-tabler-warning border-tabler-warning/20' : tx.status === 'Borrowed' ? 'bg-tabler-primary/10 text-tabler-primary border-tabler-primary/20' : tx.status === 'Returned' ? 'bg-tabler-success/10 text-tabler-success border-tabler-success/20' : 'bg-tabler-danger/10 text-tabler-danger border-tabler-danger/20'}`}>
                          {tx.status}
                        </span>
                      </td>
                      {activeTab === 'active' && (
                        <td className="px-6 py-4 text-right">
                          {tx.status === 'Pending' && (
                            <button onClick={() => handleCancelRequest(tx.transaction_id)} className="px-4 py-2 border border-red-200 dark:border-tabler-danger/30 rounded text-xs font-medium text-red-600 dark:text-tabler-danger hover:bg-red-50 dark:hover:bg-tabler-danger hover:text-red-700 dark:hover:text-white transition-colors shadow-sm">
                              Cancel Request
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(activeTab === 'active' ? activeBorrowings : borrowingHistory).length === 0 && <div className="p-8 text-center text-gray-500 dark:text-tabler-muted">No records found in this category.</div>}
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-tabler-card rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 border border-gray-200 dark:border-tabler-border">
            
            <div className="md:w-2/5 relative h-64 md:h-auto bg-gray-100 dark:bg-[#182433]">
              <img src={selectedItem.image} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white px-2 py-1 rounded text-xs font-mono">
                {selectedItem.inventory_code}
              </div>
            </div>
            
            <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-1 text-tabler-warning text-sm font-bold mb-1">
                    <Star className="w-4 h-4 fill-current" /> {selectedItem.rating} <span className="text-gray-500 dark:text-tabler-muted font-normal text-xs ml-1">({selectedItem.reviews} Reviews)</span>
                  </div>
                  <h3 className="font-bold text-2xl md:text-3xl leading-tight text-gray-900 dark:text-white">{selectedItem.name}</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-tabler-body rounded-full p-1.5 transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2 mb-6">
                <span className="px-2.5 py-1 bg-tabler-primary/10 text-tabler-primary text-[10px] font-bold rounded uppercase tracking-wider border border-tabler-primary/20">{selectedItem.category}</span>
                {selectedItem.author && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-tabler-body border border-gray-200 dark:border-tabler-border text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3 h-3"/> By {selectedItem.author}
                  </span>
                )}
                {selectedItem.pages && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-tabler-body border border-gray-200 dark:border-tabler-border text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                    <FileText className="w-3 h-3"/> {selectedItem.pages} Pages
                  </span>
                )}
                {selectedItem.year && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-tabler-body border border-gray-200 dark:border-tabler-border text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3"/> Est. {selectedItem.year}
                  </span>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-tabler-body p-4 rounded-lg border border-gray-200 dark:border-tabler-border mb-6">
                <h4 className="text-xs font-bold text-gray-500 dark:text-tabler-muted uppercase tracking-wider mb-2">Librarian's Note</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{selectedItem.description}"
                </p>
              </div>
              
              <label className="flex items-start gap-3 cursor-pointer group p-4 border border-gray-200 dark:border-tabler-border rounded-lg hover:border-tabler-primary/50 bg-gray-50 dark:bg-tabler-body/50 transition-colors mb-5 mt-auto">
                <input type="checkbox" className="mt-0.5 rounded border-gray-300 dark:border-tabler-border bg-white dark:bg-tabler-card text-tabler-primary focus:ring-tabler-primary w-4 h-4 cursor-pointer" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <span className="text-sm text-gray-600 dark:text-tabler-muted group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors leading-relaxed">
                  I accept full responsibility for this book and agree to return it in its original condition.
                </span>
              </label>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-tabler-border">
                <button onClick={() => setSelectedItem(null)} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-tabler-card border border-gray-300 dark:border-tabler-border rounded hover:bg-gray-50 dark:hover:bg-tabler-border/50 transition-colors">Cancel</button>
                <button onClick={handleCreateRequest} disabled={!termsAccepted} className="px-6 py-2.5 text-sm font-bold text-white bg-tabler-primary rounded hover:bg-[#1d5fb3] disabled:opacity-50 transition-all shadow-sm flex items-center gap-2">
                  <Bookmark className="w-4 h-4" /> Borrow Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}