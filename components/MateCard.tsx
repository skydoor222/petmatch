import Link from 'next/link';
import { Mate, SERVICE_LABELS } from '@/lib/types';
import { Star, MapPin, ShieldCheck, Repeat } from 'lucide-react';

interface Props { mate: Mate; }

export default function MateCard({ mate }: Props) {
  const minPrice = Math.min(...mate.services.map(s => s.pricePerHour));

  return (
    <Link href={`/mates/${mate.id}`} className="group block bg-white rounded-[2.5rem] card-shadow overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100">
      {/* Visual Header */}
      <div className={`relative h-56 bg-gradient-to-br ${mate.bgGradient} overflow-hidden`}>
        {mate.imageUrl ? (
          <img
            src={mate.imageUrl}
            alt={mate.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-7xl opacity-40">
            {mate.emoji}
          </div>
        )}

        {/* Rating Floating Badge */}
        <div className="absolute bottom-4 left-4 glass rounded-2xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg shadow-black/5">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-gray-900">{mate.trustScore.avgRating}</span>
          <span className="text-[10px] font-bold text-gray-400">（{mate.trustScore.completedCount}）</span>
        </div>

        {/* Badge: New */}
        {mate.isNew && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-orange-900/20 tracking-wider uppercase">
            New Mate
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="p-6">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-heading text-gray-900 truncate">
              {mate.name} さん
            </h3>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-semibold mt-1">
              <MapPin size={12} className="text-teal-600" />
              <span className="truncate">{mate.area}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Starts at</div>
            <div className="text-2xl font-heading text-teal-700 leading-none tracking-tight">
              ¥{minPrice.toLocaleString()}
              <span className="text-[10px] font-bold text-gray-400 ml-0.5">/h</span>
            </div>
          </div>
        </div>

        {/* Services Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {mate.services.map(s => (
            <span key={s.type} className="bg-teal-50/50 text-teal-700 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-teal-100/50">
              {SERVICE_LABELS[s.type]}
            </span>
          ))}
        </div>

        {/* Trust Stats Integrated Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-0.5">Trust Score</div>
              <div className="text-xs font-extrabold text-teal-800 leading-none">{mate.trustScore.score}</div>
            </div>
          </div>

          {mate.repeatCount && (
            <div className="flex items-center gap-3 bg-orange-50 px-3 py-1.5 rounded-xl">
              <Repeat size={14} className="text-orange-500" />
              <span className="text-[11px] font-extrabold text-orange-600">
                {mate.repeatCount}回 継続中
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
