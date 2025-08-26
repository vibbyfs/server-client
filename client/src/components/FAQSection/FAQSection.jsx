import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu arisan online dan bagaimana cara kerjanya?",
      answer: "Arisan online adalah sistem arisan tradisional yang didigitalkan. Peserta membayar iuran secara berkala melalui platform, dan pemenang dipilih melalui sistem undian digital yang transparan. Semua transaksi dan aktivitas tercatat secara real-time di dashboard."
    },
    {
      question: "Bagaimana sistem undian memastikan keadilan?",
      answer: "Kami menggunakan algoritma Random Number Generator (RNG) yang telah tersertifikasi untuk memastikan setiap peserta memiliki peluang menang yang sama. Proses undian dilakukan secara live dan dapat disaksikan oleh semua peserta, dengan hasil yang langsung tercatat di blockchain untuk transparansi maksimal."
    },
    {
      question: "Apakah data dan uang saya aman di platform ini?",
      answer: "Keamanan adalah prioritas utama kami. Data pribadi dilindungi dengan enkripsi AES-256, dan dana arisan disimpan di rekening escrow yang diawasi oleh OJK. Sistem autentikasi dua faktor (2FA) dan monitoring 24/7 memastikan keamanan akun Anda."
    },
    {
      question: "Berapa jumlah peserta minimal untuk memulai arisan?",
      answer: "Arisan dapat dimulai dengan minimal 3 peserta. Namun, kami merekomendasikan 5-12 peserta untuk pengalaman arisan yang optimal. Tidak ada batasan maksimal, sehingga cocok untuk komunitas kecil hingga besar."
    },
    {
      question: "Bisakah saya bergabung sebagai penonton tanpa ikut arisan?",
      answer: "Ya, tersedia mode 'Penonton' yang memungkinkan Anda mengikuti jalannya arisan tanpa ikut bermain. Fitur ini cocok untuk transparansi atau pembelajaran sebelum memutuskan ikut berpartisipasi aktif."
    },
    {
      question: "Bagaimana cara pembayaran dan penarikan dana?",
      answer: "Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau virtual account. Dana pemenang akan otomatis ditransfer ke rekening terdaftar dalam 1x24 jam setelah undian. Semua transaksi bebas biaya admin."
    },
    {
      question: "Apa yang terjadi jika ada peserta yang tidak membayar iuran?",
      answer: "Sistem akan memberikan reminder otomatis sebelum deadline. Jika tetap tidak membayar, peserta akan diskualifikasi sementara dari undian periode tersebut. Admin dapat mengatur kebijakan penalti atau toleransi sesuai kesepakatan grup."
    },
    {
      question: "Bisakah saya keluar dari arisan di tengah jalan?",
      answer: "Ya, tetapi dengan konsekuensi sesuai aturan yang disepakati di awal. Umumnya, peserta yang keluar akan kehilangan kesempatan menang untuk periode berjalan, namun dana yang sudah dibayar akan dikembalikan sesuai kebijakan grup."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-modern">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-800">Pertanyaan yang</span>
            <br />
            <span className="gradient-text">Sering Ditanyakan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temukan jawaban untuk pertanyaan umum seputar platform arisan digital ArisanKu. 
            Masih ada pertanyaan? Hubungi tim support kami yang siap membantu 24/7.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="glass-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/20 transition-all duration-200 rounded-xl"
                  aria-expanded={activeIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-6 h-6 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}>
                    <svg 
                      className="w-6 h-6 text-teal-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}>
                  <div className="px-6">
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <div className="glass-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  <span className="gradient-text">Masih Ada Pertanyaan?</span>
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Tim customer support kami siap membantu Anda 24/7 melalui berbagai channel komunikasi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Live Chat
                  </button>
                  <button className="btn-ghost">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Support
                  </button>
                </div>
                
                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+62 811-1234-5678</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>support@arisanku.id</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
