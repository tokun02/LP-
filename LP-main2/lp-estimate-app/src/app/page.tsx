import Link from 'next/link';

import { EstimateWizard } from '@/components/estimate/EstimateWizard';

const featureHighlights = [
  {
    title: '段階的ヒアリングで漏れなく把握',
    description:
      '目的やターゲット、構成案までを4ステップで整理。React Hook Form × Zod で入力内容をリアルタイム検証します。',
  },
  {
    title: '料金テーブルと連動した瞬時の参考概算',
    description: '用途別パッケージとオプション定義をもとに、ページ数やデザイン係数、多言語対応を即時計算して参考程度の概算見積もりを提示します。',
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
    <main className="min-h-screen pb-24 container-pad">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:gap-16 md:gap-20 pb-12 pt-12 sm:pt-16">
        <section className="relative section-y min-h-[88vh] flex items-center">
          <div className="relative z-10 grid gap-6 sm:gap-10 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-4 sm:space-y-6">
              <span className="inline-flex items-center rounded-full border border-sky-300/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-600 shadow-sm">
                LP制作見積シミュレーター
              </span>
              <h1 className="font-extrabold leading-tight text-slate-900 text-[clamp(24px,6vw,48px)]">
                ヒアリングから参考概算見積までを
                <br />
                ひとつのUIで完結させる
              </h1>
              <p className="max-w-2xl text-slate-700 text-[clamp(14px,3.5vw,18px)] leading-[1.65]">
                Next.js App Router と Netlify Functions をベースに、ヒアリングフォーム・料金算出・PDFドラフト・メール送信までを統合。
                セールスが案件化までに必要とする情報を取りこぼさず、即日提案に繋げることを目指しました。
                <br />
                <span className="text-sm font-medium text-slate-600 mt-2 block">
                  ※ 本アプリで算出される見積もりは参考程度の概算です。確定見積もりはヒアリングをした後日にご提示いたします。
                </span>
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2.5 w-full sm:max-w-none sm:flex sm:flex-row sm:gap-3">
                <Link
                  href="#estimate"
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  見積シミュレーターを試す
                </Link>
                <Link
                  href="/wireframe-demo/standard"
                  className="btn btn-outline btn-md w-full sm:w-auto"
                >
                  ワイヤーフレーム例を見る
                </Link>
              </div>
            </div>
            <div className="rounded-lg sm:rounded-2xl border border-white/60 bg-white/80 card-ultra sm:p-5 md:p-6 shadow-inner shadow-blue-100">
              <div className="grid gap-ultra sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
                <dl>
                  <dt className="meta-compact font-semibold uppercase tracking-wide">対応パッケージ</dt>
                  <dd className="mt-0.5 text-[18px] sm:text-2xl font-semibold text-slate-900">5種類</dd>
                  <dd className="mt-0.5 hint-compact leading-tight">企業・採用・LP・EC・オウンドメディア</dd>
                </dl>
                <dl>
                  <dt className="meta-compact font-semibold uppercase tracking-wide">リアルタイム更新</dt>
                  <dd className="mt-0.5 text-[18px] sm:text-2xl font-semibold text-slate-900">全項目</dd>
                  <dd className="mt-0.5 hint-compact leading-tight">ヒアリング内容に応じた料金と内訳</dd>
                </dl>
                <dl>
                  <dt className="meta-compact font-semibold uppercase tracking-wide">PDF生成</dt>
                  <dd className="mt-0.5 text-[18px] sm:text-2xl font-semibold text-slate-900">ワンクリック</dd>
                  <dd className="mt-0.5 hint-compact leading-tight">ドラフト見積書を即座に出力</dd>
                </dl>
                <dl>
                  <dt className="meta-compact font-semibold uppercase tracking-wide">保存機能</dt>
                  <dd className="mt-0.5 text-[18px] sm:text-2xl font-semibold text-slate-900">ローカル永続化</dd>
                  <dd className="mt-0.5 hint-compact leading-tight">途中離脱しても入力内容を保持</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-sky-400/30 blur-3xl edge-bleed" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-sky-400/30 blur-3xl edge-bleed" />
          <div className="pointer-events-none absolute top-1/2 -left-20 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-400/30 blur-3xl edge-bleed" />
          <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl edge-bleed" />
        </section>

        <section className="section-y grid gap-ultra sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2" aria-labelledby="feature-highlights">
          <header className="sm:col-span-2">
            <h2 id="feature-highlights" className="h-section text-slate-900">
              このアプリでできること
            </h2>
            <p className="mt-1.5 p-lead">
              企画段階のヒアリングから参考概算見積提示、社内共有までの流れを効率化します。
            </p>
          </header>
          {featureHighlights.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg sm:rounded-2xl border-2 border-slate-200 bg-white card-ultra sm:p-6 md:p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-100/50"
            >
              <h3 className="title-compact sm:text-xl text-slate-900 leading-tight mb-1 sm:mb-3">{feature.title}</h3>
              <p className="lead-compact sm:text-base text-slate-700 break-words">{feature.description}</p>
            </article>
          ))}
        </section>

        <section id="estimate" className="section-y space-y-6 sm:space-y-8">
          <header className="relative rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-sm p-4 sm:p-6 space-y-2 sm:space-y-3">
            <h2 className="h-section text-slate-900">見積シミュレーター</h2>
            <p className="p-lead text-slate-700">
              必要な情報を入力すると、参考程度の概算見積もりとPDFドラフトを自動生成します。
              <br />
              <span className="text-sm font-medium text-slate-600 mt-1 block">
                ※ 本シミュレーターで算出される見積もりは参考程度の概算です。確定見積もりはヒアリングをした後日にご提示いたします。
              </span>
            </p>
          </header>
          <EstimateWizard />
        </section>
      </div>
    </main>
  );
}

