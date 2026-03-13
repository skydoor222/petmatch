import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { getMates } from '@/lib/supabase';
import { Search, MapPin } from 'lucide-react';

export default async function HomePage() {
  noStore();
  const mates = await getMates();
  const featured = mates.slice(0, 3);

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">PetMatch</h1>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin size={12} className="text-orange-500" />
            <span>世田谷区</span>
          </div>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Mateを名前やサービスで探す"
            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* CTA Banner */}
      <div className="px-5 pt-5">
        <Link href="/deposit">
          <div className="bg-orange-600 text-white px-6 py-5 rounded-2xl flex items-center justify-between active:scale-[0.98] transition-transform">
            <div>
              <p className="text-xs text-white/70 mb-0.5">かんたん依頼</p>
              <p className="text-base font-bold">ペットを預ける</p>
            </div>
            <div className="text-2xl font-light text-white/60">→</div>
          </div>
        </Link>
      </div>

      {/* Featured Mates */}
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">近くのMate</h2>
          <Link href="/mates" className="text-xs text-orange-600 font-medium">
            すべて見る
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {featured.map((mate: any) => (
            <MateCard key={mate.id} mate={mate} />
          ))}
        </div>

        {mates.length === 0 && (
          <div className="text-center py-16 text-sm text-gray-400">
            近くにMateが見つかりませんでした
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
