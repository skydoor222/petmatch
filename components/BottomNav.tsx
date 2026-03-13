'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageSquare, User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'ペット', href: '/', icon: Home },
  { label: 'メイトを探す', href: '/mates', icon: Search },
  { label: 'メッセージ', href: '/messages', icon: MessageSquare },
  { label: 'マイページ', href: '/mypage', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto">
        <nav className="bg-white border-t border-gray-100">
          <div className="flex">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center justify-center gap-1 flex-1 h-16 transition-colors ${isActive ? 'text-orange-600 pointer-events-none' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
