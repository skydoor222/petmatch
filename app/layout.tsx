import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetMatch | 大切な家族に、もう一人の相棒を。',
  description: '信頼できるペットシッター・ケア専門家とマッチング',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <div className="max-w-lg mx-auto relative min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
