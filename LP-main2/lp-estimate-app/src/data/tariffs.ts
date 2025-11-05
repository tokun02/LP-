export type BasePackageCode = 'homepage' | 'recruitment' | 'landing' | 'ecommerce' | 'owned_media';

export type BasePackage = {
  code: BasePackageCode;
  name: string;
  description: string;
  basePrice: number;
  recommendedFor: string;
  includedPages: number;
  additionalPageUnitPrice: number;
  highlightSections: string[];
  suggestedOptions: OptionCode[];
  includedOptions: {
    new: OptionCode[]; // 新規作成時に基本料金に含まれるオプション（レスポンシブ、アニメーション（基本）、サイト設計（基本）、デザイン制作（基本））
    renewal: OptionCode[]; // リニューアル時に基本料金に含まれるオプション（同上）
  };
};

export type DesignIntensity = 'standard' | 'premium' | 'flagship';

export type OptionCode =
  | 'responsive'
  | 'contact_form'
  | 'reservation_form'
  // | 'blog_module' // 統合のため廃止
  | 'cms_dashboard'
  | 'faq'
  // | 'seo_internal' // 統合のため廃止
  | 'analytics_setup'
  | 'sns_integration'
  | 'multilingual'
  | 'multilingual_design_adjustment'
  | 'domain_support'
  | 'copywriting'
  | 'maintenance'
  // 新規提案オプション
  | 'project_management'
  | 'kpi_concept'
  // サイト設計（IA/ワイヤー）- デザイン性別料金
  | 'information_architecture_basic'
  | 'information_architecture_custom'
  // デザイン制作（キービジュアル/パターン）- デザイン性別料金
  | 'visual_design_basic'
  | 'visual_design_custom'
  // アニメーション演出 - デザイン性別料金
  | 'animation_basic'
  | 'animation_custom'
  | 'asset_production'
  | 'photo_shoot_half'
  | 'photo_shoot_full'
  | 'env_setup'
  // WordPress 実装を一元化
  | 'wordpress_impl'
  | 'marketing_pack';

export type TariffOption = {
  code: OptionCode;
  name: string;
  description: string;
  price: number;
  unit?: 'flat' | 'per_language';
  category: 'experience' | 'marketing' | 'integration' | 'operation';
};

export const basePackages: BasePackage[] = [
  {
    code: 'homepage',
    name: 'ホームページ',
    description: '企業情報や商品・サービスの要点を1ページから整理して訴求するサイト向け。',
    basePrice: 120000,
    recommendedFor: '企業情報／サービス紹介／実績共有／料金表／FAQ／お問い合わせ',
    includedPages: 1,
    additionalPageUnitPrice: 15000,
    highlightSections: ['企業概要', 'サービス紹介', '実績/事例', '料金/FAQ', 'お問い合わせ'],
    suggestedOptions: ['wordpress_impl', 'analytics_setup', 'copywriting'],
    includedOptions: {
      new: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'], // 新規作成時に基本料金に含まれる
      renewal: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'], // リニューアル時も基本料金に含まれる
    },
  },
  {
    code: 'recruitment',
    name: '採用サイト',
    description: 'カルチャー訴求と募集要項整備を重視した採用特化サイト向け。',
    basePrice: 90000,
    recommendedFor: '募集要項／社員紹介／カルチャー発信／エントリーフォーム',
    includedPages: 5,
    additionalPageUnitPrice: 22000,
    highlightSections: ['トップ', '会社紹介', '制度・福利厚生', '社員インタビュー', '募集要項', '応募フォーム'],
    suggestedOptions: ['contact_form', 'analytics_setup', 'copywriting'],
    includedOptions: {
      new: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
      renewal: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
    },
  },
  {
    code: 'landing',
    name: 'ランディングページ',
    description: '単一ページでCV達成を目指す施策型LP向け。',
    basePrice: 80000,
    recommendedFor: 'キャンペーン／新商品ローンチ／広告流入',
    includedPages: 1,
    additionalPageUnitPrice: 15000,
    highlightSections: ['ファーストビュー', '課題提示', 'ソリューション', '実績・証言', 'CTA'],
    suggestedOptions: ['wordpress_impl', 'copywriting'],
    includedOptions: {
      new: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
      renewal: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
    },
  },
  {
    code: 'ecommerce',
    name: 'ECサイト',
    description: '商品登録から決済導線まで備えたEC/通販サイト向け。',
    basePrice: 250000,
    recommendedFor: '商品一覧／詳細ページ／カート／決済／会員導線',
    includedPages: 8,
    additionalPageUnitPrice: 28000,
    highlightSections: ['トップ', '商品一覧', '商品詳細', 'カート', '決済フロー', '特集記事', 'FAQ', 'お問い合わせ'],
    suggestedOptions: ['reservation_form', 'cms_dashboard', 'wordpress_impl', 'maintenance'],
    includedOptions: {
      new: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
      renewal: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
    },
  },
  {
    code: 'owned_media',
    name: 'オウンドメディア',
    description: '継続的な記事配信とカテゴリ運用を想定したメディア型サイト向け。',
    basePrice: 200000,
    recommendedFor: 'カテゴリ整理／記事テンプレート／リード獲得',
    includedPages: 6,
    additionalPageUnitPrice: 22000,
    highlightSections: ['トップ', 'カテゴリ一覧', '記事テンプレート', 'タグ一覧', '資料請求', 'お問い合わせ'],
    suggestedOptions: ['wordpress_impl', 'analytics_setup', 'maintenance'],
    includedOptions: {
      new: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
      renewal: ['responsive', 'animation_basic', 'information_architecture_basic', 'visual_design_basic'],
    },
  },
];

export const designIntensityMultipliers: Record<DesignIntensity, number> = {
  standard: 1,
  premium: 1.15,
  flagship: 1.35,
};

export const designIntensityLabels: Record<DesignIntensity, string> = {
  standard: '標準（1.0x）',
  premium: 'こだわり（1.15x）',
  flagship: 'ハイエンド（1.35x）',
};

export const options: TariffOption[] = [
  {
    code: 'responsive',
    name: 'レスポンシブ最適化',
    description: '主要デバイス幅（360px〜1440px）でのレイアウト最適化。',
    price: 15000,
    category: 'experience',
  },
  {
    code: 'contact_form',
    name: 'お問い合わせフォーム',
    description: 'メール送信／自動返信付きのフォーム実装。',
    price: 15000,
    category: 'integration',
  },
  {
    code: 'reservation_form',
    name: '予約フォーム',
    description: 'カレンダー連携とバリデーション付き予約フォーム。',
    price: 30000,
    category: 'integration',
  },
  // 'blog_module' は WordPress 実装へ統合
  {
    code: 'cms_dashboard',
    name: 'CMS管理画面構築',
    description: '運用担当者向けの更新ダッシュボード（WordPressを使わない場合のカスタム管理画面構築）。',
    price: 40000,
    category: 'operation',
  },
  {
    code: 'animation_basic',
    name: 'アニメーション演出（基本）',
    description: '基本的なインタラクション／スクロール演出の実装。',
    price: 15000, // 市場相場: ¥15,000〜20,000（基本料金に含まれる）
    category: 'experience',
  },
  {
    code: 'animation_custom',
    name: 'アニメーション演出（カスタム）',
    description: '標準的なインタラクション／スクロール演出から高度なカスタムアニメーションまで。プロジェクトの要件に応じて最適な演出を実装します。',
    price: 10000, // 最小価格として表示（実際の価格は¥10,000〜¥20,000の範囲）
    category: 'experience',
  },
  {
    code: 'visual_design_basic',
    name: 'デザイン制作（キービジュアル/パターン）- 基本',
    description: 'キービジュアル・UIパターンの作成（基本的なデザイン）。',
    price: 80000, // 市場相場: ¥80,000〜120,000（基本料金に含まれる）
    category: 'experience',
  },
  {
    code: 'information_architecture_basic',
    name: 'サイト設計（IA/ワイヤー）- 基本',
    description: '情報設計・簡易ワイヤー作成（〜15ページ相当、基本的な構成）。',
    price: 60000, // 市場相場: ¥60,000〜100,000（基本料金に含まれる）
    category: 'experience',
  },
  {
    code: 'faq',
    name: 'FAQアコーディオン',
    description: 'アコーディオン形式でのFAQセクション。',
    price: 5000,
    category: 'experience',
  },
  // 'seo_internal' は WordPress 実装へ統合
  {
    code: 'analytics_setup',
    name: 'GA4・Search Console設定',
    description: 'Googleアナリティクス4とサーチコンソールの初期設定。',
    price: 8000,
    category: 'marketing',
  },
  {
    code: 'sns_integration',
    name: 'SNS連携',
    description: 'OGP／SNSフィード埋め込みなどの設定。',
    price: 8000,
    category: 'marketing',
  },
  {
    code: 'multilingual',
    name: '多言語対応',
    description: '追加言語1言語あたりの翻訳と多言語導線設計。',
    price: 40000,
    unit: 'per_language',
    category: 'integration',
  },
  {
    code: 'multilingual_design_adjustment',
    name: '構成・デザインの多言語調整',
    description: '追加言語1言語あたりの構成・デザイン調整。ページ数・言語数規模に応じて料金が変動します（¥40,000〜¥200,000の範囲）。',
    price: 40000, // 最小価格として表示（実際の価格は¥40,000〜¥200,000の範囲）
    unit: 'per_language',
    category: 'integration',
  },
  {
    code: 'domain_support',
    name: 'ドメイン・サーバー取得代行',
    description: 'ドメイン取得／ホスティング設定代行（実費別途）。',
    price: 8000,
    category: 'operation',
  },
  {
    code: 'copywriting',
    name: 'コピー／ライティング',
    description: '見出し・CTA・本文のライティングサポート。',
    price: 20000,
    category: 'marketing',
  },
  {
    code: 'maintenance',
    name: '月次保守・更新サポート',
    description: '軽微修正・レポート・バックアップ（月額）。サポート内容に応じて料金が変動します（¥7,000〜¥200,000/月の範囲）。',
    price: 7000, // 最小価格として表示（実際の価格は¥7,000〜¥200,000/月の範囲）
    category: 'operation',
  },
  // --- 新規提案オプション ---
  {
    code: 'project_management',
    name: '進行管理（プロジェクトマネジメント）',
    description: '進行計画、タスク管理、定例進行（小〜中規模）。',
    price: 20000,
    category: 'operation',
  },
  {
    code: 'kpi_concept',
    name: 'KPI・コンセプト作成',
    description: 'KPI設定/コンセプトワーク（1回分のワークショップ含む）。',
    price: 80000, // 市場相場調整: ¥30,000 → ¥80,000 (推奨範囲: ¥50,000〜150,000)
    category: 'marketing',
  },
  {
    code: 'information_architecture_custom',
    name: 'サイト設計（IA/ワイヤー）- カスタム',
    description: '情報設計・詳細ワイヤー作成から高品質ワイヤー作成まで。プロジェクトの要件に応じて、標準的な構成とUI要素の設計から詳細な設計とユーザビリティ検証を含む高品質なワイヤー作成まで対応します。',
    price: 50000, // 最小価格として表示（実際の価格は¥50,000〜¥100,000の範囲）
    category: 'experience',
  },
  {
    code: 'visual_design_custom',
    name: 'デザイン制作（キービジュアル/パターン）- カスタム',
    description: 'キービジュアル・UIパターンの作成。プロジェクトの要件に応じて、標準的なデザインとブランディングから高品質なデザイン、複数パターン提案、ブランディング強化まで対応します。【サイト設計（IA/ワイヤー）カスタム・アニメーション演出（カスタム）を含む】',
    price: 50000, // 最小価格として表示（実際の価格は¥50,000〜¥200,000の範囲）
    category: 'experience',
  },
  {
    code: 'asset_production',
    name: '素材作成・購入',
    description: 'アイコン制作/ストック購入（実費別途）。',
    price: 10000,
    category: 'experience',
  },
  {
    code: 'photo_shoot_half',
    name: '撮影・画像編集込み(半日)',
    description: '半日撮影と画像編集のディレクション/調整含む（外部費用別途の場合あり）。',
    price: 60000,
    category: 'experience',
  },
  {
    code: 'photo_shoot_full',
    name: '撮影・画像編集込み(1日)',
    description: '1日撮影と画像編集のディレクション/調整含む（外部費用別途の場合あり）。',
    price: 120000,
    category: 'experience',
  },
  {
    code: 'env_setup',
    name: '環境構築（初期設定）',
    description: 'CI/CD・解析・監視などの初期セットアップ（DNS/ドメイン代行は別）。',
    price: 40000, // 市場相場調整: ¥20,000 → ¥40,000 (推奨範囲: ¥30,000〜50,000)
    category: 'operation',
  },
  {
    code: 'wordpress_impl',
    name: 'ワードプレス実装',
    description: 'WPテーマ実装（ブログ/ニュース + 基本SEO下地 + 管理画面を含む統合パッケージ）。WordPressには管理画面が含まれます。',
    price: 40000,
    category: 'integration',
  },
  {
    code: 'marketing_pack',
    name: 'マーケ支援パック（GA4+SNS 10%割引）',
    description: 'GA4・Search Console設定 と SNS連携 のセット。',
    price: Math.round((8000 + 8000) * 0.9),
    category: 'marketing',
  },
];

export const taxRate = 0.1;
