import BottomNav from '@/components/BottomNav';

export default function MyPage() {
  return (
    <div className="pb-28">
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 px-5 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">🧑</div>
          <div>
            <h1 className="text-xl font-extrabold text-white">田村 さくら</h1>
            <p className="text-white/70 text-sm mt-0.5">Owner · 世田谷区</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[['12', '依頼回数'], ['2', 'マイMate'], ['4.9', '受取評価']].map(([v, l]) => (
            <div key={l} className="bg-white/10 rounded-xl p-2.5 text-center">
              <div className="text-lg font-extrabold text-white">{v}</div>
              <div className="text-[10px] text-white/70 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-2">
        {['ペット情報の編集', '予約履歴', 'お気に入り', '支払い方法', 'お知らせ設定', 'ヘルプ・お問い合わせ'].map(item => (
          <div key={item} className="bg-white rounded-xl px-4 py-3.5 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-800">{item}</span>
            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
