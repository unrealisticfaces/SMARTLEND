import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Check } from 'lucide-react';

export default function Login() {
  const { login, showToast, isLoading } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickedItems, setClickedItems] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate(`/${user.role}`);
      showToast(`Welcome back to SmartLend, ${user.name.split(' ')[0]}!`);
    } catch (err) {
      showToast('Authentication failed. Check credentials.', 'error');
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleIconClick = (id) => {
    setClickedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setClickedItems(prev => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const floatingBooks = [
    { id: 1, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80', left: '10%', duration: '15s', delay: '0s' },
    { id: 2, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80', left: '35%', duration: '22s', delay: '2s' },
    { id: 3, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80', left: '55%', duration: '18s', delay: '6s' },
    { id: 4, image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=400&q=80', left: '75%', duration: '25s', delay: '1s' },
    { id: 5, image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=400&q=80', left: '85%', duration: '16s', delay: '8s' },
    { id: 6, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', left: '20%', duration: '20s', delay: '11s' },
    { id: 7, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80', left: '65%', duration: '14s', delay: '4s' },
    { id: 8, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80', left: '45%', duration: '21s', delay: '14s' },
  ];

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#182433] font-sans transition-colors duration-200">
      
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 z-20 bg-white dark:bg-[#182433] shadow-[10px_0_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-[380px] w-full mx-auto">
          
          <div className="flex items-center gap-4 mb-10">
            <img 
              src="https://uc.edu.ph/wp-content/uploads/2026/06/uc-logo-scaled-1-scaled.webp" 
              alt="UC Logo" 
              className="h-14 w-auto object-contain"
            />
            <div className="h-10 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-tabler-primary to-[#8b5cf6] tracking-tight leading-none">
                SmartLend
              </span>
              <span className="text-[10px] font-bold text-gray-500 dark:text-tabler-muted tracking-widest uppercase mt-1">
                Student & SAO Portal
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">Login to your account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="student@uc.edu.ph"
                className="w-full px-3 py-2 bg-white dark:bg-[#1f2d3d] border border-gray-300 dark:border-[#2f3e4e] rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:text-tabler-muted transition-colors" 
                required disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Your password"
                className="w-full px-3 py-2 bg-white dark:bg-[#1f2d3d] border border-gray-300 dark:border-[#2f3e4e] rounded-md text-sm focus:border-tabler-primary focus:ring-1 focus:ring-tabler-primary outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:text-tabler-muted transition-colors" 
                required disabled={isLoading}
              />
            </div>
            
            <label className="flex items-center gap-2 mt-5 cursor-pointer w-max group">
              <input type="checkbox" className="rounded border-gray-300 dark:border-[#2f3e4e] bg-white dark:bg-[#1f2d3d] text-tabler-primary focus:ring-tabler-primary focus:ring-offset-0 cursor-pointer" />
              <span className="text-sm text-gray-600 dark:text-tabler-muted group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">Remember me on this device</span>
            </label>

            <button type="submit" disabled={isLoading} className="w-full mt-6 bg-tabler-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#1d5fb3] disabled:opacity-70 transition-colors shadow-sm">
              {isLoading ? 'Authenticating...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-tabler-muted">
            Don't have an account yet? <Link to="/register" className="text-tabler-primary hover:underline font-medium">Request access</Link>
          </div>
        </div>
      </div>

      {/* RIGHT HALF: Interactive Book Playground */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#0b1320] overflow-hidden" onMouseMove={handleMouseMove}>
        <style>
          {`
            .bg-tech-grid {
              background-size: 40px 40px;
              background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            }
            @keyframes floatUp {
              0% { bottom: -25%; transform: rotate(-5deg) translateX(0px); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { bottom: 115%; transform: rotate(15deg) translateX(30px); opacity: 0; }
            }
          `}
        </style>
        <div className="absolute inset-0 bg-tech-grid z-0"></div>
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(32,107,196,0.15), transparent 40%)` }}
        ></div>

        {floatingBooks.map((book) => (
          <div
            key={book.id}
            className="absolute z-10 animate-[floatUp_linear_infinite]"
            style={{ left: book.left, bottom: '-25%', animationDuration: book.duration, animationDelay: book.delay }}
          >
            <div className="relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-tabler-primary text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none z-20 flex items-center gap-1">
                Click me!
              </div>
              <div
                onClick={() => handleIconClick(book.id)}
                className={`cursor-pointer transition-all duration-500 ease-out flex items-center justify-center rounded-lg shadow-2xl hover:scale-110 hover:-translate-y-2 ${
                  clickedItems[book.id] ? 'scale-[1.2] rotate-[360deg] bg-tabler-success w-20 h-28 border-2 border-white/20' : 'w-20 h-28'
                }`}
              >
                 {clickedItems[book.id] ? (
                   <Check className="w-10 h-10 text-white drop-shadow-md" strokeWidth={3} />
                 ) : (
                   <img src={book.image} className="w-full h-full object-cover rounded-lg border border-white/10 shadow-lg" alt="Floating book cover" />
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}