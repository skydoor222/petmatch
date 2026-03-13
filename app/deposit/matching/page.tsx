'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Zap, ShieldCheck, Check } from 'lucide-react';

const STEPS = [
    '近隣の優良メイトを検索中...',
    '評価と実績を確認しています...',
    'スケジュールの空き状況を照合中...',
    '最適なメイトを見つけました！',
];

export default function MatchingAnimationPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < STEPS.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 1800);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                router.push('/deposit/success?mode=ai');
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [currentStep, router]);

    return (
        <div className="min-h-screen bg-orange-600 flex flex-col items-center justify-center px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
                {/* Main Visual Animation */}
                <div className="relative mb-16">
                    {/* Pulsing Outer Ring */}
                    <div className="absolute inset-0 bg-white/20 rounded-[3rem] scale-125 blur-xl animate-ping opacity-40" />

                    <div className="w-32 h-32 rounded-[3.5rem] bg-white flex items-center justify-center text-orange-600 shadow-2xl relative">
                        <Zap size={48} fill="currentColor" className="animate-bounce" />

                        {/* Orbiting Icons */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white border-4 border-orange-600 animate-bounce delay-100">
                            <ShieldCheck size={20} />
                        </div>
                        <div className="absolute -bottom-2 -left-6 w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white border-2 border-orange-600 animate-bounce delay-300">
                            <MapPin size={18} />
                        </div>
                    </div>
                </div>

                {/* Progress Text */}
                <div className="space-y-6 w-full">
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-8">
                        <div
                            className="h-full bg-white transition-all duration-[1800ms] ease-linear"
                            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        />
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl font-heading text-white leading-tight">
                            AIおまかせマッチング中
                        </h2>
                        <div className="h-8"> {/* Fixed height for transition stability */}
                            <p className="text-orange-100 text-lg font-bold animate-in fade-in slide-in-from-bottom-2 duration-500 key={currentStep}">
                                {STEPS[currentStep]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Info */}
                <div className="mt-20 glass bg-white/10 px-6 py-4 rounded-2xl border border-white/20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Check size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest whitespace-nowrap">
                        100% 認証済みメイトのみを選定
                    </span>
                </div>
            </div>
        </div>
    );
}
