'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Info, Calendar, Clock, PawPrint, ChevronRight, Check, Plus } from 'lucide-react';

const SERVICES = [
    { id: 'walk', label: '散歩代行', price: '¥1,500〜' },
    { id: 'home_care', label: '在宅ケア', price: '¥1,800〜' },
    { id: 'hospital', label: '通院同伴', price: '¥2,500〜' },
    { id: 'night', label: '夜間見守り', price: '¥3,200〜' },
];

export default function DepositPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
        else router.push('/deposit/select-mode');
    };

    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Header */}
            <div className="px-6 pt-16 pb-6 flex items-center justify-between bg-white sticky top-0 z-30">
                <button onClick={() => router.back()} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-95 transition-all">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-heading">預かり依頼</h1>
                <div className="w-12" />
            </div>

            {/* Progress Bar */}
            <div className="px-8 mb-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Step {step} of 2</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{step === 1 ? '内容の選択' : '日時の設定'}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-orange-600 transition-all duration-500 ease-out"
                        style={{ width: `${(step / 2) * 100}%` }}
                    />
                </div>
            </div>

            <div className="px-6">
                {step === 1 ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-2xl font-heading text-gray-900 mb-2">依頼内容を選んでください</h2>
                            <p className="text-gray-400 text-sm font-medium">どのようなサポートが必要ですか？</p>
                        </div>

                        <div className="grid gap-4">
                            {SERVICES.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedService(s.id)}
                                    className={`relative p-6 rounded-[2rem] border-2 transition-all text-left flex items-center justify-between group
                                        ${selectedService === s.id
                                            ? 'border-orange-600 bg-orange-50/30'
                                            : 'border-gray-50 bg-white hover:border-gray-100'}`}
                                >
                                    <div>
                                        <div className="text-lg font-heading text-gray-900 mb-1">{s.label}</div>
                                        <div className="text-xs font-black text-orange-600 uppercase tracking-widest">{s.price}</div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                                        ${selectedService === s.id ? 'bg-orange-600 text-white rotate-0' : 'bg-gray-50 text-gray-300 rotate-45 group-hover:rotate-0'}`}>
                                        {selectedService === s.id ? <Check size={18} strokeWidth={3} /> : <Plus size={18} />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h2 className="text-2xl font-heading text-gray-900 mb-2">いつ預けますか？</h2>
                            <p className="text-gray-400 text-sm font-medium">ご希望の日時を入力してください</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <Calendar size={20} className="text-orange-600" />
                                </div>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 pl-16 pr-6 text-sm font-bold text-gray-900 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <Clock size={20} className="text-orange-600" />
                                </div>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-[1.8rem] py-5 pl-16 pr-6 text-sm font-bold text-gray-900 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                <Info size={20} />
                            </div>
                            <p className="text-xs text-blue-900/70 leading-relaxed font-medium">
                                マッチング後、メイトとチャットで詳細を調整できます。まずは大まかな時間で問題ありません。
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Action */}
            <div className="fixed bottom-10 left-8 right-8 z-40">
                <button
                    onClick={handleNext}
                    disabled={step === 1 ? !selectedService : (!date || !time)}
                    className={`w-full h-20 rounded-[2.2rem] font-bold text-lg flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95
                        ${(step === 1 ? selectedService : (date && time))
                            ? 'bg-orange-600 text-white shadow-orange-900/30'
                            : 'bg-gray-100 text-gray-300 shadow-none cursor-not-allowed'}`}
                >
                    <span>{step === 1 ? '次に進む' : 'マッチング方式を選ぶ'}</span>
                    <ChevronRight size={22} className={step === 1 ? 'translate-x-0' : 'translate-x-1 transition-transform'} />
                </button>
            </div>
        </div>
    );
}
