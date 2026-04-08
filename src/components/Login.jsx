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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    } else {
      setError(result.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundLayout />
      <Header />
      <div className="relative z-10 pt-32 pb-20 px-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8"
        >
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
                className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-purple-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-purple-500/50 rounded-lg p-2 text-white"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 py-3 rounded-xl font-bold hover:scale-105 transition disabled:opacity-50"
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
