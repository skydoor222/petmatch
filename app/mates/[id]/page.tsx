import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrustScoreCard from '@/components/TrustScoreCard';
import { MATES } from '@/lib/mockData';
import { SERVICE_LABELS, SERVICE_ICONS, SERVICE_DESCRIPTIONS } from '@/lib/types';

const CALENDAR_DAYS = Array.from({ length: 21 }, (_, i) => i + 1);

export default async function MateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mate = MATES.find(m => m.id === id);
  if (!mate) notFound();

  return (
    <div className="pb-36">
      {/* Hero */}
      <div className={`relative h-56 bg-gradient-to-br ${mate.bgGradient} flex items-center justify-center text-8xl`}>
        <Link href="/mates" className="absolute top-4 left-4 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-lg hover:bg-white transition-colors">
          ←
        </Link>
        {mate.emoji}
      </div>

      {/* Profile */}
      <div className="bg-white px-4 py-4 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{mate.name} さん</h1>
          <p className="text-sm text-gray-500 mt-0.5">📍 {mate.area}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-yellow-400">{'★'.repeat(Math.round(mate.trustScore.avgRating))}</span>
            <span className="text-sm font-bold text-gray-800">{mate.trustScore.avgRating}</span>
            <span className="text-xs text-gray-400">（{mate.trustScore.completedCount}件）</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-emerald-700">
            ¥{Math.min(...mate.services.map(s => s.pricePerHour)).toLocaleString()}
            <span className="text-sm font-normal text-gray-400">/h〜</span>
          </div>
          {mate.repeatCount && (
            <div className="text-xs text-gray-400 mt-1">継続 {mate.repeatCount}回</div>
          )}
        </div>
      </div>

      {/* Trust Score */}
      <TrustScoreCard trustScore={mate.trustScore} />

      {/* Bio */}
      <section className="bg-white mx-0 px-4 py-4 mt-2">
        <h2 className="text-sm font-bold text-gray-900 mb-2">👋 自己紹介</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{mate.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {mate.tags.map(tag => (
            <span key={tag} className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-white px-4 py-4 mt-2">
        <h2 className="text-sm font-bold text-gray-900 mb-3">🛎 対応サービス</h2>
        <div className="flex flex-col gap-2">
          {mate.services.map(s => (
            <div key={s.type} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <span className="text-xl">{SERVICE_ICONS[s.type]}</span>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{SERVICE_LABELS[s.type]}</div>
                <div className="text-xs text-gray-400 mt-0.5">{SERVICE_DESCRIPTIONS[s.type]}</div>
              </div>
              <div className="text-sm font-bold text-emerald-700">¥{s.pricePerHour.toLocaleString()}/h</div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="bg-white px-4 py-4 mt-2">
        <h2 className="text-sm font-bold text-gray-900 mb-3">📅 空き状況（3月）</h2>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['月','火','水','木','金','土','日'].map(d => (
            <div key={d} className="text-[10px] font-semibold text-gray-400 py-1">{d}</div>
          ))}
          {/* padding for first week */}
          {[1,2,3,4].map(i => <div key={`p${i}`} />)}
          {CALENDAR_DAYS.map(day => {
            const available = mate.availableDates.includes(day);
            return (
              <div key={day} className={`text-xs py-1.5 rounded-lg font-medium cursor-pointer transition-colors
                ${available ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold' : 'text-gray-300'}`}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-400">
          <span>🟢 空きあり</span><span>⚫ 予約済み</span>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white px-4 py-4 mt-2">
        <h2 className="text-sm font-bold text-gray-900 mb-3">⭐ レビュー（{mate.reviews.length}件）</h2>
        <div className="flex flex-col gap-3">
          {mate.reviews.map(review => (
            <div key={review.id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm">{review.ownerEmoji}</div>
                <div>
                  <div className="text-xs font-bold text-gray-900">{review.ownerName} さん</div>
                  <div className="text-[10px] text-gray-400">{'⭐'.repeat(review.rating)} · {review.date}</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
              {review.repeatCount > 1 && (
                <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-full mt-2">
                  🔁 {review.repeatCount}回継続中
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/97 backdrop-blur border-t border-gray-100 px-4 py-3 pb-6 z-50">
        <div className="max-w-lg mx-auto flex gap-3">
          <button className="w-12 h-12 flex-shrink-0 border-2 border-gray-200 rounded-xl flex items-center justify-center text-xl hover:border-red-300 transition-colors">
            🤍
          </button>
          <Link href={`/request/${mate.id}`} className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            📋 依頼する
          </Link>
        </div>
      </div>
    </div>
  );
}
