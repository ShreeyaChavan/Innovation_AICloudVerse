import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import BackgroundLayout from './BackgroundLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const { login, completeNewPassword, pendingUserEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/winners';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else if (result.requiresNewPassword) {
      // Show password reset form
      setIsResetting(true);
      setError('');
    } else {
      setError(result.message || 'Login failed');
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await completeNewPassword(newPassword);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  // If resetting password, show the new password form
  if (isResetting) {
    return (
      <div className="min-h-screen text-white">
        <BackgroundLayout />
        <Header />
        <div className="relative z-10 pt-32 pb-20 px-4 max-w-md mx-auto">
          <motion.div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8">
            <h1 className="text-2xl font-bold text-center text-purple-300 mb-4">Set New Password</h1>
            <p className="text-sm text-center text-gray-400 mb-6">
              User {pendingUserEmail || email} requires a new password.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-purple-300 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => setError(e.target.value !== newPassword ? 'Passwords do not match' : '')}
                  className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2"
                  required
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-xl font-bold"
              >
                {loading ? 'Setting password...' : 'Set Password & Login'}
              </button>
            </form>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Normal login form
  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-md mx-auto">
        <motion.div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Coordinator Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-xs text-center mt-4 text-purple-300">
            Use your AWS Cognito credentials
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
