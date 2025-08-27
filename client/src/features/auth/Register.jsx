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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding & Benefits */}
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
              Bergabunglah dengan
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Revolusi Arisan Digital
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Jadilah bagian dari komunitas finansial cerdas dengan teknologi AI yang mengoptimalkan pengalaman arisan Anda
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {[
                { icon: '🚀', title: 'Gratis Selamanya', desc: 'Tidak ada biaya tersembunyi atau langganan premium' },
                { icon: '🤖', title: 'AI Assistant Personal', desc: 'Bot cerdas yang membantu optimasi finansial 24/7' },
                { icon: '📊', title: 'Analytics Mendalam', desc: 'Dashboard lengkap untuk tracking performa investasi' },
                { icon: '🔒', title: 'Keamanan Bank-Level', desc: 'Enkripsi end-to-end untuk melindungi data Anda' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {['👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🏫'].map((avatar, i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold border-2 border-white">
                      {avatar}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-yellow-400 font-bold">1000+ Pengguna Aktif</div>
                  <div className="text-blue-200 text-sm">sudah bergabung bulan ini</div>
                </div>
              </div>
              <div className="text-sm text-blue-100">
                "Platform arisan terbaik yang pernah saya gunakan. AI assistantnya sangat membantu!" - Sarah W.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
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
                  Daftar Sekarang! 🎯
                </h2>
                <p className="text-blue-100">Mulai perjalanan arisan cerdas Anda</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    👤 Nama Lengkap
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    📧 Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    🔒 Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                      placeholder="Minimal 6 karakter"
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-white font-medium text-sm">
                    🔐 Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300"
                      placeholder="Ulangi password Anda"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
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

                {/* Terms & Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-5 h-5 text-yellow-400 bg-white/10 border-white/20 rounded focus:ring-yellow-400 focus:ring-2 mt-1"
                  />
                  <div className="text-sm text-white/70 leading-relaxed">
                    Saya setuju dengan{' '}
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">Terms of Service</a>
                    {' '}dan{' '}
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 underline">Privacy Policy</a>
                    {' '}ArisanKu
                  </div>
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
                      Creating account...
                    </div>
                  ) : (
                    <>
                      🚀 Daftar Gratis Sekarang
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

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-white/70">
                    Sudah punya akun?{' '}
                    <Link 
                      to="/login" 
                      className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                    >
                      Login di sini 🔑
                    </Link>
                  </p>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-2 text-sm text-white/50">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>🔒 Data Anda aman dengan enkripsi SSL</span>
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
