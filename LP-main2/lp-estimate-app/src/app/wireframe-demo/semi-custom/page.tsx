"use client";

// 最終更新: 2025-01-27
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function AnimatedGradient({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: useTransform(
          scrollYProgress,
          [0, 1],
          [
            "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
          ]
        ),
      }}
    />
  );
}

export default function SemiCustomPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* ヒーローセクション */}
      <section className="relative min-h-[88vh] sm:h-screen flex items-center justify-center overflow-hidden section-y">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black" />
        
        {/* アニメーション背景 */}
        <AnimatedGradient scrollYProgress={scrollYProgress} />

        {/* グリッドパターン */}
        <div className="absolute inset-0 opacity-20 bg-grid-pattern" />

        {/* メインコンテンツ */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(36px, 12vw, 128px)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              セミオーダー
            </motion.h1>
            <motion.p
              className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(16px, 4vw, 24px)', lineHeight: '1.65' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              テンプレートをベースに、あなたのブランドに合わせてカスタマイズ。
              <br className="hidden sm:block" />
              高品質でありながら、効率的に制作できます。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all hover:scale-105 min-h-[44px] w-full sm:w-auto max-w-sm mx-auto sm:mx-0">
                <span className="relative z-10">制作を始める</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* スクロールインジケーター */}
        <motion.div
          className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 特徴セクション */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 section-y">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              選ばれる理由
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              セミオーダーだからこそ実現できる、品質と効率のバランス
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "テンプレートベース",
                description: "実績のあるデザインテンプレートを基に、あなたのブランドに合わせて最適化します。",
                icon: "🎨",
              },
              {
                title: "効率的な制作",
                description: "ゼロからの制作よりも大幅に短縮された制作期間で、高品質なサイトを実現。",
                icon: "⚡",
              },
              {
                title: "コストパフォーマンス",
                description: "フルオーダーよりリーズナブルな価格で、プロフェッショナルなサイトを構築。",
                icon: "💰",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* プロセスセクション */}
      <section className="relative min-h-screen py-32 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">制作プロセス</h2>
            <p className="text-xl text-gray-400">4つのステップで完成までサポート</p>
          </motion.div>

          <div className="space-y-32">
            {[
              { step: "01", title: "ヒアリング", description: "お客様の要望やブランドを詳しくお聞きします。" },
              { step: "02", title: "デザイン提案", description: "テンプレートを基に、お客様に最適なデザインを提案。" },
              { step: "03", title: "制作・実装", description: "承認後、迅速に制作・実装を進めます。" },
              { step: "04", title: "公開・サポート", description: "公開後も継続的なサポートを提供します。" },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="text-6xl font-bold text-purple-400 mb-4">{process.step}</div>
                  <h3 className="text-4xl font-bold mb-4">{process.title}</h3>
                  <p className="text-xl text-gray-400">{process.description}</p>
                </div>
                <div className="flex-1 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-white/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              始めましょう
            </h2>
            <p className="text-2xl text-gray-400 mb-12">
              あなたのプロジェクトを、次のレベルへ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform">
                無料相談する
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
                事例を見る
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
