import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

import './globals.css';

const noto = Noto_Sans_JP({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Webサイト制作見積アプリ | Next.js × Netlify',
  description:
    'ヒアリングから見積までをワンストップで支援するNext.js × Netlify構成のWebサイト制作見積アプリ。用途別テンプレートとオプション選択で6種類のサイトを即時計算できます。',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${noto.variable} bg-slate-50 text-slate-900 antialiased`}>{children}</body>
    </html>
  );
}
