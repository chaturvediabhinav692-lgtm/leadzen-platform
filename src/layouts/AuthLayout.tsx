export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center px-4 font-body">
            <div className="w-full max-w-md border border-white/5 rounded-[2.5rem] p-10 bg-[#0b0c10] shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
