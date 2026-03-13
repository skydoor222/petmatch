'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Send, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { MATES } from '@/lib/mockData';

const MOCK_MESSAGES = [
    { id: 1, text: '今日はありがとうございました！レオくん、とても楽しそうにお散歩していました。', sender: 'mate', time: '14:30' },
    { id: 2, text: 'こちらこそありがとうございました！写真もたくさん送っていただき、安心してお任せできました。', sender: 'user', time: '15:00' },
    { id: 3, text: 'ポチちゃん、今日もとても元気でした！散歩中に他のワンちゃんと仲良くしていましたよ。', sender: 'mate', time: '15:15' },
];

export default function ChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const mate = MATES[0]; // For demo, using first mate
    const [msg, setMsg] = useState('');

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link href="/messages" className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                            <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-sm font-black text-gray-900">{mate.name} さん</div>
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-bold text-gray-400">オンライン</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Completion Trigger */}
                <Link
                    href={`/messages/${id}/review`}
                    className="h-10 px-4 rounded-xl bg-orange-50 text-orange-600 text-xs font-black flex items-center gap-2 border border-orange-100 hover:bg-orange-100 transition-all active:scale-95"
                >
                    <CheckCircle2 size={14} />
                    <span>取引を完了する</span>
                </Link>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 flex flex-col pt-8">
                <div className="text-center mb-4">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
                        本日
                    </span>
                </div>

                {MOCK_MESSAGES.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] space-y-1`}>
                            <div className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-sm ${m.sender === 'user'
                                    ? 'bg-orange-600 text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                }`}>
                                {m.text}
                            </div>
                            <div className={`text-[10px] font-bold text-gray-300 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                {m.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-100">
                <div className="max-w-md mx-auto flex items-center gap-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="メッセージを入力..."
                            className="w-full h-12 bg-gray-50 rounded-2xl pl-5 pr-12 text-sm font-bold text-gray-900 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white transition-all"
                        />
                        <button className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-900/10 active:scale-90 transition-transform">
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
