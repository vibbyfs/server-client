import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-coral-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-coral-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-modern relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fadeInUp">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Arisan Modern</span>
              <br />
              <span className="text-gray-800">untuk Masa Depan</span>
              <br />
              <span className="gradient-text">Cerah</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Kelola arisan keluarga atau komunitas dengan transparan, terjadwal, dan mudah diakses. 
              Sistem undian yang fair dengan teknologi modern.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/register" 
                className="btn-primary text-lg px-8 py-4 group"
              >
                Mulai Arisan Sekarang
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link 
                to="#features" 
                className="btn-ghost text-lg px-8 py-4 group"
              >
                Pelajari Lebih Lanjut
                <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">100+</div>
                <div className="text-gray-600">Komunitas Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">₹50L+</div>
                <div className="text-gray-600">Dana Dikelola</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative lg:block animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main Card */}
              <div className="glass-card max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Arisan Keluarga Besar</h3>
                  <p className="text-gray-600 text-sm">12 Peserta • ₹500.000/bulan</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-200 rounded-full"></div>
                      <span className="text-sm font-medium">Sari Wijaya</span>
                    </div>
                    <span className="text-xs text-teal-600 font-medium">Pemenang</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-sm font-medium">Budi Santoso</span>
                    </div>
                    <span className="text-xs text-gray-600">Peserta</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-sm font-medium">Maya Indrawati</span>
                    </div>
                    <span className="text-xs text-gray-600">Peserta</span>
                  </div>
                </div>

                <button className="w-full btn-secondary mt-6 text-sm">
                  Kocok Undian
                </button>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 glass p-4 rounded-xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-xs font-medium">Online</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl transform -rotate-12 hover:-rotate-6 transition-transform duration-500">
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">₹6M</div>
                  <div className="text-xs text-gray-600">Total Dana</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
