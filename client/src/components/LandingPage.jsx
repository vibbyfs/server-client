import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isVisible, setIsVisible] = React.useState({})

  // Auto redirect to rooms if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/rooms')
    }
  }, [user, navigate])

  // Debug function for navigation
  const handleNavigation = (path) => {
    console.log('Navigating to:', path)
    try {
      navigate(path)
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  // Handle button clicks with proper event handling
  const handleButtonClick = (e, path) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Button clicked, navigating to:', path)
    handleNavigation(path)
  }

  // Intersection Observer for animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]')
      elements.forEach(el => {
        if (el.id) observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  const testimonials = [
    {
      name: "Sari Wijaya",
      text: "Arisan online ini sangat membantu mengatur keuangan keluarga. Prosesnya transparan dan aman!",
      role: "Ibu Rumah Tangga"
    },
    {
      name: "Budi Santoso", 
      text: "Sudah 6 bulan ikut arisan di sini, pembayarannya selalu tepat waktu dan sistemnya fair.",
      role: "Karyawan Swasta"
    },
    {
      name: "Maya Indrawati",
      text: "Chat room-nya seru, bisa ngobrol sama anggota lain. Feels like real community!",
      role: "Entrepreneur"
    }
  ]

  const benefits = [
    "🛡️ Sistem undian yang fair dan transparan",
    "💰 Kelola keuangan dengan lebih terstruktur", 
    "👥 Bergabung dengan komunitas yang saling mendukung",
    "📱 Akses mudah kapan saja melalui website",
    "🎯 Mencapai target finansial lebih cepat",
    "✅ Proses otomatis dan aman"
  ]

  const faqs = [
    {
      q: "Apa itu arisan online?",
      a: "Arisan online adalah sistem tabungan berkelompok tradisional yang didigitalkan, dimana setiap anggota menyetorkan jumlah yang sama setiap periode dan secara bergiliran mendapat kesempatan menerima dana kumpulan."
    },
    {
      q: "Bagaimana sistem undiannya?",
      a: "Kami menggunakan sistem undian digital yang fair dan transparan. Setiap anggota memiliki kesempatan yang sama untuk menang, dan prosesnya bisa disaksikan langsung oleh semua peserta."
    },
    {
      q: "Apakah aman?",
      a: "Ya, platform kami menggunakan teknologi keamanan modern. Semua transaksi tercatat dan dapat dilacak. Admin bertanggung jawab penuh atas kelancaran arisan."
    },
    {
      q: "Berapa minimal peserta?",
      a: "Minimal 5 peserta untuk memulai sebuah grup arisan. Maksimal biasanya 20 peserta agar tetap manageable."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-purple-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">ArisanKu</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={(e) => handleButtonClick(e, '/login')}
                className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
              <button 
                onClick={(e) => handleButtonClick(e, '/register')}
                className="bg-white text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in"
              data-animate
              id="hero-title"
            >
              Arisan Modern untuk
              <span className="block text-purple-200">Masa Depan Cerah</span>
            </h1>
            <p 
              className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90 font-roboto"
              data-animate
              id="hero-subtitle"
            >
              Bergabunglah dengan komunitas arisan digital yang aman, transparan, dan mudah digunakan. 
              Wujudkan impian finansial Anda bersama kami!
            </p>
            <button 
              onClick={(e) => handleButtonClick(e, '/register')}
              className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 hover:shadow-xl transition-colors duration-300"
              data-animate
              id="hero-cta"
            >
              Mulai Arisan Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Main Image Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center transition-all duration-1000 ${isVisible['main-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="main-image"
          >
            <img 
              src="/api/placeholder/800/400" 
              alt="Komunitas Arisan" 
              className="mx-auto rounded-2xl shadow-2xl max-w-full h-auto hover:shadow-3xl transition-shadow duration-300"
            />
            <p className="mt-6 text-lg text-gray-600 font-roboto max-w-2xl mx-auto">
              Ribuan orang telah merasakan manfaat arisan digital bersama kami. 
              Bergabunglah dan rasakan pengalaman menabung yang menyenangkan!
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ${isVisible['benefits-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="benefits-title"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih ArisanKu?
            </h2>
            <p className="text-lg text-gray-600 font-['Roboto']">
              Nikmati berbagai keunggulan arisan digital modern
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${isVisible[`benefit-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id={`benefit-${index}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="text-lg font-['Roboto'] text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ${isVisible['testimonials-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="testimonials-title"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-lg text-gray-600 font-['Roboto']">
              Pengalaman nyata dari anggota komunitas kami
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${isVisible[`testimonial-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id={`testimonial-${index}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <blockquote className="text-gray-700 font-['Roboto'] mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ${isVisible['faq-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="faq-title"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg text-gray-600 font-['Roboto']">
              Temukan jawaban untuk pertanyaan umum seputar arisan digital
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 ${isVisible[`faq-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id={`faq-${index}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700 font-['Roboto'] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className={`transition-all duration-1000 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="final-cta"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Memulai Perjalanan Finansial Anda?
            </h2>
            <p className="text-lg mb-8 opacity-90 font-['Roboto']">
              Bergabunglah dengan ribuan orang yang telah merasakan manfaat arisan digital. 
              Daftar sekarang dan mulai wujudkan impian finansial Anda!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={(e) => handleButtonClick(e, '/register')}
                className="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 hover:shadow-xl transition-colors duration-300"
              >
                Daftar Gratis Sekarang
              </button>
              <button 
                onClick={(e) => handleButtonClick(e, '/login')}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors duration-300"
              >
                Sudah Punya Akun? Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">ArisanKu</h3>
            <p className="text-gray-400 font-['Roboto'] mb-4">
              Platform arisan digital terpercaya untuk masa depan finansial yang lebih baik
            </p>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-500 text-sm">
                © 2025 ArisanKu. Semua hak dilindungi undang-undang.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
