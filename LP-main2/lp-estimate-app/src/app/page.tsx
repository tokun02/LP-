import Link from 'next/link';

import { EstimateWizard } from '@/components/estimate/EstimateWizard';

const featureHighlights = [
  {
    title: '段階的ヒアリングで漏れなく把握',
    description:
      '目的やターゲット、構成案までを4ステップで整理。React Hook Form × Zod で入力内容をリアルタイム検証します。',
  },
  {
    title: '料金テーブルと連動した瞬時の概算',
    description: '用途別パッケージとオプション定義をもとに、ページ数やデザイン係数、多言語対応を即時計算して提示します。',
  },
  {
    title: 'ブラウザ保存で途中離脱にも強い',
    description: 'Zustand の永続化により入力途中の内容をローカルに保存。再訪時も続きから再開できます。',
  },
  {
    title: 'PDFドラフトでチーム共有がスムーズ',
    description:
      '@react-pdf/renderer でヒアリング結果をドラフトPDFに変換。メール送信フロー（Netlify Functions）とも連携予定です。',
  },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-blue-500/5 p-10 shadow-lg shadow-sky-200/40 backdrop-blur">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-sky-300/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-600 shadow-sm">
                LP制作見積シミュレーター
              </span>
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                ヒアリングから概算見積までを
                <br />
                ひとつのUIで完結させる
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Next.js App Router と Netlify Functions をベースに、ヒアリングフォーム・料金算出・PDFドラフト・メール送信までを統合。
                セールスが案件化までに必要とする情報を取りこぼさず、即日提案に繋げることを目指しました。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#estimate"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                  見積シミュレーターを試す
                </Link>
                <Link
                  href="/wireframe-demo/standard"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  ワイヤーフレーム例を見る
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-inner shadow-blue-100">
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">対応パッケージ</dt>
                  <dd className="mt-2 text-2xl font-semibold text-slate-900">5種類</dd>
                  <p className="mt-1 text-xs text-slate-500">企業・採用・LP・EC・オウンドメディア</p>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">リアルタイム更新</dt>
                  <dd className="mt-2 text-2xl font-semibold text-slate-900">全項目</dd>
                  <p className="mt-1 text-xs text-slate-500">ヒアリング内容に応じた料金と内訳</p>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">PDF生成</dt>
                  <dd className="mt-2 text-2xl font-semibold text-slate-900">ワンクリック</dd>
                  <p className="mt-1 text-xs text-slate-500">ドラフト見積書を即座に出力</p>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">保存機能</dt>
                  <dd className="mt-2 text-2xl font-semibold text-slate-900">ローカル永続化</dd>
                  <p className="mt-1 text-xs text-slate-500">途中離脱しても入力内容を保持</p>
                </div>
              </dl>
            </div>
          </div>
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sky-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
        </section>

        <section className="grid gap-8 sm:grid-cols-2" aria-labelledby="feature-highlights">
          <header className="sm:col-span-2">
            <h2 id="feature-highlights" className="text-xl font-semibold text-slate-900">
              このアプリでできること
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              企画段階のヒアリングから概算見積提示、社内共有までの流れを効率化します。
            </p>
          </header>
          {featureHighlights.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100/50"
            >
              <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </section>

        <section id="estimate" className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">見積シミュレーター</h2>
            <p className="text-sm text-slate-600">
              必要な情報を入力すると、サマリーの内訳とPDFドラフトを自動生成します。
            </p>
          </header>
          <EstimateWizard />
        </section>
      </div>
    </main>
  );
}

