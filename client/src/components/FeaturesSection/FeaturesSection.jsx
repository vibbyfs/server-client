const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sistem Undian Fair",
      description: "Algoritma transparan yang memastikan setiap peserta memiliki kesempatan yang sama untuk menang.",
      color: "from-teal-400 to-teal-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Kelola Keuangan Terstruktur",
      description: "Dashboard lengkap untuk memantau iuran, cicilan, dan distribusi dana secara real-time.",
      color: "from-coral-400 to-coral-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
        </svg>
      ),
      title: "Akses Mudah Website",
      description: "Nikmati kemudahan akses melalui browser web di desktop maupun mobile tanpa perlu install aplikasi.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Keamanan Terjamin",
      description: "Data dan transaksi dilindungi dengan enkripsi tingkat bank serta sistem autentikasi yang aman.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Komunitas Terintegrasi",
      description: "Bergabung dengan ribuan komunitas arisan yang sudah mempercayai platform kami.",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Otomatis & Terjadwal",
      description: "Pengingat iuran otomatis, undian terjadwal, dan notifikasi real-time untuk semua aktivitas arisan.",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-modern">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Mengapa Memilih</span>
            <br />
            <span className="text-gray-800">ArisanKu?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform arisan digital yang menggabungkan kepercayaan tradisional dengan teknologi modern 
            untuk pengalaman yang lebih aman, transparan, dan mudah.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-modern group cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-coral-50 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                <span className="gradient-text">Siap Memulai Arisan Digital?</span>
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan arisan modern.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Buat Arisan Pertama
                </button>
                <button className="btn-ghost text-lg px-8 py-4">
                  Lihat Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
