import Link from 'next/link';
import { Mate, SERVICE_LABELS } from '@/lib/types';

interface Props { mate: Mate; }

export default function MateCard({ mate }: Props) {
  const minPrice = Math.min(...mate.services.map(s => s.pricePerHour));
  return (
    <Link href={`/mates/${mate.id}`} className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Hero */}
      <div className={`relative h-48 bg-gradient-to-br ${mate.bgGradient} overflow-hidden`}>
        {mate.imageUrl ? (
          <img
            src={mate.imageUrl}
            alt={mate.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            {mate.emoji}
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 shadow-sm">
          <span className="text-xs">🏅</span>
          <span className="text-xs font-bold text-emerald-700">Trust {mate.trustScore.score}</span>
        </div>
        {mate.isNew && (
          <div className="absolute top-2.5 right-2.5 bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            新着
          </div>
        )}
      </div>
      {/* Body */}
      <div className="p-3.5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-bold text-gray-900">{mate.name} さん</div>
            <div className="text-xs text-gray-400 mt-0.5">📍 {mate.area}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-emerald-700">¥{minPrice.toLocaleString()}<span className="text-xs font-normal text-gray-400">/h〜</span></div>
          </div>
        </div>
        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {mate.services.map(s => (
            <span key={s.type} className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {SERVICE_LABELS[s.type]}
            </span>
          ))}
        </div>
        {/* Footer */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-gray-100">
          <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(mate.trustScore.avgRating))}</span>
          <span className="text-xs text-gray-500">{mate.trustScore.avgRating}（{mate.trustScore.completedCount}件）</span>
          {mate.repeatCount && (
            <span className="ml-auto bg-orange-50 text-orange-500 text-xs font-bold px-2 py-0.5 rounded-full">
              🔁 継続中 {mate.repeatCount}回
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
