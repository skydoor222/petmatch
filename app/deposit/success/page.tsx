'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, ArrowRight, Dog, MapPin, Calendar, Clock, Star } from 'lucide-react';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[45vh] bg-orange-600 flex flex-col items-center justify-center px-10 text-center overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="w-24 h-24 rounded-[3rem] bg-white flex items-center justify-center text-orange-600 shadow-2xl animate-in zoom-in duration-700">
                        <CheckCircle2 size={56} strokeWidth={3} />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-heading text-white leading-tight">
                            マッチング成功！
                        </h1>
                        <p className="text-orange-100 text-sm font-bold uppercase tracking-[0.2em]">
                            依頼の受付が完了しました
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-8 -mt-12 relative z-20 pb-20">
                <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-orange-900/10 border border-gray-50 max-w-md mx-auto space-y-8">
                    {/* Summary Card */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-orange-600">
                                <Dog size={32} />
                            </div>
                            <div>
                                <div className="text-xl font-heading text-gray-900">田中 美咲 さん</div>
                                <div className="flex items-center gap-1.5 text-orange-600 mt-1">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-black tracking-tight">4.9 (32 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">予定日時</div>
                                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                                    <Calendar size={14} className="text-orange-600" />
                                    <span>2026.03.15</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">開始時間</div>
                                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                                    <Clock size={14} className="text-orange-600" />
                                    <span>14:00〜</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <button
                            onClick={() => router.push('/messages')}
                            className="w-full bg-orange-600 text-white py-6 rounded-[2rem] font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-orange-900/30 active:scale-95 transition-all"
                        >
                            <MessageSquare size={20} fill="currentColor" />
                            <span>チャットで挨拶する</span>
                        </button>

                        <Link
                            href="/"
                            className="block w-full text-center py-5 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
                        >
                            ホームに戻る
                        </Link>
                    </div>

                    {/* Hint */}
                    <div className="pt-4 border-t border-gray-50">
                        <p className="text-[11px] text-gray-400 leading-relaxed text-center font-medium">
                            依頼のキャンセルや変更は、マイページの「予約一覧」から行えます。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-orange-600 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
