import type { NextConfig } from "next";

// Turbopack使用時を検出
// Next.js 15では、--turbopackフラグ使用時は自動的にTurbopackが有効になる
// この時、webpack設定があると警告が出るため、条件付きで設定する
// process.argvに--turbopackが含まれている場合、または環境変数で検出
const isTurbopack = 
  process.env.NEXT_TURBO === '1' ||
  process.env.TURBOPACK === '1' ||
  (typeof process !== 'undefined' && process.argv?.includes?.('--turbopack'));

const nextConfig: NextConfig = {
  // Turbopack設定（Next.js 15.5.6以降はexperimental.turboではなくturbopackを使用）
  turbopack: {
    // Turbopackはwebpack設定を無視するため、ここで設定する必要はない
    // @react-pdf/rendererはクライアント側でも使用可能（ブラウザでPDF生成）
    // yoga-layoutはサーバーサイドでのみ必要だが、Turbopackは自動的に処理する
  },
  // webpack設定（Turbopackが無効な場合のみ設定して警告を回避）
  // 本番ビルド（next build）では通常webpackが使用されるため、設定が必要
  // ただし、開発時に--turbopackフラグ使用時は警告を避けるため設定を無効化
  ...(!isTurbopack && {
    webpack: (config, { isServer }) => {
      // @react-pdf/rendererはクライアント側でも使用可能（ブラウザでPDF生成）
      // ただし、yoga-layoutはサーバーサイドでのみ必要
      if (!isServer) {
        // yoga-layoutはサーバーサイドでのみ必要
        config.resolve.alias = {
          ...config.resolve.alias,
          'yoga-layout': false,
        };
      }
      return config;
    },
  }),
};

export default nextConfig;
