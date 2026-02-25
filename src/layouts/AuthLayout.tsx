export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md border border-white/10 rounded-2xl p-8 bg-neutral-900 shadow-xl">
                {children}
            </div>
        </div>
    );
}
