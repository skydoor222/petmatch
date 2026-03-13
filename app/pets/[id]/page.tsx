import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPetById } from '@/lib/supabase';
import {
    ArrowLeft, MapPin, Heart, Send, CheckCircle2,
    Sparkles, Calendar, User, PawPrint, MessageSquare, ShieldCheck
} from 'lucide-react';

export default async function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pet = await getPetById(id);
    if (!pet) notFound();

    return (
        <div className="pb-40 bg-gray-50/30">
            {/* Premium Hero */}
            <div className="relative h-[450px] overflow-hidden bg-gray-200">
                <Link href="/" className="absolute top-12 left-6 glass rounded-2xl w-12 h-12 flex items-center justify-center shadow-2xl text-gray-900 transition-all hover:scale-105 active:scale-95 z-20">
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </Link>

                {pet.imageUrl ? (
                    <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-300">
                        <MapPin size={120} strokeWidth={1} />
                    </div>
                )}

                {/* Floating Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-10 left-8 right-8 text-white z-10">
                    <div className="inline-flex items-center gap-2 bg-orange-500/90 backdrop-blur-md px-3 py-1 rounded-full mb-4 border border-orange-400/20">
                        <CheckCircle2 size={12} className="text-white" />
                        <span className="text-[10px] font-black uppercase tracking-wider">募集中</span>
                    </div>
                    <h1 className="text-4xl font-heading mb-2 leading-tight">{pet.name}</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 opacity-90">
                            <MapPin size={14} className="text-orange-400" />
                            <span className="text-sm font-bold tracking-wide text-white">{pet.area}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        <div className="text-xs font-black bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/20">
                            {pet.breed}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="px-6 -mt-8 relative z-10">
                <div className="bg-white rounded-[2.5rem] p-8 card-shadow flex justify-between items-center border border-gray-100">
                    <div className="text-center flex-1 border-r border-gray-50">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">年齢</div>
                        <div className="text-lg font-heading text-gray-900">{pet.age}</div>
                    </div>
                    <div className="text-center flex-1 border-r border-gray-50">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">性別</div>
                        <div className="text-lg font-heading text-gray-900">{pet.gender === 'male' ? 'オス' : 'メス'}</div>
                    </div>
                    <div className="text-center flex-1">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">種類</div>
                        <div className="text-lg font-heading text-gray-900 capitalize">
                            {pet.category === 'dog' ? '犬' : pet.category === 'cat' ? '猫' : 'その他'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Info */}
            <div className="px-6 mt-8 space-y-6">
                {/* Description Section */}
                <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <MessageSquare size={20} />
                        </div>
                        <h2 className="text-lg font-heading text-gray-900 uppercase tracking-wider">詳細情報</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium text-base">
                        {pet.description}
                    </p>
                </section>

                {/* Needs Section */}
                <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-lg font-heading text-gray-900 uppercase tracking-wider">必要なお世話</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {['散歩', '食事の補助', 'トイレ掃除', '遊びの相手'].map(care => (
                            <div key={care} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-50">
                                <CheckCircle2 size={16} className="text-teal-500" />
                                <span className="text-xs font-black text-gray-900">{care}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Owner Info Preview */}
                <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                                <User size={24} />
                            </div>
                            <div>
                                <div className="text-sm font-black text-gray-900 uppercase tracking-wide">オーナー</div>
                                <div className="text-xs font-bold text-gray-400">本人確認済み</div>
                            </div>
                        </div>
                        <button className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-300">
                            <MessageSquare size={18} />
                        </button>
                    </div>
                </section>
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
                <div className="max-w-md mx-auto pointer-events-auto">
                    <div className="glass px-6 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-4 border border-white/50">
                        <div className="flex-1">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</div>
                            <div className="text-xl font-heading text-orange-600">Looking for Mate</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-16 h-16 rounded-[1.8rem] bg-white border border-gray-100 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:border-rose-100 transition-all active:scale-95 shadow-sm">
                                <Heart size={24} />
                            </button>
                            <button className="min-w-[140px] h-16 rounded-[1.8rem] bg-orange-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all active:scale-95 shadow-xl shadow-orange-900/20 px-6">
                                <Send size={18} />
                                <span>Offer Care</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
