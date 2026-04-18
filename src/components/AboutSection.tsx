import { Brain, Clock, Target, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="container mx-auto px-6 max-w-[1200px] py-24">
      <div className="p-10 md:p-16 rounded-[3rem] glass-dark border border-white/5 space-y-16 relative overflow-hidden shadow-2xl mt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-white/5 blur-[100px] pointer-events-none"></div>

        <div className="text-center space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tight">About LeadZen</h2>
          <p className="text-xl text-white/50 max-w-3xl mx-auto font-light">
            Redefining how businesses discover, qualify, and convert leads in the age of AI.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-white/40 leading-relaxed space-y-6 text-lg relative z-10 text-center md:text-left">
          <p>
            LeadZen is built to solve one of the most critical problems in modern business — identifying the right customers at the right time.
          </p>
          <p>
            Traditional lead management systems are reactive, fragmented, and inefficient. Businesses waste time chasing low-quality prospects while missing high-value opportunities. <strong className="text-white font-medium">LeadZen changes that.</strong>
          </p>
          <p>
            By combining real-time data processing, AI-driven lead scoring, and intelligent automation, LeadZen enables teams to focus only on leads that matter — turning data into revenue with precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
            <p className="text-white/40 leading-relaxed">
              To create a unified intelligence layer for businesses where every lead is understood, prioritized, and converted with maximum efficiency.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
            <p className="text-white/40 leading-relaxed">
              To empower businesses with AI-driven tools that eliminate guesswork and bring clarity, speed, and scalability to lead management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/5 relative z-10">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Brain className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">AI First</h4>
            <p className="text-sm text-white/40">Decisions backed by intelligence</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">Real-Time</h4>
            <p className="text-sm text-white/40">No delays, instant insights</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">Precision</h4>
            <p className="text-sm text-white/40">Focus only on high-value leads</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-lg">Simplicity</h4>
            <p className="text-sm text-white/40">Powerful, yet easy to use</p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5 relative z-10">
          <p className="text-2xl md:text-3xl font-medium text-white tracking-tight">
            LeadZen is not just a CRM — it's a decision engine for growth.
          </p>
        </div>
      </div>
    </section>
  );
}
