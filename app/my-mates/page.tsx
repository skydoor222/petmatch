import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { Repeat, Calendar, ChevronRight, History, Star, ShieldCheck, Heart, User } from 'lucide-react';

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

  // Mocking bookings if real data is sparse
  const bookings = [
    {
      mate_id: '1',
      booking_date: '2026.03.15',
      status: 'confirmed',
      mates: {
        id: '1',
        name: '田中 美咲',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        bg_gradient: 'from-orange-400 to-rose-400',
        trust_score: { avgRating: 4.9, score: 980 },
        repeat_count: 5,
        services: [{ type: 'walk' }, { type: 'home_care' }]
      }
    },
    {
      mate_id: '2',
      booking_date: '2026.03.10',
      status: 'completed',
      mates: {
        id: '2',
        name: '佐藤 健太',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        bg_gradient: 'from-amber-400 to-orange-500',
        trust_score: { avgRating: 4.8, score: 950 },
        repeat_count: 3,
        services: [{ type: 'walk' }]
      }
    }
  ];

  const uniqueMates = bookings.map(b => b.mates);

  const timelineEvents = [
    { text: '田中 美咲さんに依頼しました', date: '2026.03.15', type: 'pending' },
    { text: '佐藤 健太さんのお世話が完了しました', date: '2026.03.10', type: 'done' },
  ];

  return (
    <div className="pb-36 bg-gray-50/50 min-h-screen">
      {/* Premium Header */}
      <div className="bg-white pt-20 pb-12 px-8 rounded-b-[3.5rem] shadow-sm border-b border-gray-100 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-900/20">
              <Heart size={28} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-heading text-gray-900 tracking-tight">My Mates</h1>
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mt-1">信頼のパートナー</p>
            </div>
          </div>
          <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm">
              <User size={20} />
            </div>
            <p className="text-xs font-bold text-orange-900/70 leading-relaxed">
              {petName}のことをよく知っている、<br />お気に入りのメイトたちです。
            </p>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-md mx-auto px-6 -mt-6 space-y-10">

        {/* Simplified History Timeline */}
        <section className="bg-white rounded-[2.8rem] p-8 shadow-xl shadow-orange-900/5 border border-gray-50">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <History size={18} className="text-orange-600" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">最近の履歴</h2>
            </div>
            <Link href="/history" className="text-[10px] font-black text-gray-400 hover:text-orange-600 transition-colors uppercase tracking-widest border-b border-gray-100 pb-0.5">すべて見る</Link>
          </div>

          <div className="space-y-6">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full mt-1.5 transition-all
                                    ${event.type === 'pending' ? 'bg-orange-500 shadow-lg shadow-orange-500/40 ring-4 ring-orange-50' : 'bg-gray-200'}`}
                  />
                  {i !== timelineEvents.length - 1 && <div className="w-0.5 flex-1 bg-gray-50 my-2" />}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-bold text-gray-700 leading-snug group-hover:text-gray-900 transition-colors">{event.text}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 mt-1 uppercase tracking-wider">
                    <Calendar size={10} />
                    {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mate Cards Re-imagined */}
        <div className="space-y-6 pb-10">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">保存したメイト</h2>
            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">{uniqueMates.length} 名</span>
          </div>

          <div className="grid gap-4">
            {uniqueMates.map(mate => (
              <div key={mate.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-orange-900/5 border border-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden">
                <div className="flex gap-5 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative group-hover:rotate-3 transition-transform">
                      <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-heading text-gray-900 leading-tight mb-0.5">{mate.name} さん</h3>
                        <div className="flex items-center gap-1.5 text-orange-600">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[11px] font-black">{mate.trust_score.avgRating}</span>
                          <span className="text-[10px] font-black text-gray-300 ml-1">({mate.repeat_count} 回リピート)</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-orange-500 group-hover:bg-orange-50 transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-1.5 overflow-hidden">
                        {mate.services.map((s: any, i: number) => (
                          <span key={i} className="text-[9px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 uppercase tracking-tight">
                            {s.type === 'walk' ? '散歩' : s.type === 'home_care' ? 'ケア' : '見守り'}
                          </span>
                        ))}
                      </div>
                      <Link href={`/request/${mate.id}`}
                        className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-lg shadow-orange-900/10 hover:bg-orange-700 transition-all active:scale-95">
                        再依頼
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
