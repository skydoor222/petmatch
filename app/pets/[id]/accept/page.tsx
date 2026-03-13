'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPetById } from '@/lib/supabase';
import { ArrowLeft, Calendar, Clock, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';

export default function AcceptRequestPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [pet, setPet] = useState<any>(null);
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Use effect to load pet
    useState(() => {
        getPetById(id).then(data => {
            setPet(data);
            setLoading(false);
        });
    });

    if (loading) return <div className="p-10 text-center text-gray-400 font-black">読み込み中...</div>;
    if (!pet) return <div>Pet not found</div>;

    const toggleBlock = (blockId: string) => {
        setSelectedBlocks(prev =>
            prev.includes(blockId) ? prev.filter(b => b !== blockId) : [...prev, blockId]
        );
    };

    return (
        <div className="pb-36 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="bg-white px-6 pt-16 pb-6 sticky top-0 z-40 border-b border-gray-100">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <Link href={`/pets/${pet.id}`} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-heading text-gray-900">お預かり日時を選択</h1>
                </div>
            </div>

            <div className="max-w-md mx-auto p-6 space-y-6">
                {/* Pet Info Card */}
                <div className="bg-white rounded-[2rem] p-6 card-shadow border border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                        <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-sm font-black text-gray-900">{pet.name} ちゃん</div>
                        <div className="text-xs text-gray-400 font-bold">{pet.breed}・{pet.area}</div>
                    </div>
                </div>

                {/* Calendar / Block Selection */}
                <div className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar size={18} className="text-orange-600" />
                        <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">依頼日時ブロック</h2>
                    </div>

                    <div className="space-y-3">
                        {pet.requestBlocks?.map((block: any) => {
                            const isSelected = selectedBlocks.includes(block.id);
                            return (
                                <button
                                    key={block.id}
                                    onClick={() => toggleBlock(block.id)}
                                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${isSelected
                                            ? 'bg-orange-50 border-orange-200 text-orange-600'
                                            : 'bg-gray-50 border-gray-50 text-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 bg-white'
                                            }`}>
                                            {isSelected && <CheckCircle2 size={14} strokeWidth={3} />}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-black">{block.date}</div>
                                            <div className="text-xs font-bold opacity-70">{block.time}</div>
                                        </div>
                                    </div>
                                    <Clock size={16} className="opacity-30" />
                                </button>
                            );
                        })}
                    </div>

                    <p className="mt-6 text-[10px] font-bold text-gray-400 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                        ※ 選んだ日時に合わせてオーナーとマッチングされます。引き受けた後のキャンセルはご遠慮ください。
                    </p>
                </div>
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 z-50">
                <div className="max-w-md mx-auto">
                    <button
                        disabled={selectedBlocks.length === 0}
                        onClick={() => router.push('/messages')}
                        className={`w-full h-18 rounded-[2rem] font-heading text-lg flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98] ${selectedBlocks.length > 0
                                ? 'bg-orange-600 text-white shadow-orange-900/20'
                                : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
                            }`}
                    >
                        <MessageSquare size={20} fill="currentColor" />
                        <span>依頼を受ける</span>
                    </button>
                    <div className="text-center mt-3 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        確定後、チャットが開始されます
                    </div>
                </div>
            </div>
        </div>
    );
}
