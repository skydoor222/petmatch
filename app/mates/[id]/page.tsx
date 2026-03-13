import Link from 'next/link';
import { notFound } from 'next/navigation';
import TrustScoreCard from '@/components/TrustScoreCard';
import { getMateById } from '@/lib/supabase';
import { SERVICE_LABELS, ServiceType } from '@/lib/types';
import {
  ArrowLeft, MapPin, Star, ShieldCheck, User,
  PawPrint, Search, Calendar, Sparkles, Clock,
  Heart, Send, CheckCircle2
} from 'lucide-react';

const CALENDAR_DAYS = Array.from({ length: 21 }, (_, i) => i + 1);

const SERVICE_INFO: Record<ServiceType, { icon: any; color: string; desc: string }> = {
  walk: { icon: PawPrint, color: 'text-blue-500', desc: 'ワンちゃんに合わせた散歩' },
  home_care: { icon: Sparkles, color: 'text-purple-500', desc: 'お留守番中の総合ケア' },
  hospital: { icon: Search, color: 'text-amber-500', desc: '動物病院への通院付き添い' },
  night: { icon: Clock, color: 'text-indigo-500', desc: '夜間の体調見守り' },
  long_stay: { icon: Calendar, color: 'text-teal-500', desc: '長期不在時のサポート' },
};

export default async function MateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mate: any = await getMateById(id);
  if (!mate) notFound();

  const minPrice = Math.min(...mate.services.map((s: any) => s.pricePerHour));

  return (
    <div className="pb-40 bg-gray-50/30">
      {/* Premium Hero */}
      <div className={`relative h-[450px] bg-gradient-to-br ${mate.bgGradient} overflow-hidden`}>
        <Link href="/" className="absolute top-12 left-6 glass rounded-2xl w-12 h-12 flex items-center justify-center shadow-2xl text-gray-900 transition-all hover:scale-105 active:scale-95 z-20">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </Link>

        {mate.imageUrl ? (
          <img
            src={mate.imageUrl}
            alt={mate.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-9xl opacity-30">
            {mate.emoji}
          </div>
        )}

        {/* Floating Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-10 left-8 right-8 text-white z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-4 border border-white/20">
            <CheckCircle2 size={12} className="text-teal-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Identified Professional</span>
          </div>
          <h1 className="text-4xl font-heading mb-2 leading-tight">{mate.name} さん</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 opacity-90">
              <MapPin size={14} className="text-teal-400" />
              <span className="text-sm font-bold tracking-wide">{mate.area}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <div className="flex items-center gap-1.5 bg-amber-400/90 text-gray-900 px-2.5 py-0.5 rounded-lg">
              <Star size={12} className="fill-gray-900" />
              <span className="text-xs font-black">{mate.trustScore.avgRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Stats Section */}
      <div className="relative -mt-6">
        <TrustScoreCard trustScore={mate.trustScore} />
      </div>

      {/* Main Info */}
      <div className="px-6 space-y-6">
        {/* Bio Section */}
        <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
              <User size={20} />
            </div>
            <h2 className="text-lg font-heading text-gray-900 uppercase tracking-wider">Background</h2>
          </div>
          <p className="text-gray-600 leading-relaxed font-medium text-base mb-6">
            {mate.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {mate.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-50 text-gray-500 text-[11px] font-bold px-4 py-2 rounded-xl border border-gray-100 uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Sparkles size={20} />
            </div>
            <h2 className="text-lg font-heading text-gray-900 uppercase tracking-wider">Services</h2>
          </div>
          <div className="space-y-4">
            {mate.services.map((s: any) => {
              const info = SERVICE_INFO[s.type as ServiceType] || { icon: Sparkles, color: 'text-gray-500', desc: '' };
              const Icon = info.icon;
              return (
                <div key={s.type} className="flex items-center gap-5 p-5 rounded-3xl bg-gray-50/50 border border-gray-50 transition-all hover:bg-gray-50">
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm ${info.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-extrabold text-gray-900 mb-0.5">{SERVICE_LABELS[s.type as ServiceType]}</div>
                    <div className="text-[11px] font-bold text-gray-400">{info.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-gray-400 uppercase leading-none mb-1 text-[10px]">Hourly</div>
                    <div className="text-lg font-heading text-teal-700 leading-none">¥{s.pricePerHour.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Availability Section */}
        <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Calendar size={20} />
            </div>
            <h2 className="text-lg font-heading text-gray-900 uppercase tracking-wider">Schedule</h2>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-[10px] font-black text-gray-300 py-1 text-center">{d}</div>
            ))}
            {[1, 2, 3, 4].map(i => <div key={`p${i}`} />)}
            {CALENDAR_DAYS.map(day => {
              const available = mate.availableDates.includes(day);
              return (
                <div key={day} className={`aspect-square flex items-center justify-center rounded-2xl text-[11px] font-black transition-all
                  ${available ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/10' : 'bg-gray-50 text-gray-200'}`}>
                  {day}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-100" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Booked</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="glass px-6 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-6 border border-white/50">
            <div className="flex-1">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Starting from</div>
              <div className="text-2xl font-heading text-gray-900">¥{minPrice.toLocaleString()}<span className="text-xs font-bold text-gray-400 ml-1">/h</span></div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-16 h-16 rounded-[1.8rem] bg-white border border-gray-100 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:border-rose-100 transition-all active:scale-95 shadow-sm">
                <Heart size={24} />
              </button>
              <Link href={`/request/${mate.id}`} className="min-w-[140px] h-16 rounded-[1.8rem] bg-teal-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-teal-700 transition-all active:scale-95 shadow-xl shadow-teal-900/20 px-6">
                <Send size={18} />
                <span>依頼する</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
