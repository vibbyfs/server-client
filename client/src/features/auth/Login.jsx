import React from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate, Link } from 'react-router';

export default function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/rooms');
    }
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    setError(''); 
    setLoading(true);
    try {
      await login(email, password);
      navigate('/rooms');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
          <div className="max-w-lg">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-2xl font-bold">ArisanKu</span>
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Selamat Datang Kembali di
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Platform Arisan Cerdas
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Akses dashboard Anda dan kelola komunitas arisan dengan teknologi AI terdepan
            </p>

            {/* Features Highlights */}
            <div className="space-y-4">
              {[
                { icon: '🤖', text: 'AI Assistant siap membantu 24/7' },
                { icon: '📊', text: 'Analytics mendalam untuk optimasi finansial' },
                { icon: '🔒', text: 'Keamanan tingkat bank dengan enkripsi end-to-end' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">1000+</div>
                <div className="text-sm text-blue-200">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-sm text-blue-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-blue-200">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Back to Home - Mobile */}
            <Link 
              to="/" 
              className="lg:hidden inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            {/* Mobile Brand */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">ArisanKu</span>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome Back! 👋
                </h2>
                <p className="text-blue-100">Sign in to continue your arisan journey</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    📧 Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    🔒 Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-white/70">
                    <input type="checkbox" className="w-4 h-4 text-yellow-400 bg-white/10 border-white/20 rounded focus:ring-yellow-400 focus:ring-2" />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform ${
                    loading 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:shadow-2xl hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      🚀 Sign in to ArisanKu
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-white/50">or</span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-white/70">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                    >
                      Sign up now 🎯
                    </Link>
                  </p>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-2 text-sm text-white/50">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>🔒 Secure SSL Connection</span>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="text-center mt-8">
              <Link 
                to="/" 
                className="hidden lg:inline-flex items-center text-white/50 hover:text-white transition-colors group text-sm"
              >
                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
