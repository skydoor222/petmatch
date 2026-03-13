import Link from 'next/link';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { getMates } from '@/lib/supabase';
import { Search, MapPin, Calendar, PawPrint, Sparkles, User } from 'lucide-react';

const SERVICES = [
  { type: 'walk', label: '散歩', icon: PawPrint },
  { type: 'hospital', label: '通院', icon: Search },
  { type: 'home_care', label: 'ケア', icon: Sparkles },
  { type: 'night', label: '夜間', icon: Calendar },
];

export default async function Home() {
  const mates = await getMates();

  return (
    <div className="pb-32 bg-gray-50/50">
      {/* Hero Section */}
      <div className="relative pt-16 pb-24 px-6 premium-gradient overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div className="text-white font-extrabold text-xl tracking-tight">PetMatch</div>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white">
              <User size={20} />
            </div>
          </header>

          <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-[1.15] mb-4">
            大切な家族に、<br />もう一人の相棒を。
          </h1>
          <p className="text-teal-50 text-base font-medium opacity-90 mb-8 max-w-[280px]">
            プロフェッショナルなMateが、あなたとペットを支えます。
          </p>

          {/* Search Bar - Modern Integrated look */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-2 flex items-center border border-white/40">
            <div className="flex-1 flex items-center gap-3 pl-4 border-r border-gray-100 py-2">
              <MapPin size={18} className="text-teal-600" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Area</div>
                <div className="text-sm font-bold text-gray-900">世田谷区</div>
              </div>
            </div>
            <div className="px-3">
              <Link href="/mates" className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-900/20 hover:bg-teal-700 transition-all active:scale-95">
                <Search size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative -mt-10 px-6">
        {/* Service Chips */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-8 py-2">
          {SERVICES.map(s => {
            const Icon = s.icon;
            return (
              <Link key={s.type} href={`/mates?service=${s.type}`}
                className="flex-shrink-0 bg-white border border-gray-100 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md hover:border-teal-100 transition-all active:scale-95">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Icon size={18} />
                </div>
                <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{s.label}</span>
              </Link>
            );
          })}
        </div>

        {/* List Section */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end px-1">
            <h2 className="text-xl font-bold text-gray-900">近くのMate</h2>
            <Link href="/mates" className="text-sm font-bold text-teal-600 hover:text-teal-700">すべて見る</Link>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {mates.map((mate: any) => <MateCard key={mate.id} mate={mate} />)}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
