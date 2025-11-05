import { basePackages } from '@/data/tariffs';
import type { BasePackageCode, OptionCode } from '@/data/tariffs';
import type { BudgetRange, ServerDomainStatus, SitePurpose } from '@/types/estimate';

export type SitePurposeOption = {
  label: SitePurpose;
  description: string;
  value: BasePackageCode;
  highlightSections: string[];
  recommendedOptions: OptionCode[];
};

export const SITE_PURPOSE_OPTIONS = basePackages.map((pkg) => ({
  label: pkg.name as SitePurpose,
  description: pkg.description,
  value: pkg.code,
  highlightSections: pkg.highlightSections,
  recommendedOptions: pkg.suggestedOptions,
})) as readonly SitePurposeOption[];

export const SITE_PURPOSE_VALUES = SITE_PURPOSE_OPTIONS.map((option) => option.label);

export const BUDGET_RANGE_OPTIONS = ['〜30万円', '30〜60万円', '60〜100万円', '100万円〜'] as const satisfies readonly BudgetRange[];

export const SERVER_DOMAIN_OPTIONS = ['既に保有', '取得予定', '代行希望', '不要'] as const satisfies readonly ServerDomainStatus[];

export const ASSET_OPTIONS = [
  { value: 'ロゴ・VI', label: 'ロゴ・ビジュアルあり' },
  { value: '写真素材', label: '写真素材あり' },
  { value: 'テキスト原稿', label: 'テキスト原稿あり' },
  { value: '参考資料', label: '参考資料あり' },
];

export const SITE_PURPOSE_TO_PACKAGE = SITE_PURPOSE_OPTIONS.reduce<Record<SitePurpose, BasePackageCode>>(
  (acc, option) => {
    acc[option.label] = option.value;
    return acc;
  },
  {} as Record<SitePurpose, BasePackageCode>,
);

// 追加: 拡張ヒアリング用の選択肢定義（UI実装前提で参照可能にする）
export const INDUSTRY_OPTIONS = [
  '製造業',
  '小売業',
  'サービス業',
  'IT・通信',
  '医療・福祉',
  '教育',
  '建設・不動産',
  '飲食',
  '美容・エステ',
  'その他',
] as const;

export const EMPLOYEE_SIZE_OPTIONS = ['1-5名', '6-20名', '21-50名', '51-100名', '101名以上'] as const;

export const PROJECT_PURPOSE_OPTIONS = [
  '新規顧客獲得',
  'ブランド認知度向上',
  '既存顧客への情報提供',
  '採用活動強化',
  'オンライン販売',
  '問い合わせ増加',
  '競合他社との差別化',
  '信頼性向上',
  'その他',
] as const;

export const SITE_TYPE_OPTIONS = [
  'コーポレートサイト',
  'ECサイト',
  'サービスサイト',
  'ランディングページ',
  'メディアサイト',
  '採用サイト',
  'ポートフォリオ',
  'その他',
] as const;

export const PAGE_RANGE_OPTIONS = [
  '1ページ（LP）',
  '2-5ページ',
  '6-10ページ',
  '11-20ページ',
  '21-50ページ',
  '51ページ以上',
  '未定・相談したい',
] as const;

export const BRAND_IMAGE_OPTIONS = [
  '革新的',
  '思いやりのある',
  '上質な',
  '楽しい',
  '魅力的',
  '信頼できる',
  '純粋',
  '自由な',
  '知的',
  '変革をもたらす',
  '親しみやすい',
  'ユニークな',
] as const;

export const BRAND_VALUES_OPTIONS = [
  '創造性',
  '思いやり',
  '品質',
  '喜び',
  '情熱',
  '信頼',
  '誠実さ',
  '探求心',
  '知識',
  '問題解決',
  '親近感',
  '独自性',
] as const;

export const BRAND_GOALS_OPTIONS = [
  '新しいことへの挑戦',
  'お客様満足の追求',
  'ブランド価値の向上',
  '人々を楽しませること',
  '感動体験の提供',
  '社会的責任の遂行',
  'シンプルで分かりやすいこと',
  '新しい世界の発見',
  '専門知識の提供',
  '社会の変革',
  '人々との絆づくり',
  '新しい価値の創造',
] as const;

export const COMPETITOR_GOOD_OPTIONS = [
  'デザインが洗練されている',
  '情報が分かりやすい',
  '使いやすい（ナビゲーション等）',
  'コンテンツが充実している',
  '更新頻度が高い',
  'SEO対策がしっかりしている',
  'スマートフォン対応が良い',
  '読み込み速度が速い',
] as const;

export const COMPETITOR_IMPROVE_OPTIONS = [
  'デザインが古い・ダサい',
  '情報が分かりにくい',
  '使いにくい（ナビゲーション等）',
  'コンテンツが少ない・薄い',
  '更新されていない',
  'SEO対策が不十分',
  'スマートフォン対応が悪い',
  '読み込みが遅い',
  '個性がない・似たり寄ったり',
] as const;

export const STRENGTH_OPTIONS = [
  '価格の安さ',
  '品質の高さ',
  'スピード（納期・対応速度）',
  '専門性・技術力',
  '実績・信頼性',
  'カスタマーサポートの充実',
  'アフターサービス',
  '独自性・オリジナリティ',
  '地域密着',
  '幅広い対応・ワンストップサービス',
] as const;

export const DESIGN_TONE_OPTIONS = [
  'シンプル・ミニマル',
  'モダン・スタイリッシュ',
  '高級感・上品',
  '親しみやすい・温かい',
  '力強い・インパクト',
  'クラシック・伝統的',
  'カラフル・ポップ',
  '技術的・先進的',
] as const;

export const COLOR_OPTIONS = [
  'ブルー系',
  'グリーン系',
  'レッド系',
  'オレンジ系',
  'パープル系',
  'ブラック・グレー系',
  'ホワイト系',
  '特にこだわりなし',
] as const;

export const BASIC_FEATURES_OPTIONS = [
  'お問い合わせフォーム',
  '資料請求フォーム',
  '見積もり依頼フォーム',
  '予約システム',
  'ニュース・お知らせ',
  'ブログ機能',
  'FAQ',
  '会社概要',
  'アクセスマップ',
  'スタッフ紹介',
] as const;

export const ADVANCED_FEATURES_OPTIONS = [
  'ECサイト機能',
  '会員登録・ログイン',
  '決済システム',
  '多言語対応',
  '検索機能',
  'チャットボット',
  'メルマガ配信',
  '顧客管理システム',
] as const;

export const CMS_OPTIONS = [
  'WordPress（ワードプレス）',
  'Headless CMS（Strapi、Contentfulなど）',
  'Notion連携',
  '独自管理画面',
  '不要（静的サイト）',
  '相談したい',
] as const;

export const UPDATE_FREQUENCY_OPTIONS = [
  'ほぼ毎日',
  '週1回程度',
  '月1回程度',
  '年に数回程度',
  'ほとんど更新しない',
] as const;

export const SEO_IMPORTANCE_OPTIONS = ['非常に重要', '重要', 'やや重要', 'あまり重要でない'] as const;

export const CURRENT_MARKETING_OPTIONS = [
  'リスティング広告',
  'SNS広告',
  'SEO対策',
  'SNS運用',
  'メール配信',
  'チラシ・DM',
  '何もしていない',
] as const;

export const SNS_OPTIONS = ['Facebook', 'Instagram', 'Twitter(X)', 'LINE', 'YouTube', 'LinkedIn', '不要'] as const;

export const GA4_STATUS_OPTIONS = ['希望する', '既に使用中', '不要', 'よくわからない'] as const;

export const DOMAIN_CHOICES = ['既存ドメインを使用', '新規取得希望', '相談したい'] as const;
export const SERVER_CHOICES = ['弊社におまかせ', '既存サーバーを使用', 'お客様側で用意', '相談したい'] as const;
export const SSL_CHOICES = ['必要', '不要', 'よくわからない'] as const;
export const DEVICES_CHOICES = ['PC', 'スマートフォン', 'タブレット'] as const;

export const MAINTENANCE_CHOICES = ['月額保守契約を希望', '必要な時のみ都度依頼', '保守・運用は不要', '詳しく相談したい'] as const;
export const BACKUP_CHOICES = ['必要', '不要', 'よくわからない'] as const;
export const SECURITY_IMPORTANCE_OPTIONS = ['非常に重要', '重要', '標準的で十分', 'よくわからない'] as const;

export const APPROVAL_FLOW_OPTIONS = ['記入者が最終決定', '上司の承認が必要', '複数人で検討', 'その他'] as const;
export const PRIORITY_OPTIONS = ['デザイン力', '技術力', '提案力', 'レスポンスの早さ', '価格の安さ', 'サポート体制', '実績・信頼性', '業界理解'] as const;

// 追加: ヒアリングシート拡張用の選択肢
export const GENDER_OPTIONS = ['男性', '女性', '両方'] as const;
export const AGE_GROUP_OPTIONS = ['10代', '20代', '30代', '40代', '50代', '60代以上'] as const;
export const BUDGET_DETAIL_OPTIONS = [
  '10万円以下',
  '10〜30万円',
  '30〜50万円',
  '50〜80万円',
  '80〜100万円',
  '100〜150万円',
  '150〜200万円',
  '200〜300万円',
  '300〜500万円',
  '500万円以上',
  '未定・相談したい',
] as const;
export const DEADLINE_OPTIONS = ['1ヶ月以内', '2ヶ月以内', '3ヶ月以内', '6ヶ月以内', '特に急いでいない'] as const;
export const EXISTING_SITE_OPTIONS = ['あり', 'なし'] as const;
export const CURRENT_SITE_ISSUES_OPTIONS = [
  'デザインが古い',
  'スマホ対応していない',
  '更新が困難',
  'アクセス数が少ない',
  '問い合わせが少ない',
  '表示速度が遅い',
  'SEO対策不十分',
  '情報が古い',
] as const;
export const MONTHLY_VISIT_OPTIONS = [
  '不明',
  '1,000未満',
  '1,000〜5,000',
  '5,000〜10,000',
  '10,000〜50,000',
  '50,000以上',
] as const;
export const LOGO_PROVIDED_OPTIONS = [
  'あり（AI・EPS等）',
  'あり（PNG・JPG等）',
  'なし',
  '制作が必要',
] as const;
export const PHOTO_MATERIAL_OPTIONS = [
  '商品・サービス写真',
  '代表・スタッフ写真',
  '会社・店舗写真',
  'イメージ写真（雰囲気を表現する写真）',
  '既存の宣伝素材・パンフレット等',
  '素材の提供は難しい',
] as const;
export const PHOTO_SHORTAGE_OPTIONS = [
  'プロカメラマンによる撮影を依頼したい',
  'ストックフォト（有料画像）を使用',
  'お客様側で追加撮影・用意する',
  '相談したい',
] as const;
export const UPDATE_STYLE_OPTIONS = [
  '自分で更新したい（CMS導入）',
  '弊社に更新をご依頼したい（静的サイト）',
  '一部は自分で、一部は弊社に依頼',
  '相談したい',
] as const;
export const TARGET_KEYWORDS_PLACEHOLDER = '例：地域名 + 業種名';
export const PAST_EXPERIENCE_OPTIONS = ['初回', 'あり（満足）', 'あり（不満足）'] as const;

// ワイヤーフレーム選択肢
export type WireframeTemplate = {
  id: string;
  name: string;
  description: string;
  useCase: string[];
  priceModifier?: number; // 価格係数（1.0 = 基本料金、1.2 = 20%増など）
  estimatedTime?: string;
  previewUrl?: string; // 将来的に制作したURLを表示するためのフィールド
};

// テンプレート用のワイヤーフレーム案
export const WIREFRAME_TEMPLATES: WireframeTemplate[] = [
  {
    id: 'template-standard-1',
    name: 'テンプレート1',
    description: 'シンプルでわかりやすいレイアウト。小規模な企業サイトやサービス紹介サイトに最適。',
    useCase: ['小規模な企業サイト', 'サービス紹介', 'シンプルなLP'],
    priceModifier: 1.0,
    estimatedTime: '2-3週間',
    previewUrl: '/wireframe-demo/template-1',
  },
  {
    id: 'template-standard-2',
    name: 'テンプレート2',
    description: 'バランスの取れた標準的なレイアウト。一般的な企業サイトや採用サイトに最適。',
    useCase: ['標準的な企業サイト', '採用サイト', 'サービス紹介'],
    priceModifier: 1.0,
    estimatedTime: '2-3週間',
    previewUrl: '/wireframe-demo/template-2',
  },
  {
    id: 'template-standard-3',
    name: 'テンプレート3',
    description: '充実したセクション構成。情報量の多いサイトやブランド訴求を重視するサイト向け。',
    useCase: ['情報量の多いサイト', 'ブランド訴求重視', 'メディアサイト'],
    priceModifier: 1.0,
    estimatedTime: '2-3週間',
    previewUrl: '/wireframe-demo/template-3',
  },
];

// セミオーダー用のワイヤーフレーム案
export const WIREFRAME_SEMI_CUSTOM: WireframeTemplate[] = [
  {
    id: 'semi-custom-1',
    name: 'セミオーダー1',
    description: 'シンプルなテンプレートをベースに、ご要望に合わせてレイアウトを調整します。',
    useCase: ['小規模カスタマイズ', 'コスト重視', '短期間'],
    priceModifier: 1.2,
    estimatedTime: '3-4週間',
    previewUrl: '/wireframe-demo/semi-custom-1',
  },
  {
    id: 'semi-custom-2',
    name: 'セミオーダー2',
    description: '標準的なテンプレートをベースに、セクション構成や機能をカスタマイズします。',
    useCase: ['中規模カスタマイズ', '機能追加', 'ブランド調整'],
    priceModifier: 1.3,
    estimatedTime: '4-5週間',
    previewUrl: '/wireframe-demo/semi-custom-2',
  },
  {
    id: 'semi-custom-3',
    name: 'セミオーダー3',
    description: '充実したテンプレートをベースに、デザインや機能を大幅にカスタマイズします。',
    useCase: ['大規模カスタマイズ', 'ブランド訴求重視', '差別化重視'],
    priceModifier: 1.5,
    estimatedTime: '5-6週間',
    previewUrl: '/wireframe-demo/semi-custom-3',
  },
  {
    id: 'semi-custom-4',
    name: 'セミオーダー4',
    description: '複数のテンプレートの良い部分を組み合わせて、最適な構成を設計します。',
    useCase: ['複合要件', '多機能サイト', '柔軟性重視'],
    priceModifier: 1.4,
    estimatedTime: '4-6週間',
    previewUrl: '/wireframe-demo/semi-custom-4',
  },
];

// フルオーダー用のワイヤーフレーム案
export const WIREFRAME_FULL_CUSTOM: WireframeTemplate[] = [
  {
    id: 'full-custom-1',
    name: 'フルオーダー1',
    description: '完全オリジナルのワイヤーフレームから設計。シンプルで効率的な構成を重視します。',
    useCase: ['完全オリジナル', 'シンプル設計', '効率重視'],
    priceModifier: 1.8,
    estimatedTime: '6-8週間',
    previewUrl: '/wireframe-demo/full-custom-1',
  },
  {
    id: 'full-custom-2',
    name: 'フルオーダー2',
    description: '完全オリジナルのワイヤーフレームから設計。標準的な機能とレイアウトを組み合わせます。',
    useCase: ['完全オリジナル', '標準機能', 'バランス重視'],
    priceModifier: 2.0,
    estimatedTime: '8-10週間',
    previewUrl: '/wireframe-demo/full-custom-2',
  },
  {
    id: 'full-custom-3',
    name: 'フルオーダー3',
    description: '完全オリジナルのワイヤーフレームから設計。充実した機能と独自のレイアウトを実現します。',
    useCase: ['完全オリジナル', '高機能', '差別化重視'],
    priceModifier: 2.5,
    estimatedTime: '10-12週間',
    previewUrl: '/wireframe-demo/full-custom-3',
  },
  {
    id: 'full-custom-4',
    name: 'フルオーダー4',
    description: '完全オリジナルのワイヤーフレームから設計。大規模サイトや複雑な要件に対応します。',
    useCase: ['完全オリジナル', '大規模サイト', '複雑要件'],
    priceModifier: 3.0,
    estimatedTime: '12-16週間',
    previewUrl: '/wireframe-demo/full-custom-4',
  },
];

// ワイヤーフレームタイプ別のテンプレート一覧を取得
export const getWireframeTemplatesByType = (type: WireframeType): WireframeTemplate[] => {
  switch (type) {
    case 'template':
      return WIREFRAME_TEMPLATES;
    case 'semi-custom':
      return WIREFRAME_SEMI_CUSTOM;
    case 'full-custom':
      return WIREFRAME_FULL_CUSTOM;
    default:
      return [];
  }
};

export const WIREFRAME_OPTIONS = [
  'template',
  'semi-custom',
  'full-custom',
] as const;

export type WireframeType = (typeof WIREFRAME_OPTIONS)[number];

export const WIREFRAME_TYPE_LABELS: Record<WireframeType, string> = {
  'template': 'テンプレート',
  'semi-custom': 'セミオーダー',
  'full-custom': 'フルオーダー',
};

export const WIREFRAME_TYPE_DESCRIPTIONS: Record<WireframeType, string> = {
  'template': 'コストと制作期間を抑えられます',
  'semi-custom': 'テンプレートをベースに、ご要望に合わせてカスタマイズします。',
  'full-custom': '完全オリジナルのワイヤーフレームから作成します。',
};

// オーダーメイドタイプのプレビューURL（将来的に設定可能）
export const WIREFRAME_DEMO_URLS: Partial<Record<WireframeType, string>> = {
  'semi-custom': '/wireframe-demo/semi-custom',
  'full-custom': '/wireframe-demo/full-custom',
};
