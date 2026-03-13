import BottomNav from '@/components/BottomNav';
import { createClient } from '@/lib/supabase-server';
import { logout } from '@/lib/auth-actions';
import {
  User, Settings, CreditCard, Bell, HelpCircle,
  LogOut, ChevronRight, Repeat, Heart, ShieldCheck,
  Zap, Dog, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default async function MyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user profile
  const { data: profile } = user
    ? await supabase.from('user_profiles').select('*').eq('id', user.id).single()
    : { data: null };

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'ゲスト';
  const area = profile?.area || '世田谷区';

  return (
    <div className="pb-36 bg-gray-50/50 min-h-screen">
      {/* Premium Profile Header */}
      <div className="bg-white px-8 pt-20 pb-12 rounded-b-[3.5rem] shadow-sm border-b border-gray-100 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-[2.5rem] bg-orange-600 flex items-center justify-center text-white shadow-2xl shadow-orange-900/20 text-3xl">
                <User size={32} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white">
                <ShieldCheck size={14} fill="currentColor" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-heading text-gray-900 leading-tight">{displayName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100 uppercase tracking-widest">Premium Owner</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{area}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '依頼回数', value: '12', icon: Repeat },
              { label: 'マイMate', value: '5', icon: Heart },
              { label: '信頼スコア', value: '980', icon: Zap }
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50 text-center">
                <div className="text-lg font-heading text-gray-900">{stat.value}</div>
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Switcher Action */}
      <div className="px-6 -mt-6 relative z-20 max-w-md mx-auto">
        <button className="w-full bg-orange-600 text-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-xl shadow-orange-900/20 active:scale-[0.98] transition-all group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Dog size={24} />
            </div>
            <div className="text-left">
              <div className="text-sm font-heading">メイト（預かり手）に切替</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-70">お世話をして報酬を得る</div>
            </div>
          </div>
          <ChevronRight size={20} className="relative z-10 opacity-50 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Settings Menu */}
      <div className="px-6 py-10 max-w-md mx-auto space-y-3">
        {[
          { label: 'ペット情報の編集', icon: Dog },
          { label: '予約履歴', icon: Calendar },
          { label: 'お気に入り', icon: Heart },
          { label: '支払い方法', icon: CreditCard },
          { label: 'お知らせ設定', icon: Bell },
          { label: 'ヘルプ・お問い合わせ', icon: HelpCircle }
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-[1.8rem] px-6 py-4 flex items-center justify-between shadow-xl shadow-orange-900/5 border border-gray-50 cursor-pointer hover:border-orange-100 transition-all active:scale-[0.99] group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-orange-600 group-hover:bg-orange-50 transition-colors">
                <item.icon size={20} />
              </div>
              <span className="text-sm font-bold text-gray-700">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
          </div>
        ))}

        {/* Logout button */}
        <form action={logout}>
          <button
            type="submit"
            className="w-full mt-4 bg-white/50 rounded-[1.8rem] px-6 py-4 flex items-center justify-between border border-red-50 hover:bg-red-50/50 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50/50 flex items-center justify-center text-red-300 group-hover:text-red-500 transition-colors">
                <LogOut size={20} />
              </div>
              <span className="text-sm font-bold text-red-400 group-hover:text-red-500 transition-colors">ログアウト</span>
            </div>
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
