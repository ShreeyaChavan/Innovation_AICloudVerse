import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BackgroundLayout from './BackgroundLayout';

const LoginPage = () => {
  const [role, setRole] = useState('user'); // 'user' or 'coordinator'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (role === 'user') {
      // Simple demo login – any non‑empty credentials work
      if (username.trim() && password.trim()) {
        localStorage.setItem('crisisUser', username);
        navigate('/app');
      } else {
        setError('Please enter username and password');
      }
      setLoading(false);
    } else {
      // Coordinator login – use Cognito
      const result = await login(username, password);
      if (result.success) {
        navigate('/winners');
      } else {
        setError(result.message || 'Login failed');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 max-w-md w-full"
        >
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
            CrisisConnect
          </h1>

          {/* Role Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 py-2 rounded-xl font-semibold transition ${
                role === 'user'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole('coordinator')}
              className={`flex-1 py-2 rounded-xl font-semibold transition ${
                role === 'coordinator'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Coordinator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-300 mb-1">
                {role === 'user' ? 'Username' : 'Coordinator ID (UUID/Email)'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              className={`w-full py-3 rounded-xl font-bold transition hover:scale-105 ${
                role === 'user'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600'
                  : 'bg-gradient-to-r from-purple-600 to-cyan-600'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-xs text-center mt-4 text-purple-300">
            {role === 'user'
              ? 'Demo: any username/password works'
              : 'Use your AWS Cognito credentials'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
