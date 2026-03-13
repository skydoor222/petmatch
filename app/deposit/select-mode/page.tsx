'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Zap, Users, Info, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function SelectModePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50/50 pb-10">
            {/* Header */}
            <div className="px-6 pt-16 pb-6 flex items-center justify-between bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100/50">
                <button onClick={() => router.back()} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-95 transition-all">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-heading">マッチング方式</h1>
                <div className="w-12" />
            </div>

            <div className="px-6 pt-10 space-y-8 max-w-md mx-auto">
                <div>
                    <h2 className="text-3xl font-heading text-gray-900 leading-tight mb-3">どのように探しますか？</h2>
                    <p className="text-gray-400 text-sm font-medium">ご希望に合わせてお選びください</p>
                </div>

                {/* AI Matching Mode */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <button
                        onClick={() => router.push('/deposit/matching')}
                        className="relative w-full bg-white p-8 rounded-[2.8rem] border border-orange-100 shadow-xl shadow-orange-900/5 text-left active:scale-[0.98] transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-900/20">
                                <Zap size={28} fill="currentColor" />
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-orange-50 text-[10px] font-black text-orange-600 uppercase tracking-widest border border-orange-100">
                                人気 No.1
                            </div>
                        </div>
                        <h3 className="text-2xl font-heading text-gray-900 mb-2">AIおまかせマッチング</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            ご近所で評価の高いメイトを、AIが自動で選出し即座に依頼します。
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="text-sm font-black text-orange-600">無料 / おまかせ</div>
                            <ArrowRight size={20} className="text-orange-600" />
                        </div>
                    </button>
                </div>

                {/* Premium Mode */}
                <button
                    onClick={() => router.push('/deposit/select-mate')}
                    className="w-full bg-white p-8 rounded-[2.8rem] border border-gray-100 shadow-lg text-left active:scale-[0.98] transition-all hover:border-gray-200"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <Users size={28} />
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                            安心の指名制
                        </div>
                    </div>
                    <h3 className="text-2xl font-heading text-gray-900 mb-2">プレミアム指名予約</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                        お近くのメイトを一覧から確認し、レビューを見て特定の1人を指名できます。
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="text-sm font-black text-gray-600">指名料 ¥500〜</div>
                        <ArrowRight size={20} className="text-gray-400" />
                    </div>
                </button>

                {/* Safety Badge */}
                <div className="bg-orange-600/5 p-6 rounded-[2rem] border border-orange-100/50 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm flex-shrink-0">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-black text-orange-900 uppercase tracking-widest mb-1">安心安全のお約束</div>
                        <p className="text-[11px] text-orange-800/60 leading-relaxed font-medium">
                            どちらの方式でも、本人確認済みのメイトのみが候補に選ばれます。依頼完了までは、双方の連絡先は公開されません。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
