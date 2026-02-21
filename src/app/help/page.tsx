'use client';

import RouteGuard from '@/components/layout/RouteGuard';
import { saveStoredTicket } from '@/lib/ticketStorage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
    const router = useRouter();

    // ... rest of state ...
    const [issueType, setIssueType] = useState('Technical');
    const [priority, setPriority] = useState('Medium');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        let base64Image = undefined;
        if (image) {
            base64Image = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(image);
            });
        }

        // Save to localStorage
        saveStoredTicket({
            userId: 'current-user',
            userName: 'Coaching Owner',
            issueType: issueType as any,
            priority: priority as any,
            description,
            image: base64Image
        });

        // Simulate network delay
        setTimeout(() => {
            router.push('/my-tickets');
        }, 1000);
    };



    return (
        <RouteGuard>
            <div className="max-w-2xl mx-auto px-4 sm:px-0 pb-32">
                <div className="mb-8">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Report an Issue</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Submit a ticket and we will resolve it ASAP.</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Issue Type */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Issue Type</label>
                            <select
                                value={issueType}
                                onChange={(e) => setIssueType(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                            >
                                <option value="Technical">Technical Issue</option>
                                <option value="Billing">Billing & Subscription</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
                            <div className="flex gap-4">
                                {['Low', 'Medium', 'High'].map(p => (
                                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={p}
                                            checked={priority === p}
                                            onChange={(e) => setPriority(e.target.value)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className={`text-sm font-medium ${p === 'High' ? 'text-red-600' : p === 'Medium' ? 'text-orange-600' : 'text-slate-600'
                                            }`}>
                                            {p}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                placeholder="Please describe the issue in detail..."
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-500 bg-white"
                                required
                            />
                        </div>

                        {/* Screenshot */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Screenshot (Optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                id="fileUpload"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div
                                onClick={() => document.getElementById('fileUpload')?.click()}
                                className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
                            >
                                <p className="text-sm text-slate-500">Click to upload image</p>
                            </div>

                            {image && (
                                <div className="mt-4 relative w-fit group">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className="max-h-40 rounded shadow-sm border border-slate-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md ${isSubmitting
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform active:scale-[0.98]'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                        </button>

                    </form>
                </div>
            </div>
        </RouteGuard>
    );
}
