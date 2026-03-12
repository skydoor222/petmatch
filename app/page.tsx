import Link from 'next/link';
import MateCard from '@/components/MateCard';
import BottomNav from '@/components/BottomNav';
import { MATES } from '@/lib/mockData';

const SERVICES = [
  { type: 'walk', label: '🐕 散歩代行' },
  { type: 'hospital', label: '🏥 通院同伴' },
  { type: 'home_care', label: '🏠 在宅ケア' },
  { type: 'night', label: '🌙 夜間見守り' },
  { type: 'long_stay', label: '✈️ 長期不在' },
];

export default function Home() {
  return (
    <div className="pb-28">
      {/* Hero Search */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[140px] opacity-[0.07] select-none pointer-events-none leading-none">🐾</div>
        <div className="text-white text-2xl font-extrabold leading-snug mb-1.5">
          ペットに、もう一人の<br />相棒を見つけよう。
        </div>
        <p className="text-white/70 text-sm mb-5">
          信頼できるMateが、あなたの大切な家族を支えます
        </p>
        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <span className="text-base">📍</span>
            <div>
              <div className="text-[10px] font-bold text-gray-400">エリア</div>
              <div className="text-sm font-medium text-gray-800">世田谷区</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <span className="text-base">🐾</span>
            <div>
              <div className="text-[10px] font-bold text-gray-400">サービス</div>
              <div className="text-sm text-gray-400">すべてのサービス</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <span className="text-base">📅</span>
            <div>
              <div className="text-[10px] font-bold text-gray-400">日付</div>
              <div className="text-sm text-gray-400">いつでも</div>
            </div>
          </div>
          <div className="p-3">
            <Link href="/mates" className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold text-center py-3 rounded-xl transition-colors">
              🔍 Mateを探す
            </Link>
          </div>
        </div>
      </div>

      {/* Service Chips */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-4">
        {SERVICES.map(s => (
          <Link key={s.type} href={`/mates?service=${s.type}`}
            className="flex-shrink-0 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3.5 py-2 rounded-full hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors">
            {s.label}
          </Link>
        ))}
      </div>

      {/* Mate List */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">近くのMate</h2>
        <div className="flex flex-col gap-3.5">
          {MATES.map(mate => <MateCard key={mate.id} mate={mate} />)}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
