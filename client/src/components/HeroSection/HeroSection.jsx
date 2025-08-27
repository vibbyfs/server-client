import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fadeInUp">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent-gold/10 text-accent-gold font-medium text-sm uppercase tracking-wider rounded-full border border-accent-gold/20">
                Luxury Social Lottery
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl heading-primary mb-8 leading-tight">
              ArisanKu
              <br />
              <span className="text-text-light">Modern Luxury</span>
              <br />
              <span className="text-black">Experience</span>
            </h1>

            <p className="text-xl text-luxury mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the sophistication of traditional arisan reimagined for the modern elite.
              Transparent, scheduled, and accessible management for your exclusive community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/register"
                className="btn-luxury-primary text-lg px-8 py-4 group"
              >
                Begin Your Journey
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                to="#features"
                className="btn-luxury-secondary text-lg px-8 py-4 group"
              >
                Discover More
                <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-3xl font-bold heading-secondary text-black mb-1">500+</div>
                <div className="text-luxury text-sm uppercase tracking-wider">Exclusive Communities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold heading-secondary text-black mb-1">₹10Cr+</div>
                <div className="text-luxury text-sm uppercase tracking-wider">Managed Capital</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold heading-secondary text-black mb-1">99.9%</div>
                <div className="text-luxury text-sm uppercase tracking-wider">Security</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative lg:block animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="relative max-w-lg mx-auto">
              {/* Main Luxury Card */}
              <div className="card-luxury p-8 transform hover:scale-105 transition-transform duration-500">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-luxury-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl heading-secondary mb-3">Elite Family Consortium</h3>
                  <p className="text-luxury">25 Members • ₹1,000,000/month</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary-gray rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SJ</span>
                      </div>
                      <div>
                        <div className="font-medium text-black">Sarah Johnson</div>
                        <div className="text-luxury text-sm">Winner</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-accent-gold font-bold">₹25M</div>
                      <div className="text-luxury text-xs">Prize</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MR</span>
                      </div>
                      <div>
                        <div className="font-medium text-black">Marcus Rodriguez</div>
                        <div className="text-luxury text-sm">Member</div>
                      </div>
                    </div>
                    <div className="text-accent-gold text-sm">Active</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AL</span>
                      </div>
                      <div>
                        <div className="font-medium text-black">Amelia Liu</div>
                        <div className="text-luxury text-sm">Member</div>
                      </div>
                    </div>
                    <div className="text-accent-gold text-sm">Active</div>
                  </div>
                </div>

                <button className="w-full btn-luxury-primary mt-8">
                  Initiate Draw
                </button>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 bg-accent-gold text-white p-4 rounded-xl shadow-luxury-lg transform rotate-12 hover:rotate-6 transition-transform duration-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-sm font-medium">Live</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-black text-white p-4 rounded-xl shadow-luxury-lg transform -rotate-12 hover:-rotate-6 transition-transform duration-500">
                <div className="text-center">
                  <div className="text-xl font-bold text-accent-gold">₹250M</div>
                  <div className="text-luxury text-xs">Total Pool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
