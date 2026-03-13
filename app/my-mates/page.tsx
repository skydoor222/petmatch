import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { Star, ShieldCheck, Calendar } from 'lucide-react';

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

  const bookings = [
    {
      mate_id: '1',
      booking_date: '2026.03.15',
      status: 'confirmed',
      mates: {
        id: '1',
        name: '田中 美咲',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        trust_score: { avgRating: 4.9, score: 98 },
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
        trust_score: { avgRating: 4.8, score: 95 },
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
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-5 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">マイMate</h1>
        <p className="text-xs text-gray-400 mt-0.5">{petName}のお気に入りMate</p>
      </div>

      <div className="px-5 pt-5 space-y-5">
        {/* Timeline */}
        <section className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">最近の履歴</h2>
          </div>

          <div className="space-y-4">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0
                    ${event.type === 'pending' ? 'bg-orange-500' : 'bg-gray-200'}`}
                  />
                  {i !== timelineEvents.length - 1 && <div className="w-0.5 flex-1 bg-gray-100 my-1.5" />}
                </div>
                <div className="pb-1">
                  <p className="text-sm text-gray-700">{event.text}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <Calendar size={10} />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mate Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">保存したMate</h2>
            <span className="text-xs text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">{uniqueMates.length}名</span>
          </div>

          <div className="space-y-3">
            {uniqueMates.map(mate => (
              <div key={mate.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-gray-900">{mate.name} さん</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs text-gray-600">{mate.trust_score.avgRating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <ShieldCheck size={11} className="text-orange-500" />
                      <span>信頼スコア {mate.trust_score.score} · {mate.repeat_count}回リピート</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {mate.services.map((s: any, i: number) => (
                          <span key={i} className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                            {s.type === 'walk' ? '散歩' : s.type === 'home_care' ? 'ケア' : '見守り'}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/request/${mate.id}`}
                        className="text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-xl transition-colors"
                      >
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
