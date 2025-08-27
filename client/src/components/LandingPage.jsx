import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';
import Navbar from './Navbar/Navbar.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Auto redirect to rooms if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/rooms');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: '🤖',
      title: 'AI Smart Assistant',
      description: 'Chat bot pintar yang membantu menjawab pertanyaan seputar arisan, tips keuangan, dan panduan lengkap',
      details: ['Chat dengan /ai atau @bot', 'Tips keuangan personal', 'Panduan arisan untuk pemula']
    },
    {
      icon: '🎯',
      title: 'AI Financial Insights',
      description: 'Analisis mendalam tentang performa arisan Anda dengan rekomendasi finansial yang dipersonalisasi',
      details: ['Analisis win rate & ROI', 'Cash flow optimization', 'Rekomendasi room terbaik']
    },
    {
      icon: '👋',
      title: 'Auto Welcome System',
      description: 'Sistem sambutan otomatis untuk member baru dengan panduan onboarding yang friendly',
      details: ['Welcome message otomatis', 'Panduan step-by-step', 'Tips sukses arisan']
    },
    {
      icon: '🎲',
      title: 'Fair Random Draw',
      description: 'Sistem pengundian yang fair dan transparan dengan animasi menarik untuk semua peserta',
      details: ['Algoritma random yang fair', 'Animasi undian real-time', 'History transparant']
    },
    {
      icon: '💬',
      title: 'Real-time Chat',
      description: 'Komunikasi real-time antar peserta dengan fitur reactions dan emoji untuk interaksi yang lebih hidup',
      details: ['Chat real-time', 'Emoji reactions', 'Typing indicators']
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Dashboard lengkap dengan statistik mendalam, fun facts, dan insights untuk optimasi performa',
      details: ['Dashboard analytics', 'Performance metrics', 'Fun facts generator']
    },
    {
      icon: '🔐',
      title: 'Secure & Private',
      description: 'Keamanan tingkat enterprise dengan enkripsi end-to-end dan sistem authentication yang robust',
      details: ['JWT authentication', 'PIN protection', 'Data encryption']
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Interface yang elegant dan responsive, optimized untuk semua device dari mobile hingga desktop',
      details: ['Mobile-first design', 'Cross-platform', 'Modern UI/UX']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Wijaya',
      role: 'Pengusaha UMKM',
      avatar: '👩‍💼',
      text: 'ArisanKu mengubah cara saya mengelola keuangan komunitas. AI assistantnya sangat membantu untuk planning keuangan!'
    },
    {
      name: 'Budi Santoso',
      role: 'Manager Keuangan',
      avatar: '👨‍💼',
      text: 'Sistem analytics dan financial insights-nya luar biasa. Saya bisa track performa investasi arisan dengan detail.'
    },
    {
      name: 'Maya Chen',
      role: 'Ibu Rumah Tangga',
      avatar: '👩‍🏫',
      text: 'User interface-nya sangat friendly. Bahkan untuk pemula seperti saya, semua fitur mudah dipahami dan digunakan.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Revolusi Digital
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Arisan Modern
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Platform arisan cerdas dengan AI Assistant, analytics mendalam, dan sistem fair draw yang transparan. 
                Kelola komunitas finansial Anda dengan teknologi terdepan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  🚀 Mulai Gratis Sekarang
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="border-2 border-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  🔑 Login
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                      <div className="font-semibold">AI Assistant Online</div>
                      <div className="text-sm text-blue-200">Ready to help 24/7</div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-2xl p-4">
                    <div className="text-sm text-blue-200 mb-2">💬 Recent AI Conversation:</div>
                    <div className="bg-blue-500/20 rounded-lg p-3 mb-2">
                      <div className="text-sm">"Gimana tips arisan yang baik?"</div>
                    </div>
                    <div className="bg-green-500/20 rounded-lg p-3">
                      <div className="text-sm">🤖 "Pilih komunitas terpercaya, set budget 10-20% dari income, dan selalu ikut arisan hingga selesai untuk membangun trust..."</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">1000+</div>
                      <div className="text-xs text-blue-200">Active Users</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">99.9%</div>
                      <div className="text-xs text-blue-200">Uptime</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">24/7</div>
                      <div className="text-xs text-blue-200">AI Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🌟 Fitur Unggulan Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ArisanKu dilengkapi dengan teknologi AI terdepan dan fitur lengkap untuk pengalaman arisan yang tak terlupakan
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              🤖 Powered by Artificial Intelligence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tiga fitur AI revolusioner yang mengubah cara Anda berinteraksi dengan arisan
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Smart Chat Assistant */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">
                  💬
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Chat Assistant</h3>
                <p className="text-blue-100 mb-6">
                  AI bot yang siap menjawab semua pertanyaan Anda tentang arisan, keuangan, dan tips saving 24/7
                </p>
                <div className="bg-black/30 rounded-xl p-4 text-left">
                  <div className="text-sm text-blue-200 mb-2">Contoh penggunaan:</div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-500/30 rounded-lg p-2">"/ai gimana cara kerja arisan?"</div>
                    <div className="bg-green-500/30 rounded-lg p-2">"@bot tips hemat untuk pemula"</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Welcome System */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">
                  👋
                </div>
                <h3 className="text-2xl font-bold mb-4">Auto Welcome & Onboarding</h3>
                <p className="text-blue-100 mb-6">
                  Sistem penyambutan otomatis yang memberikan panduan lengkap untuk member baru
                </p>
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="text-sm">
                    <div className="text-blue-200 mb-2">✨ Fitur unggulan:</div>
                    <ul className="space-y-1 text-left">
                      <li>• Welcome message personal</li>
                      <li>• Tutorial step-by-step</li>
                      <li>• Tips sukses arisan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Insights */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">
                  📊
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Financial Insights</h3>
                <p className="text-blue-100 mb-6">
                  Analisis mendalam dengan rekomendasi finansial yang dipersonalisasi untuk optimasi portfolio
                </p>
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="text-green-400 font-bold">Win Rate</div>
                      <div className="text-xs text-blue-200">Analytics</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-bold">Cash Flow</div>
                      <div className="text-xs text-blue-200">Optimization</div>
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold">AI Recs</div>
                      <div className="text-xs text-blue-200">Personalized</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎯 Cara Kerja ArisanKu
            </h2>
            <p className="text-xl text-gray-600">
              Proses yang simple dan transparan untuk pengalaman arisan yang optimal
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Daftar & Login', desc: 'Buat akun gratis dan login ke platform', icon: '👤' },
              { step: '2', title: 'Join/Create Room', desc: 'Bergabung dengan room atau buat room baru', icon: '🏠' },
              { step: '3', title: 'Interactive Chat', desc: 'Ngobrol dengan AI assistant dan sesama member', icon: '💬' },
              { step: '4', title: 'Fair Draw & Analytics', desc: 'Ikuti undian fair dan pantau performa', icon: '🎲' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-bold text-2xl">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              💬 Apa Kata Pengguna Kami
            </h2>
            <p className="text-xl text-gray-300">
              Ribuan pengguna sudah merasakan pengalaman arisan yang revolusioner
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
                <div className="mt-4 flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            🚀 Siap Memulai Arisan Cerdas?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan revolusi arisan digital dengan AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🎯 Daftar Gratis Sekarang
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              🔑 Sudah Punya Akun? Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <span className="text-3xl font-bold">ArisanKu</span>
              </div>
              <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                Platform arisan digital terdepan dengan teknologi AI yang menghadirkan pengalaman arisan modern, 
                transparan, dan menguntungkan untuk semua.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-yellow-400">🚀 Platform</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#features" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">🎯</span> Features</a></li>
                <li><a href="#ai-showcase" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">🤖</span> AI Technology</a></li>
                <li><a href="#testimonials" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">💬</span> Testimonials</a></li>
                <li><a href="/login" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">🔑</span> Login</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-yellow-400">💬 Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">❓</span> Help Center</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">📞</span> Contact Support</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">🔒</span> Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 flex items-center"><span className="mr-2">📋</span> Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 ArisanKu. All rights reserved. Powered by AI for financial communities.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  All systems operational
                </span>
                <span>🤖 AI Assistant Online</span>
                <span>🔒 Bank-level Security</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
