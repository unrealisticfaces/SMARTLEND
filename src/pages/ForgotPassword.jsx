import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Package, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    showToast('Password reset link sent to your email.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Package className="w-10 h-10 text-tabler-primary mb-2" />
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Forgot password</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and your password will be reset and emailed to you.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleReset}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
              <input type="email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-tabler-primary focus:border-tabler-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <button type="submit" className="w-full bg-tabler-primary text-white py-2 rounded-md hover:bg-blue-700 font-medium transition-colors">
              Send me new password
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="flex items-center justify-center gap-1 font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <ArrowLeft className="w-4 h-4" /> Send me back to the sign in screen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}