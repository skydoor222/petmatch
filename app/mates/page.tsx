import Link from 'next/link';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { getMates } from '@/lib/supabase';
import { Search, MapPin, SlidersHorizontal, ArrowLeft } from 'lucide-react';

export default async function MatesPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const mates = await getMates();

  return (
    <div className="pb-32 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 pt-16 pb-8 sticky top-0 z-30">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 transition-all hover:bg-gray-100">
              <ArrowLeft size={20} strokeWidth={2.5} />
            </Link>
            <h1 className="text-xl font-heading text-gray-900">Explore Mates</h1>
            <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 transition-all hover:bg-gray-100">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-gray-50 rounded-2xl px-5 py-3.5 flex items-center gap-3 border border-gray-100">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Find a professional..."
                className="bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder:text-gray-300 w-full"
                defaultValue={service || ''}
              />
            </div>
            <div className="bg-teal-50 rounded-2xl px-5 py-3.5 flex items-center gap-3 border border-teal-100/50">
              <MapPin size={18} className="text-teal-600" />
              <span className="text-sm font-bold text-teal-800">世田谷区</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-6 pt-8">
        <div className="flex items-center justify-between px-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-gray-900">{mates.length}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Professionals Found</span>
          </div>
          <div className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Popular first</div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mates.map((mate: any) => (
            <MateCard key={mate.id} mate={mate} />
          ))}
        </div>

        {mates.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-gray-100 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No Mates Found in this area</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
