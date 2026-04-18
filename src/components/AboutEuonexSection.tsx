import { Brain, Layers, Clock, Sparkles } from 'lucide-react';

export default function AboutEuonexSection() {
  return (
    <section className="container mx-auto px-6 max-w-[1200px] py-24">
      <div className="p-10 md:p-16 rounded-[3rem] glass-dark border border-white/5 space-y-16 relative overflow-hidden shadow-2xl mt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-white/5 blur-[100px] pointer-events-none"></div>

        <div className="text-center space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tight">About Euonex</h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto font-light">
            Building the intelligence layer for the next generation of SaaS.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-white/40 leading-relaxed space-y-6 text-lg relative z-10 text-center md:text-left">
          <p>
            Euonex is a technology ecosystem focused on building powerful, scalable SaaS platforms that solve real-world business problems.
          </p>
          <p>
            Modern businesses operate in increasingly complex environments — fragmented data, inefficient workflows, and delayed decision-making limit growth and scalability.
          </p>
          <p>
            Euonex addresses these challenges by developing intelligent systems that unify data, automate processes, and enable faster, more accurate decisions.
          </p>
          <p>
            Our platforms are designed to not just support businesses — but to enhance how they think, operate, and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
            <p className="text-white/40 leading-relaxed">
              To become the foundational intelligence layer powering the next generation of global SaaS platforms.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
            <p className="text-white/40 leading-relaxed">
              To build scalable, AI-driven products that simplify complexity, accelerate decision-making, and unlock new levels of efficiency for businesses worldwide.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/5 relative z-10">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Brain className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">AI-Driven</h4>
            <p className="text-sm text-white/40">Systems designed to think, adapt, and optimize continuously.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">Scalable by Design</h4>
            <p className="text-sm text-white/40">Built to grow seamlessly with business needs.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">Real-Time Intelligence</h4>
            <p className="text-sm text-white/40">Instant insights for faster and smarter decisions.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">Simplicity First</h4>
            <p className="text-sm text-white/40">Powerful systems made intuitive and easy to use.</p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5 relative z-10">
          <p className="text-2xl md:text-3xl font-medium text-white tracking-tight">
            Euonex is not just a platform — it's the foundation for intelligent business systems
          </p>
        </div>
      </div>
    </section>
  );
}
