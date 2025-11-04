"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  LayoutGrid,
  SlidersHorizontal,
  FileText,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const BRAND = "LP Estimate App";

const NAV_LINKS = [
  { href: "#hero", label: "Overview" },
  { href: "#features", label: "System" },
  { href: "#flow", label: "Journey" },
  { href: "#history", label: "Heritage" },
  { href: "#voices", label: "Voices" },
  { href: "#contact", label: "Contact" },
];

const fadeUp = (delay = 0, distance = 26) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
  viewport: { once: true },
});

const HERO_FEATURES = [
  "テンプレート運用",
  "リアルタイム試算",
  "Slack & PDF 共有",
  "オプションの即比較",
];

const STATS = [
  {
    value: "42%",
    label: "平均提案短縮",
    detail: "ヒアリング中にオファーを提示",
  },
  {
    value: "96%",
    label: "再現性",
    detail: "部門・国境を越えて均質化",
  },
  {
    value: "15min",
    label: "ライブデモ",
    detail: "構成〜PDF共有を一気通貫",
  },
];

const HIGHLIGHTS = [
  {
    title: "ヒアリングテンプレート",
    caption: "Template Layer",
    description: "業種別の項目セットで、初回ミーティングでも抜け漏れなく要件を整理できます。",
  },
  {
    title: "構成プレビュー",
    caption: "Experience Layer",
    description: "ドラフト構成をワイヤー化し、関係者と視覚的に共有。必要箇所のみカスタム可能です。",
  },
  {
    title: "サマリーと共有",
    caption: "Delivery Layer",
    description: "料金テーブルと連動したサマリーを自動生成。PDFと共有リンクで関係者へ展開できます。",
  },
];

const FLOW = [
  {
    title: "ヒアリング",
    body: "案件の目的とターゲットを整理し、ロールごとのゴールを揃えます。",
    icon: MessageCircle,
    emphasis: "Guided Briefing",
  },
  {
    title: "構成・デザイン",
    body: "ページ構成とモーション強度を定義し、シナリオを視覚化します。",
    icon: LayoutGrid,
    emphasis: "Experience Architecture",
  },
  {
    title: "機能・オプション",
    body: "必要なモジュール / グローバル要件 / マーケ支援を即比較します。",
    icon: SlidersHorizontal,
    emphasis: "Adaptive Modules",
  },
  {
    title: "サマリー",
    body: "見積内容を確認し、Slack・PDFでそのまま共有します。",
    icon: FileText,
    emphasis: "Executive Pack",
  },
];

const TIMELINE = [
  {
    year: "2015",
    title: "ヒアリング項目の共通化",
    caption: "Excel で管理していた質問表をデジタル化し、誰でも同じ観点でヒアリングできるようにしました。",
  },
  {
    year: "2018",
    title: "リアルタイム見積を実装",
    caption: "料金テーブルとフォームを連動させ、ヒアリングと同時に概算を提示できるようアップデート。",
  },
  {
    year: "2021",
    title: "モーションUIと共有",
    caption: "Framer Motion を導入し、Slack・PDF共有でチーム連携もスムーズに。",
  },
  {
    year: "2025",
    title: "LP Estimate App 10th",
    caption: "テンプレートとカスタムのハイブリッド運用で、多様な案件にフィットする仕組みへ。",
  },
];

const TESTIMONIALS = [
  {
    quote: "ヒアリング中に見積が整うので、社内承認のスピードが大幅に向上しました。",
    author: "Shift Design／PM チーム",
  },
  {
    quote: "テンプレートの安心感と必要箇所だけカスタムできる自由度がちょうど良いバランスです。",
    author: "Bright Studio／Account Director",
  },
];

export default function StandardTemplateDemo() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(248,250,252,0.08),_transparent_35%)]" />
      </div>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-white/70">{BRAND}</p>
            <p className="text-[0.65rem] text-white/50">Estimate workflow for creative teams</p>
          </div>
          <nav className="hidden items-center gap-6 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/50 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
            <a
              href="mailto:hello@lp-estimate.app"
              className="rounded-full border border-white/20 px-4 py-2 text-white/80 transition hover:border-white hover:text-white"
            >
              Deck
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-4 py-2 text-slate-950"
            >
              Demo
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="hero" className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid gap-12 md:grid-cols-[1.05fr,0.95fr]">
              <motion.div className="space-y-8" {...fadeUp()}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/70">
                  Estimate as a Service
                </span>
                <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-5xl">
                  テンプレート × カスタムで
                  <span className="block text-transparent bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-200 bg-clip-text">
                    ハイエンドな見積体験を共創
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-white/70">
                  LP Estimate App は、ヒアリング項目・構成案・オプション・サマリーがライブ連動するエンタープライズ志向の見積ワークフローです。テンプレートをベースに局所カスタムを差し込み、スピード・再現性・余白あるデザインを同時実現します。
                </p>
                <div className="flex flex-wrap gap-3 text-[0.65rem] text-white/70">
                  {HERO_FEATURES.map((item) => (
                    <span key={item} className="rounded-full border border-white/15 px-4 py-1 backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.35em]">
                  <a
                    href="#features"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-white transition hover:border-white"
                  >
                    System layers
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="mailto:hello@lp-estimate.app"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-slate-950"
                  >
                    Send briefing
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/5 p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.9)]"
                {...fadeUp(0.1)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-500/10" />
                <div className="relative space-y-6">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/60">現在の進捗</p>
                    <p className="mt-3 text-lg font-semibold text-white">構成・デザインを定義しています</p>
                    <p className="mt-2 text-sm text-white/60">テンプレート構造を調整し、ヒアリング結果を反映中。カバーフローとCTA導線を検証しています。</p>
                  </div>
                  <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-white/70">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">ヒアリング</p>
                      <p className="mt-1 text-white">資料請求の増加を目標。BtoBマーケ担当者と経営層の共通KPIを定義。</p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">オプション</p>
                      <p className="mt-1 text-white">CMS管理 / 多言語対応 / マーケ支援パック / Brand Motion</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-400/20 via-white/10 to-indigo-500/20 p-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/60">概算</p>
                    <p className="mt-3 text-3xl font-semibold text-white">¥ 1,280,000</p>
                    <p className="text-sm text-white/70">税込 / 想定納期 6 週間</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div className="mt-16 grid gap-4 md:grid-cols-3" {...fadeUp(0.15)}>
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                  <p className="text-xs text-white/50">{stat.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="features" className="relative border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.08),_transparent_65%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20">
            <motion.div className="mb-12 space-y-3 text-center" {...fadeUp()}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/50">Features</p>
              <h2 className="text-3xl font-semibold text-white">見積づくりを支える 3 つのシステムレイヤー</h2>
              <p className="text-base text-white/60">テンプレートの規律とカスタムの自由度を重ね、どのチームでも同じ体験を再現できます。</p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              {HIGHLIGHTS.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
                  {...fadeUp(index * 0.05)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/10" />
                  <div className="relative space-y-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/50">{item.caption}</p>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="flow" className="border-b border-white/10 bg-slate-950/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <motion.div className="mb-12 space-y-2 text-center" {...fadeUp()}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/50">Flow</p>
              <h2 className="text-3xl font-semibold text-white">ヒアリングから共有までの 4 ステップ</h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-4">
              {FLOW.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-slate-950/40 p-6"
                  {...fadeUp(index * 0.05)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/50">{step.emphasis}</p>
                      <p className="mt-2 text-lg font-semibold text-white">{step.title}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/70">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="history" className="border-b border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <motion.div className="mb-12 space-y-2 text-center" {...fadeUp()}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/50">History</p>
              <h2 className="text-3xl font-semibold text-white">実務現場で磨き上げた背景</h2>
            </motion.div>
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0 md:left-1/2" />
              <div className="space-y-10">
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className={`relative rounded-3xl border border-white/10 bg-white/5 p-6 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                    }`}
                    {...fadeUp(index * 0.05)}
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/50">{item.year}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-white/70">{item.caption}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="voices" className="border-b border-white/10 bg-slate-950/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <motion.div className="mb-12 space-y-2 text-center" {...fadeUp()}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/50">Voices</p>
              <h2 className="text-3xl font-semibold text-white">導入チームの声</h2>
            </motion.div>
            <motion.div className="grid gap-8 md:grid-cols-2" {...fadeUp(0.1)}>
              {TESTIMONIALS.map((voice) => (
                <div key={voice.author} className="h-full rounded-3xl border border-white/10 bg-white/5 p-8">
                  <p className="text-lg text-white">“{voice.quote}”</p>
                  <p className="mt-4 text-sm text-white/60">{voice.author}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id="contact" className="border-b border-white/10 bg-gradient-to-b from-white/5 via-white/10 to-transparent">
          <div className="mx-auto max-w-4xl space-y-8 px-4 py-24 text-center">
            <motion.div {...fadeUp()}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/50">Contact</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">テンプレートとカスタムのハイブリッド体験をご提供します</h2>
            </motion.div>
            <motion.p className="text-base text-white/70" {...fadeUp(0.1)}>
              オンラインデモでは、ヒアリングテンプレートの編集からPDF共有までを 15 分でご紹介。既存ワークフローとの接続、リード獲得シナリオの設計も併せて共創します。
            </motion.p>
            <motion.div className="flex flex-wrap items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.35em]" {...fadeUp(0.2)}>
              <a
                href="mailto:hello@lp-estimate.app"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-slate-950"
              >
                <Sparkles className="h-4 w-4" />
                デモを予約する
              </a>
              <a
                href="#hero"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-white/80 transition hover:border-white hover:text-white"
              >
                資料を確認
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-white/50 md:flex-row">
          <div className="text-[0.65rem] uppercase tracking-[0.4em]">{BRAND}</div>
          <div className="flex items-center gap-4">
            <span>2015 - {new Date().getFullYear()}</span>
            <span>© LP Estimate App. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
