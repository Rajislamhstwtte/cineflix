import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const getFriendlyErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please try again.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists.';
        case 'auth/weak-password':
            return 'Password is too weak. It should be at least 6 characters.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        default:
            return 'An unexpected error occurred. Please try again later.';
    }
};

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
        className="min-h-screen flex items-center justify-center bg-brand-black pt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-70472229999e/51b2725e-cf22-4573-8b7f-b4a11f7c225a/US-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative bg-black/80 p-8 sm:p-12 rounded-lg shadow-lg w-full max-w-md border border-gray-800 z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="text-brand-red text-sm text-center bg-red-900/30 p-2 rounded-md">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red text-white font-bold py-3 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-900/50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-8">
          {isLogin ? "New to CineFlix?" : "Already have an account?"}
          <button
            onClick={() => {
                setIsLogin(!isLogin);
                setError('');
            }}
            className="text-white font-semibold ml-2 hover:underline"
          >
            {isLogin ? 'Sign up now.' : 'Sign in now.'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;