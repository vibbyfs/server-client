const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Lottery System",
      description: "Proprietary algorithm ensuring equal opportunity for all participants with complete transparency and fairness.",
      category: "Technology"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Structured Financial Management",
      description: "Comprehensive dashboard for monitoring contributions, installments, and fund distribution in real-time.",
      category: "Finance"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
        </svg>
      ),
      title: "Seamless Web Access",
      description: "Enjoy convenient access through web browsers on desktop and mobile devices without application installation.",
      category: "Accessibility"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Bank-Grade Security",
      description: "Data and transactions protected with bank-level encryption and secure authentication systems.",
      category: "Security"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Integrated Community",
      description: "Join thousands of communities that trust our platform for their exclusive social lottery experiences.",
      category: "Community"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Automated & Scheduled",
      description: "Automatic contribution reminders, scheduled draws, and real-time notifications for all lottery activities.",
      category: "Automation"
    }
  ];

  return (
    <section id="features" className="py-24 bg-secondary-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-accent-gold/10 text-accent-gold font-medium text-sm uppercase tracking-wider rounded-full border border-accent-gold/20">
              Why Choose ArisanKu
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl heading-primary mb-8">
            Luxury Redefined
            <br />
            <span className="text-text-light">in Social Lottery</span>
          </h2>
          <p className="text-xl text-luxury max-w-4xl mx-auto leading-relaxed">
            Experience the perfect fusion of traditional trust and cutting-edge technology,
            delivering a sophisticated, transparent, and seamless social lottery experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid-luxury">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-luxury group cursor-pointer animate-slideInLeftToRight p-8 opacity-0"
              style={{ animationDelay: `${(index % 3) * 0.1 + Math.floor(index / 3) * 0.3}s` }}
            >
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-accent-gold/10 text-accent-gold text-xs font-medium uppercase tracking-wider rounded-full">
                  {feature.category}
                </span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-accent-gold transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl heading-secondary mb-4 text-black group-hover:text-accent-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-luxury leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-accent-gold/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="card-luxury max-w-5xl mx-auto p-12">
            <div className="text-center">
              <h3 className="text-4xl heading-primary mb-6">
                Ready to Begin Your
                <br />
                <span className="text-accent-gold">Luxury Experience?</span>
              </h3>
              <p className="text-luxury mb-10 text-lg max-w-2xl mx-auto">
                Join thousands of discerning individuals who have embraced the sophistication of modern social lottery.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn-luxury-primary text-lg px-10 py-4">
                  Create Your First Consortium
                </button>
                <button className="btn-luxury-secondary text-lg px-10 py-4">
                  View Demonstration
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
