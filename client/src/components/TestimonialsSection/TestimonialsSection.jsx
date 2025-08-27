import { useState } from 'react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Elite Consortium Director",
      location: "Jakarta",
      avatar: "SJ",
      content: "ArisanKu has transformed our exclusive community gatherings into sophisticated, transparent experiences. The platform's elegance and security give us complete peace of mind while managing substantial prize pools.",
      rating: 5,
      company: "Johnson Enterprises"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Executive Chairman",
      location: "Singapore",
      avatar: "MR",
      content: "The automated reminders and sophisticated analytics have revolutionized how we conduct our premium lottery events. Exceptional attention to detail and unparalleled security standards.",
      rating: 5,
      company: "Rodriguez Group"
    },
    {
      id: 3,
      name: "Amelia Liu",
      role: "Luxury Brand Director",
      location: "Hong Kong",
      avatar: "AL",
      content: "Even as someone who appreciates technological sophistication, I found ArisanKu remarkably intuitive. The interface is both elegant and powerful - a rare combination in digital platforms.",
      rating: 5,
      company: "Liu Luxury Holdings"
    },
    {
      id: 4,
      name: "David Chen",
      role: "Financial Director",
      location: "London",
      avatar: "DC",
      content: "The detailed financial reporting and audit capabilities are exceptional. The analytics provide invaluable insights for strategic planning of our high-value consortium activities.",
      rating: 5,
      company: "Chen Financial Group"
    },
    {
      id: 5,
      name: "Isabella Rossi",
      role: "Cultural Director",
      location: "Milan",
      avatar: "IR",
      content: "ArisanKu has brought sophistication to our cultural society's gatherings. The integrated communication features and disciplined payment systems have elevated our community experience.",
      rating: 5,
      company: "Rossi Cultural Society"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-luxury-white to-luxury-gray/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
            <span className="text-luxury-black">What Our</span>
            <br />
            <span className="gradient-luxury">Elite Members Say</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto leading-relaxed font-inter">
            Join thousands of distinguished individuals who have experienced the sophistication and trust
            of managing exclusive gatherings with ArisanKu's premium platform.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Testimonial */}
          <div className="card-luxury text-center animate-fadeInUp overflow-hidden">
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
                <div className="w-12 h-12 bg-gradient-luxury rounded-full flex items-center justify-center shadow-luxury">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
              </div>

              {/* Avatar */}
              <div className="mb-6 pt-8">
                <div className="w-20 h-20 bg-gradient-luxury rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-luxury">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-luxury-black font-inter">
                    {testimonials[activeTestimonial].name}
                  </h3>
                  <p className="text-luxury-gold font-medium font-inter">
                    {testimonials[activeTestimonial].role}
                  </p>
                  <p className="text-luxury-gray text-sm font-inter">
                    {testimonials[activeTestimonial].location}
                  </p>
                  <p className="text-luxury-gray text-sm font-inter">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-lg text-luxury-black leading-relaxed mb-6 max-w-4xl mx-auto font-inter">
                "{testimonials[activeTestimonial].content}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <svg 
                    key={i} 
                    className="w-5 h-5 text-luxury-gold" 
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
              className="btn-luxury-secondary p-3 rounded-full hover:shadow-luxury transition-all duration-200 group"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-luxury-black group-hover:text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      ? 'bg-luxury-gold w-8 shadow-luxury' 
                      : 'bg-luxury-gray hover:bg-luxury-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="btn-luxury-secondary p-3 rounded-full hover:shadow-luxury transition-all duration-200 group"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-luxury-black group-hover:text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className={`card-luxury p-4 text-center transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'ring-2 ring-luxury-gold bg-luxury-gold/5 shadow-luxury' 
                    : 'hover:shadow-luxury hover:bg-luxury-gold/5'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-luxury rounded-full mx-auto flex items-center justify-center text-white text-sm font-bold mb-2 ${
                  index === activeTestimonial ? 'shadow-luxury' : ''
                }`}>
                  {testimonial.avatar}
                </div>
                <h4 className="text-sm font-medium text-luxury-black truncate font-inter">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-luxury-gray truncate font-inter">
                  {testimonial.location}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold gradient-luxury mb-2 font-playfair">10,000+</div>
            <div className="text-luxury-gray font-inter">Elite Members</div>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold gradient-luxury mb-2 font-playfair">$500M+</div>
            <div className="text-luxury-gray font-inter">Managed Assets</div>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold gradient-luxury mb-2 font-playfair">99.9%</div>
            <div className="text-luxury-gray font-inter">Client Satisfaction</div>
          </div>
          <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold gradient-luxury mb-2 font-playfair">24/7</div>
            <div className="text-luxury-gray font-inter">Concierge Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
