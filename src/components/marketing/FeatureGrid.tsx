"use client";

import { motion } from "framer-motion";
import { Zap, Target, BarChart3, Layers } from "lucide-react";

const features = [
    {
        title: "High Conversion Systems",
        description: "Every pixel and interaction is optimized to turn incoming traffic into loyal customers and revenue.",
        icon: Target,
        color: "text-purple-400"
    },
    {
        title: "Real-Time Automation",
        description: "Automate complex workflows in seconds. Our systems work 24/7 so your team can focus on growth.",
        icon: Zap,
        color: "text-blue-400"
    },
    {
        title: "Performance Analytics",
        description: "Deep insights into lead behavior and system performance. Data-driven decisions made simple.",
        icon: BarChart3,
        color: "text-purple-400"
    },
    {
        title: "Scalable Architecture",
        description: "Built on high-performance infrastructure that scales seamlessly with your business needs.",
        icon: Layers,
        color: "text-blue-400"
    }
];

export default function FeatureGrid() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group"
                >
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-purple-500/20 transition-all ${feature.color}`}>
                        <feature.icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
            ))}
        </div>
    );
}
