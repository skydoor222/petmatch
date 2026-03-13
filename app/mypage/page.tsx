import BottomNav from '@/components/BottomNav';
import { createClient } from '@/lib/supabase-server';
import { logout } from '@/lib/auth-actions';
import {
  User, CreditCard, Bell, HelpCircle,
  LogOut, ChevronRight, Repeat, Heart, ShieldCheck,
  Dog, Calendar
} from 'lucide-react';

export default async function MyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from('user_profiles').select('*').eq('id', user.id).single()
    : { data: null };

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'ゲスト';
  const area = profile?.area || '世田谷区';

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white px-5 pt-14 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-sm">
              <User size={28} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-xl border-2 border-white flex items-center justify-center">
              <ShieldCheck size={11} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{displayName}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{area}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '依頼回数', value: '12', icon: Repeat },
            { label: 'マイMate', value: '5', icon: Heart },
            { label: '信頼スコア', value: '98', icon: ShieldCheck },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
              <div className="text-base font-bold text-gray-900">{stat.value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 py-5 space-y-2">
        {[
          { label: 'ペット情報の編集', icon: Dog,         href: '#' },
          { label: '予約履歴',         icon: Calendar,    href: '#' },
          { label: 'お気に入り',       icon: Heart,       href: '/my-mates' },
          { label: '支払い方法',       icon: CreditCard,  href: '#' },
          { label: 'お知らせ設定',     icon: Bell,        href: '#' },
          { label: 'ヘルプ・お問い合わせ', icon: HelpCircle, href: '#' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="bg-white rounded-2xl px-4 py-3.5 flex items-center justify-between border border-gray-100 hover:border-orange-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-orange-600 group-hover:bg-orange-50 transition-colors">
                <item.icon size={18} />
              </div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <ChevronRight size={15} className="text-gray-300" />
          </a>
        ))}

        <form action={logout}>
          <button
            type="submit"
            className="w-full mt-2 bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-red-50 hover:bg-red-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
              <LogOut size={18} />
            </div>
            <span className="text-sm text-red-400">ログアウト</span>
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
