'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react';

export default function SupportPage() {
    return (
        <RouteGuard>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Support & Contact</h1>
                    <p className="text-slate-500 mt-1">Reach our team directly for assistance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. Email Support */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-blue-500 transition-colors">
                        <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4">
                            <Mail size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Email Support</h3>
                        <p className="text-sm text-slate-500 mb-6">support@leadflow.com</p>
                        <a
                            href="mailto:support@leadflow.com"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold w-full transition-colors"
                        >
                            Send Email
                        </a>
                    </div>

                    {/* 2. WhatsApp Support */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-green-500 transition-colors">
                        <div className="bg-green-50 p-4 rounded-full text-green-600 mb-4">
                            <MessageCircle size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">WhatsApp Support</h3>
                        <p className="text-sm text-slate-500 mb-6">+91 98765 43210</p>
                        <button
                            onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold w-full transition-colors"
                        >
                            Chat on WhatsApp
                        </button>
                    </div>

                    {/* 3. Call Support */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-purple-500 transition-colors">
                        <div className="bg-purple-50 p-4 rounded-full text-purple-600 mb-4">
                            <Phone size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Call Us</h3>
                        <p className="text-sm text-slate-500 mb-6">+91 98765 43210</p>
                        <a
                            href="tel:+919876543210"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold w-full transition-colors"
                        >
                            Call Now
                        </a>
                    </div>
                </div>

                {/* 4. Support Hours */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center gap-4">
                    <Clock className="text-slate-400" size={24} />
                    <div>
                        <h4 className="font-bold text-slate-800">Support Hours</h4>
                        <p className="text-sm text-slate-600">Mon-Sat: 10:00 AM – 7:00 PM <span className="text-slate-400 mx-2">|</span> Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}
