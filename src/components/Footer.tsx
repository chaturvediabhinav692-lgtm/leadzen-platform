import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm">E</div>
              <span className="text-lg font-bold tracking-tight text-white uppercase">Euonex</span>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed font-medium">
              Building scalable, intelligent platforms that empower businesses to lead with efficiency.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Products</h4>
            <ul className="space-y-3">
              {[
                { label: 'LeadZen', to: '/products/leadzen' },
                { label: 'AnalyzePro', to: '/products', disabled: true },
                { label: 'SecureConnect', to: '/products', disabled: true },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.to} 
                    className={`text-xs font-bold transition-colors ${
                      item.disabled 
                        ? 'text-white/10 cursor-default' 
                        : 'text-white/30 hover:text-white'
                    }`}
                  >
                    {item.label} {item.disabled && <span className="text-[8px] text-white/10 ml-1 uppercase">Soon</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'Login', to: '/login' },
                { label: 'Sign Up', to: '/signup' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-xs font-bold text-white/30 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Contact</h4>
            <ul className="space-y-3">
              <li className="text-xs font-bold text-white/30">support@euonex.com</li>
              <li className="text-xs font-bold text-white/30">chaturvediabhinav692@gmail.com</li>
              <li className="text-xs font-bold text-white/30">Jaipur, India</li>
              <li className="text-xs font-bold text-white/30">+91 9119369769</li>
              <li className="text-xs font-bold text-white/30">+91 8955837982</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
            © {new Date().getFullYear()} Euonex Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Status'].map((item) => (
              <span key={item} className="text-[10px] font-bold text-white/10 uppercase tracking-widest hover:text-white/30 cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
