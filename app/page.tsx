import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@/lib/supabase-server';
import PetCard from '@/components/PetCard';
import BottomNav from '@/components/BottomNav';
import { Search, MapPin, SlidersHorizontal, Plus, Sparkles, Dog, Cat, Rabbit, Bird } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'all', label: 'すべて', icon: Sparkles },
  { id: 'dog', label: 'いぬ', icon: Dog },
  { id: 'cat', label: 'ねこ', icon: Cat },
  { id: 'rabbit', label: '小動物', icon: Rabbit },
];

export default async function HomePage() {
  noStore();
  const supabase = await createClient();
  const { data: petsData, error: petsError } = await supabase.from('pets').select('*');

  const pets = (petsData || []).map((pet: any) => ({
    ...pet,
    imageUrl: pet.image_url,
  }));

  return (
    <div className="pb-36 bg-gray-50/50 min-h-screen">
      {/* Premium Search Header */}
      <div className="bg-white px-6 pt-16 pb-8 sticky top-0 z-30 shadow-sm border-b border-gray-100/50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-900/20">
                <Dog size={20} />
              </div>
              <h1 className="text-2xl font-heading text-gray-900 tracking-tight">PetMatch</h1>
            </div>
            <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-orange-600 transition-all">
              <SlidersHorizontal size={20} />
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-300 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="近所で預け先をお探しですか？"
              className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] pl-14 pr-6 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:bg-white transition-all card-shadow"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions: Deposit Flow */}
      <div className="px-6 py-4">
        <Link href="/deposit" className="group block">
          <div className="bg-orange-600 text-white px-8 py-5 rounded-[2.2rem] flex items-center justify-between shadow-xl shadow-orange-900/20 active:scale-[0.98] transition-all">
            <div className="text-left">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-0.5 text-white">Owner Menu</div>
              <div className="text-lg font-heading">ペットを預ける</div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
              <Plus size={20} className="text-white" strokeWidth={3} />
            </div>
          </div>
        </Link>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-6 py-2 overflow-x-auto no-scrollbar flex gap-3">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`flex-shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border transition-all duration-300
                ${i === 0
                  ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/10'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200 hover:text-orange-600'}`}
            >
              <Icon size={18} />
              <span className="text-xs font-black uppercase tracking-widest">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Mercari Style */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-lg font-heading text-gray-900 uppercase tracking-widest">近所の募集ペット</h2>
          <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest border-b border-orange-100 pb-0.5 whitespace-nowrap">すべて見る</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {pets.map((pet: any) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        {pets.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 mt-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">募集中のペットはいません</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
