'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Repeat, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: '探す', href: '/', icon: Home },
    { label: 'メッセージ', href: '/messages', icon: MessageSquare },
    { label: 'マイMate', href: '/my-mates', icon: Repeat },
    { label: 'マイページ', href: '/mypage', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none">
      <nav className="max-w-md mx-auto glass rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto border border-white/50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 ${isActive ? 'text-teal-700 pointer-events-none' : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-teal-50 shadow-inner' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
