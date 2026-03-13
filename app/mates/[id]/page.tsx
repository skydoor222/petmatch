import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrustScoreCard from '@/components/TrustScoreCard';
import { getMateById } from '@/lib/supabase';
import { SERVICE_LABELS, ServiceType } from '@/lib/types';
import {
  ArrowLeft, MapPin, Star, ShieldCheck, User,
  PawPrint, Search, Calendar, Clock, Send
} from 'lucide-react';

const CALENDAR_DAYS = Array.from({ length: 21 }, (_, i) => i + 1);

const SERVICE_INFO: Record<ServiceType, { icon: any; desc: string }> = {
  walk:        { icon: PawPrint, desc: 'ワンちゃんに合わせた散歩コース' },
  home_care:   { icon: User,     desc: 'お留守番中の総合ケア' },
  hospital:    { icon: Search,   desc: '動物病院への通院付き添い' },
  night:       { icon: Clock,    desc: '夜間の体調見守り' },
  long_stay:   { icon: Calendar, desc: '長期不在時のサポート' },
};

export default async function MateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mate: any = await getMateById(id);
  if (!mate) notFound();

  const minPrice = Math.min(...mate.services.map((s: any) => s.pricePerHour));

  return (
    <div className="pb-36 bg-gray-50">
      {/* Hero */}
      <div className={`relative h-96 bg-gradient-to-br ${mate.bgGradient} overflow-hidden`}>
        <Link
          href="/mates"
          className="absolute top-12 left-5 bg-white/90 rounded-xl w-10 h-10 flex items-center justify-center shadow-sm text-gray-700 z-20"
        >
          <ArrowLeft size={18} />
        </Link>

        {mate.imageUrl ? (
          <img
            src={mate.imageUrl}
            alt={mate.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-8xl opacity-30">
            {mate.emoji}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-8 left-5 right-5 text-white z-10">
          <div className="flex items-center gap-1.5 mb-1.5">
            <ShieldCheck size={13} className="text-orange-300" />
            <span className="text-xs font-medium text-orange-200">本人確認済み</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{mate.name} さん</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 opacity-90">
              <MapPin size={13} />
              <span className="text-sm">{mate.area}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-400/90 text-gray-900 px-2 py-0.5 rounded-lg">
              <Star size={11} className="fill-gray-900" />
              <span className="text-xs font-bold">{mate.trustScore.avgRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Score */}
      <div className="-mt-4 relative">
        <TrustScoreCard trustScore={mate.trustScore} />
      </div>

      {/* Main Info */}
      <div className="px-4 space-y-4">
        {/* Bio */}
        <section className="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">自己紹介</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{mate.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {mate.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">対応サービス</h2>
          <div className="space-y-3">
            {mate.services.map((s: any) => {
              const info = SERVICE_INFO[s.type as ServiceType] || { icon: User, desc: '' };
              const Icon = info.icon;
              return (
                <div key={s.type} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-orange-500 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{SERVICE_LABELS[s.type as ServiceType]}</div>
                    <div className="text-xs text-gray-400">{info.desc}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-400 mb-0.5">時間単価</div>
                    <div className="text-sm font-bold text-gray-900">¥{s.pricePerHour.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Calendar */}
        <section className="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">スケジュール</h2>
          <div className="grid grid-cols-7 gap-1.5 mb-4">
            {['日', '月', '火', '水', '木', '金', '土'].map(d => (
              <div key={d} className="text-[10px] text-gray-300 text-center pb-1">{d}</div>
            ))}
            {[1, 2, 3, 4].map(i => <div key={`p${i}`} />)}
            {CALENDAR_DAYS.map(day => {
              const available = mate.availableDates.includes(day);
              return (
                <div key={day} className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-colors
                  ${available ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-200'}`}>
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-600" />
              <span className="text-xs text-gray-400">空き</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-100" />
              <span className="text-xs text-gray-400">予約済み</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-0.5">最低料金（1時間）</div>
            <div className="text-xl font-bold text-gray-900">¥{minPrice.toLocaleString()}<span className="text-xs font-normal text-gray-400 ml-1">/h</span></div>
          </div>
          <Link
            href={`/request/${mate.id}`}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors active:scale-95"
          >
            <Send size={16} />
            <span>依頼する</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
