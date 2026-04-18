import { memo } from 'react';
import { MessageSquare, Mail, Phone, Send } from 'lucide-react';

interface LeadContactActionsProps {
  phone?: string;
  email?: string;
  name?: string;
  telegramUsername?: string;
}

/**
 * Reusable Lead Contact Actions Component
 * Handles WhatsApp, Email, Call, SMS, and Telegram protocols with proper encoding and sanitization.
 */
function LeadContactActions({ phone, email, name, telegramUsername }: LeadContactActionsProps) {
  // Normalize phone for technical protocols (wa.me, tel, sms)
  const normalizePhone = (p: string) => p.replace(/\D/g, '');
  
  // URL Generation with proper encoding
  const cleanPhone = phone ? normalizePhone(phone) : '';
  
  const waUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${name || 'there'}, I'm contacting you regarding your inquiry.`)}` 
    : '#';
    
  const emailUrl = email 
    ? `mailto:${email}?subject=Lead Follow Up&body=${encodeURIComponent(`Hello ${name || 'there'}, I am reaching out regarding your interest.`)}` 
    : '#';
    
  const callUrl = cleanPhone ? `tel:${cleanPhone}` : '#';
  
  const smsUrl = cleanPhone 
    ? `sms:${cleanPhone}?body=${encodeURIComponent(`Hi ${name || 'there'}, following up on your request.`)}` 
    : '#';

  const tgUrl = telegramUsername
    ? `https://t.me/${telegramUsername.replace(/^@/, '')}`
    : `https://t.me/share/url?text=${encodeURIComponent(`Hello ${name || 'there'}, regarding your property interest`)}`;

  const ActionButton = ({ 
    href, 
    icon: Icon, 
    label, 
    colorClass, 
    disabled 
  }: { 
    href: string; 
    icon: any; 
    label: string; 
    colorClass: string; 
    disabled: boolean;
  }) => (
    <div className="relative group">
      <a
        href={disabled ? undefined : href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        className={`
          flex items-center justify-center p-3 rounded-xl transition-all duration-300
          ${disabled 
            ? 'bg-white/5 text-white/5 cursor-not-allowed border border-white/5' 
            : `bg-white/5 border border-white/5 ${colorClass} hover:scale-125 hover:bg-white/10 cursor-pointer active:scale-95`
          }
        `}
      >
        <Icon size={16} className={`transition-all duration-300 ${!disabled ? 'group-hover:drop-shadow-[0_0_8px_currentColor] group-hover:scale-110' : ''}`} />
      </a>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-[0.1em] shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-md whitespace-nowrap">
        {disabled ? 'Not available' : label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/90" />
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <ActionButton 
        href={waUrl} 
        icon={MessageSquare} 
        label="WhatsApp" 
        colorClass="text-emerald-500/40 hover:text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
        disabled={!phone} 
      />
      <ActionButton 
        href={emailUrl} 
        icon={Mail} 
        label="Email" 
        colorClass="text-blue-500/40 hover:text-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
        disabled={!email} 
      />
      <ActionButton 
        href={callUrl} 
        icon={Phone} 
        label="Call" 
        colorClass="text-indigo-500/40 hover:text-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
        disabled={!phone} 
      />
      <ActionButton 
        href={smsUrl} 
        icon={Send} 
        label="SMS" 
        colorClass="text-amber-500/40 hover:text-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
        disabled={!phone} 
      />
      <ActionButton 
        href={tgUrl} 
        icon={Send} 
        label="Message via Telegram" 
        colorClass="text-sky-500/40 hover:text-sky-400 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.1)]" 
        disabled={false} // Telegram fallback share URL is always available
      />
    </div>
  );
}

export default memo(LeadContactActions);
