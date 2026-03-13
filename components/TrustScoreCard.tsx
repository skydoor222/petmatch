import { TrustScore } from '@/lib/types';
import { ShieldCheck, Award, TrendingUp, Calendar, Star } from 'lucide-react';

interface Props { trustScore: TrustScore; }

export default function TrustScoreCard({ trustScore }: Props) {
  const { score, completedCount, repeatRate, avgRating, activeMonths } = trustScore;
  const pct = score / 100;
  const dashArray = 2 * Math.PI * 22;
  const dashOffset = dashArray * (1 - pct);

  const stats = [
    { val: completedCount + '回', lab: '完了回数', icon: ShieldCheck },
    { val: repeatRate + '%', lab: '継続率', icon: TrendingUp },
    { val: avgRating.toFixed(1), lab: '平均評価', icon: Star },
    { val: activeMonths + 'ヶ月', lab: '活動期間', icon: Calendar },
  ];

  return (
    <div className="mx-6 my-6 rounded-[2.5rem] p-8 premium-gradient text-white shadow-2xl shadow-teal-900/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Award size={18} className="text-teal-50" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-50">Trust Identity</span>
        </div>

        <div className="flex items-center gap-8 mb-10">
          {/* Circular Progress */}
          <div className="relative w-24 h-24 flex-shrink-0 group">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle
                cx="24" cy="24" r="22"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-heading leading-none">{score}</span>
              <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Score</span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-3 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Verified Professional</span>
            </div>
            <h3 className="text-2xl font-heading mb-1">
              {score >= 90 ? 'Excellent' : score >= 80 ? 'Professional' : 'Verified'}
            </h3>
            <p className="text-sm text-teal-100/70 font-medium">継続指名率 {repeatRate}% の高い信頼性</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.lab} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon size={14} className="text-teal-100" />
                  </div>
                  <span className="text-[10px] font-bold text-teal-100/50 uppercase tracking-widest">{s.lab}</span>
                </div>
                <div className="text-lg font-heading">{s.val}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
