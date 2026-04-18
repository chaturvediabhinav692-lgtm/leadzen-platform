import { Link } from 'react-router-dom';

export default function Products() {
  const products = [
    {
      id: 'leadzen',
      name: 'LeadZen',
      description: 'The ultimate lead generation and CRM for modern sales teams.',
      status: 'active',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
    },
    {
      id: 'analyze-pro',
      name: 'AnalyzePro',
      description: 'Enterprise-grade data visualization and business intelligence.',
      status: 'upcoming',
      icon: (
        <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
    },
    {
      id: 'secure-connect',
      name: 'SecureConnect',
      description: 'Zero-trust connectivity and identity protection for teams.',
      status: 'upcoming',
      icon: (
        <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Our Ecosystem</h1>
          <p className="text-white/50 text-lg">Integrated solutions designed to scale with your business goals.</p>
        </div>

        <div className="grid gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`p-8 rounded-3xl glass-dark border border-white/5 transition-all flex flex-col md:flex-row items-center gap-8 ${
                product.status === 'active' ? 'hover:border-white/20' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`p-6 rounded-2xl ${product.status === 'active' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/5'} flex-shrink-0`}>
                {product.icon}
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                  {product.status === 'upcoming' && (
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30 border border-white/5">Upcoming</span>
                  )}
                </div>
                <p className="text-white/40 leading-relaxed max-w-xl">{product.description}</p>
              </div>
              {product.status === 'active' ? (
                <Link 
                  to={`/products/${product.id}`}
                  className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-colors flex-shrink-0"
                >
                  Learn More
                </Link>
              ) : (
                <button disabled className="px-8 py-3 rounded-xl border border-white/10 text-white/40 font-medium flex-shrink-0">
                  Notify Me
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
