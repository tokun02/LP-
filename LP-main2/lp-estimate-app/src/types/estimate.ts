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

// SiteTypeはSITE_TYPE_OPTIONSから生成（SSOT）
export type SiteType = (typeof import('@/data/form-options').SITE_TYPE_OPTIONS)[number];

// EstimateFormValuesはスキーマから生成（SSOT: Single Source of Truth）
// validation/estimate.ts から再エクスポート
export type { EstimateFormValues } from '@/validation/estimate';

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
