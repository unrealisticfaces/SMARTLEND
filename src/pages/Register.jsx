import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Library } from 'lucide-react';

export default function Register() {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    showToast('Account creation request submitted.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="bg-gradient-to-br from-tabler-primary to-[#8b5cf6] text-white p-2 rounded-lg shadow-md mb-4">
          <Library className="w-8 h-8" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create new account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-tabler-primary focus:border-tabler-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Identification Number (ID#)</label>
              <input type="text" placeholder="e.g. BSIT-12345" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-tabler-primary focus:border-tabler-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white uppercase" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
              <input type="email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-tabler-primary focus:border-tabler-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input type="password" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-tabler-primary focus:border-tabler-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-tabler-primary focus:ring-tabler-primary" />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Agree to the <Link to="#" className="text-tabler-primary hover:underline">terms and policy</Link>.
              </label>
            </div>
            <button type="submit" className="w-full bg-tabler-primary text-white py-2 rounded-md hover:bg-blue-700 font-medium transition-colors">
              Create new account
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account? <Link to="/login" className="font-medium text-tabler-primary hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}