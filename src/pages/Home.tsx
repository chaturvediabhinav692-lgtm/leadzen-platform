import { Link } from 'react-router-dom';
import AboutEuonexSection from '@/components/AboutEuonexSection';

export default function Home() {
  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 text-center space-y-12">
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-white/60 font-medium tracking-widest uppercase text-sm">Welcome to Euonex</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            One Platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Infinite Business Possibilities.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed">
            At Euonex, we build scalable, intelligent SaaS platforms that empower businesses to operate with clarity, speed, and precision. <br /><br />
            From AI-driven decision systems to data-centric infrastructure, Euonex is designed to transform how modern businesses grow, adapt, and compete in a rapidly evolving digital landscape.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link to="/products/leadzen" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-xl shadow-white/10">Explore LeadZen</Link>
          <Link to="/products" className="px-8 py-4 rounded-full border border-white/10 glass-dark font-medium hover:bg-white/5 transition-colors">View Products</Link>
        </div>
      </section>

      {/* About Section */}
      <AboutEuonexSection />

      {/* Product Showcase Cards (Teasers) */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-24 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="p-8 rounded-3xl glass-dark border border-white/5 hover:border-white/10 transition-all group text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
              <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">LeadZen</h3>
            <p className="text-white/40 text-sm">Our flagship CRM and lead generation platform. Real-time data, AI scoring, and seamless automation.</p>
          </div>

          <div className="p-8 rounded-3xl glass-dark border border-white/5 opacity-50 text-left">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white/50 mb-2">AnalyzePro</h3>
            <p className="text-white/30 text-sm">Advanced data analytics and visualization. Coming soon to the Euonex ecosystem.</p>
          </div>

          <div className="p-8 rounded-3xl glass-dark border border-white/5 opacity-50 text-left">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
               <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white/50 mb-2">SecureConnect</h3>
            <p className="text-white/30 text-sm">Zero-trust network access for your enterprise team. Enhancing security across all platforms.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
