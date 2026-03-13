import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Heart, PawPrint } from 'lucide-react';

export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
            {/* Premium Hero Visual */}
            <div className="relative h-[55vh] overflow-hidden">
                <img
                    src="/pets/leo.png"
                    alt="Happy Pet"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                {/* Floating Branding */}
                <div className="absolute top-16 left-8 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-2xl">
                        <Sparkles size={20} />
                    </div>
                    <span className="text-xl font-heading text-gray-900 tracking-tight">PetMatch</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 flex flex-col px-8 -mt-20 relative z-10">
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-orange-900/10 border border-gray-50">
                    <div className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full mb-6">
                        <ShieldCheck size={12} className="text-orange-600" />
                        <span className="text-[10px] font-black text-orange-800 uppercase tracking-widest">Verified Marketplace</span>
                    </div>

                    <h1 className="text-4xl font-heading text-gray-900 leading-[1.1] mb-6">
                        Find the perfect <br />
                        <span className="text-orange-600">Mate</span> for your family.
                    </h1>

                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
                        プロのサポーターが、あなたの大切な家族を<br />
                        最高のおもてなしで支えます。
                    </p>

                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {[
                            { icon: PawPrint, label: 'Dogs & Cats' },
                            { icon: Heart, label: 'Expert Care' },
                        ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                <f.icon size={14} className="text-orange-600" />
                                <span className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{f.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/auth/signup"
                            className="group w-full bg-orange-600 text-white font-black text-base py-5 rounded-[2rem] flex items-center justify-center gap-3 shadow-xl shadow-orange-900/30 hover:bg-orange-700 transition-all active:scale-95"
                        >
                            <span>Get Started Now</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/auth/login"
                            className="w-full bg-gray-50 text-gray-400 font-bold text-sm py-5 rounded-[2rem] text-center border border-gray-100 hover:bg-gray-100 transition-all active:scale-95"
                        >
                            Already have an account? <span className="text-orange-600 ml-1">Log in</span>
                        </Link>
                    </div>
                </div>

                <p className="text-gray-300 text-[10px] text-center mt-10 pb-8 uppercase tracking-[0.2em] font-black">
                    Trusted by 10,000+ Happy Pets
                </p>
            </div>
        </div>
    );
}
