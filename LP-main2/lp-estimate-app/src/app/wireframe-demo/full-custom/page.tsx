"use client";

// 最終更新: 2025-01-27
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function FullCustomPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ヒーローセクションのパララックス効果
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, -200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);

  // セクション1のアニメーション
  const section1Y = useTransform(smoothProgress, [0.2, 0.5], [100, 0]);
  const section1Opacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);

  // セクション2のアニメーション
  const section2Y = useTransform(smoothProgress, [0.5, 0.8], [100, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);

  // マウス位置の追跡
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    setIsLoaded(true);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // スクロール位置の監視（必要に応じて使用）
  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   // スクロール連動の処理があればここに追加
  // });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* ヒーローセクション */}
      <section
        ref={heroRef}
        className="relative min-h-[88vh] sm:h-screen flex items-center justify-center overflow-hidden section-y"
      >
        {/* 動的背景グラデーション */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* マウス追従効果 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)`,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />

        {/* グリッドパターン */}
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />

        {/* メインコンテンツ */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-7xl mx-auto"
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 大きな数字 */}
            <motion.div
              className="font-bold leading-none mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(64px, 25vw, 320px)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                100%
              </motion.span>
            </motion.div>

            {/* メインタイトル */}
            <motion.h1
              className="font-bold mb-6"
              style={{ fontSize: 'clamp(32px, 10vw, 96px)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                フルオーダー
              </span>
            </motion.h1>

            {/* サブタイトル */}
            <motion.p
              className="text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(16px, 4vw, 30px)', lineHeight: '1.65' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              ゼロから設計する、完全オリジナルの
              <br className="hidden md:block" />
              あなただけのウェブサイト
            </motion.p>

            {/* CTAボタン */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                className="group relative px-6 sm:px-12 py-3 sm:py-5 bg-white text-black rounded-full font-semibold text-base sm:text-lg overflow-hidden min-h-[44px] w-full sm:w-auto max-w-sm mx-auto sm:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">制作を始める</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* スクロールインジケーター */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
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

      {/* セクション1: 完全オリジナル */}
      <section className="relative min-h-screen py-32 px-4 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center"
            style={{
              y: section1Y,
              opacity: section1Opacity,
            }}
          >
            <motion.h2
              className="text-6xl md:text-8xl font-bold mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                完全オリジナル
              </span>
            </motion.h2>
            <motion.p
              className="text-2xl md:text-4xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              テンプレートに縛られることなく、
              <br />
              あなたのビジョンをそのまま形にします。
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* セクション2: 特徴 */}
      <section className="relative min-h-screen py-32 px-4 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{
              y: section2Y,
              opacity: section2Opacity,
            }}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-center mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              選ばれる理由
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-16">
              {[
                {
                  number: "01",
                  title: "ゼロからの設計",
                  description:
                    "既存のテンプレートに依存せず、お客様の要望を基に完全に新しいデザインを構築します。",
                },
                {
                  number: "02",
                  title: "ブランド完全再現",
                  description:
                    "あなたのブランドアイデンティティを、ウェブサイト上で完璧に表現します。",
                },
                {
                  number: "03",
                  title: "高度なカスタマイズ",
                  description:
                    "あらゆる機能やデザイン要素を、あなたのニーズに合わせて自由にカスタマイズ可能。",
                },
                {
                  number: "04",
                  title: "将来的な拡張性",
                  description:
                    "長期的な成長を見据えた、スケーラブルな構造と技術選定を行います。",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-6xl font-bold text-purple-400 mb-4 opacity-50">
                    {feature.number}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{feature.description}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* セクション3: プロセス */}
      <section className="relative min-h-screen py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">制作プロセス</h2>
            <p className="text-xl text-gray-400">5つのステップで完全オリジナルサイトを実現</p>
          </motion.div>

          <div className="space-y-40">
            {[
              { step: "01", title: "徹底的なヒアリング", description: "お客様のビジョン、ブランド、目標を深く理解します。" },
              { step: "02", title: "戦略設計", description: "マーケティング戦略と技術要件を基に、最適な構造を設計します。" },
              { step: "03", title: "デザイン開発", description: "完全オリジナルのデザインを、ワイヤーフレームから実装まで。" },
              { step: "04", title: "実装・最適化", description: "パフォーマンスとSEOを最適化しながら実装を進めます。" },
              { step: "05", title: "公開・継続サポート", description: "公開後も継続的な改善とサポートを提供します。" },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center gap-12"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className={`flex-1 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="text-8xl font-bold text-purple-400 mb-6 opacity-50">
                    {process.step}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">{process.title}</h3>
                  <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                    {process.description}
                  </p>
                </div>
                <div
                  className={`flex-1 h-64 md:h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl border border-white/10 ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* セクション4: CTA */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-purple-900/20 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-7xl md:text-9xl font-bold mb-12"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #a78bfa, #60a5fa, #ffffff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              始めましょう
            </motion.h2>
            <p className="text-2xl md:text-3xl text-gray-400 mb-16">
              あなたのビジョンを、次のレベルへ
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                className="px-12 py-5 bg-white text-black rounded-full font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                無料相談する
              </motion.button>
              <motion.button
                className="px-12 py-5 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                事例を見る
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
