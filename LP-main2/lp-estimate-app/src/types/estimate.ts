import type {
  BasePackageCode,
  DesignIntensity,
  OptionCode,
  TariffOption,
} from '@/data/tariffs';
import type { WireframeType } from '@/data/form-options';

export type SitePurpose =
  | '集客'
  | '採用'
  | 'ブランディング'
  | 'キャンペーン'
  | '採用ブースト'
  | 'プロダクトローンチ'
  | '問い合わせ増加'
  | '資料請求増加'
  | '認知拡大'
  | '信頼性向上'
  | '購入CVR向上'
  | 'カート離脱率改善'
  | '再購入促進'
  | '応募数増加'
  | '企業理解促進'
  | '採用広報強化'
  | 'SEO流入増加'
  | '回遊促進'
  | 'メルマガ登録増加';

export type BudgetRange =
  | '〜30万円'
  | '30〜60万円'
  | '60〜100万円'
  | '100万円〜';

export type ServerDomainStatus =
  | '既に保有'
  | '取得予定'
  | '代行希望'
  | '不要';

export type FormSection = 'basic' | 'structure' | 'options' | 'summary';

export type SiteType = 'コーポレート' | 'LP' | 'EC' | '採用' | 'メディア';

export type EstimateFormValues = {
  projectName: string;
  clientName: string;
  contactEmail: string;
  siteType: SiteType;
  sitePurpose: SitePurpose[];
  serviceOverview: string;
  targetAudience: string;
  launchDate?: string;
  budgetRange: BudgetRange;
  serverDomain: ServerDomainStatus;
  assetsProvided: string[];

  // 追加: 商談効率化のための軽量項目（PDFは既存のまま）
  referenceUrl1?: string;
  referenceUrl1Intent?: ('デザイン' | '機能' | '情報設計')[];
  referenceUrl2?: string;
  referenceUrl2Intent?: ('デザイン' | '機能' | '情報設計')[];
  ngExampleUrl?: string;
  ngReason?: string;
  piiCategories?: ('氏名' | '住所' | '生年月日' | '健康情報')[];
  forbiddenColors?: string;
  avoidStyle?: string;
  criticalDate?: string;
  criticalImportance?: '高' | '中' | '低';

  basePackage: BasePackageCode;
  projectType?: 'new' | 'renewal'; // 新規作成 / 再作成
  pageCount: number;
  designIntensity: DesignIntensity;
  multilingualCount: number;
  wireframeType?: WireframeType;
  homepageBasePrice?: number; // ホームページのカスタム料金設定（デフォルト: 120000）
  homepageIncludedPages?: number; // ホームページの基本想定ページ数（デフォルト: 1）
  recruitmentBasePrice?: number; // 採用サイトのカスタム料金設定（デフォルト: 160000）
  recruitmentIncludedPages?: number; // 採用サイトの基本想定ページ数（デフォルト: 5）
  landingBasePrice?: number; // ランディングページのカスタム料金設定（デフォルト: 80000）
  landingIncludedPages?: number; // ランディングページの基本想定ページ数（デフォルト: 1）
  ecommerceBasePrice?: number; // ECサイトのカスタム料金設定（デフォルト: 250000）
  ecommerceIncludedPages?: number; // ECサイトの基本想定ページ数（デフォルト: 8）
  ownedMediaBasePrice?: number; // オウンドメディアのカスタム料金設定（デフォルト: 200000）
  ownedMediaIncludedPages?: number; // オウンドメディアの基本想定ページ数（デフォルト: 6）

  selectedOptions: OptionCode[];
  // オプション依存の詳細（該当時のみ）
  // お問い合わせフォーム選択時
  contactDestination?: 'なし' | 'スプレッドシート' | 'CRM' | 'その他';
  contactAutoReply?: '要' | '不要';
  contactCrmType?: 'Salesforce' | 'HubSpot' | 'その他';
  // 予約フォーム選択時
  reservationUnit?: '人' | '設備' | '時間';
  reservationCalendar?: 'あり' | 'なし';
  reservationPrepay?: 'あり' | 'なし';
  // 多言語選択時
  translationSupport?: '支給' | '要支援';
  // CMS/ブログ選択時
  cmsUpdateOwner?: '社内' | '外注';
  cmsUpdateFrequency?: '週1' | '月1' | '稀';
  maintenance?: 'なし'; // 月次サポートは削除
  notes?: string;
  includeTax: boolean;

  // 追加: 詳細ヒアリングシート項目（重複を避けて追加）
  // 1. 基本情報の拡張
  companyName?: string; // 会社名
  contactPersonName?: string; // ご担当者名
  contactPosition?: string; // 役職・部署
  contactPhone?: string; // 電話番号
  location?: string; // 所在地
  industry?: string; // 業種・業態（INDUSTRY_OPTIONSから選択）
  industryOther?: string; // 「その他」の場合の詳細
  employeeSize?: string; // 従業員数（EMPLOYEE_SIZE_OPTIONSから選択）

  // 2. プロジェクト概要の拡張
  projectPurpose?: string[]; // 目的（複数選択可、PROJECT_PURPOSE_OPTIONSから）
  projectPurposeOther?: string; // 「その他」の場合の詳細
  pageStructureRequest?: string; // ページ構成についての要望

  // ターゲットユーザーの詳細
  targetGender?: string; // メインターゲットの性別
  targetAgeGroups?: string[]; // メインターゲットの年齢層（複数選択可）
  targetCharacteristics?: string; // ターゲットユーザーの特徴・属性

  // ブランドイメージ・ポジショニング（既存のBRAND_IMAGE_OPTIONS等を使用）
  brandImage?: string; // ブランドを一言で（1つ選択）
  brandValues?: string[]; // 大切にしている価値観（複数選択可）
  brandGoals?: string[]; // 目指しているもの（複数選択可）

  // 3. 競合分析・差別化戦略の拡張
  competitorUrl?: string; // 競合サイトのURL
  competitorGoodPoints?: string[]; // 競合の良い点（複数選択可）
  competitorGoodDetails?: string; // 競合サイトの詳細
  competitorImprovePoints?: string[]; // 競合の改善点（複数選択可）
  competitorImproveDetails?: string; // 改善点の詳細
  companyStrengths?: string[]; // 自社の強み（複数選択可）
  companyStrengthsDetails?: string; // 強みの詳細
  differentiationIdeas?: string[]; // 差別化の工夫（複数選択可）
  differentiationDetails?: string; // 差別化の詳細アイデア

  // 4. 予算・スケジュールの拡張
  budgetDetail?: string; // 予算の確定/概算/未定
  budgetNote?: string; // 予算に関する補足事項
  deadline?: string; // 希望納期
  deadlineSpecific?: string; // 具体的な希望日

  // 5. 現在のウェブサイト状況
  existingSite?: string; // 既存サイトの有無
  existingSiteUrl?: string; // 既存サイトのURL
  currentSiteIssues?: string[]; // 現在のサイトの問題点（複数選択可）
  currentSiteIssuesOther?: string; // その他の問題点
  monthlyVisitCount?: string; // 月間アクセス数

  // 6. デザイン要望・参考サイトの拡張
  referenceSiteReason?: string; // 参考サイトの理由
  avoidSiteReason?: string; // 避けたいサイトの理由（ngReasonと統合可能だが、明確化のため保持）
  mainColor?: string; // 希望するメインカラー（具体的な色指定）
  mainColorOther?: string; // 具体的な色指定（例：コーポレートカラー）
  logoProvided?: string; // ロゴデータの提供状況
  photoMaterials?: string[]; // 写真・画像素材の提供（複数選択可）
  photoMaterialsDetails?: string; // 素材についての詳細
  photoShortageHandling?: string; // 素材が不足している場合の対応

  // 7. 機能要件の拡張（既存のBASIC_FEATURES_OPTIONS、ADVANCED_FEATURES_OPTIONS等を使用）
  basicFeatures?: string[]; // 必要な基本機能（複数選択可）
  advancedFeatures?: string[]; // 高度な機能（複数選択可）
  cmsChoice?: string; // CMSの希望（CMS_OPTIONSから選択）
  updateStyle?: string; // 更新スタイル（UPDATE_STYLE_OPTIONSから選択）

  // 8. SEO・マーケティング要件の拡張
  seoImportance?: string; // SEO対策の重要度
  targetKeywords?: string; // 狙いたいキーワード
  currentMarketing?: string[]; // 現在実施中のマーケティング施策（複数選択可）
  snsIntegration?: string[]; // SNS連携の希望（複数選択可）
  ga4Status?: string; // Googleアナリティクス・サーチコンソールの導入

  // 9. 技術・インフラ要件の拡張
  domainChoice?: string; // ドメインについて（DOMAIN_CHOICESから選択）
  domainExisting?: string; // 既存ドメインがある場合
  serverChoice?: string; // サーバーについて（SERVER_CHOICESから選択）
  sslChoice?: string; // SSL証明書の導入（SSL_CHOICESから選択）
  devicesSupported?: string[]; // 対応デバイス（複数選択可）

  // 10. 保守・運用についての拡張
  maintenanceContract?: string; // 契約形態のご希望（MAINTENANCE_CHOICESから選択）
  backupChoice?: string; // バックアップの希望（BACKUP_CHOICESから選択）
  securityImportance?: string; // セキュリティ対策の重要度

  // 11. プロジェクト進行・その他
  approvalFlow?: string; // 決裁者・承認フロー（APPROVAL_FLOW_OPTIONSから選択）
  approvalFlowDetails?: string; // 承認プロセスについての詳細
  pastWebExperience?: string; // 過去のWEB制作経験（PAST_EXPERIENCE_OPTIONSから選択）
  pastWebExperienceDetails?: string; // 過去の経験で良かった点・悪かった点
  priorities?: string[]; // 弊社に期待すること・重視すること（複数選択可、PRIORITY_OPTIONSから）
  otherRequests?: string; // その他のご要望・特記事項
  feedback?: string; // このヒアリングシートについてのご感想
};

export type EstimateLineItem = {
  code: string;
  label: string;
  unitAmount: number;
  quantity: number;
  total: number;
  category: string;
  source?: TariffOption['category'];
};

export type EstimateBreakdown = {
  subtotal: number;
  tax: number;
  totalWithoutTax: number;
  totalWithTax: number;
  displayTotal: number;
  taxRate: number;
  currency: 'JPY';
  items: EstimateLineItem[];
};
