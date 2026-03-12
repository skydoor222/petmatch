import { TrustScore } from '@/lib/types';

interface Props { trustScore: TrustScore; }

export default function TrustScoreCard({ trustScore }: Props) {
  const { score, completedCount, repeatRate, avgRating, activeMonths } = trustScore;
  const pct = score / 100;
  const dashArray = 2 * Math.PI * 22;
  const dashOffset = dashArray * (1 - pct);

  return (
    <div className="mx-4 my-3 rounded-2xl p-4 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg shadow-emerald-900/20">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🏅</span>
        <span className="text-xs font-bold opacity-85">信頼スコア（Trust Score）</span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        {/* Ring */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4"/>
            <circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-extrabold">{score}</span>
          </div>
        </div>
        <div>
          <div className="text-2xl font-extrabold leading-none">{score} <span className="text-sm opacity-70">/ 100</span></div>
          <div className="text-xs opacity-75 mt-1">
            {score >= 90 ? '最高信頼Mate' : score >= 80 ? '高信頼Mate' : '信頼構築中'} · 継続指名率 {repeatRate}%
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { val: completedCount + '回', lab: '完了回数' },
          { val: repeatRate + '%', lab: '継続指名率' },
          { val: avgRating.toFixed(1), lab: '平均評価' },
          { val: activeMonths + 'ヶ月', lab: '活動期間' },
        ].map(p => (
          <div key={p.lab} className="bg-white/10 rounded-xl p-2 text-center">
            <div className="text-sm font-extrabold">{p.val}</div>
            <div className="text-[9px] opacity-75 mt-0.5">{p.lab}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
