import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack設定（Next.js 15.5.6以降はexperimental.turboではなくturbopackを使用）
  // --turbopackフラグ使用時は自動的にTurbopackが有効になる
  turbopack: {
    // Turbopackはwebpack設定を無視するため、ここで設定する必要はない
    // @react-pdf/rendererはクライアント側でも使用可能（ブラウザでPDF生成）
    // yoga-layoutはサーバーサイドでのみ必要だが、Turbopackは自動的に処理する
  },
  // webpack設定（本番ビルド用）
  // 注意: --turbopackフラグ使用時（開発時）はwebpack設定が無視されるため警告が出るが、
  // 実際には問題なく動作する。本番ビルド（next build）ではwebpackが使用されるため必要。
  // Next.js 15.5.6では、Turbopack使用時にwebpack設定があると警告が出るが、
  // これは単なる警告で、動作には影響しない。
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
};

export default nextConfig;
