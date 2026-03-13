import Link from 'next/link';
import { Mate, SERVICE_LABELS } from '@/lib/types';
import { Star, MapPin, ShieldCheck, RefreshCw } from 'lucide-react';

interface Props { mate: Mate; }

export default function MateCard({ mate }: Props) {
  const minPrice = Math.min(...mate.services.map(s => s.pricePerHour));

  return (
    <Link
      href={`/mates/${mate.id}`}
      className="block bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:border-gray-200 hover:shadow-md active:scale-[0.99]"
    >
      {/* 画像エリア */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {mate.imageUrl ? (
          <img
            src={mate.imageUrl}
            alt={mate.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${mate.bgGradient}`} />
        )}

        <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-gray-800">{mate.trustScore.avgRating}</span>
          <span className="text-xs text-gray-400">({mate.trustScore.completedCount}件)</span>
        </div>

        {mate.isNew && (
          <div className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            新規
          </div>
        )}
      </div>

      {/* 情報エリア */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-3 mb-2.5">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">{mate.name} さん</h3>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
              <MapPin size={11} className="text-orange-500 shrink-0" />
              <span className="truncate">{mate.area}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-gray-400 mb-0.5">〜</div>
            <div className="text-lg font-bold text-gray-900 leading-tight">
              ¥{minPrice.toLocaleString()}
              <span className="text-xs font-normal text-gray-400">/h</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {mate.services.map(s => (
            <span
              key={s.type}
              className="text-[11px] text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-full"
            >
              {SERVICE_LABELS[s.type]}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <ShieldCheck size={12} className="text-orange-500" />
            <span>信頼スコア {mate.trustScore.score}</span>
          </div>
          {mate.repeatCount && (
            <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
              <RefreshCw size={11} />
              <span>{mate.repeatCount}回継続</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
