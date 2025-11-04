"use client";

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  INDUSTRY_OPTIONS,
  EMPLOYEE_SIZE_OPTIONS,
  PROJECT_PURPOSE_OPTIONS,
  GENDER_OPTIONS,
  AGE_GROUP_OPTIONS,
  BRAND_IMAGE_OPTIONS,
  BRAND_VALUES_OPTIONS,
  BRAND_GOALS_OPTIONS,
  COMPETITOR_GOOD_OPTIONS,
  COMPETITOR_IMPROVE_OPTIONS,
  STRENGTH_OPTIONS,
  COLOR_OPTIONS,
  BUDGET_DETAIL_OPTIONS,
  DEADLINE_OPTIONS,
  EXISTING_SITE_OPTIONS,
  CURRENT_SITE_ISSUES_OPTIONS,
  MONTHLY_VISIT_OPTIONS,
  LOGO_PROVIDED_OPTIONS,
  PHOTO_MATERIAL_OPTIONS,
  PHOTO_SHORTAGE_OPTIONS,
  BASIC_FEATURES_OPTIONS,
  ADVANCED_FEATURES_OPTIONS,
  CMS_OPTIONS,
  UPDATE_STYLE_OPTIONS,
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
  PAST_EXPERIENCE_OPTIONS,
} from '@/data/form-options';
import type { EstimateFormValues } from '@/types/estimate';
import { FormError } from '@/components/ui/form-error';
import clsx from 'clsx';

// アコーディオンセクションコンポーネント
type AccordionSectionProps = {
  id: string;
  number: number;
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isRequired?: boolean;
  completionRate?: number; // 0-100
};

const AccordionSection = ({
  id,
  number,
  title,
  description,
  isExpanded,
  onToggle,
  children,
  isRequired = false,
  completionRate = 0,
}: AccordionSectionProps) => {
  const isCompleted = completionRate >= 100;
  const isPartiallyCompleted = completionRate > 0 && completionRate < 100;

  return (
    <section
      id={id}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
      >
        <div className="flex items-start gap-4 flex-1">
          <div
            className={clsx(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 font-bold text-sm transition-colors',
              isCompleted
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : isPartiallyCompleted
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : isRequired
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-slate-300 bg-slate-50 text-slate-600',
            )}
          >
            {isCompleted ? '✓' : number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              {isRequired && (
                <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                  必須
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
            {isPartiallyCompleted && (
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600">{Math.round(completionRate)}%</span>
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <svg
            className={clsx(
              'h-6 w-6 text-slate-400 transition-transform duration-200',
              isExpanded && 'rotate-180',
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="border-t border-slate-100 bg-slate-50/50 p-6">{children}</div>
      </div>
    </section>
  );
};

export const BasicInfoStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EstimateFormValues>();

  // アコーディオンの展開状態を管理（必須セクションはデフォルトで展開）
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['basic-info', 'project-overview']), // 必須セクションは初期展開
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
    }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(
      new Set([
        'basic-info',
        'project-overview',
        'brand',
        'competitor',
        'budget',
        'current-site',
        'design',
        'features',
        'seo',
        'tech',
        'maintenance',
        'project-management',
      ]),
    );
  };

  const collapseAll = () => {
    setExpandedSections(new Set(['basic-info', 'project-overview'])); // 必須セクションのみ展開
  };

  // セクションの完了率を計算する関数
  const calculateCompletion = (sectionId: string): number => {
    const values = watch();
    switch (sectionId) {
      case 'basic-info':
        const basicFields = ['companyName', 'contactPersonName', 'contactPhone'];
        const basicFilled = basicFields.filter((f) => values[f as keyof EstimateFormValues]).length;
        return (basicFilled / basicFields.length) * 100;
      case 'project-overview':
        const projectValue = values['projectPurpose'];
        return projectValue && Array.isArray(projectValue) && projectValue.length > 0 ? 100 : 0;
      case 'brand':
        const brandFields = ['brandImage', 'brandValues', 'brandGoals'];
        const brandFilled = brandFields.filter((f) => {
          const val = values[f as keyof EstimateFormValues];
          if (Array.isArray(val)) return val.length > 0;
          return !!val;
        }).length;
        return (brandFilled / brandFields.length) * 100;
      case 'competitor':
        const competitorFields = ['competitorGoodPoints', 'competitorImprovePoints', 'companyStrengths'];
        const competitorFilled = competitorFields.filter((f) => {
          const val = values[f as keyof EstimateFormValues];
          if (Array.isArray(val)) return val.length > 0;
          return !!val;
        }).length;
        return (competitorFilled / competitorFields.length) * 100;
      case 'budget':
        const budgetFields = ['budgetDetail', 'deadline'];
        const budgetFilled = budgetFields.filter((f) => values[f as keyof EstimateFormValues]).length;
        return (budgetFilled / budgetFields.length) * 100;
      case 'current-site':
        const siteValue = values['existingSite'];
        return siteValue ? 100 : 0;
      case 'design':
        const designFields = ['mainColor', 'logoProvided'];
        const designFilled = designFields.filter((f) => values[f as keyof EstimateFormValues]).length;
        return (designFilled / designFields.length) * 100;
      case 'features':
        const featuresFields = ['basicFeatures', 'cmsChoice'];
        const featuresFilled = featuresFields.filter((f) => {
          const val = values[f as keyof EstimateFormValues];
          if (Array.isArray(val)) return val.length > 0;
          return !!val;
        }).length;
        return (featuresFilled / featuresFields.length) * 100;
      case 'seo':
        const seoValue = values['seoImportance'];
        return seoValue ? 100 : 0;
      case 'tech':
        const techFields = ['domainChoice', 'serverChoice'];
        const techFilled = techFields.filter((f) => values[f as keyof EstimateFormValues]).length;
        return (techFilled / techFields.length) * 100;
      case 'maintenance':
        const maintenanceValue = values['maintenanceContract'];
        return maintenanceValue ? 100 : 0;
      case 'project-management':
        const pmValue = values['approvalFlow'];
        return pmValue ? 100 : 0;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* グローバルコントロール */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">セクションをまとめて操作</p>
          <p className="mt-1 text-xs text-slate-500">全てのセクションを展開/折りたたみできます</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            全て展開
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40"
          >
            全て折りたたみ
          </button>
        </div>
      </div>
      {/* 1. 基本情報（詳細） */}
      <AccordionSection
        id="basic-info"
        number={1}
        title="基本情報（詳細）"
        description="より詳細な情報をお聞かせください。"
        isExpanded={expandedSections.has('basic-info')}
        onToggle={() => toggleSection('basic-info')}
        isRequired={true}
        completionRate={calculateCompletion('basic-info')}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              会社名
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="例: 株式会社サンプル"
              {...register('companyName')}
            />
            <FormError message={errors.companyName?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              ご担当者名
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="例: 山田太郎"
              {...register('contactPersonName')}
            />
            <FormError message={errors.contactPersonName?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">役職・部署</label>
            <input
              type="text"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="例: マーケティング部長"
              {...register('contactPosition')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">担当者メール</label>
            <input
              type="email"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="name@example.com"
              {...register('contactEmail')}
            />
            <FormError message={errors.contactEmail?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">公開希望日</label>
            <input
              type="date"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('launchDate')}
            />
            <FormError message={errors.launchDate?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              電話番号
            </label>
            <input
              type="tel"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="例: 03-1234-5678"
              {...register('contactPhone')}
            />
            <FormError message={errors.contactPhone?.message} />
        </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">所在地</label>
            <input
              type="text"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="例: 東京都渋谷区..."
              {...register('location')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">業種・業態</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('industry')}
            >
              <option value="">選択してください</option>
              {INDUSTRY_OPTIONS.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {watch('industry') === 'その他' && (
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="具体的にご記入ください"
                {...register('industryOther')}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">従業員数</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('employeeSize')}
            >
              <option value="">選択してください</option>
              {EMPLOYEE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </AccordionSection>

      {/* 2. プロジェクト概要（詳細） */}
      <AccordionSection
        id="project-overview"
        number={2}
        title="プロジェクト概要（詳細）"
        description="ウェブサイト制作の目的とターゲットをより詳しくお聞かせください。"
        isExpanded={expandedSections.has('project-overview')}
        onToggle={() => toggleSection('project-overview')}
        isRequired={true}
        completionRate={calculateCompletion('project-overview')}
      >
        <div className="space-y-6">
          <div>
          <label className="block text-sm font-medium text-slate-700">
            ウェブサイト制作の目的（複数選択可）
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PROJECT_PURPOSE_OPTIONS.map((purpose) => {
              const selectedPurposes = watch('projectPurpose') ?? [];
              const active = selectedPurposes.includes(purpose);
            return (
              <button
                  key={purpose}
                type="button"
                  onClick={() => {
                    const exists = selectedPurposes.includes(purpose);
                    const next = exists
                      ? selectedPurposes.filter((p) => p !== purpose)
                      : [...selectedPurposes, purpose];
                    setValue('projectPurpose', next, { shouldDirty: true, shouldValidate: true });
                  }}
                className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                )}
              >
                  {purpose}
              </button>
            );
          })}
        </div>
          {(watch('projectPurpose') ?? []).includes('その他') && (
            <textarea
              rows={2}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="その他の目的があれば具体的にご記入ください"
              {...register('projectPurposeOther')}
            />
          )}
          </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">ページ構成についてのご要望</label>
          <textarea
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="例：トップ、会社概要、サービス紹介、お問い合わせ等"
            {...register('pageStructureRequest')}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">メインターゲットの性別</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('targetGender')}
            >
              <option value="">選択してください</option>
              {GENDER_OPTIONS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">メインターゲットの年齢層（複数選択可）</label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {AGE_GROUP_OPTIONS.map((age) => {
                const selectedAges = watch('targetAgeGroups') ?? [];
                const active = selectedAges.includes(age);
                return (
                  <button
                    key={age}
                    type="button"
                    onClick={() => {
                      const exists = selectedAges.includes(age);
                      const next = exists ? selectedAges.filter((a) => a !== age) : [...selectedAges, age];
                      setValue('targetAgeGroups', next, { shouldDirty: true, shouldValidate: true });
                    }}
                    className={clsx(
                      'rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                      active
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                    )}
                  >
                    {age}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">ターゲットユーザーの特徴・属性</label>
          <textarea
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="職業、年収、興味関心、行動特性など"
            {...register('targetCharacteristics')}
          />
        </div>
        </div>
      </AccordionSection>

      {/* 3. ブランドイメージ・ポジショニング */}
      <AccordionSection
        id="brand"
        number={3}
        title="ブランドイメージ・ポジショニング"
        description="御社のブランドについてお聞かせください。"
        isExpanded={expandedSections.has('brand')}
        onToggle={() => toggleSection('brand')}
        isRequired={true}
        completionRate={calculateCompletion('brand')}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">
            御社のブランドを一言で表すとしたら？（1つだけ選択）
            </label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('brandImage')}
          >
            <option value="">選択してください</option>
            {BRAND_IMAGE_OPTIONS.map((image, idx) => (
              <option key={image} value={image}>
                {String.fromCharCode(65 + idx)}. {image}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            御社のブランドが大切にしている価値観は何ですか？（複数選択可）
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {BRAND_VALUES_OPTIONS.map((value, idx) => {
              const selectedValues = watch('brandValues') ?? [];
              const active = selectedValues.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    const exists = selectedValues.includes(value);
                    const next = exists ? selectedValues.filter((v) => v !== value) : [...selectedValues, value];
                    setValue('brandValues', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {String.fromCharCode(65 + idx)}. {value}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            御社のブランドが目指しているのは？（複数選択可）
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {BRAND_GOALS_OPTIONS.map((goal, idx) => {
              const selectedGoals = watch('brandGoals') ?? [];
              const active = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => {
                    const exists = selectedGoals.includes(goal);
                    const next = exists ? selectedGoals.filter((g) => g !== goal) : [...selectedGoals, goal];
                    setValue('brandGoals', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {String.fromCharCode(65 + idx)}. {goal}
                </button>
              );
            }            )}
          </div>
        </div>
        </div>
      </AccordionSection>

      {/* 4. 競合分析・差別化戦略 */}
      <AccordionSection
        id="competitor"
        number={4}
        title="競合分析・差別化戦略"
        description="競合他社との比較と、御社の強みを整理しましょう。"
        isExpanded={expandedSections.has('competitor')}
        onToggle={() => toggleSection('competitor')}
        isRequired={true}
        completionRate={calculateCompletion('competitor')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">競合他社のウェブサイトの良いところ（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {COMPETITOR_GOOD_OPTIONS.map((point) => {
              const selectedPoints = watch('competitorGoodPoints') ?? [];
              const active = selectedPoints.includes(point);
              return (
                <button
                  key={point}
                  type="button"
                  onClick={() => {
                    const exists = selectedPoints.includes(point);
                    const next = exists
                      ? selectedPoints.filter((p) => p !== point)
                      : [...selectedPoints, point];
                    setValue('competitorGoodPoints', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {point}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">具体的な競合サイトのURLや詳細</label>
            <textarea
            rows={2}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="競合サイトのURLや詳細があれば記入してください"
            {...register('competitorGoodDetails')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">競合他社のウェブサイトの改善点（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {COMPETITOR_IMPROVE_OPTIONS.map((point) => {
              const selectedPoints = watch('competitorImprovePoints') ?? [];
              const active = selectedPoints.includes(point);
              return (
                <button
                  key={point}
                  type="button"
                  onClick={() => {
                    const exists = selectedPoints.includes(point);
                    const next = exists
                      ? selectedPoints.filter((p) => p !== point)
                      : [...selectedPoints, point];
                    setValue('competitorImprovePoints', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {point}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">改善点の詳細</label>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="改善点の詳細について記入してください"
            {...register('competitorImproveDetails')}
          />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
            競合他社のサービスと比べて、御社のサービスの違いや強みは何ですか？（複数選択可）
            </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {STRENGTH_OPTIONS.map((strength) => {
              const selectedStrengths = watch('companyStrengths') ?? [];
              const active = selectedStrengths.includes(strength);
              return (
                <button
                  key={strength}
                  type="button"
                  onClick={() => {
                    const exists = selectedStrengths.includes(strength);
                    const next = exists
                      ? selectedStrengths.filter((s) => s !== strength)
                      : [...selectedStrengths, strength];
                    setValue('companyStrengths', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {strength}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">御社の強みについて詳しく教えてください</label>
            <textarea
            rows={3}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="強みについて詳しく記入してください"
            {...register('companyStrengthsDetails')}
            />
          </div>
        </div>
      </AccordionSection>

      {/* 5. 予算・スケジュール（詳細） */}
      <AccordionSection
        id="budget"
        number={5}
        title="予算・スケジュール（詳細）"
        description="予算と納期について詳しくお聞かせください。"
        isExpanded={expandedSections.has('budget')}
        onToggle={() => toggleSection('budget')}
        isRequired={true}
        completionRate={calculateCompletion('budget')}
      >
        <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">ご予算</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('budgetDetail')}
            >
              <option value="">選択してください</option>
              {BUDGET_DETAIL_OPTIONS.map((detail) => (
                <option key={detail} value={detail}>
                  {detail}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">希望納期</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('deadline')}
            >
              <option value="">選択してください</option>
              {DEADLINE_OPTIONS.map((deadline) => (
                <option key={deadline} value={deadline}>
                  {deadline}
                </option>
              ))}
            </select>
            <FormError message={errors.deadline?.message} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">予算に関する補足事項</label>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="例：分割払い希望、段階的な制作等"
            {...register('budgetNote')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">具体的な希望日</label>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="具体的な希望日がある場合はご記入ください"
            {...register('deadlineSpecific')}
          />
        </div>
        </div>
      </AccordionSection>

      {/* 6. 現在のウェブサイト状況 */}
      <AccordionSection
        id="current-site"
        number={6}
        title="現在のウェブサイト状況"
        description="既存サイトがある場合、現状をお聞かせください。"
        isExpanded={expandedSections.has('current-site')}
        onToggle={() => toggleSection('current-site')}
        isRequired={true}
        completionRate={calculateCompletion('current-site')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">既存ウェブサイトの有無</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {EXISTING_SITE_OPTIONS.map((option) => {
              const selected = watch('existingSite') === option;
              return (
                <label
                  key={option}
                  className={clsx(
                    'flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500/40',
                    selected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  <span>{option}</span>
                  <input
                    type="radio"
                    className="sr-only"
                    value={option}
                    {...register('existingSite')}
                  />
            </label>
              );
            })}
          </div>
        </div>
        {watch('existingSite') === 'あり' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700">既存サイトのURL</label>
              <input
                type="url"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="https://"
                {...register('existingSiteUrl')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">現在のサイトの問題点（複数選択可）</label>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {CURRENT_SITE_ISSUES_OPTIONS.map((issue) => {
                  const selectedIssues = watch('currentSiteIssues') ?? [];
                  const active = selectedIssues.includes(issue);
                  return (
                    <button
                      key={issue}
                      type="button"
                      onClick={() => {
                        const exists = selectedIssues.includes(issue);
                        const next = exists
                          ? selectedIssues.filter((i) => i !== issue)
                          : [...selectedIssues, issue];
                        setValue('currentSiteIssues', next, { shouldDirty: true, shouldValidate: true });
                      }}
                      className={clsx(
                        'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                        active
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                      )}
                    >
                      {issue}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">その他の問題点</label>
              <textarea
                rows={2}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="その他の問題点があれば具体的にご記入ください"
                {...register('currentSiteIssuesOther')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">月間アクセス数（概算）</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                {...register('monthlyVisitCount')}
              >
                <option value="">選択してください</option>
                {MONTHLY_VISIT_OPTIONS.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        </div>
      </AccordionSection>

      {/* 7. デザイン要望・参考サイト */}
      <AccordionSection
        id="design"
        number={7}
        title="デザイン要望・参考サイト"
        description="参考にしたいサイトや、避けたいデザインをお聞かせください。"
        isExpanded={expandedSections.has('design')}
        onToggle={() => toggleSection('design')}
        isRequired={true}
        completionRate={calculateCompletion('design')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">参考サイトについて</label>
          <p className="mt-1 text-xs text-slate-500">
            デザインテイスト、レイアウト、機能面で「こんな感じにしたい」と思うサイトがあれば教えてください。
          </p>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="参考サイトのURLとその理由（「このデザインが好き」「この機能を入れたい」など）をご記入ください"
            {...register('referenceSiteReason')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">避けたいサイトデザイン</label>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="「こんなデザインは避けたい」というサイトがあれば、URLとその理由を教えてください"
            {...register('avoidSiteReason')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">希望するメインカラー</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('mainColor')}
          >
            <option value="">選択してください</option>
            {COLOR_OPTIONS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">具体的な色指定</label>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="例：コーポレートカラー"
            {...register('mainColorOther')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">ロゴデータの提供</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('logoProvided')}
          >
            <option value="">選択してください</option>
            {LOGO_PROVIDED_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">写真・画像素材の提供（複数選択可）</label>
          <p className="mt-1 text-xs text-slate-500">
            高品質な写真や画像は、ウェブサイトの印象を大きく左右します。商品写真、スタッフ写真、会社の様子などをご用意いただけると、より魅力的なサイトに仕上がります。
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PHOTO_MATERIAL_OPTIONS.map((material) => {
              const selectedMaterials = watch('photoMaterials') ?? [];
              const active = selectedMaterials.includes(material);
              return (
                <button
                  key={material}
                  type="button"
                  onClick={() => {
                    const exists = selectedMaterials.includes(material);
                    const next = exists
                      ? selectedMaterials.filter((m) => m !== material)
                      : [...selectedMaterials, material];
                    setValue('photoMaterials', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {material}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">お持ちの素材について詳しく教えてください</label>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="形式、数量、撮影時期など"
            {...register('photoMaterialsDetails')}
          />
        </div>
        {(watch('photoMaterials') ?? []).includes('素材の提供は難しい') && (
          <div>
            <label className="block text-sm font-medium text-slate-700">素材が不足している場合</label>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register('photoShortageHandling')}
            >
              <option value="">選択してください</option>
              {PHOTO_SHORTAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        </div>
      </AccordionSection>

      {/* 8. 機能要件 */}
      <AccordionSection
        id="features"
        number={8}
        title="機能要件"
        description="必要な機能やCMSの希望をお聞かせください。"
        isExpanded={expandedSections.has('features')}
        onToggle={() => toggleSection('features')}
        isRequired={true}
        completionRate={calculateCompletion('features')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">必要な基本機能（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {BASIC_FEATURES_OPTIONS.map((feature) => {
              const selectedFeatures = watch('basicFeatures') ?? [];
              const active = selectedFeatures.includes(feature);
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => {
                    const exists = selectedFeatures.includes(feature);
                    const next = exists
                      ? selectedFeatures.filter((f) => f !== feature)
                      : [...selectedFeatures, feature];
                    setValue('basicFeatures', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {feature}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">高度な機能（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {ADVANCED_FEATURES_OPTIONS.map((feature) => {
              const selectedFeatures = watch('advancedFeatures') ?? [];
              const active = selectedFeatures.includes(feature);
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => {
                    const exists = selectedFeatures.includes(feature);
                    const next = exists
                      ? selectedFeatures.filter((f) => f !== feature)
                      : [...selectedFeatures, feature];
                    setValue('advancedFeatures', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {feature}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">CMS（コンテンツ管理システム）の希望</label>
          <p className="mt-1 text-xs text-slate-500">
            CMSとは？ウェブサイトの文章や画像を、専門知識がなくても簡単に更新・編集できるシステムのことです。
            <br />
            <span className="font-semibold">WordPress（ワードプレス）</span>は最も一般的なCMSで、ブログのように記事やページを簡単に更新できます。
            <br />
            <span className="font-semibold">Headless CMS</span>は最新技術を使った管理画面で更新できるシステムです（月額費用あり）。
          </p>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('cmsChoice')}
          >
            <option value="">選択してください</option>
            {CMS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">更新方法について</label>
          <p className="mt-1 text-xs text-slate-500">
            <span className="font-semibold">CMS導入（WordPressなど）</span>を選択した場合は、お客様側での簡単更新が可能です。
            <br />
            <span className="font-semibold">静的サイト（CMS不要）</span>の場合は、更新はすべて弊社にご依頼いただく形となります（最も高速・安全）。
          </p>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('updateStyle')}
          >
            <option value="">選択してください</option>
            {UPDATE_STYLE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        </div>
      </AccordionSection>

      {/* 9. SEO・マーケティング要件 */}
      <AccordionSection
        id="seo"
        number={9}
        title="SEO・マーケティング要件"
        description="SEOとは？Search Engine Optimization（検索エンジン最適化）の略で、GoogleやYahooなどの検索結果で上位に表示されやすくする対策のことです。"
        isExpanded={expandedSections.has('seo')}
        onToggle={() => toggleSection('seo')}
        isRequired={true}
        completionRate={calculateCompletion('seo')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">SEO対策の重要度</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('seoImportance')}
          >
            <option value="">選択してください</option>
            {SEO_IMPORTANCE_OPTIONS.map((importance) => (
              <option key={importance} value={importance}>
                {importance}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">狙いたいキーワード</label>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="例：地域名 + 業種名"
            {...register('targetKeywords')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">現在実施中のマーケティング施策（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CURRENT_MARKETING_OPTIONS.map((marketing) => {
              const selectedMarketings = watch('currentMarketing') ?? [];
              const active = selectedMarketings.includes(marketing);
              return (
                <button
                  key={marketing}
                  type="button"
                  onClick={() => {
                    const exists = selectedMarketings.includes(marketing);
                    const next = exists
                      ? selectedMarketings.filter((m) => m !== marketing)
                      : [...selectedMarketings, marketing];
                    setValue('currentMarketing', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {marketing}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">SNS連携の希望（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SNS_OPTIONS.map((sns) => {
              const selectedSns = watch('snsIntegration') ?? [];
              const active = selectedSns.includes(sns);
              return (
                <button
                  key={sns}
                  type="button"
                  onClick={() => {
                    const exists = selectedSns.includes(sns);
                    const next = exists ? selectedSns.filter((s) => s !== sns) : [...selectedSns, sns];
                    setValue('snsIntegration', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {sns}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Googleアナリティクス・サーチコンソールの導入</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('ga4Status')}
          >
            <option value="">選択してください</option>
            {GA4_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </AccordionSection>

      {/* 10. 技術・インフラ要件 */}
      <AccordionSection
        id="tech"
        number={10}
        title="技術・インフラ要件"
        description="ドメインやサーバーなどの技術的な要件をお聞かせください。"
        isExpanded={expandedSections.has('tech')}
        onToggle={() => toggleSection('tech')}
        isRequired={true}
        completionRate={calculateCompletion('tech')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">ドメインについて</label>
          <p className="mt-1 text-xs text-slate-500">
            ドメインとは？ウェブサイトのアドレス（URL）のことで、「example.com」のような形式です。
          </p>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('domainChoice')}
          >
            <option value="">選択してください</option>
            {DOMAIN_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
          {watch('domainChoice') === '既存ドメインを使用' && (
            <input
              type="text"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="既存ドメインがある場合は記入してください"
              {...register('domainExisting')}
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">サーバーについて</label>
          <p className="mt-1 text-xs text-slate-500">
            サーバーとは？ウェブサイトのデータを保存して、インターネット上に公開するためのコンピューターのことです。
          </p>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('serverChoice')}
          >
            <option value="">選択してください</option>
            {SERVER_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">SSL証明書の導入</label>
          <p className="mt-1 text-xs text-slate-500">
            SSL証明書とは？ウェブサイトの通信を暗号化して安全にするためのもので、URLが「https://」で始まります。
          </p>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('sslChoice')}
          >
            <option value="">選択してください</option>
            {SSL_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">対応デバイス（複数選択可）</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {DEVICES_CHOICES.map((device) => {
              const selectedDevices = watch('devicesSupported') ?? [];
              const active = selectedDevices.includes(device);
              return (
                <button
                  key={device}
                  type="button"
                  onClick={() => {
                    const exists = selectedDevices.includes(device);
                    const next = exists
                      ? selectedDevices.filter((d) => d !== device)
                      : [...selectedDevices, device];
                    setValue('devicesSupported', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {device}
                </button>
              );
            })}
          </div>
        </div>
        </div>
      </AccordionSection>

      {/* 11. 保守・運用について */}
      <AccordionSection
        id="maintenance"
        number={11}
        title="保守・運用について"
        description="ウェブサイト公開後の継続的なサポートに関するご希望をお聞かせください。"
        isExpanded={expandedSections.has('maintenance')}
        onToggle={() => toggleSection('maintenance')}
        isRequired={true}
        completionRate={calculateCompletion('maintenance')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">契約形態のご希望</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('maintenanceContract')}
          >
            <option value="">選択してください</option>
            {MAINTENANCE_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">バックアップの希望</label>
          <p className="mt-1 text-xs text-slate-500">
            バックアップとは？ウェブサイトのデータを別の場所に保存しておくことで、万が一の時にサイトを復旧できるようにする安全対策です。
          </p>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('backupChoice')}
          >
            <option value="">選択してください</option>
            {BACKUP_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">セキュリティ対策の重要度</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('securityImportance')}
          >
            <option value="">選択してください</option>
            {SECURITY_IMPORTANCE_OPTIONS.map((importance) => (
              <option key={importance} value={importance}>
                {importance}
              </option>
            ))}
          </select>
        </div>
        </div>
      </AccordionSection>

      {/* 12. プロジェクト進行・その他 */}
      <AccordionSection
        id="project-management"
        number={12}
        title="プロジェクト進行・その他"
        description="プロジェクトの進行についてお聞かせください。"
        isExpanded={expandedSections.has('project-management')}
        onToggle={() => toggleSection('project-management')}
        isRequired={true}
        completionRate={calculateCompletion('project-management')}
      >
        <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">決裁者・承認フロー</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('approvalFlow')}
          >
            <option value="">選択してください</option>
            {APPROVAL_FLOW_OPTIONS.map((flow) => (
              <option key={flow} value={flow}>
                {flow}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">承認プロセスについて詳しく教えてください</label>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="承認プロセスについて詳しく記入してください"
            {...register('approvalFlowDetails')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">過去のWEB制作会社様との取引経験</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            {...register('pastWebExperience')}
          >
            <option value="">選択してください</option>
            {PAST_EXPERIENCE_OPTIONS.map((experience) => (
              <option key={experience} value={experience}>
                {experience}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">過去の経験で良かった点・悪かった点</label>
          <textarea
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="過去の経験で良かった点・悪かった点があれば教えてください"
            {...register('pastWebExperienceDetails')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            弊社に期待すること・重視すること（複数選択可）
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PRIORITY_OPTIONS.map((priority) => {
              const selectedPriorities = watch('priorities') ?? [];
              const active = selectedPriorities.includes(priority);
              return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => {
                    const exists = selectedPriorities.includes(priority);
                    const next = exists
                      ? selectedPriorities.filter((p) => p !== priority)
                      : [...selectedPriorities, priority];
                    setValue('priorities', next, { shouldDirty: true, shouldValidate: true });
                  }}
                  className={clsx(
                    'rounded-lg border px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                  )}
                >
                  {priority}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">その他のご要望・特記事項</label>
          <textarea
            rows={4}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="上記以外でご要望やご不明な点、特別な事情などがございましたらご記入ください"
            {...register('otherRequests')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">このヒアリングシートについてのご感想</label>
          <textarea
            rows={2}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="質問項目で分かりにくい点や、追加してほしい項目などがございましたらお聞かせください"
            {...register('feedback')}
          />
        </div>
        </div>
      </AccordionSection>
    </div>
  );
};
