import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack設定（--turbopackフラグ使用時）
  experimental: {
    turbo: {
      // Turbopackはwebpack設定を無視するため、ここで設定する必要はない
      // @react-pdf/rendererはクライアント側でも使用可能（ブラウザでPDF生成）
      // yoga-layoutはサーバーサイドでのみ必要だが、Turbopackは自動的に処理する
    },
  },
  // webpack設定（Turbopackが無効な場合のフォールバック）
  // Turbopack使用時はwebpack設定を無効化して警告を回避
  ...(process.env.NEXT_TURBO !== '1' && {
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
