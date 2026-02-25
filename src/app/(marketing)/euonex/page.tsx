"use client";

import Hero from "@/components/marketing/Hero";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import TrustStrip from "@/components/marketing/TrustStrip";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import ProductCard from "@/components/marketing/ProductCard";
import Section from "@/components/marketing/Section";

export default function EuonexHomePage() {
    return (
        <div className="min-h-screen bg-black overflow-x-hidden">
            <Navbar />

            <main>
                {/* Section 1: Hero */}
                <Hero
                    title="We Build Systems That Convert"
                    subtitle="Automation-driven platforms for high-performance businesses. Engineered for speed, styled for impact."
                />

                {/* Section 2: Trust Strip */}
                <TrustStrip />

                {/* Section 3: Products Preview */}
                <section className="bg-black py-16 relative z-10">
                    <Section
                        title="Our Products"
                        subtitle="Precision business tools built for growth."
                        className="py-0"
                    >
                        <div className="max-w-4xl mx-auto px-6">
                            <ProductCard
                                title="Leadzen"
                                tag="Flagship Platform"
                                description="The ultimate WhatsApp-first lead conversion system. Turn conversations into revenue with real-time execution dashboards and automated hot-lead prioritization."
                                features={[
                                    "WhatsApp-first conversion pipeline",
                                    "Automated HOT lead scoring",
                                    "Team performance tracking",
                                    "Real-time action queue"
                                ]}
                                href="/euonex/products/leadflow"
                                preview={
                                    <div className="p-8 flex flex-col gap-6">
                                        <div className="h-4 w-1/3 bg-white/10 rounded" />
                                        <div className="flex gap-4">
                                            <div className="h-24 flex-1 bg-white/5 rounded-xl border border-white/5" />
                                            <div className="h-24 flex-1 bg-white/5 rounded-xl border border-white/5" />
                                        </div>
                                        <div className="h-40 w-full bg-white/5 rounded-xl border border-white/5 flex items-end p-4">
                                            <div className="h-2 w-3/4 bg-blue-500/20 rounded" />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </Section>
                </section>

                {/* Section 4: About Euonex (Features) */}
                <Section
                    id="about"
                    title="Built for the Next Generation"
                    subtitle="Our mission is to replace legacy complexity with high-performance automation. We build the infrastructure that allows businesses to scale without manual friction."
                    className="bg-white/[0.02] border-y border-white/5 py-32"
                >
                    <div className="max-w-7xl mx-auto px-6">
                        <FeatureGrid />
                    </div>
                </Section>

                {/* Section 5: CTA */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/10 blur-[150px] pointer-events-none" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 italic">
                            Ready to scale your operations?
                        </h2>
                        <p className="text-xl text-slate-400 mb-12">Join the elite businesses building their future on Euonex.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95 text-xl shadow-2xl shadow-white/10">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 6: Contact */}
                <Section
                    id="contact"
                    title="Get In Touch"
                    subtitle="Have questions? Our engineering team is ready to help you architect your next system."
                    className="bg-black py-32 border-t border-white/5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase text-purple-500 tracking-widest">General Inquiry</h3>
                            <p className="text-white text-2xl font-bold italic">euonex@gmail.com</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase text-purple-500 tracking-widest">Support</h3>
                            <p className="text-white text-2xl font-bold italic">euonex@gmail.com</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase text-purple-500 tracking-widest">Global HQ</h3>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                Innovation Hub, Technology Park<br />
                                Building 4, Floor 12<br />
                                Silicon Valley, CA
                            </p>
                        </div>
                    </div>
                </Section>
            </main>

            <Footer />
        </div>
    );
}
