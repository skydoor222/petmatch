'use client';

import { useState, useMemo } from 'react';
import { SERVICE_LABELS, ServiceType } from '@/lib/types';
import { createBookingRequest } from '@/lib/auth-actions';

interface RequestFormProps {
    mate: any;
}

function toMinutes(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

export default function RequestForm({ mate }: RequestFormProps) {
    const [selectedService, setSelectedService] = useState<ServiceType>(
        mate.services[0]?.type ?? 'walk'
    );
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('11:00');
    const [petInfo, setPetInfo] = useState('');
    const [petNote, setPetNote] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const durationHours = useMemo(() => {
        const diff = toMinutes(endTime) - toMinutes(startTime);
        return diff > 0 ? Math.round(diff / 6) / 10 : 0; // round to 1 decimal
    }, [startTime, endTime]);

    const service = mate.services.find((s: any) => s.type === selectedService);
    const basePrice = service ? Math.round(service.pricePerHour * Math.max(durationHours, 0)) : 0;
    const platformFee = Math.round(basePrice * 0.15);
    const total = basePrice + platformFee;

    const isValidTime = durationHours > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidTime) {
            alert('終了時刻は開始時刻より後に設定してください');
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('mateId', mate.id);
        formData.append('serviceType', selectedService);
        formData.append('bookingDate', date);
        formData.append('hours', durationHours.toString());
        formData.append('totalPrice', total.toString());
        formData.append('notes', `${petInfo}\n${petNote}\n\n${message}`);

        try {
            await createBookingRequest(formData);
        } catch (err) {
            console.error(err);
            alert('依頼の送信に失敗しました。');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Repeat Banner */}
            {mate.repeatCount && (
                <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-3.5">
                    <div>
                        <div className="text-sm font-semibold text-orange-600">継続指名で優先マッチング</div>
                        <div className="text-xs text-gray-500 mt-0.5">{mate.name}さんへの依頼が{mate.repeatCount}回目。関係が深まるほどペットも安心します。</div>
                    </div>
                </div>
            )}

            {/* Service Select */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    サービスを選ぶ <span className="text-red-400 text-[10px]">必須</span>
                </label>
                <div className="flex flex-col gap-2">
                    {mate.services.map((s: any) => (
                        <button key={s.type} type="button" onClick={() => setSelectedService(s.type as ServiceType)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                                selectedService === s.type
                                    ? 'border-orange-600 bg-orange-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">{SERVICE_LABELS[s.type as ServiceType]}</div>
                                <div className="text-xs text-gray-400">¥{s.pricePerHour.toLocaleString()} / 時間</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedService === s.type
                                    ? 'border-orange-600 bg-orange-600'
                                    : 'border-gray-300'
                            }`}>
                                {selectedService === s.type && (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Date & Time */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    希望日時 <span className="text-red-400 text-[10px]">必須</span>
                </label>
                <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={e => setDate(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent mb-2"
                />
                <div className="flex gap-2 items-center">
                    <input
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        required
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <span className="text-gray-400 text-sm">〜</span>
                    <input
                        type="time"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        required
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                </div>
                {!isValidTime && (
                    <p className="text-xs text-red-400 mt-1.5">終了時刻は開始時刻より後に設定してください</p>
                )}
            </div>

            {/* Pet Info */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    ペットの情報 <span className="text-red-400 text-[10px]">必須</span>
                </label>
                <input
                    type="text"
                    value={petInfo}
                    onChange={e => setPetInfo(e.target.value)}
                    required
                    placeholder="例：柴犬・ポチ・5歳・男の子"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent mb-2"
                />
                <textarea
                    value={petNote}
                    onChange={e => setPetNote(e.target.value)}
                    placeholder="特記事項（持病・アレルギーなど）"
                    rows={2}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                />
            </div>

            {/* Message */}
            <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">
                    {mate.name}さんへメッセージ
                </label>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="気になることや要望があれば"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                />
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>
                        {SERVICE_LABELS[selectedService]}
                        {isValidTime && <span className="text-gray-400 ml-1">（{durationHours}時間）</span>}
                    </span>
                    <span>¥{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>サービス手数料（15%）</span>
                    <span>¥{platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>合計（確定後）</span>
                    <span>¥{total.toLocaleString()}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading || !isValidTime}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors"
            >
                {loading ? '送信中...' : '依頼を送る'}
            </button>
            <p className="text-xs text-gray-400 text-center -mt-2">承諾後に決済が確定します（エスクロー方式）</p>
        </form>
    );
}
