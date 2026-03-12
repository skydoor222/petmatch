import Link from 'next/link';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { MATES } from '@/lib/mockData';

export default function MatesPage() {
  return (
    <div className="pb-28">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/" className="text-gray-500 text-lg">←</Link>
          <h1 className="text-lg font-bold text-gray-900">Mateを探す</h1>
        </div>
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['すべて','散歩代行','通院同伴','在宅ケア','夜間見守り'].map((f, i) => (
            <button key={f} className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${i === 0 ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-xs text-gray-500 mb-3">{MATES.length}件のMateが見つかりました</p>
        <div className="flex flex-col gap-3.5">
          {MATES.map(mate => <MateCard key={mate.id} mate={mate} />)}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
