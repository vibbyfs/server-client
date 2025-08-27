import React from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = React.useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/rooms');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Semua field harus diisi');
      return;
    }
    if (!termsAccepted) {
      setError('Anda harus menyetujui Terms of Service dan Privacy Policy');
      return;
    }
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-luxury-black mb-2">
            Join ArisanKu
          </h1>
          <p className="text-luxury-gray font-inter">Begin your premium digital lottery experience</p>
        </div>

        {/* Form */}
        <div className="card-luxury animate-fadeInUp p-8" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-8">
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

            {/* Name Field */}
            <div className="space-y-3">
              <label htmlFor="name" className="block text-sm font-medium text-luxury-black font-inter">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <p className="text-xs text-luxury-gray font-inter">This will be displayed on your profile</p>
            </div>

            {/* Email Field */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-medium text-luxury-black font-inter">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <p className="text-xs text-luxury-gray font-inter">Use an active email for verification</p>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-medium text-luxury-black font-inter">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className="input-luxury pr-14 w-full"
                  placeholder="Create a password"
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
              <p className="text-xs text-luxury-gray font-inter">Minimum 6 characters, use letters and numbers</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-3">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-luxury-black font-inter">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="input-luxury pr-14 w-full"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
                >
                  {showConfirmPassword ? (
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
              <p className="text-xs text-luxury-gray font-inter">Make sure it matches the password above</p>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-3 mt-6">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 text-gold-500 bg-gray-100 border-gray-300 rounded focus:ring-gold-500 focus:ring-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600 font-inter leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-gold-600 hover:text-gold-700 font-medium underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-gold-600 hover:text-gold-700 font-medium underline">
                  Privacy Policy
                </Link>
              </label>
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
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-luxury-gold/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-luxury-white text-luxury-gray font-inter">or</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-luxury-gray font-inter">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-luxury-gold hover:text-luxury-gold/80 font-medium transition-colors"
                >
                  Sign in now
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Benefits Preview */}
        <div className="mt-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="card-luxury p-4">
            <h3 className="text-sm font-medium text-luxury-black mb-3 text-center font-inter">
              Join ArisanKu and enjoy:
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-luxury-gray">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">Fair lottery system</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">Bank-grade security</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">Easy management</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-luxury-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-inter">24/7 concierge support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
