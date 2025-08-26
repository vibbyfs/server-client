import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sari Wijaya",
      role: "Ketua RT 05",
      location: "Jakarta Selatan",
      avatar: "SW",
      content: "ArisanKu membuat arisan RT kami menjadi transparan dan mudah dikelola. Tidak ada lagi kekhawatiran tentang dana yang hilang atau undian yang tidak fair. Semua tercatat dengan jelas!",
      rating: 5
    },
    {
      id: 2,
      name: "Budi Santoso",
      role: "Pengusaha UMKM",
      location: "Bandung",
      avatar: "BS",
      content: "Sebagai yang sibuk, fitur reminder dan otomatis sangat membantu. Saya tidak pernah lupa bayar iuran lagi. Tim support juga sangat responsif membantu setup arisan untuk karyawan.",
      rating: 5
    },
    {
      id: 3,
      name: "Maya Indrawati",
      role: "Ibu Rumah Tangga",
      location: "Surabaya",
      avatar: "MI",
      content: "Platform ini sangat user-friendly, bahkan untuk saya yang tidak terlalu paham teknologi. Interface-nya simple dan semua informasi mudah dipahami. Highly recommended!",
      rating: 5
    },
    {
      id: 4,
      name: "Rizki Pratama",
      role: "Manajer Keuangan",
      location: "Medan",
      avatar: "RP",
      content: "Fitur laporan keuangan sangat detail dan membantu dalam audit arisan kantor. Dashboard analytics memberikan insight yang berguna untuk planning arisan ke depan.",
      rating: 5
    },
    {
      id: 5,
      name: "Dewi Lestari",
      role: "Guru SMA",
      location: "Yogyakarta",
      avatar: "DL",
      content: "Arisan guru se-sekolah jadi lebih terorganisir dengan ArisanKu. Fitur chat group memudahkan koordinasi, dan sistem pengingat membuat semua peserta disiplin bayar tepat waktu.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-modern">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-800">Apa Kata</span>
            <br />
            <span className="gradient-text">Pengguna Kami?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan dan kepercayaan 
            dalam mengelola arisan bersama ArisanKu.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Testimonial */}
          <div className="glass-card text-center animate-fadeInUp overflow-hidden">
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>

              {/* Avatar */}
              <div className="mb-6 pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {testimonials[activeTestimonial].name}
                  </h3>
                  <p className="text-teal-600 font-medium">
                    {testimonials[activeTestimonial].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
                "{testimonials[activeTestimonial].content}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="glass p-3 rounded-full hover:bg-white/20 transition-all duration-200 group"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-teal-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="glass p-3 rounded-full hover:bg-white/20 transition-all duration-200 group"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Testimonials */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`glass-card p-4 text-center transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'ring-2 ring-teal-400 bg-teal-50/50' 
                    : 'hover:bg-white/50'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${
                  index === activeTestimonial 
                    ? 'from-teal-400 to-teal-600' 
                    : 'from-gray-300 to-gray-400'
                } rounded-full mx-auto flex items-center justify-center text-white text-sm font-bold mb-2`}>
                  {testimonial.avatar}
                </div>
                <h4 className="text-sm font-medium text-gray-800 truncate">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {testimonial.location}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">5,000+</div>
            <div className="text-gray-600">Pengguna Aktif</div>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">₹100M+</div>
            <div className="text-gray-600">Dana Dikelola</div>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">99.8%</div>
            <div className="text-gray-600">Kepuasan User</div>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
