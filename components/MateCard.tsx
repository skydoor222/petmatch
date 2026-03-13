import Link from 'next/link';
import { Mate, SERVICE_LABELS } from '@/lib/types';
import { Star, MapPin, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';

interface Props { mate: Mate; }

export default function MateCard({ mate }: Props) {
  return (
    <Link
      href={`/mates/${mate.id}`}
      className="group block bg-white rounded-[2.5rem] border border-gray-100 p-5 transition-all hover:border-orange-100 hover:shadow-xl hover:shadow-orange-900/5 active:scale-[0.98] relative overflow-hidden"
    >
      <div className="flex gap-5 relative z-10">
        {/* 左側: アイコン / プロフィール画像 */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative group-hover:rotate-3 transition-transform">
            {mate.imageUrl ? (
              <img
                src={mate.imageUrl}
                alt={mate.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${mate.bgGradient} flex items-center justify-center text-2xl`}>
                {mate.emoji}
              </div>
            )}
            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white" />
          </div>
        </div>

        {/* 右側: 情報エリア */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-heading text-gray-900 leading-tight mb-0.5">{mate.name} さん</h3>
              <div className="flex items-center gap-1.5 text-orange-600">
                <Star size={12} fill="currentColor" />
                <span className="text-[11px] font-black">{mate.trustScore.avgRating}</span>
                <span className="text-[10px] font-black text-gray-300 ml-1">({mate.trustScore.completedCount} 完了)</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-orange-500 group-hover:bg-orange-50 transition-all">
              <ChevronRight size={18} />
            </div>
          </div>

          <p className="text-sm font-medium text-gray-500 mb-4 line-clamp-1 opacity-70">
            {mate.bio || '大切な家族のように、まごころ込めて丁寧にお世話いたします。'}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {mate.services.slice(0, 2).map(s => (
                <span
                  key={s.type}
                  className="text-[9px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 uppercase tracking-tight"
                >
                  {SERVICE_LABELS[s.type]}
                </span>
              ))}
              {mate.services.length > 2 && (
                <span className="text-[9px] font-black text-gray-300 pt-1">+{mate.services.length - 2}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100">
                <ShieldCheck size={10} />
                <span>スコア {mate.trustScore.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 装飾的な背景画像 (情緒的な演出) */}
      <div className="absolute top-0 right-0 w-32 h-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=800&fit=crop"
          alt="decoration"
          className="w-full h-full object-cover grayscale"
        />
      </div>
    </Link>
  );
}
