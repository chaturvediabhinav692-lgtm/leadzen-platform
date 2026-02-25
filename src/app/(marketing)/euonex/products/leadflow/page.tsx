"use client";

import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Section from "@/components/marketing/Section";
import Hero from "@/components/marketing/Hero";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Smartphone, MessageSquare, Zap } from "lucide-react";

export default function LeadFlowProductPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            <main>
                <Hero
                    title="Convert Leads Faster with Leadzen"
                    subtitle="The ultimate WhatsApp-first conversion platform for modern lead-intensive businesses."
                />

                <Section
                    title="Precision Features"
                    subtitle="Engineered to solve the friction in lead management."
                    className="pb-32"
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
                        {[
                            { title: "Universal Dashboard", desc: "A command center for professionals to manage active conversations and hot leads.", icon: Smartphone },
                            { title: "Automated Intake", desc: "Intelligent systems for seamless lead qualification and processing.", icon: Shield },
                            { title: "WhatsApp Workflow", desc: "Direct integration for instant followup and persistent engagement.", icon: MessageSquare },
                            { title: "Lead Priority", desc: "Automated scoring (Hot/Warm/Cold) based on real-time behavior.", icon: Zap }
                        ].map((f, i) => (
                            <div key={i} className="space-y-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-purple-400">
                                    <f.icon size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-3">{f.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <section className="py-40 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
                            Ready to transform your conversion?
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/auth/login?product=leadflow"
                                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95 text-lg"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/auth/login?product=leadflow"
                                className="w-full sm:w-auto px-10 py-5 bg-black text-white border border-white/10 font-black rounded-2xl hover:bg-white/5 transition-all active:scale-95 text-lg"
                            >
                                Login to Dashboard
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
