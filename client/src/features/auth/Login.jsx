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
    <div className="min-h-screen bg-gradient-to-b from-luxury-white to-luxury-gray/10 flex items-center justify-center px-4 py-12 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-black/5 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-luxury-gray hover:text-luxury-gold mb-8 transition-colors group font-inter"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="w-16 h-16 bg-gradient-luxury rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-luxury">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-luxury-black mb-2">
            Welcome Back
          </h1>
          <p className="text-luxury-gray font-inter">Access your ArisanKu account</p>
        </div>

        {/* Form */}
        <div className="card-luxury animate-fadeInUp p-8" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fadeInUp">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 text-sm font-inter">{error}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-luxury-black font-inter">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-luxury w-full"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <p className="text-xs text-luxury-gray font-inter">Use your registered email address</p>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-medium text-luxury-black font-inter">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-luxury pr-14 w-full"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-luxury-gray hover:text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-luxury-gray hover:text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-luxury-gray font-inter">Minimum 6 characters</p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-luxury-gold border-luxury-gray rounded focus:ring-luxury-gold focus:ring-2" />
                <span className="ml-2 text-sm text-luxury-gray font-inter">Remember me</span>
              </label>
              <a href="#" className="text-sm text-luxury-gold hover:text-luxury-gold/80 transition-colors font-inter">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-luxury-primary text-lg py-4 font-inter mt-8 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in to ArisanKu'
              )}
            </button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-luxury-gold/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-luxury-white text-luxury-gray font-inter">or</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-luxury-gray font-inter">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-luxury-gold hover:text-luxury-gold/80 font-medium transition-colors"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="card-luxury p-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-luxury-gray font-inter">
              <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure connection with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
