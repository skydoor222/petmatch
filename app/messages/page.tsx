import BottomNav from '@/components/BottomNav';
import { MATES } from '@/lib/mockData';

const MESSAGES = [
  { mate: MATES[0], lastMsg: 'ポチちゃん、今日もとても元気でした！散歩中に他のワンちゃんと...', time: '14:32', unread: 2 },
  { mate: MATES[1], lastMsg: '明日の午前10時にお伺いします。準備してお待ちください。', time: '昨日', unread: 0 },
];

export default function MessagesPage() {
  return (
    <div className="pb-28">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">メッセージ</h1>
      </div>
      <div className="flex flex-col divide-y divide-gray-100">
        {MESSAGES.map(({ mate, lastMsg, time, unread }) => (
          <div key={mate.id} className="flex items-center gap-3 px-4 py-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${mate.bgGradient} flex items-center justify-center text-2xl flex-shrink-0`}>
              {mate.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900 text-sm">{mate.name} さん</span>
                <span className="text-xs text-gray-400">{time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{lastMsg}</p>
            </div>
            {unread > 0 && (
              <span className="w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                {unread}
              </span>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
