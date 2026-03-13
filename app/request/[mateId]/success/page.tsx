import Link from 'next/link';
import { MATES } from '@/lib/mockData';
import { CheckCircle2 } from 'lucide-react';

export default async function SuccessPage({ params }: { params: Promise<{ mateId: string }> }) {
  const { mateId } = await params;
  const mate = MATES.find(m => m.id === mateId) ?? MATES[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">
      <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-900/20">
        <CheckCircle2 size={32} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">依頼を送りました</h1>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        {mate.name}さんに依頼が届きました。<br />
        承諾が確定したらお知らせします。<br />
        <span className="text-orange-600 font-semibold">通常24時間以内</span>に返答があります。
      </p>

      {/* Summary Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 p-4 mb-6 text-left shadow-sm">
        {[
          ['Mate', `${mate.name} さん（信頼スコア ${mate.trustScore.score}）`],
          ['サービス', '散歩代行'],
          ['日時', '3月18日 10:00〜11:00'],
          ['金額（確定後）', '¥2,070'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between py-2.5 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-400">{label}</span>
            <span className="text-xs font-semibold text-gray-800">{value}</span>
          </div>
        ))}
      </div>

      <Link
        href="/my-mates"
        className="w-full border-2 border-orange-600 text-orange-600 font-bold py-3.5 rounded-xl text-center block mb-3 hover:bg-orange-50 transition-colors"
      >
        マイMateを見る
      </Link>
      <Link
        href="/"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-center block transition-colors"
      >
        トップに戻る
      </Link>
    </div>
  );
}
