'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'さがす', icon: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'stroke-emerald-600' : 'stroke-gray-400'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )},
  { href: '/my-mates', label: 'マイMate', icon: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'stroke-emerald-600' : 'stroke-gray-400'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )},
  { href: '/messages', label: 'メッセージ', icon: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'stroke-emerald-600' : 'stroke-gray-400'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )},
  { href: '/mypage', label: 'マイページ', icon: (active: boolean) => (
    <svg className={`w-6 h-6 ${active ? 'stroke-emerald-600' : 'stroke-gray-400'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )},
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 z-50">
      <div className="max-w-lg mx-auto flex">
        {navItems.map(item => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center gap-1 py-2.5">
              {item.icon(active)}
              <span className={`text-[10px] font-semibold ${active ? 'text-emerald-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
