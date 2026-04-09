import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BackgroundLayout from './BackgroundLayout';
import { Eye, EyeOff, User, Key, ShieldCheck, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
  
  const { login, completeNewPassword, userEmail } = useAuth();
  const navigate = useNavigate();

  // Clear form fields on mount and check existing session
  useEffect(() => {
    setUsername('');
    setPassword('');
    setError('');
    
    // If already logged in as coordinator, redirect to winners
    if (userEmail) {
      navigate('/winners');
    }
    // If demo user is logged in, redirect to home
    const demoUser = localStorage.getItem('crisisUser');
    if (demoUser && !userEmail) {
      navigate('/home');
    }
  }, [userEmail, navigate]);

  const handleUserLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return false;
    }
    localStorage.setItem('crisisUser', username);
    window.dispatchEvent(new Event('storage'));
    return true;
  };

  const handleCoordinatorLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter Coordinator ID and password');
      return false;
    }
    
    const result = await login(username, password);
    
    if (result.success) {
      return true;
    } else if (result.requiresNewPassword) {
      setIsNewPasswordRequired(true);
      setError('');
      return false;
    } else {
      setError(result.message || 'Login failed. Check your credentials.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success = false;
      if (role === 'user') {
        success = await handleUserLogin();
        if (success) navigate('/home');
      } else {
        success = await handleCoordinatorLogin();
        if (success) navigate('/winners');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    const result = await completeNewPassword(newPassword);
    setLoading(false);
    
    if (result.success) {
      navigate('/winners');
    } else {
      setError(result.message || 'Failed to set new password');
    }
  };

  const cancelNewPassword = () => {
    setIsNewPasswordRequired(false);
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
  };

  if (isNewPasswordRequired) {
    return (
      <div className="min-h-screen text-white">
        <BackgroundLayout />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Set New Password
              </h2>
              <p className="text-purple-300 text-sm mt-2">
                Account requires a password change
              </p>
            </div>

            <form onSubmit={handleNewPasswordSubmit} className="space-y-5">
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="off"
                    className="w-full bg-black/50 border border-purple-500/50 rounded-xl p-3 pr-10 focus:outline-none focus:border-purple-400 transition"
                    placeholder="Enter new password"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  autoComplete="off"
                  className="w-full bg-black/50 border border-purple-500/50 rounded-xl p-3 focus:outline-none focus:border-purple-400 transition"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm bg-red-950/30 p-2 rounded-lg"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-xl font-bold text-white transition hover:scale-105 disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  'Set Password & Login'
                )}
              </button>

              <button
                type="button"
                onClick={cancelNewPassword}
                className="w-full text-purple-400 text-sm hover:text-purple-300 transition"
              >
                ← Back to login
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 sm:p-8 max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 mb-4"
            >
              <ShieldCheck className="w-10 h-10 text-purple-400" />
            </motion.div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
             Anudaan
            </h1>
            <p className="text-purple-300 text-sm mt-2">Organ Donation Platform</p>
          </div>

          <div className="flex gap-3 mb-8 bg-black/30 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setRole('user');
                setError('');
                setUsername('');
                setPassword('');
              }}
              className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                role === 'user'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User size={18} />
                <span>User</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('coordinator');
                setError('');
                setUsername('');
                setPassword('');
              }}
              className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                role === 'coordinator'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={18} />
                <span>Coordinator</span>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  {role === 'user' ? 'Username' : 'Coordinator ID (UUID)'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    className="w-full bg-black/50 border border-purple-500/50 rounded-xl p-3 pl-10 focus:outline-none focus:border-purple-400 transition"
                    placeholder={role === 'user' ? 'Enter your username' : 'Enter your Cognito username/UUID'}
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  className="w-full bg-black/50 border border-purple-500/50 rounded-xl p-3 pl-10 pr-10 focus:outline-none focus:border-purple-400 transition"
                  placeholder="Enter your password"
                  required
                />
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-950/30 p-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-xl font-bold text-white transition hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-purple-300/70 space-y-1">
            {role === 'user' ? (
              <p>Demo: Any username/password works • Access the main website</p>
            ) : (
              <p>Use your AWS Cognito credentials • Secure access for coordinators</p>
            )}
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
