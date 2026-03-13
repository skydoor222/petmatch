'use client';

import React from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { MATES } from '@/lib/mockData';
import { MessageSquare, Calendar } from 'lucide-react';

const MESSAGES = [
  {
    id: 'msg-1',
    mate: MATES[0],
    lastMsg: 'ポチちゃん、今日もとても元気でした！散歩中に他のワンちゃんと仲良くしていましたよ。',
    time: '14:32',
    unread: 2,
    status: 'completed'
  },
  {
    id: 'msg-2',
    mate: MATES[1],
    lastMsg: '明日の午前10時にお伺いします。準備してお待ちください。',
    time: '昨日',
    unread: 1,
    status: 'confirmed'
  },
  {
    id: 'msg-3',
    mate: MATES[2],
    lastMsg: '承知いたしました！お任せください。',
    time: '3日前',
    unread: 0,
    status: 'pending'
  },
];

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: '承認待ち', className: 'text-orange-500' },
  confirmed: { label: '確定済み', className: 'text-blue-500' },
  completed: { label: '完了', className: 'text-gray-400' },
};

export default function MessagesPage() {
  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 sticky top-0 z-30">
        <h1 className="text-xl font-bold text-gray-900">メッセージ</h1>
      </div>

      <div className="px-5 py-4 space-y-3">
        {MESSAGES.map(({ id, mate, lastMsg, time, unread, status }) => {
          const st = STATUS_LABELS[status];
          return (
            <Link key={id} href={`/messages/${id}`} className="block bg-white rounded-2xl p-4 border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
                    <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                  </div>
                  {unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-0.5">
                      {unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{mate.name} さん</span>
                    <span className="text-xs text-gray-400">{time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`text-[10px] font-semibold ${st.className}`}>{st.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{lastMsg}</p>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Empty hint */}
        <div className="pt-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 mx-auto mb-3">
            <MessageSquare size={20} />
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            マッチングが成立すると<br />チャットが始まります
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
