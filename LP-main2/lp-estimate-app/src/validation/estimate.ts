import { z } from 'zod';

import {
  basePackages,
  designIntensityMultipliers,
  options as tariffOptions,
} from '@/data/tariffs';
import type { BasePackageCode, DesignIntensity, OptionCode } from '@/data/tariffs';
import type { BudgetRange, ServerDomainStatus, SitePurpose } from '@/types/estimate';
import {
  INDUSTRY_OPTIONS,
  EMPLOYEE_SIZE_OPTIONS,
  PROJECT_PURPOSE_OPTIONS,
  SITE_TYPE_OPTIONS,
  PAGE_RANGE_OPTIONS,
  BRAND_IMAGE_OPTIONS,
  BRAND_VALUES_OPTIONS,
  BRAND_GOALS_OPTIONS,
  COMPETITOR_GOOD_OPTIONS,
  COMPETITOR_IMPROVE_OPTIONS,
  STRENGTH_OPTIONS,
  DESIGN_TONE_OPTIONS,
  COLOR_OPTIONS,
  BASIC_FEATURES_OPTIONS,
  ADVANCED_FEATURES_OPTIONS,
  CMS_OPTIONS,
  UPDATE_FREQUENCY_OPTIONS,
  SEO_IMPORTANCE_OPTIONS,
  CURRENT_MARKETING_OPTIONS,
  SNS_OPTIONS,
  GA4_STATUS_OPTIONS,
  DOMAIN_CHOICES,
  SERVER_CHOICES,
  SSL_CHOICES,
  DEVICES_CHOICES,
  MAINTENANCE_CHOICES,
  BACKUP_CHOICES,
  SECURITY_IMPORTANCE_OPTIONS,
  APPROVAL_FLOW_OPTIONS,
  PRIORITY_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  SERVER_DOMAIN_OPTIONS,
  WIREFRAME_OPTIONS,
} from '@/data/form-options';

const SITE_PURPOSE_VALUES_LOCAL = basePackages.map((pkg) => pkg.name as SitePurpose);
const sitePurposeEnum = z.enum(SITE_PURPOSE_VALUES_LOCAL as [SitePurpose, ...SitePurpose[]]);
const budgetEnum = z.enum([...BUDGET_RANGE_OPTIONS] as unknown as [BudgetRange, ...BudgetRange[]]);
const serverDomainEnum = z.enum([...SERVER_DOMAIN_OPTIONS] as unknown as [ServerDomainStatus, ...ServerDomainStatus[]]);

const basePackageEnum = z.enum(basePackages.map((pkg) => pkg.code) as [BasePackageCode, ...BasePackageCode[]]);
const designIntensityEnum = z.enum(
  Object.keys(designIntensityMultipliers) as [DesignIntensity, ...DesignIntensity[]],
);
const optionEnum = z.enum(tariffOptions.map((option) => option.code) as [OptionCode, ...OptionCode[]]);

export const estimateSchema = z.object({
  projectName: z
    .string()
    .max(60, { message: '案件名は60文字以内で入力してください。' })
    .optional()
    .or(z.literal('')),
  clientName: z
    .string()
    .max(60, { message: 'クライアント名は60文字以内です。' })
    .optional()
    .or(z.literal('')),
  contactEmail: z
    .string()
    .email({ message: 'メールアドレスの形式が正しくありません。' })
    .optional()
    .or(z.literal('')),
  sitePurpose: z
    .array(sitePurposeEnum, { message: '目的を選択してください。' })
    .max(4, { message: '目的は最大4つまでです。' })
    .optional()
    .default([]),
  serviceOverview: z
    .string()
    .max(500, { message: 'サービス概要は500文字以内で入力してください。' })
    .optional()
    .or(z.literal('')),
  targetAudience: z
    .string()
    .max(300, { message: 'ターゲット像は300文字以内で入力してください。' })
    .optional()
    .or(z.literal('')),
  launchDate: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: '公開希望日は本日以降の日付を選択してください。' },
    )
    .or(z.literal('')),
  budgetRange: budgetEnum.optional(),
  serverDomain: serverDomainEnum.optional(),
  assetsProvided: z.array(z.string()).max(4),

  basePackage: basePackageEnum,
  projectType: z.enum(['new', 'renewal']).optional(),
  pageCount: z
    .number({ message: 'ページ数は数値で入力してください。' })
    .min(1, { message: 'ページ数は1以上で入力してください。' })
    .max(50, { message: 'ページ数は50ページ以内で入力してください。' }),
  designIntensity: designIntensityEnum,
  multilingualCount: z
    .number({ message: '多言語対応数は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .max(6, { message: '最大6言語まで対応可能です。' }),
  wireframeType: z.enum(WIREFRAME_OPTIONS as unknown as [string, ...string[]]).optional(),
  homepageBasePrice: z
    .number({ message: 'ホームページの料金は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .optional(),
  homepageIncludedPages: z
    .number({ message: 'ホームページの基本想定ページ数は数値で入力してください。' })
    .min(1, { message: '1ページ以上を入力してください。' })
    .max(50, { message: '50ページ以内で入力してください。' })
    .optional(),
  recruitmentBasePrice: z
    .number({ message: '採用サイトの料金は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .optional(),
  recruitmentIncludedPages: z
    .number({ message: '採用サイトの基本想定ページ数は数値で入力してください。' })
    .min(1, { message: '1ページ以上を入力してください。' })
    .max(50, { message: '50ページ以内で入力してください。' })
    .optional(),
  landingBasePrice: z
    .number({ message: 'ランディングページの料金は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .optional(),
  landingIncludedPages: z
    .number({ message: 'ランディングページの基本想定ページ数は数値で入力してください。' })
    .min(1, { message: '1ページ以上を入力してください。' })
    .max(50, { message: '50ページ以内で入力してください。' })
    .optional(),
  ecommerceBasePrice: z
    .number({ message: 'ECサイトの料金は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .optional(),
  ecommerceIncludedPages: z
    .number({ message: 'ECサイトの基本想定ページ数は数値で入力してください。' })
    .min(1, { message: '1ページ以上を入力してください。' })
    .max(50, { message: '50ページ以内で入力してください。' })
    .optional(),
  ownedMediaBasePrice: z
    .number({ message: 'オウンドメディアの料金は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .optional(),
  ownedMediaIncludedPages: z
    .number({ message: 'オウンドメディアの基本想定ページ数は数値で入力してください。' })
    .min(1, { message: '1ページ以上を入力してください。' })
    .max(50, { message: '50ページ以内で入力してください。' })
    .optional(),

  selectedOptions: z.array(optionEnum).max(tariffOptions.length),
  maintenance: z.enum(['なし']).optional(),
  notes: z.string().max(500).optional().or(z.literal('')),
  includeTax: z.boolean(),

  // KPI/目的（拡充）
  kpiType: z.enum(['問い合わせ', '資料請求', '応募', '購入', 'その他']).optional(),
  kpiMainGoal: z
    .string()
    .max(140, { message: '目的（成功の状態）は140文字以内で入力してください。' })
    .optional()
    .or(z.literal('')),
  kpiMonthlyTarget: z
    .number({ invalid_type_error: '月間目標値は数値で入力してください。' })
    .min(0, { message: '0以上を入力してください。' })
    .optional(),

  // 準備度（拡充）
  contentReadiness: z
    .object({
      copyReady: z.boolean(),
      imagesReady: z.boolean(),
    })
    .optional(),

  // ブランド/法務（拡充）
  brandGuideline: z.boolean().optional(),
  legal: z
    .object({
      hasPrivacy: z.boolean(),
      hasCookie: z.boolean(),
      hasTerms: z.boolean(),
    })
    .optional(),

  // ここから追加の選択群（すべて任意）
  industry: z.enum(INDUSTRY_OPTIONS as unknown as [string, ...string[]]).optional(),
  employeeSize: z.enum(EMPLOYEE_SIZE_OPTIONS as unknown as [string, ...string[]]).optional(),
  projectPurposes: z
    .array(z.enum(PROJECT_PURPOSE_OPTIONS as unknown as [string, ...string[]]))
    .max(PROJECT_PURPOSE_OPTIONS.length)
    .optional(),
  siteType: z.enum(SITE_TYPE_OPTIONS as unknown as [string, ...string[]]).default('ランディングページ'),
  pageRange: z.enum(PAGE_RANGE_OPTIONS as unknown as [string, ...string[]]).optional(),
  brandImage: z.enum(BRAND_IMAGE_OPTIONS as unknown as [string, ...string[]]).optional(),
  brandValues: z
    .array(z.enum(BRAND_VALUES_OPTIONS as unknown as [string, ...string[]]))
    .max(BRAND_VALUES_OPTIONS.length)
    .optional(),
  brandGoals: z
    .array(z.enum(BRAND_GOALS_OPTIONS as unknown as [string, ...string[]]))
    .max(BRAND_GOALS_OPTIONS.length)
    .optional(),
  competitorGood: z
    .array(z.enum(COMPETITOR_GOOD_OPTIONS as unknown as [string, ...string[]]))
    .max(COMPETITOR_GOOD_OPTIONS.length)
    .optional(),
  competitorImprove: z
    .array(z.enum(COMPETITOR_IMPROVE_OPTIONS as unknown as [string, ...string[]]))
    .max(COMPETITOR_IMPROVE_OPTIONS.length)
    .optional(),
  strengths: z
    .array(z.enum(STRENGTH_OPTIONS as unknown as [string, ...string[]]))
    .max(STRENGTH_OPTIONS.length)
    .optional(),
  designTones: z
    .array(z.enum(DESIGN_TONE_OPTIONS as unknown as [string, ...string[]]))
    .max(DESIGN_TONE_OPTIONS.length)
    .optional(),
  colorPreferences: z
    .array(z.enum(COLOR_OPTIONS as unknown as [string, ...string[]]))
    .max(COLOR_OPTIONS.length)
    .optional(),
  basicFeatures: z
    .array(z.enum(BASIC_FEATURES_OPTIONS as unknown as [string, ...string[]]))
    .max(BASIC_FEATURES_OPTIONS.length)
    .optional(),
  advancedFeatures: z
    .array(z.enum(ADVANCED_FEATURES_OPTIONS as unknown as [string, ...string[]]))
    .max(ADVANCED_FEATURES_OPTIONS.length)
    .optional(),
  cmsPreference: z.enum(CMS_OPTIONS as unknown as [string, ...string[]]).optional(),
  updateFrequency: z.enum(UPDATE_FREQUENCY_OPTIONS as unknown as [string, ...string[]]).optional(),
  seoImportance: z.enum(SEO_IMPORTANCE_OPTIONS as unknown as [string, ...string[]]).optional(),
  currentMarketing: z
    .array(z.enum(CURRENT_MARKETING_OPTIONS as unknown as [string, ...string[]]))
    .max(CURRENT_MARKETING_OPTIONS.length)
    .optional(),
  snsLinks: z
    .array(z.enum(SNS_OPTIONS as unknown as [string, ...string[]]))
    .max(SNS_OPTIONS.length)
    .optional(),
  ga4Status: z.enum(GA4_STATUS_OPTIONS as unknown as [string, ...string[]]).optional(),
  domainChoice: z.enum(DOMAIN_CHOICES as unknown as [string, ...string[]]).optional(),
  serverChoice: z.enum(SERVER_CHOICES as unknown as [string, ...string[]]).optional(),
  sslChoice: z.enum(SSL_CHOICES as unknown as [string, ...string[]]).optional(),
  devices: z
    .array(z.enum(DEVICES_CHOICES as unknown as [string, ...string[]]))
    .max(DEVICES_CHOICES.length)
    .optional(),
  maintenanceChoice: z.enum(MAINTENANCE_CHOICES as unknown as [string, ...string[]]).optional(),
  backupChoice: z.enum(BACKUP_CHOICES as unknown as [string, ...string[]]).optional(),
  securityImportance: z
    .enum(SECURITY_IMPORTANCE_OPTIONS as unknown as [string, ...string[]])
    .optional(),
  approvalFlow: z.enum(APPROVAL_FLOW_OPTIONS as unknown as [string, ...string[]]).optional(),
  priority: z
    .array(z.enum(PRIORITY_OPTIONS as unknown as [string, ...string[]]))
    .max(PRIORITY_OPTIONS.length)
    .optional(),

  // 新規追加フィールド（すべてオプショナル）
  companyName: z.string().optional(),
  contactPersonName: z.string().optional(),
  contactPosition: z.string().optional(),
  contactPhone: z.string().optional(),
  location: z.string().optional(),
  industryOther: z.string().optional(),
  projectPurpose: z.array(z.string()).optional(),
  projectPurposeOther: z.string().optional(),
  pageStructureRequest: z.string().optional(),
  targetGender: z.string().optional(),
  targetAgeGroups: z.array(z.string()).optional(),
  targetCharacteristics: z.string().optional(),
  competitorUrl: z.string().url().optional().or(z.literal('')),
  competitorGoodPoints: z.array(z.string()).optional(),
  competitorGoodDetails: z.string().optional(),
  competitorImprovePoints: z.array(z.string()).optional(),
  competitorImproveDetails: z.string().optional(),
  companyStrengths: z.array(z.string()).optional(),
  companyStrengthsDetails: z.string().optional(),
  differentiationIdeas: z.array(z.string()).optional(),
  differentiationDetails: z.string().optional(),
  budgetDetail: z.string().optional(),
  budgetNote: z.string().optional(),
  deadline: z.string().optional(),
  deadlineSpecific: z.string().optional(),
  existingSite: z.string().optional(),
  existingSiteUrl: z.string().url().optional().or(z.literal('')),
  currentSiteIssues: z.array(z.string()).optional(),
  currentSiteIssuesOther: z.string().optional(),
  monthlyVisitCount: z.string().optional(),
  referenceSiteReason: z.string().optional(),
  avoidSiteReason: z.string().optional(),
  mainColor: z.string().optional(),
  mainColorOther: z.string().optional(),
  logoProvided: z.string().optional(),
  photoMaterials: z.array(z.string()).optional(),
  photoMaterialsDetails: z.string().optional(),
  photoShortageHandling: z.string().optional(),
  cmsChoice: z.string().optional(),
  updateStyle: z.string().optional(),
  targetKeywords: z.string().optional(),
  snsIntegration: z.array(z.string()).optional(),
  domainExisting: z.string().optional(),
  devicesSupported: z.array(z.string()).optional(),
  maintenanceContract: z.string().optional(),
  approvalFlowDetails: z.string().optional(),
  pastWebExperience: z.string().optional(),
  pastWebExperienceDetails: z.string().optional(),
  priorities: z.array(z.string()).optional(),
  otherRequests: z.string().optional(),
  feedback: z.string().optional(),
});

export type EstimateSchema = typeof estimateSchema;

// SSOT: EstimateFormValuesはスキーマから生成
export type EstimateFormValues = z.infer<typeof estimateSchema>;
