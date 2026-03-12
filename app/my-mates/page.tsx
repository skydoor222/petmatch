import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function MyMatesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/welcome');

  // Fetch pet name
  const { data: pet } = await supabase
    .from('pets')
    .select('name')
    .eq('owner_id', user.id)
    .single();

  const petName = pet?.name || 'うちの子';

  // Fetch unique mates the user has booked
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
        bg_gradient,
        trust_score,
        repeat_count,
        services (type)
      )
    `)
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  // Filter unique mates and transform
  const uniqueMates = Array.from(new Set(bookings?.map(b => b.mate_id)))
    .map(id => {
      const b = bookings?.find(b => b.mate_id === id);
      const m: any = b?.mates;
      return {
        ...m,
        bgGradient: m.bg_gradient,
        trustScore: m.trust_score,
        repeatCount: m.repeat_count,
        services: m.services
      };
    })
    .filter(m => m !== undefined);

  // Timeline events (Real history from bookings)
  const timelineEvents = bookings?.slice(0, 5).map(b => ({
    text: `Mateの ${(b.mates as any)?.name}さんに依頼しました`,
    date: b.booking_date,
    color: 'bg-emerald-500'
  })) || [];

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-700 px-5 pt-12 pb-6">
        <h1 className="text-xl font-extrabold text-white">🔁 マイMate</h1>
        <p className="text-white/80 text-sm mt-1">継続指名している相棒たち</p>
      </div>

      {/* Relationship Timeline */}
      <div className="mx-4 my-4 bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 mb-3">🐾 {petName}との歩み</h2>
        <div className="flex flex-col gap-3">
          {timelineEvents.length > 0 ? (
            timelineEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${event.color}`} />
                <div>
                  <p className="text-xs text-gray-600">{event.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{event.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 py-2">まだ依頼履歴がありません</p>
          )}
        </div>
      </div>

      {/* Mate Cards */}
      <div className="px-4 flex flex-col gap-3">
        {uniqueMates.length > 0 ? (
          uniqueMates.map(mate => (
            <div key={mate.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-3">
              <Link href={`/mates/${mate.id}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mate.bgGradient} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {mate.emoji}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/mates/${mate.id}`}>
                  <div className="font-bold text-gray-900">{mate.name} さん</div>
                </Link>
                <div className="text-xs text-gray-400 mt-0.5 truncate">
                  {mate.services.map((s: any) => s.type === 'walk' ? '散歩' : s.type === 'home_care' ? '在宅ケア' : s.type === 'hospital' ? '通院' : s.type === 'night' ? '夜間' : '長期').join('・')}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-gray-500">🏅 Trust {mate.trustScore.score}</span>
                  <span className="text-xs text-gray-500">⭐ {mate.trustScore.avgRating}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="bg-orange-50 text-orange-500 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  🔁 {mate.repeatCount ?? 0}回
                </span>
                <Link href={`/request/${mate.id}`}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                  再依頼
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <p className="text-sm text-gray-400">お気に入りのMateがまだいません</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 mt-5">
        <Link href="/" className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 text-gray-500 text-sm font-semibold py-4 rounded-2xl hover:border-emerald-400 hover:text-emerald-700 transition-colors">
          ＋ 新しいMateを探す
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
