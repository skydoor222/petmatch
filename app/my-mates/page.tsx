import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { Repeat, Calendar, ChevronRight, History } from 'lucide-react';

export default async function MyMatesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/welcome');

  const { data: pet } = await supabase
    .from('pets')
    .select('name')
    .eq('owner_id', user.id)
    .single();

  const petName = pet?.name || 'うちの子';

  const { data: bookings } = await supabase
    .from('booking_requests')
    .select(`
      mate_id,
      booking_date,
      status,
      mates (
        id,
        name,
        emoji,
        image_url,
        bg_gradient,
        trust_score,
        repeat_count,
        services (type)
      )
    `)
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  const uniqueMates = Array.from(new Set(bookings?.map(b => b.mate_id)))
    .map(id => {
      const b: any = bookings?.find(b => b.mate_id === id);
      const m = b?.mates;
      if (!m) return null;
      return {
        ...m,
        bgGradient: m.bg_gradient,
        imageUrl: m.image_url,
        trustScore: m.trust_score,
        repeatCount: m.repeat_count,
        services: m.services
      };
    })
    .filter(m => m !== null);

  const timelineEvents = bookings?.slice(0, 5).map(b => ({
    text: `${(b.mates as any)?.name}さんに依頼しました`,
    date: b.booking_date,
  })) || [];

  return (
    <div className="pb-32 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="premium-gradient pt-20 pb-16 px-8 rounded-b-[3rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white">
              <Repeat size={24} />
            </div>
            <h1 className="text-3xl font-heading text-white">My Mates</h1>
          </div>
          <p className="text-teal-50 text-sm font-medium opacity-80 max-w-[240px]">
            {petName}を支える、信頼できるパートナーたち
          </p>
        </div>
      </div>

      {/* History Timeline */}
      <div className="px-6 -mt-8 mb-8">
        <section className="bg-white rounded-[2.5rem] p-8 card-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                <History size={16} />
              </div>
              <h2 className="text-sm font-heading text-gray-900 uppercase tracking-widest">History</h2>
            </div>
            <Link href="/history" className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">View All</Link>
          </div>

          <div className="space-y-8">
            {timelineEvents.length > 0 ? (
              timelineEvents.map((event, i) => (
                <div key={i} className="relative flex gap-6">
                  {i !== timelineEvents.length - 1 && (
                    <div className="absolute left-1.5 top-6 bottom-[-24px] w-0.5 bg-gray-50" />
                  )}
                  <div className="relative z-10 w-3 h-3 rounded-full mt-1.5 bg-teal-500 shadow-lg shadow-teal-500/30" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700 leading-tight mb-1">{event.text}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      <Calendar size={10} />
                      {event.date}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-xs font-bold text-gray-400">まだ依頼履歴がありません</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Mate Cards */}
      <div className="px-6 space-y-4">
        <h2 className="text-lg font-heading text-gray-900 px-2 uppercase tracking-wider mb-4">Saved Mates</h2>
        {uniqueMates.length > 0 ? (
          uniqueMates.map(mate => (
            <div key={mate.id} className="bg-white rounded-[2.5rem] card-shadow p-6 border border-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex gap-5">
                <Link href={`/mates/${mate.id}`} className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-[1.8rem] bg-gradient-to-br ${mate.bgGradient} overflow-hidden shadow-lg border-2 border-white`}>
                    {mate.imageUrl ? (
                      <img
                        src={mate.imageUrl}
                        alt={mate.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl opacity-40">
                        {mate.emoji}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/mates/${mate.id}`}>
                      <h3 className="text-lg font-heading text-gray-900 leading-none truncate">{mate.name} さん</h3>
                    </Link>
                    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-xl">
                      <Repeat size={14} className="text-orange-500" />
                      <span className="text-[11px] font-black text-orange-600">{mate.repeatCount ?? 0}回</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="text-[11px] font-black text-gray-900">{mate.trustScore.avgRating}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-md bg-teal-50 flex items-center justify-center">
                        <ShieldCheck size={10} className="text-teal-600" />
                      </div>
                      <span className="text-[11px] font-black text-teal-800">{mate.trustScore.score} score</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-[120px]">
                      {mate.services.map((s: any) => s.type === 'walk' ? '散歩' : s.type === 'home_care' ? 'ケア' : s.type === 'hospital' ? '通院' : s.type === 'night' ? '夜間' : '長期').join(' • ')}
                    </div>
                    <Link href={`/request/${mate.id}`}
                      className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-2xl shadow-lg shadow-teal-900/10 transition-all active:scale-95">
                      Request
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200 shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No Mates Found</p>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="px-6 mt-12 mb-12">
        <Link href="/" className="group flex items-center justify-between w-full bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-[2.5rem] hover:bg-teal-50 hover:border-teal-200 transition-all duration-300">
          <div className="text-left">
            <div className="text-lg font-heading text-gray-900 mb-1 group-hover:text-teal-900">Find New Mate</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-teal-600">Explore experts in your area</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-300 group-hover:text-teal-600 group-hover:bg-teal-100 transition-all shadow-sm">
            <ChevronRight size={24} />
          </div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
