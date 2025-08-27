import { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is ArisanKu's premium lottery experience?",
      answer: "ArisanKu offers an exclusive digital lottery platform designed for discerning individuals and organizations. Our sophisticated system combines traditional lottery principles with cutting-edge technology, ensuring transparent, secure, and elegant management of high-value prize pools with institutional-grade security."
    },
    {
      question: "How does the random selection ensure fairness and integrity?",
      answer: "We employ certified cryptographic Random Number Generator (RNG) algorithms that undergo regular third-party audits. Each draw is conducted live with real-time verification, and results are immutably recorded on our secure blockchain ledger, providing unparalleled transparency and eliminating any possibility of manipulation."
    },
    {
      question: "Is my data and capital completely secure on this platform?",
      answer: "Security is our paramount concern. All personal data is protected with military-grade AES-256 encryption, and funds are held in regulated escrow accounts overseen by financial authorities. Multi-factor authentication, biometric verification, and round-the-clock monitoring ensure the highest level of protection for your assets and information."
    },
    {
      question: "What is the minimum number of participants required to begin?",
      answer: "Exclusive gatherings can commence with as few as 2 participants. However, we recommend 5-12 participants for optimal experience. There are no upper limits, making our platform suitable for intimate private groups as well as large-scale corporate consortiums and high-society gatherings."
    },
    {
      question: "Can I observe proceedings without active participation?",
      answer: "Yes, our 'Observer' mode allows you to monitor proceedings without financial commitment. This feature is ideal for due diligence, learning our sophisticated processes, or maintaining transparency before making the decision to join as an active participant in our exclusive community."
    },
    {
      question: "What payment methods are available and how are withdrawals processed?",
      answer: "We support premium payment methods including wire transfers, premium credit cards, and secure digital wallets. Winning funds are transferred to your verified account within 24 hours of the draw. All transactions are processed without administrative fees, ensuring you receive your full prize amount."
    },
    {
      question: "What happens if a participant fails to make their contribution?",
      answer: "Our automated system provides elegant reminders before deadlines. Non-payment results in temporary disqualification from that draw cycle. Administrators can establish custom policies regarding penalties or grace periods according to the group's sophisticated agreement."
    },
    {
      question: "Can I withdraw from an ongoing exclusive gathering?",
      answer: "Yes, though consequences follow the predetermined protocols established at inception. Typically, withdrawing participants forfeit their chance for that cycle's prize, but previously paid contributions are returned according to the group's refined policies, maintaining the integrity of the collective."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-luxury-gray/10 to-luxury-white">
      <div className="container-modern">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
            <span className="text-luxury-black">Frequently Asked</span>
            <br />
            <span className="gradient-luxury">Questions</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto leading-relaxed font-inter">
            Find answers to common questions about ArisanKu's premium digital lottery platform.
            Still have questions? Our concierge support team is available 24/7 to assist you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="card-luxury animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-luxury-gold/5 transition-all duration-200 rounded-xl"
                  aria-expanded={activeIndex === index}
                >
                  <h3 className="text-lg font-semibold text-luxury-black pr-4 font-inter">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-6 h-6 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}>
                    <svg 
                      className="w-6 h-6 text-luxury-gold" 
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
                    <div className="border-t border-luxury-gold/20 pt-4">
                      <p className="text-luxury-gray leading-relaxed font-inter">
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
            <div className="card-luxury">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-luxury rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-luxury">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-playfair">
                  <span className="gradient-luxury">Still Have Questions?</span>
                </h3>
                <p className="text-luxury-gray mb-6 text-lg font-inter">
                  Our premium concierge support team is available 24/7 through multiple communication channels.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-luxury-primary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Live Chat
                  </button>
                  <button className="btn-luxury-secondary">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Support
                  </button>
                </div>
                
                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-luxury-gray font-inter">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+65 811-1234-5678</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>concierge@arisanku.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>24/7 Concierge</span>
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
