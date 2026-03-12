'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MATES } from '@/lib/mockData';
import { SERVICE_LABELS, SERVICE_ICONS, ServiceType } from '@/lib/types';

export default function RequestPage({ params }: { params: Promise<{ mateId: string }> }) {
  const { mateId } = use(params);
  const router = useRouter();
  const mate = MATES.find(m => m.id === mateId);

  const [selectedService, setSelectedService] = useState<ServiceType>(
    mate?.services[0]?.type ?? 'walk'
  );
  const [date, setDate] = useState('2026-03-18');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [petInfo, setPetInfo] = useState('');
  const [petNote, setPetNote] = useState('');
  const [message, setMessage] = useState('');

  if (!mate) return <div className="p-8 text-center text-gray-500">Mateが見つかりません</div>;

  const service = mate.services.find(s => s.type === selectedService);
  const fee = service ? service.pricePerHour : 0;
  const platformFee = Math.round(fee * 0.15);
  const total = fee + platformFee;

  const handleSubmit = () => {
    router.push(`/request/${mateId}/success`);
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
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${mate.bgGradient} flex items-center justify-center text-2xl flex-shrink-0`}>
            {mate.emoji}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{mate.name} さん</div>
            <div className="text-xs text-gray-400">Trust Score {mate.trustScore.score} · ⭐ {mate.trustScore.avgRating}</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-5">

        {/* Repeat Banner */}
        {mate.repeatCount && (
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-3.5">
            <span className="text-2xl">🔁</span>
            <div>
              <div className="text-sm font-bold text-orange-600">継続指名で優先マッチング</div>
              <div className="text-xs text-gray-500 mt-0.5">{mate.name}さんへの依頼が{mate.repeatCount}回目。関係が深まるほどペットも安心します。</div>
            </div>
          </div>
        )}

        {/* Service Select */}
        <div>
          <label className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
            サービスを選ぶ <span className="text-red-400 text-[10px]">必須</span>
          </label>
          <div className="flex flex-col gap-2">
            {mate.services.map(s => (
              <button key={s.type} onClick={() => setSelectedService(s.type)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${selectedService === s.type ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                <span className="text-xl">{SERVICE_ICONS[s.type]}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">{SERVICE_LABELS[s.type]}</div>
                  <div className="text-xs text-gray-400">¥{s.pricePerHour.toLocaleString()} / 時間</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${selectedService === s.type ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'}`}>
                  {selectedService === s.type && '✓'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div>
          <label className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
            希望日時 <span className="text-red-400 text-[10px]">必須</span>
          </label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-500 mb-2" />
          <div className="flex gap-2 items-center">
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
              className="flex-1 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-500" />
            <span className="text-gray-400 text-sm">〜</span>
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
              className="flex-1 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        {/* Pet Info */}
        <div>
          <label className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
            ペットの情報 <span className="text-red-400 text-[10px]">必須</span>
          </label>
          <input type="text" value={petInfo} onChange={e => setPetInfo(e.target.value)}
            placeholder="例：柴犬・ポチ・5歳・男の子"
            className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-500 mb-2" />
          <textarea value={petNote} onChange={e => setPetNote(e.target.value)}
            placeholder="特記事項（持病・アレルギーなど）"
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-500 resize-none" />
        </div>

        {/* Message */}
        <div>
          <label className="text-xs font-bold text-gray-800 mb-2 block">
            {mate.name}さんへメッセージ
          </label>
          <textarea value={message} onChange={e => setMessage(e.target.value)}
            placeholder="気になることや要望があれば"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-emerald-500 resize-none" />
        </div>

        {/* Price Summary */}
        <div className="bg-emerald-50 rounded-xl p-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{SERVICE_LABELS[selectedService]}（1時間）</span>
            <span>¥{fee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Pet Match 手数料（15%）</span>
            <span>¥{platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-emerald-700 pt-3 border-t border-emerald-200">
            <span>合計</span>
            <span>¥{total.toLocaleString()}</span>
          </div>
        </div>

        <button onClick={handleSubmit}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
          ✉️ 依頼を送る
        </button>
        <p className="text-xs text-gray-400 text-center -mt-2">承諾後に決済が確定します（エスクロー方式）</p>
      </div>
    </div>
  );
}
