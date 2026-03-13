'use client';

import React from 'react';
import BottomNav from '@/components/BottomNav';
import { MATES } from '@/lib/mockData';
import { MessageSquare, Calendar, ChevronRight, Zap, Info } from 'lucide-react';
import Link from 'next/link';

const MESSAGES = [
  {
    id: 'msg-1',
    mate: MATES[0],
    lastMsg: 'ポチちゃん、今日もとても元気でした！散歩中に他のワンちゃんと...',
    time: '14:32',
    unread: 2,
    type: 'care_report', // Specific type for care report
    status: 'completed'
  },
  {
    id: 'msg-2',
    mate: MATES[1],
    lastMsg: '明日の午前10時にお伺いします。準備してお待ちください。',
    time: '昨日',
    unread: 1,
    type: 'deposit_request', // Specific type for request
    status: 'pending'
  },
  {
    id: 'msg-3',
    mate: MATES[2],
    lastMsg: '承知いたしました！お任せください。',
    time: '3日前',
    unread: 0,
    type: 'chat',
    status: 'confirmed'
  },
];

export default function MessagesPage() {
  return (
    <div className="pb-36 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-8 pt-16 pb-8 shadow-sm border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 className="text-2xl font-heading text-gray-900 tracking-tight">メッセージ</h1>
          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mt-1">Chat & Requests</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
          <Info size={20} />
        </div>
      </div>

      <div className="px-6 py-8 space-y-4 max-w-md mx-auto">
        {MESSAGES.map(({ id, mate, lastMsg, time, unread, type, status }) => (
          <Link key={id} href={`/messages/${mate.id}`} className="block">
            <div className="bg-white rounded-[2.5rem] p-5 shadow-xl shadow-orange-900/5 border border-gray-50 hover:border-orange-100 transition-all active:scale-[0.98] group relative overflow-hidden">

              {/* Type Badge */}
              <div className="absolute top-5 right-5">
                {type === 'deposit_request' && (
                  <div className="bg-orange-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-orange-900/20">
                    <Zap size={10} fill="currentColor" />
                    <span>預かり依頼</span>
                  </div>
                )}
                {type === 'care_report' && (
                  <div className="bg-emerald-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-emerald-900/20">
                    <Calendar size={10} />
                    <span>お世話日報</span>
                  </div>
                )}
                {unread > 0 && type === 'chat' && (
                  <div className="w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {unread}
                  </div>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white relative">
                    <img src={mate.imageUrl} alt={mate.name} className="w-full h-full object-cover" />
                    {unread > 0 && type !== 'chat' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-center mb-1 pr-16">
                    <span className="font-heading text-gray-900 text-lg leading-tight truncate">
                      {mate.name} さん
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{time}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className={`text-[10px] font-black uppercase tracking-widest
                      ${status === 'pending' ? 'text-orange-500' : status === 'confirmed' ? 'text-blue-500' : 'text-emerald-500'}`}>
                      {status === 'pending' ? '承認待ち' : status === 'confirmed' ? '確定済み' : '完了済'}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-500 mt-1 line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                    {lastMsg}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State / Hint */}
        <div className="pt-8 text-center px-8">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-200 mx-auto mb-4">
            <MessageSquare size={24} />
          </div>
          <p className="text-xs font-black text-gray-300 uppercase tracking-widest leading-relaxed">
            マッチングが成立すると<br />チャットでやり取りが始まります。
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
