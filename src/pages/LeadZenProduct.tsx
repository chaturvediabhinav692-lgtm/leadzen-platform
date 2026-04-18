import { Link } from 'react-router-dom';
import AboutSection from '@/components/AboutSection';

export default function LeadZenProduct() {
  const features = [
    { title: 'Real-time Lead Tracking', description: 'Monitor every interaction as it happens with our live dashboard.' },
    { title: 'AI-Powered Lead Scoring', description: 'Intelligent lead prioritization using our proprietary machine learning models.' },
    { title: 'Seamless CRM Integration', description: 'Sync with Salesforce, HubSpot, or our custom enterprise API.' },
    { title: 'Omnichannel Outreach', description: 'Reach leads via email, SMS, and WhatsApp from a single interface.' },
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$149',
      period: '/mo',
      description: 'Best for individual agents',
      features: [
        'AI conversations across SMS, Email, WhatsApp',
        'Up to ~1000 conversations/month',
        'Smart AI auto-replies and follow-ups',
        '1 phone number integration',
        'Basic automation',
        'Limit: 1 user'
      ],
      cta: 'Get Started',
      highlight: false
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '$199',
      period: '/mo',
      description: 'Best Value',
      features: [
        'Everything in Starter',
        'Same conversation limit (~1000/month)',
        'Static business website (template-based)',
        'Basic analytics dashboard',
        'Multi-channel automation flows',
        'Limit: 1 user'
      ],
      cta: 'Choose Growth',
      highlight: true,
      badge: 'Most Popular'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$299',
      period: '/mo',
      description: 'Best for high-volume agents',
      features: [
        'Everything in Growth',
        'Up to ~2000 conversations/month (2x Starter)',
        'Custom-designed website (unique per client)',
        'Advanced branding customization',
        'Multi-number support',
        'Limit: 1 user'
      ],
      cta: 'Go Pro',
      highlight: false
    }
  ];

  const addons = [
    { 
      id: 'conversations',
      name: 'Conversations Boost', 
      price: '$15', 
      period: '', 
      description: '+1000 conversations',
      features: [
        'Extends monthly capacity',
        'Omnichannel support',
        'No expiration on boost'
      ],
      cta: 'Add Boost',
      highlight: false
    },
    { 
      id: 'sms',
      name: 'SMS Boost', 
      price: '$12', 
      period: '', 
      description: '+1000 SMS',
      features: [
        'Increase SMS volume',
        'Direct carrier delivery',
        'Global outreach'
      ],
      cta: 'Add Boost',
      highlight: false
    },
    { 
      id: 'email',
      name: 'Email Boost', 
      price: '$8', 
      period: '', 
      description: '+2000 emails',
      features: [
        'More monthly emails',
        'Spam-aware sending',
        'Attachment support'
      ],
      cta: 'Add Boost',
      highlight: false
    },
    { 
      name: 'Extra Number', 
      price: 'Coming Soon', 
      period: '', 
      description: 'Additional phone number',
      features: [
        'Local number provisioning',
        'Inbound call routing',
        'Multi-number support'
      ],
      cta: 'Coming Soon',
      highlight: false,
      badge: 'Coming Soon'
    }
  ];

  const customPlan = {
    name: 'Custom Plan',
    price: 'Custom',
    period: '',
    description: 'Need more than Pro? Get a plan tailored to your business.',
    features: [
      'Increase conversation limits beyond plan caps',
      'Higher WhatsApp and SMS capacity',
      'Tailored setup based on your requirements',
      'Designed for high-volume agents'
    ],
    cta: 'Request Custom Plan',
    highlight: true,
    badge: 'Enterprise',
    contactEmail: 'support@euonex.com',
    footer: 'We’ll review your requirements and get back with a tailored plan.'
  };

  const comparison = [
    { feature: 'Conversations limit', starter: '1,000', growth: '1,000', pro: '2,000' },
    { feature: 'Website', starter: 'None', growth: 'Static (Template)', pro: 'Custom Design' },
    { feature: 'Analytics', starter: 'None', growth: 'Basic Dashboard', pro: 'Advanced Metrics' },
    { feature: 'Phone Numbers', starter: '1', growth: '1', pro: 'Multiple' },
    { feature: 'User Limit', starter: '1 User', growth: '1 User', pro: '1 User' },
  ];

  const paymentLinks: Record<string, string> = {
    starter: "https://rzp.io/rzp/7leIQGn",
    growth: "https://rzp.io/rzp/1M1EUTTi",
    pro: "https://rzp.io/rzp/mRevaeFG",
    conversations: "https://rzp.io/rzp/b7Uh6Ek",
    sms: "https://rzp.io/rzp/vkRG46a7",
    email: "https://rzp.io/rzp/oXVA0k6U"
  };

  const handlePayment = (planId: string) => {
    const link = paymentLinks[planId.toLowerCase()];
    if (link) {
      if (['starter', 'growth', 'pro'].includes(planId.toLowerCase())) {
        localStorage.setItem("selected_plan", planId);
      } else {
        localStorage.setItem("addon_selected", planId);
      }
      window.location.href = link;
    }
  };

  const PricingCard = ({ plan, compact = false, id = '' }: { plan: any, compact?: boolean, id?: string }) => {
    const isPayable = Object.keys(paymentLinks).includes(id.toLowerCase());
    const isCustom = id.toLowerCase() === 'custom';

    return (
      <div className={`rounded-[2.5rem] glass-dark border flex flex-col items-center text-center space-y-8 transition-all hover:scale-[1.02] ${
        plan.highlight ? 'border-primary ring-1 ring-primary/20 scale-105 bg-white/5 z-10' : 'border-white/5'
      } ${compact ? 'p-8' : 'p-10'}`}>
        {plan.badge && (
          <div className="px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] -mt-14 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.3)] whitespace-nowrap">{plan.badge}</div>
        )}
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-white/60">{plan.name}</h4>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-black max-w-[200px] mx-auto">{plan.description}</p>
        </div>
        <div className={`${compact ? 'text-2xl' : 'text-5xl'} font-black text-white flex items-baseline gap-1`}>
          {plan.price}
          {plan.period && <span className="text-sm font-bold text-white/30">{plan.period}</span>}
        </div>
        <ul className="space-y-4 flex-1 text-left w-full">
          {plan.features.map((item: string, j: number) => (
            <li key={j} className="text-xs text-white/40 flex items-start gap-3">
              <svg className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {isCustom && plan.contactEmail && (
          <div className="w-full space-y-4 border-t border-white/5 pt-8 mt-auto">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">To request a custom plan, contact us at:</p>
            <a 
              href={`mailto:${plan.contactEmail}`}
              className="text-lg font-bold text-white hover:text-primary transition-colors block underline decoration-primary/30 underline-offset-8"
            >
              {plan.contactEmail}
            </a>
            {plan.footer && (
              <p className="text-[10px] text-white/20 italic mt-4">{plan.footer}</p>
            )}
          </div>
        )}

        {!isCustom && (
          isPayable ? (
            <button 
              onClick={() => handlePayment(id)}
              disabled={plan.cta === 'Coming Soon'}
              className={`w-full py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-widest ${
                plan.cta === 'Coming Soon' ? 'bg-white/5 text-white/20 cursor-not-allowed' :
                plan.highlight ? 'bg-white text-black hover:bg-white/90 btn-glow' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </button>
          ) : (
            <button 
              disabled={plan.cta === 'Coming Soon'}
              className={`w-full py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-widest ${
                plan.cta === 'Coming Soon' ? 'bg-white/5 text-white/20 cursor-not-allowed' :
                plan.highlight ? 'bg-white text-black hover:bg-white/90 btn-glow' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <Link to={plan.cta === 'Coming Soon' ? '#' : '/signup'} className="w-full h-full block">
                {plan.cta}
              </Link>
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <div className="pt-32 pb-24 space-y-32">
      {/* Hero */}
      <section className="container mx-auto px-6 text-center space-y-12">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest">
            Flagship Product
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-widest leading-none">
            LEADZEN
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/50 leading-relaxed font-light">
            Never miss a lead. Respond instantly across channels. AI handles follow-ups automatically.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Link to="/signup" className="px-10 py-5 rounded-2xl bg-white text-black font-extrabold hover:scale-105 transition-all shadow-2xl shadow-white/20">Start Free Trial</Link>
          <Link to="/login" className="px-10 py-5 rounded-2xl glass-dark border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Login</Link>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Features Grid */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl glass-dark border border-white/5 space-y-4 hover:border-white/20 transition-all group">
              <h3 className="text-lg font-bold text-white group-hover:text-glow transition-all">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Simple, Premium Pricing</h2>
          <p className="text-white/40 max-w-xl mx-auto">Flexible US-only plans designed for solo agents. Scale your impact without increasing your workload.</p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={i} plan={plan} id={plan.id} />
          ))}
        </div>

        {/* Capacity Note */}
        <div className="text-center">
           <p className="text-xs font-black uppercase tracking-[0.3em] text-white/20 animate-pulse">Need more capacity? Add-ons available below</p>
        </div>

        {/* Comparison Table */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Compare Plans</h3>
            <p className="text-sm text-white/30 tracking-widest uppercase font-black">Plan Matchmaker</p>
          </div>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-6 px-4 text-left text-[10px] font-black uppercase tracking-widest text-white/20 uppercase">Feature</th>
                  <th className="py-6 px-4 text-center text-sm font-bold text-white/60">Starter</th>
                  <th className="py-6 px-4 text-center text-sm font-bold text-white">Growth</th>
                  <th className="py-6 px-4 text-center text-sm font-bold text-white/60">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparison.map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-4 text-sm font-medium text-white/50 group-hover:text-white transition-colors">{row.feature}</td>
                    <td className="py-5 px-4 text-center text-sm text-white/30">{row.starter}</td>
                    <td className="py-5 px-4 text-center text-sm text-white font-medium bg-white/[0.01]">{row.growth}</td>
                    <td className="py-5 px-4 text-center text-sm text-white/30">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">Usage Add-ons</h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm">Only pay for what you need — scale without upgrading your plan</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {addons.map((addon, i) => (
              <PricingCard key={i} plan={addon} id={addon.id || ''} compact />
            ))}
          </div>
        </div>

        {/* Custom Plan Section */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">Custom Plan</h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm">Need more than Pro? Get a plan tailored to your business.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <PricingCard plan={customPlan} id="custom" />
          </div>
        </div>

        {/* Important Notes */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-white/5 border border-white/5 p-8 space-y-4">
          <div className="flex items-center gap-3 text-white/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Important Notes</span>
          </div>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="text-xs text-white/40 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
              <span>1 conversation = a 24-hour interaction window with a lead</span>
            </li>
            <li className="text-xs text-white/40 flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
              <span>Usage beyond plan limits is billed via add-ons</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
