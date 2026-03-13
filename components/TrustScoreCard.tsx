import { TrustScore } from '@/lib/types';
import { ShieldCheck, TrendingUp, Star, Calendar } from 'lucide-react';

interface Props { trustScore: TrustScore; }

export default function TrustScoreCard({ trustScore }: Props) {
  const { score, completedCount, repeatRate, avgRating, activeMonths } = trustScore;
  const pct = Math.min(score / 100, 1);
  const r = 22;
  const dashArray = 2 * Math.PI * r;
  const dashOffset = dashArray * (1 - pct);

  const stats = [
    { val: `${completedCount}件`, label: '完了件数',  icon: ShieldCheck },
    { val: `${repeatRate}%`,       label: '継続指名率', icon: TrendingUp },
    { val: avgRating.toFixed(1),   label: '平均評価',   icon: Star },
    { val: `${activeMonths}ヶ月`,  label: '活動期間',   icon: Calendar },
  ];

  const rank = score >= 90 ? '最高評価' : score >= 80 ? 'プロ認定' : '認証済み';

  return (
    <div className="mx-4 my-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-5 mb-5">
        {/* スコアリング */}
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r={r} fill="none" stroke="#F3F4F6" strokeWidth="3" />
            <circle
              cx="24" cy="24" r={r}
              fill="none"
              stroke="#EA580C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 leading-none">{score}</span>
            <span className="text-[9px] text-gray-400 mt-0.5">スコア</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <ShieldCheck size={14} className="text-orange-600" />
            <span className="text-xs font-semibold text-orange-600">本人確認済み</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{rank}</p>
          <p className="text-xs text-gray-400 mt-0.5">継続指名率 {repeatRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stats.map(({ val, label, icon: Icon }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon size={12} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
            <p className="text-base font-semibold text-gray-900">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
