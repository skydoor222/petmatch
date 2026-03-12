import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pet Match – ペットに、もう一人の相棒を。',
  description: 'CtoC型ペットケア・マッチングプラットフォーム。信頼できる"Mate"が、あなたの大切な家族を支えます。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-[#F7F5F1] min-h-screen">
        <div className="max-w-lg mx-auto relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
