'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Search, SlidersHorizontal, MapPin, Star, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { MATES } from '@/lib/mockData';

export default function SelectMatePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white px-6 pt-16 pb-8 sticky top-0 z-30 shadow-sm border-b border-gray-100/50">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <button onClick={() => router.back()} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-95 transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-xl font-heading">メイトを指名する</h1>
                        <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-300 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="名前や地域で検索"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-[1.8rem] pl-14 pr-6 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Mate List */}
            <div className="px-6 py-8 max-w-md mx-auto space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">お近くのメイト - 5名見つかりました</h2>
                </div>

                <div className="grid gap-6">
                    {MATES.map((mate) => (
                        <div
                            key={mate.id}
                            onClick={() => router.push(`/deposit/success?mode=premium&mateId=${mate.id}`)}
                            className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-orange-900/5 border border-gray-50 active:scale-[0.98] transition-all relative overflow-hidden group cursor-pointer"
                        >
                            {/* Proximity/Tag Badge */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="px-3 py-1 bg-orange-50 text-[10px] font-black text-orange-600 rounded-full border border-orange-100 flex items-center gap-1.5">
                                    <MapPin size={10} />
                                    <span>200m以内</span>
                                </div>
                                {mate.isNew && (
                                    <div className="px-3 py-1 bg-blue-50 text-[10px] font-black text-blue-600 rounded-full border border-blue-100">
                                        NEW
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="w-20 h-20 rounded-[2rem] bg-gray-50 overflow-hidden shadow-inner flex-shrink-0">
                                    {mate.imageUrl ? (
                                        <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-3xl">
                                            {mate.emoji}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-xl font-heading text-gray-900 truncate">{mate.name}</h3>
                                        <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-[11px] font-black">{mate.trustScore.avgRating}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-3 truncate">
                                        {mate.area}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {mate.tags.slice(0, 2).map((tag, i) => (
                                            <span key={i} className="text-[9px] font-black text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div className="text-sm font-black text-gray-900">
                                    ¥{mate.services[0].pricePerHour} <span className="text-[10px] text-gray-400">/ hour</span>
                                </div>
                                <div className="flex items-center gap-2 text-orange-600 text-[11px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                                    <span>指名する</span>
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
