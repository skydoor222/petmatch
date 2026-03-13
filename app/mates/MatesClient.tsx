'use client';

import { useState } from 'react';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { Search, MapPin, SlidersHorizontal, Dog, Cat, Rabbit, Sparkles, X, ChevronDown, Check, User } from 'lucide-react';
import Link from 'next/link';
import { Mate, SERVICE_LABELS, ServiceType } from '@/lib/types';

const CATEGORIES = [
    { id: 'all', label: 'すべて', icon: Sparkles },
    { id: 'dog', label: 'いぬ', icon: Dog },
    { id: 'cat', label: 'ねこ', icon: Cat },
    { id: 'small', label: '小動物', icon: Rabbit },
];

const AREAS = ['すべて', '世田谷区', '渋谷区', '目黒区', '港区'];

const SERVICES: { id: ServiceType; label: string }[] = [
    { id: 'walk', label: '散歩代行' },
    { id: 'home_care', label: '在宅ケア' },
    { id: 'hospital', label: '通院同伴' },
    { id: 'night', label: '夜間見守り' },
    { id: 'long_stay', label: '長期宿泊' },
];

export default function MatesPage({ initialMates }: { initialMates: Mate[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedArea, setSelectedArea] = useState('すべて');
    const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Filter Logic
    const filteredMates = initialMates.filter(mate => {
        if (!mate.imageUrl) return false; // Duplicate filter

        const matchesQuery = mate.name.includes(searchQuery) || mate.bio?.includes(searchQuery);
        const matchesArea = selectedArea === 'すべて' || mate.area.includes(selectedArea);

        // Services Match (OR logic for now)
        const matchesServices = selectedServices.length === 0 ||
            selectedServices.some(s => mate.services.some(ms => ms.type === s));

        return matchesQuery && matchesArea && matchesServices;
    });

    const toggleService = (id: ServiceType) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    return (
        <div className="pb-36 bg-gray-50/50 min-h-screen">
            {/* Search Header */}
            <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-40 shadow-sm border-b border-gray-100">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-heading text-gray-900 tracking-tight">依頼する</h1>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${showFilters || selectedServices.length > 0 || selectedArea !== 'すべて'
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                                    : 'bg-gray-50 text-gray-400 hover:text-orange-600'
                                    }`}
                            >
                                <SlidersHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-md mx-auto">
                {/* 1. Request Mode Selection */}
                <div className="px-6 pt-8 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/deposit"
                            className="group bg-orange-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-orange-900/10 active:scale-[0.98] transition-all relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                    <Sparkles size={22} className="fill-white/20" />
                                </div>
                                <div className="text-lg font-heading mb-1 leading-tight">ランダム依頼</div>
                                <div className="text-[10px] font-black opacity-70 uppercase tracking-widest leading-relaxed">
                                    条件に合うメイトを<br />おまかせで探す
                                </div>
                            </div>
                            {/* Decorative circle */}
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                        </Link>

                        <div
                            className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-end"
                        >
                            <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-orange-600">
                                <User size={22} />
                            </div>
                            <div className="text-lg font-heading text-gray-900 mb-1 leading-tight">指名依頼</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                自分にピッタリの人を<br />一覧から選んで予約
                            </div>
                            <div className="absolute top-4 right-6">
                                <div className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">有料</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Search & Categories Section */}
                <div className="px-6 py-8 space-y-6">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-300 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="なまえ・キーワードで検索"
                            className="w-full bg-white border border-gray-100 rounded-[2rem] pl-14 pr-6 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                        />
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-2">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${isActive
                                        ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-900/10'
                                        : 'bg-white border-gray-100 text-gray-400 hover:border-orange-200'
                                        }`}
                                >
                                    <Icon size={14} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Results Section */}
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-6 px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-600" />
                            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                                {filteredMates.length}人のメイト
                            </h2>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            おすすめ順 <ChevronDown size={12} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredMates.map((mate) => (
                            <MateCard key={mate.id} mate={mate} />
                        ))}
                    </div>

                    {filteredMates.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <Search size={24} />
                            </div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">条件に合う人は<br />見つかりませんでした</p>
                            <button
                                onClick={() => {
                                    setSelectedArea('すべて');
                                    setSelectedServices([]);
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                }}
                                className="mt-6 text-xs font-black text-orange-600 uppercase tracking-widest border-b border-orange-100 pb-1"
                            >
                                全件表示に戻す
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Expandable Filter Modal/Panel */}
            {showFilters && (
                <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
                    <div className="relative w-full max-w-md bg-white rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-heading text-gray-900">詳細検索</h2>
                            <button onClick={() => setShowFilters(false)} className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Area Select */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">エリア</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {AREAS.map(area => (
                                        <button
                                            key={area}
                                            onClick={() => setSelectedArea(area)}
                                            className={`py-3 rounded-2xl text-xs font-bold border transition-all ${selectedArea === area
                                                ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/10'
                                                : 'bg-gray-50 border-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {area}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Services Multi-Select */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">対応可能サービス</label>
                                <div className="flex flex-wrap gap-2">
                                    {SERVICES.map(service => {
                                        const isActive = selectedServices.includes(service.id);
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => toggleService(service.id)}
                                                className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 ${isActive
                                                    ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm'
                                                    : 'bg-white border-gray-100 text-gray-500'
                                                    }`}
                                            >
                                                {isActive && <Check size={14} strokeWidth={3} />}
                                                {service.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowFilters(false)}
                            className="w-full bg-orange-600 text-white font-heading py-5 rounded-[2rem] mt-10 shadow-xl shadow-orange-900/20 active:scale-[0.98] transition-all"
                        >
                            条件を適用して検索
                        </button>

                        <button
                            onClick={() => {
                                setSelectedArea('すべて');
                                setSelectedServices([]);
                                setSelectedCategory('all');
                            }}
                            className="w-full text-xs font-black text-gray-300 uppercase tracking-widest mt-4 hover:text-orange-500 transition-colors"
                        >
                            リセット
                        </button>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
