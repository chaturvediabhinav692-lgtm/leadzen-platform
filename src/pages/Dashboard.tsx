import { useMemo } from 'react';
import { 
  Users, TrendingUp, DollarSign,
  Activity, 
  Calendar,
  ArrowRight,
  Zap,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useLeadAnalytics } from '@/modules/leads/hooks/useLeads';
import { BackendUnavailable } from '@/components/BackendUnavailable';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: metrics, isLoading, error, refetch } = useLeadAnalytics();

  // Derived chart data
  const pieData = useMemo(() => {
    if (!metrics?.conversionStats) return [];
    const colors: Record<string, string> = {
      'PENDING': '#8b5cf6', 
      'QUALIFIED': '#3b82f6',
      'CONVERTED': '#10b981',
      'LOST': '#64748b',
    };
    return metrics.conversionStats.map(stat => ({
      ...stat,
      name: stat.name.toUpperCase(),
      color: colors[stat.name.toUpperCase()] || '#94a3b8'
    }));
  }, [metrics?.conversionStats]);

  if (error) return <BackendUnavailable onRetry={() => refetch()} message={error.message} />;

  if (isLoading || !metrics) {
    return (
      <div className="space-y-12 animate-pulse pb-24">
        <div className="h-12 w-64 bg-white/5 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 bg-white/5 rounded-[2rem]" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 h-96 bg-white/5 rounded-[3rem]" />
           <div className="h-96 bg-white/5 rounded-[3rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase tracking-tighter">Real-Time Ops</h1>
          <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-bold pl-0.5">Production-grade SaaS analytics</p>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/5">
           <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Activity size={20} />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">System Health</span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Operational</span>
           </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Leads', value: metrics?.totalLeads ?? 0, icon: Users, color: 'text-blue-400', sub: 'Indexed Dataset' },
          { label: 'New This Month', value: metrics?.leadsThisMonth ?? 0, icon: Calendar, color: 'text-purple-400', sub: 'Inbound Flow' },
          { label: 'Converted', value: metrics?.convertedThisMonth ?? 0, icon: TrendingUp, color: 'text-emerald-400', sub: 'Successful Closes' },
          { label: 'Total Revenue', value: `$${(metrics?.totalRevenue ?? 0).toLocaleString()}`, icon: DollarSign, color: 'text-amber-400', sub: 'Computed Value' },
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] glass-dark border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <stat.icon size={80} />
             </div>
             <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                   <stat.icon size={16} />
                </div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.label}</span>
             </div>
             <div className="space-y-1">
                <h2 className="text-3xl font-black text-white tracking-tight">{stat.value}</h2>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{stat.sub}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 p-10 rounded-[3rem] glass-dark border border-white/5">
           <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                 <h3 className="text-lg font-black text-white uppercase tracking-tight">Leads Acquisition</h3>
                 <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Temporal engagement trend</p>
              </div>
           </div>
           
           <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.monthlyLeads || []}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 900 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }} 
                  itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  labelStyle={{ color: '#ffffff40', fontSize: '10px', fontWeight: '900', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#fff" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                />
              </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Status Distribution */}
        <div className="p-10 rounded-[3rem] glass-dark border border-white/5 flex flex-col">
           <div className="space-y-1 mb-12 text-center lg:text-left">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Market Segment</h3>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Leads state distribution</p>
           </div>

           {pieData.length > 0 ? (
             <>
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={10}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieData[index].color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }}
                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {pieData.map((seg, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{seg.name}</span>
                          <span className="text-xs font-bold text-white tracking-widest">{seg.value}</span>
                       </div>
                    </div>
                  ))}
                </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Users size={48} className="text-white/5" />
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">No segments found</p>
             </div>
           )}
        </div>
      </div>

      {/* Onboarding Guidance for New Users */}
      {metrics?.totalLeads === 0 && (
        <section className="mt-12 p-12 rounded-[4rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="w-24 h-24 rounded-[3rem] bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap size={48} strokeWidth={2.5} />
           </div>
           <div className="flex-1 space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Welcome to LeadZen Hub</h3>
              <p className="text-sm text-white/40 font-medium leading-relaxed max-w-2xl">
                Your dashboard is currently waiting for data. Start by uploading your first property dataset or manual intake to begin tracking conversion intelligence.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                 <button 
                   onClick={() => navigate('/data-upload')}
                   className="px-8 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-xl shadow-white/5 active:scale-95"
                 >
                    <Upload size={16} strokeWidth={3} />
                    Upload Data
                 </button>
                 <button 
                   onClick={() => navigate('/leads')}
                   className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95"
                 >
                    Manual Intake
                    <ArrowRight size={16} strokeWidth={3} />
                 </button>
              </div>
           </div>
        </section>
      )}
    </div>
  );
}
