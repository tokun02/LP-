import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const noto = localFont({
  variable: '--font-sans',
  display: 'swap',
  src: [
    { path: '../../public/fonts/static/NotoSansJP-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/static/NotoSansJP-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/static/NotoSansJP-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/static/NotoSansJP-Bold.ttf', weight: '700', style: 'normal' },
  ],
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
