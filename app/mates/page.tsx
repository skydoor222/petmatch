import Link from 'next/link';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { getMates } from '@/lib/supabase';
import { Search, MapPin } from 'lucide-react';

export default async function MatesPage() {
  const allMates = await getMates();
  const mates = allMates.filter((m: any) => m.imageUrl);

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 pt-14 pb-4 sticky top-0 z-30">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Mateを探す</h1>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="名前・サービスで絞り込む"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
          <div className="bg-orange-50 rounded-xl px-4 py-3 flex items-center gap-1.5 border border-orange-100 shrink-0">
            <MapPin size={14} className="text-orange-500" />
            <span className="text-sm font-medium text-orange-700">世田谷区</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{mates.length}人のMateが見つかりました</span>
          <span className="text-xs text-gray-400">人気順</span>
        </div>

        <div className="flex flex-col gap-4">
          {mates.map((mate: any) => (
            <MateCard key={mate.id} mate={mate} />
          ))}
        </div>

        {mates.length === 0 && (
          <div className="text-center py-16 text-sm text-gray-400">
            このエリアにMateが見つかりませんでした
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
