'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ThumbsUp, ThumbsDown, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { MATES } from '@/lib/mockData';

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const mate = MATES[0];
    const [rating, setRating] = useState<'good' | 'bad' | null>(null);
    const [comment, setComment] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-6 pt-16 pb-6 border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <Link href={`/messages/${id}`} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-heading text-gray-900">評価を送信</h1>
                </div>
            </div>

            <div className="max-w-md mx-auto w-full p-6 space-y-8 flex-1">
                {/* Target User */}
                <div className="text-center pt-4">
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden mx-auto shadow-xl border-4 border-white mb-4">
                        <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xl font-heading text-gray-900">{mate.name} さん</div>
                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">お世話はいかがでしたか？</p>
                </div>

                {/* Rating Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setRating('good')}
                        className={`group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all active:scale-95 ${rating === 'good'
                                ? 'bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-900/10'
                                : 'bg-white border-gray-100 text-gray-300'
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${rating === 'good' ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-200 group-hover:bg-emerald-50 group-hover:text-emerald-300'
                            }`}>
                            <ThumbsUp size={32} />
                        </div>
                        <span className={`text-sm font-black ${rating === 'good' ? 'text-emerald-700' : 'text-gray-400'}`}>よい</span>
                    </button>

                    <button
                        onClick={() => setRating('bad')}
                        className={`group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all active:scale-95 ${rating === 'bad'
                                ? 'bg-rose-50 border-rose-500 shadow-xl shadow-rose-900/10'
                                : 'bg-white border-gray-100 text-gray-300'
                            }`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${rating === 'bad' ? 'bg-rose-500 text-white' : 'bg-gray-50 text-gray-200 group-hover:bg-rose-50 group-hover:text-rose-300'
                            }`}>
                            <ThumbsDown size={32} />
                        </div>
                        <span className={`text-sm font-black ${rating === 'bad' ? 'text-rose-700' : 'text-gray-400'}`}>わるい</span>
                    </button>
                </div>

                {/* Comment area */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <MessageCircle size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">コメント（任意）</span>
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="お世話の感想や、感謝のメッセージを伝えましょう。"
                        className="w-full h-40 bg-white border border-gray-100 rounded-[2rem] p-6 text-sm font-medium text-gray-900 placeholder:text-gray-200 focus:outline-none focus:ring-8 focus:ring-orange-500/5 transition-all card-shadow resize-none"
                    />
                </div>
            </div>

            {/* Floating Footer */}
            <div className="p-6 bg-white border-t border-gray-100">
                <div className="max-w-md mx-auto">
                    <button
                        disabled={!rating}
                        onClick={() => router.push(`/messages/${id}/review/success`)}
                        className={`w-full h-18 rounded-[2rem] font-heading text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98] ${rating
                                ? 'bg-orange-600 text-white shadow-orange-900/20'
                                : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
                            }`}
                    >
                        <CheckCircle2 size={20} />
                        <span>取引を完了する</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
