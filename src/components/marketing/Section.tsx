"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    id?: string;
}

export default function Section({ children, title, subtitle, className = "", id }: SectionProps) {
    return (
        <section id={id} className={`py-24 px-6 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {(title || subtitle) && (
                    <div className="mb-16">
                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-bold text-white mb-4"
                            >
                                {title}
                            </motion.h2>
                        )}
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-gray-400 max-w-2xl"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                )}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
