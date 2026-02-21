'use client';

import { Client } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { Send, Bot, User, UserCircle2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface ChatViewProps {
    client: Client;
}

export default function ChatView({ client }: ChatViewProps) {
    const { addMessage } = useStore(); // Expects this to be in store now
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [client.conversation]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Simulate adding message (In reality store handles this)
        addMessage(client.id, inputText, 'broker');
        setInputText('');
    };

    return (
        <div className="bg-[#e5ddd5] flex flex-col h-[600px] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
            {/* Disclaimer Header */}
            <div className="bg-white/90 backdrop-blur-sm p-2 text-center text-xs text-slate-500 border-b border-slate-100 absolute top-0 w-full z-10">
                🔒 End-to-end encrypted conversation with {client.name}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 pt-10">
                {client.conversation.map((msg) => {
                    const isMe = msg.sender === 'broker';
                    const isBot = msg.sender === 'bot';
                    return (
                        <div key={msg.id} className={clsx("flex w-full", isMe ? "justify-end" : "justify-start")}>
                            <div className={clsx(
                                "max-w-[80%] rounded-lg p-3 relative shadow-sm text-sm",
                                isMe ? "bg-[#d9fdd3] text-slate-800 rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none",
                                isBot && "bg-slate-100 border border-slate-200"
                            )}>
                                {isBot && <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1"><Bot size={10} /> BOT UPDATE</div>}
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                <div className="text-[10px] text-slate-400 text-right mt-1" suppressHydrationWarning>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>

                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="bg-[#f0f2f5] p-3 flex items-center gap-2 border-t border-slate-200 z-20">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-lg border-0 focus:ring-1 focus:ring-green-500 text-slate-800"
                />
                <button
                    type="submit"
                    className={clsx(
                        "p-3 rounded-full text-white shadow-md transition-all",
                        inputText.trim() ? "bg-green-600 hover:bg-green-700" : "bg-slate-300 cursor-not-allowed"
                    )}
                    disabled={!inputText.trim()}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
