import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import RequestForm from './RequestForm';

export default async function RequestPage({ params }: { params: Promise<{ mateId: string }> }) {
  const { mateId } = await params;
  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  // Fetch mate data
  const { data: mate, error } = await supabase
    .from('mates')
    .select(`
      *,
      services (*),
      reviews (*)
    `)
    .eq('id', mateId)
    .single();

  if (error || !mate) notFound();

  // Transform data for the component
  const transformedMate = {
    ...mate,
    bgGradient: mate.bg_gradient,
    trustScore: mate.trust_score,
    repeatCount: mate.repeat_count,
    services: mate.services.map((s: any) => ({
      type: s.type,
      pricePerHour: s.price_per_hour
    }))
  };

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/mates/${mateId}`} className="text-gray-500 text-lg">←</Link>
          <h1 className="text-lg font-bold text-gray-900">依頼内容を入力</h1>
        </div>
        {/* Mate Summary */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${transformedMate.bgGradient} flex items-center justify-center text-2xl flex-shrink-0`}>
            {transformedMate.emoji}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{transformedMate.name} さん</div>
            <div className="text-xs text-gray-400">Trust Score {transformedMate.trustScore.score} · ⭐ {transformedMate.trustScore.avgRating}</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <RequestForm mate={transformedMate} />
      </div>
    </div>
  );
}
