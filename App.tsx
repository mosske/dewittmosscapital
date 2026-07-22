import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxBackground } from './ParallaxBackground';
import { Logo } from './Logo';
import { 
  Menu, X, Mail, MapPin, Clock, Phone, ArrowRight, 
  Check, Globe, Calendar, Shield, Users, Leaf, Scale, Sparkles 
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Form states
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // Nav scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page change
  const navigateTo = (page: 'home' | 'about' | 'contact') => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.message) {
      setContactError(true);
      setContactSuccess(false);
      return;
    }
    setContactSuccess(true);
    setContactError(false);
    setContactForm({ firstName: '', lastName: '', email: '', message: '' });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentForm.name || !appointmentForm.company || !appointmentForm.email || !appointmentForm.message) {
      return;
    }
    setAppointmentSuccess(true);
    setTimeout(() => {
      setAppointmentSuccess(false);
      setShowAppointmentModal(false);
      setAppointmentForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-900 selection:bg-[#C5A059] selection:text-white font-sans antialiased flex flex-col justify-between">
      
      {/* HEADER NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-lg border-b border-stone-200/50 py-4' 
          : 'bg-stone-950/90 md:bg-stone-950/40 backdrop-blur-sm py-6'
      }`}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          {/* Logo Brand */}
          <div 
            className="flex items-end gap-3 cursor-pointer group" 
            onClick={() => navigateTo('home')}
          >
            <Logo 
              className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
              variant="adaptive"
              scrolled={scrolled}
            />
            <div className="flex flex-col select-none">
              <span 
                className={`font-serif font-bold text-sm md:text-base tracking-[0.12em] transition-colors duration-300 leading-tight ${
                  scrolled ? 'text-stone-900' : 'text-white'
                }`}
              >
                DEWITT MOSS DOSAJ
              </span>
              <span 
                className={`font-serif text-[9px] md:text-[10px] font-medium tracking-wide italic transition-colors duration-300 ${
                  scrolled ? 'text-[#C5A059]' : 'text-stone-300'
                }`}
              >
                Funding Dreams, Fueling Growth
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em]">
              <button 
                onClick={() => navigateTo('home')} 
                className={`transition-colors cursor-pointer ${
                  currentPage === 'home' 
                    ? 'text-[#C5A059]' 
                    : scrolled ? 'text-stone-600 hover:text-[#C5A059]' : 'text-stone-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('about')} 
                className={`transition-colors cursor-pointer ${
                  currentPage === 'about' 
                    ? 'text-[#C5A059]' 
                    : scrolled ? 'text-stone-600 hover:text-[#C5A059]' : 'text-stone-300 hover:text-white'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => navigateTo('contact')} 
                className={`transition-colors cursor-pointer ${
                  currentPage === 'contact' 
                    ? 'text-[#C5A059]' 
                    : scrolled ? 'text-stone-600 hover:text-[#C5A059]' : 'text-stone-300 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>
            <button 
              onClick={() => setShowAppointmentModal(true)}
              className="px-5 py-3 bg-[#C5A059] text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] rounded hover:bg-[#b08e4d] hover:text-white transition-all shadow-md cursor-pointer"
            >
              Request Appointment
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`p-2 rounded focus:outline-none ${scrolled ? 'text-stone-900' : 'text-white'}`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-stone-950 border-t border-stone-800"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone-300">
                <button 
                  onClick={() => navigateTo('home')} 
                  className={`text-left transition-colors ${currentPage === 'home' ? 'text-[#C5A059]' : 'hover:text-white'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateTo('about')} 
                  className={`text-left transition-colors ${currentPage === 'about' ? 'text-[#C5A059]' : 'hover:text-white'}`}
                >
                  About
                </button>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className={`text-left transition-colors ${currentPage === 'contact' ? 'text-[#C5A059]' : 'hover:text-white'}`}
                >
                  Contact
                </button>
                <button 
                  onClick={() => {
                    setMenuOpen(false);
                    setShowAppointmentModal(true);
                  }}
                  className="w-full py-3 bg-[#C5A059] text-stone-950 font-bold rounded text-center"
                >
                  Request Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* PAGE CONTAINER & ROUTING */}
      <main className="flex-grow pt-0">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* HERO SECTION */}
              <ParallaxBackground 
                imageUrl="https://dewittmosscapital.com/wp-content/uploads/2024/10/pexels-photo-7341939.jpeg"
                overlayGradient="linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.75))"
                minHeight="700px"
                className="relative flex items-center justify-center text-center bg-stone-950"
              >
                <div className="container mx-auto px-6 max-w-4xl py-24 z-10">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-4 py-1.5 border border-[#C5A059]/30 rounded-full bg-[#C5A059]/5">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C5A059]">
                        Capital Advisory & Origination
                      </span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-medium leading-[1.15] tracking-tight">
                      Premier Specialists in <br />
                      <span className="text-[#C5A059] italic">Capital-Raising</span> Solutions
                    </h1>
                    <p className="text-[#C5A059] text-sm md:text-base tracking-[0.1em] uppercase font-semibold">
                      Tailored Funding for Diverse Projects and Investment Opportunities
                    </p>
                    <div className="w-16 h-[1px] bg-[#C5A059]/50 mx-auto my-8"></div>
                    <div className="pt-2">
                      <button 
                        onClick={() => setShowAppointmentModal(true)}
                        className="px-8 py-4 bg-[#C5A059] text-stone-950 text-xs font-bold uppercase tracking-[0.25em] rounded hover:bg-[#b08e4d] hover:text-white transition-all shadow-xl inline-flex items-center gap-2 group"
                      >
                        Request Appointment <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </div>
                {/* Subtle bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F9F8F4] to-transparent z-10"></div>
              </ParallaxBackground>

              {/* SERVICES SECTION */}
              <section id="services" className="py-24 bg-[#F9F8F4]">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-medium tracking-tight">
                      Our Services
                    </h2>
                    <div className="w-12 h-1 bg-[#C5A059] mx-auto"></div>
                    <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light max-w-3xl mx-auto pt-2">
                      DeWitt Moss Dosaj Capital stands as a premier specialist in the capital-raising sector, specializing in the provision of bespoke funding solutions meticulously crafted to address the unique requirements of diverse projects and investment opportunities. Our firm is dedicated to delivering innovative financial strategies through a comprehensive array of instruments, including:
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Equity Investments */}
                    <div className="bg-white p-8 border border-stone-200/60 rounded-lg shadow-sm hover:shadow-md hover:border-[#C5A059]/30 transition-all space-y-4">
                      <div className="w-12 h-12 bg-stone-50 border border-stone-200/50 rounded-full flex items-center justify-center text-[#C5A059]">
                        <Globe size={22} />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-stone-950">
                        Equity Investments
                      </h3>
                      <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold">
                        Stake Acquisition
                      </p>
                      <p className="text-stone-600 text-sm leading-relaxed font-light">
                        Stake acquisition in project assets, allowing us to benefit from their growth and profitability.
                      </p>
                    </div>

                    {/* Debt Financing */}
                    <div className="bg-white p-8 border border-stone-200/60 rounded-lg shadow-sm hover:shadow-md hover:border-[#C5A059]/30 transition-all space-y-4">
                      <div className="w-12 h-12 bg-stone-50 border border-stone-200/50 rounded-full flex items-center justify-center text-[#C5A059]">
                        <Shield size={22} />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-stone-950">
                        Debt Financing
                      </h3>
                      <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold">
                        Structured Loans
                      </p>
                      <p className="text-stone-600 text-sm leading-relaxed font-light">
                        Structured loans, ensuring a consistent income stream.
                      </p>
                    </div>

                    {/* Convertible Loans */}
                    <div className="bg-white p-8 border border-stone-200/60 rounded-lg shadow-sm hover:shadow-md hover:border-[#C5A059]/30 transition-all space-y-4">
                      <div className="w-12 h-12 bg-stone-50 border border-stone-200/50 rounded-full flex items-center justify-center text-[#C5A059]">
                        <Users size={22} />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-stone-950">
                        Convertible Loans
                      </h3>
                      <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold">
                        Flexible Financing
                      </p>
                      <p className="text-stone-600 text-sm leading-relaxed font-light">
                        Flexible financing options to convert debt into equity, aligning our interests with the projects’ success.
                      </p>
                    </div>

                    {/* Blended Approach */}
                    <div className="bg-white p-8 border border-stone-200/60 rounded-lg shadow-sm hover:shadow-md hover:border-[#C5A059]/30 transition-all space-y-4">
                      <div className="w-12 h-12 bg-stone-50 border border-stone-200/50 rounded-full flex items-center justify-center text-[#C5A059]">
                        <Scale size={22} />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-stone-950">
                        Blended Approach
                      </h3>
                      <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold">
                        Strategic Hybrid
                      </p>
                      <p className="text-stone-600 text-sm leading-relaxed font-light">
                        Strategic combination of methods to maximize returns while minimizing risk.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* STRATEGY SECTION */}
              <ParallaxBackground 
                imageUrl="https://dewittmosscapital.com/wp-content/uploads/2024/10/pexels-photo-5234277.webp"
                overlayGradient="linear-gradient(to bottom, rgba(20, 20, 20, 0.45), rgba(20, 20, 20, 0.75))"
                minHeight="auto"
                className="relative py-24 bg-stone-900 text-white"
              >
                <div className="container mx-auto px-6 max-w-7xl z-10 relative">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight">
                      Our Strategy
                    </h2>
                    <div className="w-12 h-[1px] bg-[#C5A059] mx-auto"></div>
                  </div>

                  <div className="max-w-4xl mx-auto space-y-12 text-center">
                    <p className="text-white drop-shadow-md text-base md:text-lg leading-relaxed font-light">
                      At DeWitt Moss Dosaj Capital, our strategic framework is centred on attaining a realistic and achievable Internal Rate of Return (IRR) through targeted investments in both established and emerging markets. We engage in a thorough and deliberate selection process for projects and investments that are strategically aligned with our vision. Our focus encompasses:
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 text-left pt-8">
                      <div className="space-y-3 bg-stone-950/75 p-8 rounded border border-stone-800/80 backdrop-blur-sm">
                        <h3 className="font-serif text-xl font-medium text-[#C5A059]">
                          Targeted Market Engagement
                        </h3>
                        <p className="text-stone-200 text-sm leading-relaxed font-light">
                          We prioritize investments in pivotal markets within countries that exhibit substantial growth potential. This strategic approach allows us to tap into diverse opportunities while mitigating risks associated with market fluctuations.
                        </p>
                      </div>

                      <div className="space-y-3 bg-stone-950/75 p-8 rounded border border-stone-800/80 backdrop-blur-sm">
                        <h3 className="font-serif text-xl font-medium text-[#C5A059]">
                          Emphasis on Scalability
                        </h3>
                        <p className="text-stone-200 text-sm leading-relaxed font-light">
                          We place a strong emphasis on identifying projects that not only meet current investment criteria but also possess the capacity for scalability. This ensures that our investments can adapt and grow, maximizing their potential for future expansion.
                        </p>
                      </div>
                    </div>

                    <p className="text-stone-300 text-sm italic font-light pt-6">
                      Through this comprehensive strategy, we aim to create lasting value for our stakeholders while contributing positively to the economic landscapes in which we operate.
                    </p>
                  </div>
                </div>
              </ParallaxBackground>

              {/* MARKET FOCUS SECTION */}
              <section className="py-24 bg-stone-950 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-[0.1em] uppercase">
                      Market Focus
                    </h2>
                    <div className="w-12 h-1 bg-[#C5A059] mx-auto"></div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-12 items-center mb-16">
                    <div className="lg:col-span-1 space-y-4">
                      <span className="text-[#C5A059] text-xs font-semibold uppercase tracking-[0.25em]">
                        Global Deployment
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-light">
                        Pivotal Markets Across Asia
                      </h3>
                      <p className="text-stone-400 text-sm leading-relaxed font-light">
                        We are currently engaged in robust project pipelines across pivotal markets in Asia, with future plans to strategically expand into and deploy further capital in our next round into mature markets in Japan, Australia and South Korea, creating a diversified investment portfolio that leverages both emerging and established markets. The following countries illustrate the percentage breakdown of our current deployment and engagement.
                      </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Singapore */}
                      <div className="bg-stone-900 border border-stone-800 rounded p-6 text-center space-y-2">
                        <span className="text-stone-500 text-[10px] uppercase font-semibold tracking-wider">Confirmed</span>
                        <div className="text-3xl md:text-4xl font-serif text-[#C5A059] font-semibold">32%</div>
                        <div className="text-stone-300 text-[11px] font-bold tracking-wider uppercase">Singapore</div>
                      </div>

                      {/* Vietnam */}
                      <div className="bg-stone-900 border border-stone-800 rounded p-6 text-center space-y-2">
                        <span className="text-stone-500 text-[10px] uppercase font-semibold tracking-wider">Confirmed</span>
                        <div className="text-3xl md:text-4xl font-serif text-[#C5A059] font-semibold">16%</div>
                        <div className="text-stone-300 text-[11px] font-bold tracking-wider uppercase">Vietnam</div>
                      </div>

                      {/* Thailand */}
                      <div className="bg-stone-900 border border-stone-800 rounded p-6 text-center space-y-2">
                        <span className="text-stone-500 text-[10px] uppercase font-semibold tracking-wider">Confirmed</span>
                        <div className="text-3xl md:text-4xl font-serif text-[#C5A059] font-semibold">10%</div>
                        <div className="text-stone-300 text-[11px] font-bold tracking-wider uppercase">Thailand</div>
                      </div>

                      {/* Maldives */}
                      <div className="bg-stone-900 border border-stone-800 rounded p-6 text-center space-y-2">
                        <span className="text-stone-500 text-[10px] uppercase font-semibold tracking-wider">Confirmed</span>
                        <div className="text-3xl md:text-4xl font-serif text-[#C5A059] font-semibold">08%</div>
                        <div className="text-stone-300 text-[11px] font-bold tracking-wider uppercase">Maldives</div>
                      </div>

                      {/* Sri Lanka */}
                      <div className="bg-stone-900 border border-stone-800 rounded p-6 text-center space-y-2">
                        <span className="text-stone-500 text-[10px] uppercase font-semibold tracking-wider">Confirmed</span>
                        <div className="text-3xl md:text-4xl font-serif text-[#C5A059] font-semibold">01%</div>
                        <div className="text-stone-300 text-[11px] font-bold tracking-wider uppercase">Sri Lanka</div>
                      </div>

                      {/* Japan */}
                      <div className="bg-stone-900/40 border border-stone-800/60 rounded p-6 text-center space-y-2 relative overflow-hidden group">
                        <div className="absolute top-2 right-2 bg-stone-800 text-[#C5A059] text-[8px] font-bold uppercase px-1.5 py-0.5 rounded tracking-widest">WIP</div>
                        <span className="text-stone-600 text-[10px] uppercase font-semibold tracking-wider">Targeted</span>
                        <div className="text-2xl md:text-3xl font-serif text-[#C5A059]/50 font-semibold uppercase">TBA</div>
                        <div className="text-stone-400 text-[11px] font-bold tracking-wider uppercase">Japan</div>
                      </div>

                      {/* South Korea */}
                      <div className="bg-stone-900/40 border border-stone-800/60 rounded p-6 text-center space-y-2 relative overflow-hidden group">
                        <div className="absolute top-2 right-2 bg-stone-800 text-[#C5A059] text-[8px] font-bold uppercase px-1.5 py-0.5 rounded tracking-widest">WIP</div>
                        <span className="text-stone-600 text-[10px] uppercase font-semibold tracking-wider">Targeted</span>
                        <div className="text-2xl md:text-3xl font-serif text-[#C5A059]/50 font-semibold uppercase">TBA</div>
                        <div className="text-stone-400 text-[11px] font-bold tracking-wider uppercase">South Korea</div>
                      </div>

                      {/* Other Countries */}
                      <div className="bg-stone-900 border border-stone-800 rounded p-6 text-center space-y-2">
                        <span className="text-stone-500 text-[10px] uppercase font-semibold tracking-wider">Confirmed</span>
                        <div className="text-3xl md:text-4xl font-serif text-[#C5A059] font-semibold">33%</div>
                        <div className="text-stone-300 text-[11px] font-bold tracking-wider uppercase max-w-[120px] mx-auto leading-tight">Other Asian</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ESG COMPLIANCE / CORPORATE RESPONSIBILITY SECTION */}
              <section className="py-24 bg-[#F9F8F4]">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-medium tracking-tight">
                      Corporate Responsibility
                    </h2>
                    <div className="w-12 h-1 bg-[#C5A059] mx-auto"></div>
                  </div>

                  <div className="max-w-4xl mx-auto mb-16 text-center">
                    <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light">
                      We take pride in our commitment to Environmental, Social, and Governance (ESG) compliance in all aspects of managing and investing in our projects. We believe that sustainable practices are essential to driving long-term value and fostering positive societal impact. Our rigorous ESG framework ensures that we prioritize responsible investment strategies, adhere to ethical governance standards, and promote environmental stewardship. By integrating these principles into our decision-making processes, we strive to create not only financial returns but also a better future for communities and the planet.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Environmental */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-6">
                      <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                        <Leaf className="text-[#C5A059]" size={20} />
                        <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-950">
                          ENVIRONMENTAL
                        </h3>
                      </div>
                      <ul className="space-y-2.5 text-stone-600 text-xs tracking-wide">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Energy Usage & Efficiency
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Climate Change Strategy
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Waste Reduction
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Biodiversity Loss
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Greenhouse Gas Emissions
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Carbon Footprint Reduction
                        </li>
                      </ul>
                    </div>

                    {/* Social */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-6">
                      <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                        <Users className="text-[#C5A059]" size={20} />
                        <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-950">
                          SOCIAL
                        </h3>
                      </div>
                      <ul className="space-y-2.5 text-stone-600 text-xs tracking-wide">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Fair Pay and Living Wages
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Equal Employment Opportunity
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Employee Benefits
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Workplace Health & Safety
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Community Engagement
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Responsible Supply-Chain Partnerships
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Adhering to Labor Laws
                        </li>
                      </ul>
                    </div>

                    {/* Governance */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-6">
                      <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                        <Scale className="text-[#C5A059]" size={20} />
                        <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-950">
                          GOVERNANCE
                        </h3>
                      </div>
                      <ul className="space-y-2.5 text-stone-600 text-xs tracking-wide">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Corporate Governance
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Risk Management
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Compliance
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Ethical Business Practices
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Avoiding Conflicts of Interest
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span> Accounting Integrity & Transparency
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* MEETING CALL TO ACTION */}
              <section className="bg-stone-950 text-white py-24 text-center">
                <div className="container mx-auto px-6 max-w-4xl space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight">
                    Schedule a meeting
                  </h2>
                  <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold">
                    Let us know how we can help you
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setShowAppointmentModal(true)}
                      className="px-8 py-4 bg-[#C5A059] text-stone-950 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-white hover:text-stone-950 transition-all cursor-pointer"
                    >
                      Request Appointment
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ABOUT US PAGE */}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* HERO SECTION */}
              <ParallaxBackground 
                imageUrl="https://dewittmosscapital.com/wp-content/uploads/2024/10/free-photo-of-modern-constructions-on-seashore-in-coastal-city.jpeg"
                overlayGradient="linear-gradient(to bottom, rgba(12, 12, 12, 0.4), rgba(12, 12, 12, 0.75))"
                minHeight="500px"
                className="relative flex items-center justify-center text-center bg-stone-950"
              >
                <div className="container mx-auto px-6 max-w-5xl py-24 z-10">
                  <div className="space-y-6">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">
                      About Us
                    </h1>
                    <div className="w-16 h-[1px] bg-[#C5A059]/60 mx-auto"></div>
                    <p className="text-stone-100 drop-shadow-md text-sm md:text-base leading-relaxed font-light max-w-4xl mx-auto text-justify md:text-center">
                      DeWitt Moss Dosaj Capital specializes in delivering customized funding solutions that are meticulously designed to address the distinct requirements of various projects and investment opportunities. Our firm is committed to providing innovative financial strategies, utilizing a diverse range of financial instruments to meet the evolving needs of our clients. At DeWitt Moss Dosaj Capital, we prioritize building lasting partnerships with our clients, ensuring that each solution we offer is not only effective but also aligned with their strategic goals and vision. With our expertise and personalized approach, we strive to stand out in the competitive landscape of capital markets, driving success for our clients and fostering growth in their endeavors.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F9F8F4] to-transparent z-10"></div>
              </ParallaxBackground>

              {/* OUR VISION */}
              <section className="py-24 bg-[#F9F8F4]">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-medium tracking-tight">
                      Our Vision
                    </h2>
                    <p className="text-stone-500 text-xs uppercase tracking-[0.2em] font-semibold">
                      Inspiration and focus
                    </p>
                    <div className="w-12 h-[1px] bg-[#C5A059] mx-auto"></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Vision 01 */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-4 hover:border-[#C5A059]/30 transition-all">
                      <div className="text-2xl font-serif font-bold text-[#C5A059]">01</div>
                      <p className="text-stone-700 text-sm leading-relaxed font-serif italic">
                        “To be the leading provider of bespoke funding solutions that empower innovative projects across Asia and beyond, leveraging our extensive expertise to drive sustainable growth and create lasting impact in the markets we serve.”
                      </p>
                    </div>

                    {/* Vision 02 */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-4 hover:border-[#C5A059]/30 transition-all">
                      <div className="text-2xl font-serif font-bold text-[#C5A059]">02</div>
                      <p className="text-stone-700 text-sm leading-relaxed font-serif italic">
                        “To revolutionize the capital-raising landscape by delivering innovative financial strategies tailored to the unique needs of our clients, ensuring that every project we support contributes to a sustainable and prosperous future.”
                      </p>
                    </div>

                    {/* Vision 03 */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-4 hover:border-[#C5A059]/30 transition-all">
                      <div className="text-2xl font-serif font-bold text-[#C5A059]">03</div>
                      <p className="text-stone-700 text-sm leading-relaxed font-serif italic">
                        “To expand our global footprint and establish DeWitt Moss Dosaj Capital as the premier specialist in capital raising, fostering strategic partnerships and driving economic progress through our commitment to excellence and client-centric solutions.”
                      </p>
                    </div>

                    {/* Vision 04 */}
                    <div className="bg-white p-8 border border-stone-200/50 rounded shadow-sm space-y-4 hover:border-[#C5A059]/30 transition-all">
                      <div className="text-2xl font-serif font-bold text-[#C5A059]">04</div>
                      <p className="text-stone-700 text-sm leading-relaxed font-serif italic">
                        “To champion sustainable investment practices by embedding ESG compliance into our funding solutions, ensuring that every project we undertake not only achieves financial success but also fosters social responsibility and environmental stewardship.”
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FOUNDING PARTNERS */}
              <section className="py-24 bg-stone-900 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight">
                      Founding Partners
                    </h2>
                    <div className="w-12 h-[1px] bg-[#C5A059] mx-auto"></div>
                  </div>

                  <div className="max-w-4xl mx-auto text-center mb-20">
                    <p className="text-stone-300 text-base leading-relaxed font-light">
                      Shane DeWitt, Keith Moss and Arjun Dosaj, the visionary founders of our firm, bring a wealth of expertise with over 77 years of combined experience in the finance sector. Their extensive backgrounds encompass a diverse array of roles and achievements, enabling them to establish a strong foundation for the organization. Together, they are committed to driving innovation and excellence in financial solutions, ensuring the success of both their clients and the company.
                    </p>
                  </div>

                  {/* Bios List */}
                  <div className="space-y-24">
                    {/* Keith Moss */}
                    <div className="grid lg:grid-cols-3 gap-12 items-start border-b border-stone-800 pb-16">
                      <div className="lg:col-span-1 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[#C5A059] text-xs font-semibold uppercase tracking-widest">Co-Founder</span>
                          <h3 className="font-serif text-2xl font-semibold text-white">Keith Moss</h3>
                          <div className="text-stone-500 text-xs">25+ Years Experience</div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 text-stone-300 text-sm leading-relaxed font-light space-y-4 text-justify">
                        <p>
                          Keith is a highly experienced professional with over 25 years in the commercial banking and finance industry, specializing in global cash management, trade finance, and project and asset management. He has a proven track record of managing large accounts, mainly MNCs, large institutional entities, financial institutions and government entities, providing innovative financial solutions tailored to meet diverse client needs. Keith has held significant roles at prestigious banks, including HSBC, OCBC, Royal Bank of Scotland, Wachovia and Wells Fargo. His expertise and proactive approach have established him as a trusted partner for businesses, helping clients optimize financial strategies and achieve success in a dynamic market.
                        </p>
                        <p>
                          Keith is a passionate advocate of financial empowerment, motivated by a commitment to help businesses flourish by maximizing the effectiveness of their financial strategies. He specializes in securing capital for clients’ investment and project requirements, enhancing cash flow management, and streamlining financial processes. With an unwavering emphasis on providing outstanding value, Keith strives to build enduring partnerships that contribute to the growth and success of the organizations he supports.
                        </p>
                      </div>
                    </div>

                    {/* Shane DeWitt */}
                    <div className="grid lg:grid-cols-3 gap-12 items-start border-b border-stone-800 pb-16">
                      <div className="lg:col-span-1 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[#C5A059] text-xs font-semibold uppercase tracking-widest">Co-Founder</span>
                          <h3 className="font-serif text-2xl font-semibold text-white">Shane DeWitt</h3>
                          <div className="text-stone-500 text-xs">22+ Years Experience</div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 text-stone-300 text-sm leading-relaxed font-light space-y-4 text-justify">
                        <p>
                          With a career spanning over 22 years, Shane has become a prominent figure in the banking and finance sector. His extensive experience covers a diverse range of roles, enabling him to develop a deep understanding of the industry. Shane’s journey is marked by his dedication to business development and client relationship management, where he has consistently navigated complex financial landscapes while delivering exemplary service. Shane has worked at several renowned private and boutique banks, successfully managing portfolios for top-level clients, including influential country heads, monarchs, and large commercial entities. His expertise in understanding the unique needs of high-profile clients has allowed him to tailor financial solutions that foster trust and satisfaction, solidifying his reputation as a leader in the industry.
                        </p>
                        <p>
                          Additionally, Shane has built strong relationships with a network of high-level institutional investors globally. He excels in bringing parties together, facilitating connections, and raising capital to meet diverse client needs. His exceptional negotiation skills and strategic insights position him as a key player in driving successful financial partnerships and investment opportunities.
                        </p>
                      </div>
                    </div>

                    {/* Arjun Dosaj */}
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                      <div className="lg:col-span-1 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[#C5A059] text-xs font-semibold uppercase tracking-widest">Co-Founder</span>
                          <h3 className="font-serif text-2xl font-semibold text-white">Arjun Dosaj</h3>
                          <div className="text-stone-500 text-xs">40+ Years Experience</div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 text-stone-300 text-sm leading-relaxed font-light space-y-4 text-justify">
                        <p>
                          Arjun is a seasoned professional with over 30 years of extensive global experience across diverse industries, including Hospitality and Leisure, Private Equity Real Estate, Insurance, Mortgage, Banking, and Business Process Offshoring. His primary expertise is rooted in the Real Estate sector, with a strong focus on Asset Management, Portfolio Management, Distressed Real Estate, and Value Enhancement strategies. In his impressive career, Arjun has held senior leadership positions at prominent organizations such as the Indian Hotels Company, GE Capital, Standard Chartered Bank, and Pacific Star Group. Before founding Avista Asset Management, he served as the President of Asset Management and Group COO at Pacific Star, a leading private equity real estate investment management firm with a pan-Asian focus. In this capacity, Arjun successfully managed a portfolio exceeding $4 billion in real estate assets across Asia, overseeing multi-strategy funds and mandates for institutional investors.
                        </p>
                        <p>
                          During his tenure at Pacific Star, Arjun played a pivotal role in several landmark real estate transactions and turnaround strategies, contributing to high-profile projects such as Capital Square (Singapore), Triple One Somerset (Singapore), The Platinum (Shanghai), Cross Tower (Shanghai), KL Pavilion (Kuala Lumpur), Noon Square (Seoul), GH House (Tokyo), Sathorn Gardens (Bangkok), 8 Thonglor (Bangkok), and Sunrise City (Ho Chi Minh City), among others. At DeWitt Moss Dosaj Capital, Arjun’s current focus is on delivering comprehensive asset management and investment services within the real estate spectrum for clients across Southeast Asia, India, and China. His areas of interest encompass Portfolio & Asset Management, Development Management, Distressed Real Estate assets and portfolios, and Fund Management across various sectors, including Commercial, Retail, Residential, Hospitality, and Retirement Homes & Communities. Arjun is also a certified Six Sigma Black Belt and has received specialized training as an expert in Design for Six Sigma (DFSS) processes, further enhancing his ability to drive operational excellence and innovation within the organizations he serves.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADVISORY FOOTER MEETING LINK */}
              <section className="bg-stone-950 text-white py-24 text-center">
                <div className="container mx-auto px-6 max-w-4xl space-y-6">
                  <h2 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight">
                    Schedule a meeting
                  </h2>
                  <p className="text-[#C5A059] text-sm uppercase tracking-widest font-semibold">
                    Let us know how we can help you
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setShowAppointmentModal(true)}
                      className="px-8 py-4 bg-[#C5A059] text-stone-950 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-white hover:text-stone-950 transition-all cursor-pointer"
                    >
                      Request Appointment
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-0"
            >
              {/* HERO SECTION */}
              <ParallaxBackground 
                imageUrl="https://dewittmosscapital.com/wp-content/uploads/2024/10/pexels-photo-11312733.webp"
                overlayGradient="linear-gradient(to bottom, rgba(12, 12, 12, 0.4), rgba(12, 12, 12, 0.7))"
                minHeight="350px"
                className="relative flex items-center justify-center text-center bg-stone-950"
              >
                <div className="container mx-auto px-6 max-w-4xl py-12 z-10">
                  <div className="space-y-4">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-medium tracking-tight">
                      Contact Us
                    </h1>
                    <div className="w-16 h-[1px] bg-[#C5A059]/60 mx-auto"></div>
                    <p className="text-[#C5A059] text-xs font-semibold uppercase tracking-[0.25em]">
                      Get In Touch
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F9F8F4] to-transparent z-10"></div>
              </ParallaxBackground>

              {/* CONTACT DETAILS GRID */}
              <section className="py-24 bg-[#F9F8F4]">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="grid md:grid-cols-3 gap-12 mb-16 border-b border-stone-200 pb-16">
                    
                    {/* Column 1: Details */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C5A059]/10 rounded flex items-center justify-center text-[#C5A059]">
                          <MapPin size={20} />
                        </div>
                        <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-950">
                          Contact Details
                        </h4>
                      </div>
                      <div className="space-y-3 text-stone-600 text-sm font-light">
                        <p className="flex items-start gap-2.5">
                          <span className="font-semibold text-stone-850">Address:</span> 
                          <span>65 Chulia Street #36-02 OCBC Centre, Singapore 049513</span>
                        </p>
                        <p className="flex items-center gap-2.5">
                          <span className="font-semibold text-stone-850">Number:</span> 
                          <span className="italic text-stone-400">Coming soon</span>
                        </p>
                        <p className="flex items-center gap-2.5">
                          <span className="font-semibold text-stone-850">Email:</span> 
                          <a href="mailto:info@dewittmossdosaj.com" className="text-[#C5A059] hover:underline font-normal">info@dewittmossdosaj.com</a>
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Hours */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C5A059]/10 rounded flex items-center justify-center text-[#C5A059]">
                          <Clock size={20} />
                        </div>
                        <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-950">
                          Working Hours
                        </h4>
                      </div>
                      <div className="text-stone-600 text-sm font-light space-y-1">
                        <p className="font-semibold text-stone-850">Monday to Friday:</p>
                        <p>9.00 AM – 6.00 PM</p>
                        <p className="text-xs text-stone-400 pt-2">Closed on Weekends & Public Holidays</p>
                      </div>
                    </div>

                    {/* Column 3: Follow */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C5A059]/10 rounded flex items-center justify-center text-[#C5A059]">
                          <Globe size={20} />
                        </div>
                        <h4 className="font-serif text-lg font-bold uppercase tracking-wider text-stone-950">
                          Follow Us
                        </h4>
                      </div>
                      <div className="flex gap-4">
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="w-10 h-10 bg-white border border-stone-200 hover:border-[#C5A059] text-stone-600 hover:text-[#C5A059] transition-all rounded flex items-center justify-center"
                        >
                          in
                        </a>
                        <a 
                          href="https://twitter.com" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="w-10 h-10 bg-white border border-stone-200 hover:border-[#C5A059] text-stone-600 hover:text-[#C5A059] transition-all rounded flex items-center justify-center"
                        >
                          𝕏
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-stone-200/60 rounded-lg shadow-sm space-y-8">
                    <div className="text-center space-y-2">
                      <h2 className="font-serif text-2xl md:text-3xl text-stone-950 font-medium">
                        Send Us A Message
                      </h2>
                      <div className="w-12 h-0.5 bg-[#C5A059] mx-auto"></div>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500">First Name</label>
                          <input 
                            type="text" 
                            required
                            value={contactForm.firstName}
                            onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-[#F9F8F4] border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500">Last Name</label>
                          <input 
                            type="text" 
                            required
                            value={contactForm.lastName}
                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-[#F9F8F4] border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F9F8F4] border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500">Message</label>
                        <textarea 
                          rows={6}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F9F8F4] border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                        ></textarea>
                      </div>

                      {contactSuccess && (
                        <div className="p-4 bg-emerald-50 text-emerald-800 text-sm border border-emerald-200 rounded">
                          The form has been submitted successfully!
                        </div>
                      )}

                      {contactError && (
                        <div className="p-4 bg-rose-50 text-rose-800 text-sm border border-rose-200 rounded">
                          There has been some error while submitting the form. Please verify all form fields again.
                        </div>
                      )}

                      <div className="text-center pt-2">
                        <button 
                          type="submit"
                          className="px-8 py-4 bg-stone-950 text-white text-xs font-bold uppercase tracking-[0.25em] rounded hover:bg-[#C5A059] hover:text-stone-950 transition-all cursor-pointer inline-flex items-center gap-2 group"
                        >
                          send <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER & CONTACT DETAILS */}
      <footer className="bg-stone-950 text-white border-t border-stone-900 py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12 items-start">
            
            {/* Branding */}
            <div className="space-y-4">
              <div 
                className="flex items-end gap-3 cursor-pointer group" 
                onClick={() => navigateTo('home')}
              >
                <Logo 
                  className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                  variant="gold"
                />
                <div className="flex flex-col select-none">
                  <span 
                    className="font-serif font-bold text-base tracking-[0.12em] text-[#C5A059] leading-tight"
                  >
                    DEWITT MOSS DOSAJ
                  </span>
                  <span 
                    className="font-serif text-[10px] font-medium tracking-wide italic text-stone-400"
                  >
                    Funding Dreams, Fueling Growth
                  </span>
                </div>
              </div>
              <p className="text-stone-400 text-xs font-light leading-relaxed max-w-xs">
                Bespoke funding and capital advisory services engineered for institutional success across pivotal Asian markets.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C5A059]">
                Menu
              </h4>
              <ul className="space-y-2 text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
                <li>
                  <button onClick={() => navigateTo('home')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Home</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('about')} className="hover:text-[#C5A059] transition-colors cursor-pointer">About</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('contact')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Contact</button>
                </li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C5A059]">
                Contact Details
              </h4>
              <div className="space-y-2.5 text-xs font-light text-stone-400">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>65 Chulia Street #36-02 OCBC Centre, Singapore 049513</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-[#C5A059] flex-shrink-0" />
                  <a href="mailto:info@dewittmossdosaj.com" className="hover:text-[#C5A059] transition-colors">info@dewittmossdosaj.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C5A059] flex-shrink-0" />
                  <span>Mon to Fri: 9.00 AM – 6.00 PM</span>
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-stone-500 font-light tracking-wider">
            <p>Copyright &copy; 2026 DeWitt Moss Dosaj Capital Pte Ltd. All Rights Reserved.</p>
            <p className="flex gap-1 items-center">
              <span>Powered by</span> <span className="font-semibold text-stone-400">DeWitt Moss Dosaj Capital Pte Ltd</span>
            </p>
          </div>
        </div>
      </footer>

      {/* APPOINTMENT REQUEST MODAL */}
      <AnimatePresence>
        {showAppointmentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppointmentModal(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#F9F8F4] rounded-lg shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[90vh] flex flex-col justify-between"
            >
              {/* Modal Header */}
              <div className="bg-stone-950 text-white p-6 flex justify-between items-center border-b border-stone-800">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-medium tracking-tight text-white">
                    Request Appointment
                  </h3>
                  <p className="text-[#C5A059] text-[10px] uppercase tracking-wider font-semibold">
                    Submit capital advisory session details
                  </p>
                </div>
                <button 
                  onClick={() => setShowAppointmentModal(false)}
                  className="p-1 text-stone-400 hover:text-white rounded focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable Form */}
              <form onSubmit={handleAppointmentSubmit} className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
                {appointmentSuccess ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Check size={32} />
                    </div>
                    <h4 className="font-serif text-xl text-stone-950 font-semibold">Request Received</h4>
                    <p className="text-stone-600 text-sm font-light max-w-md mx-auto">
                      Thank you for submitting your request. An underwriting officer from DeWitt Moss Dosaj Capital will contact you shortly to confirm your scheduled appointment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Full Name & Company */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-stone-600">
                          Your Full Name <span className="text-[#C5A059]">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. John Doe"
                          value={appointmentForm.name}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-stone-300"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-stone-600">
                          Your Company <span className="text-[#C5A059]">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Acquired Holdings Ltd"
                          value={appointmentForm.company}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, company: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-stone-300"
                        />
                      </div>
                    </div>

                    {/* Email & Contact Number */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-stone-600">
                          Corporate Email <span className="text-[#C5A059]">*</span>
                        </label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. j.doe@company.com"
                          value={appointmentForm.email}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-stone-300"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-stone-600">
                          Contact Number
                        </label>
                        <input 
                          type="tel" 
                          placeholder="e.g. +65 9123 4567"
                          value={appointmentForm.phone}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-stone-300"
                        />
                      </div>
                    </div>

                    {/* Message / Brief */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-stone-600">
                        Message or Brief Regarding Your Project <span className="text-[#C5A059]">*</span>
                      </label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Please provide a brief overview of your capital requirements or project details..."
                        value={appointmentForm.message}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded text-stone-900 text-sm focus:outline-none focus:border-[#C5A059] transition-colors resize-none placeholder:text-stone-300"
                      ></textarea>
                    </div>

                    <div className="text-right pt-4 border-t border-stone-200/60 flex justify-between items-center gap-3">
                      <span className="text-[10px] text-stone-400 italic">* Required fields</span>
                      <div className="flex gap-3">
                        <button 
                          type="button"
                          onClick={() => setShowAppointmentModal(false)}
                          className="px-6 py-3 border border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-wider rounded hover:bg-stone-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-6 py-3 bg-stone-950 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-[#C5A059] hover:text-stone-950 transition-colors cursor-pointer"
                        >
                          Submit Request
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
