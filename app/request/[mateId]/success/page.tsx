import Link from 'next/link';
import { MATES } from '@/lib/mockData';

export default async function SuccessPage({ params }: { params: Promise<{ mateId: string }> }) {
  const { mateId } = await params;
  const mate = MATES.find(m => m.id === mateId) ?? MATES[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#F7F5F1]">
      <div className="text-7xl mb-5">🎉</div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2.5">依頼を送りました！</h1>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        {mate.name}さんに依頼が届きました。<br />
        承諾が確定したらお知らせします。<br />
        <span className="text-emerald-700 font-bold">通常24時間以内</span>に返答があります。
      </p>

      {/* Summary Card */}
      <div className="w-full bg-emerald-50 rounded-2xl p-4 mb-6 text-left">
        {[
          ['Mate', `${mate.name} さん（Trust ${mate.trustScore.score}）`],
          ['サービス', '散歩代行'],
          ['日時', '3月18日 10:00〜11:00'],
          ['金額（確定後）', '¥2,070'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between py-2 border-b border-emerald-100 last:border-0">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-xs font-bold text-gray-800">{value}</span>
          </div>
        ))}
      </div>

      <Link href="/my-mates" className="w-full border-2 border-emerald-700 text-emerald-700 font-bold py-3.5 rounded-xl text-center block mb-3 hover:bg-emerald-50 transition-colors">
        マイMateを見る
      </Link>
      <Link href="/" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-center block transition-colors">
        トップに戻る
      </Link>
    </div>
  );
}
