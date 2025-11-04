"use client";

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { basePackages, options as tariffOptions } from '@/data/tariffs';
import type { OptionCode } from '@/data/tariffs';
import type { EstimateFormValues } from '@/types/estimate';
import { FormError } from '@/components/ui/form-error';
import clsx from 'clsx';

const CATEGORY_LABELS: Record<string, string> = {
  experience: '体験向上',
  marketing: 'マーケティング',
  integration: '連携機能',
  operation: '運用・保守',
};

export const OptionsStep = () => {
  const {
    setValue,
    register,
    watch,
    reset,
    formState: { errors },
  } = useFormContext<EstimateFormValues>();

  const selectedOptions = watch('selectedOptions') ?? [];
  const includeTax = watch('includeTax');
  const basePackage = watch('basePackage');
  const projectType = watch('projectType') || 'new';

  // 基本料金に含まれるオプションを取得
  const selectedBasePackage = useMemo(
    () => basePackages.find((pkg) => pkg.code === basePackage),
    [basePackage],
  );
  
  const includedOptions = useMemo(() => {
    if (!selectedBasePackage) return [];
    return projectType === 'renewal' 
      ? selectedBasePackage.includedOptions.renewal 
      : selectedBasePackage.includedOptions.new;
  }, [selectedBasePackage, projectType]);

  const groupedOptions = useMemo(() => {
    return tariffOptions.reduce<Record<string, typeof tariffOptions>>((acc, option) => {
      // アニメーション演出（カスタム）とサイト設計（IA/ワイヤー）- カスタムは非表示
      // （デザイン制作（カスタム）に含まれるため）
      if (option.code === 'animation_custom' || option.code === 'information_architecture_custom') {
        return acc;
      }
      const key = option.category ?? 'その他';
      acc[key] = acc[key] ? [...acc[key], option] : [option];
      return acc;
    }, {});
  }, []);

  // 重複回避ロジック（マーケ支援パック vs 個別SEO/GA4/SNS）
  const MARKETING_PACK: OptionCode = 'marketing_pack';
  const INDIVIDUAL_MARKETING: EstimateFormValues['selectedOptions'] = [
    'analytics_setup',
    'sns_integration',
  ];

  const packSelected = selectedOptions.includes(MARKETING_PACK);
  const allIndividualsSelected = INDIVIDUAL_MARKETING.every((c) => selectedOptions.includes(c));

  const toggleOption = (code: OptionCode) => {
    // 基本料金に含まれるオプションは選択不可
    if (includedOptions.includes(code)) {
      return;
    }

    const exists = selectedOptions.includes(code);

    // 個別（SEO/GA4/SNS）は、パック選択中は無効化
    if (!exists && packSelected && INDIVIDUAL_MARKETING.includes(code)) {
      return;
    }

    // パックをONにする場合は、個別3つを外してパックを追加
    if (!exists && code === MARKETING_PACK) {
      const filtered = selectedOptions.filter((c) => !INDIVIDUAL_MARKETING.includes(c));
      const next = [...filtered, code];
      setValue('selectedOptions', next, { shouldDirty: true, shouldValidate: true });
      return;
    }

    // 通常トグル
    const next = exists ? selectedOptions.filter((item) => item !== code) : [...selectedOptions, code];
    setValue('selectedOptions', next, { shouldDirty: true, shouldValidate: true });
  };

  // 機能・オプション選択のリセット関数
  const handleResetOptions = () => {
    if (confirm('機能・オプション選択をすべてリセットしますか？この操作は取り消せません。')) {
      // オプション関連のフィールドをリセット
      const currentValues = watch();
      const resetValues = {
        ...currentValues,
        selectedOptions: [],
        contactDestination: undefined,
        contactAutoReply: undefined,
        contactCrmType: undefined,
        reservationUnit: undefined,
        reservationCalendar: undefined,
        reservationPrepay: undefined,
        translationSupport: undefined,
        cmsUpdateOwner: undefined,
        cmsUpdateFrequency: undefined,
        notes: '',
      };
      
      reset(resetValues);
    }
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">追加オプションを選択</h3>
            <p className="text-sm text-slate-500">
              機能追加やマーケティング支援など、案件に必要なオプションを選択してください。
            </p>
          </div>
          {/* リセットボタン */}
          <button
            type="button"
            onClick={handleResetOptions}
            className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            オプションをリセット
          </button>
        </header>

        {/* サジェスト: 個別3つがすべて選択されている場合、パックへの切替を提案 */}
        {allIndividualsSelected && !packSelected && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            <div className="flex items-center justify-between gap-3">
              <p>
                GA4・Search Console設定 / SNS連携 がすべて選択されています。{' '}
                <span className="font-semibold">マーケ支援パック（10%割引）</span>への切替をおすすめします。
              </p>
              <button
                type="button"
                onClick={() => {
                  const filtered = selectedOptions.filter((c) => !INDIVIDUAL_MARKETING.includes(c));
                  setValue('selectedOptions', [...filtered, MARKETING_PACK], {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-amber-700"
              >
                パックに切替
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(groupedOptions).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">{CATEGORY_LABELS[category] ?? category}</h4>
              <div className="grid gap-3 lg:grid-cols-2">
                {items.map((option) => {
                  const active = selectedOptions.includes(option.code);
                  const isIncluded = includedOptions.includes(option.code);
                  const disabled = packSelected && INDIVIDUAL_MARKETING.includes(option.code) || isIncluded;
                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => (disabled ? undefined : toggleOption(option.code))}
                      className={clsx(
                        'rounded-xl border px-4 py-3 text-left text-sm shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                        isIncluded
                          ? 'cursor-default border-emerald-300 bg-emerald-50 text-emerald-700'
                          : disabled
                          ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
                          : active
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold">{option.name}</div>
                          <p className="mt-1 text-xs text-slate-500">{option.description}</p>
                        </div>
                        {isIncluded ? (
                          <span className="ml-2 shrink-0 text-xs font-semibold text-emerald-600">
                            基本料金に含まれる
                          </span>
                        ) : option.code === 'visual_design_custom' ? (
                          <span className="ml-2 shrink-0 text-xs font-semibold text-blue-600">
                            +¥50,000〜¥200,000
                          </span>
                        ) : option.code === 'multilingual_design_adjustment' ? (
                          <span className="ml-2 shrink-0 text-xs font-semibold text-blue-600">
                            +¥40,000〜¥200,000
                          </span>
                        ) : option.code === 'maintenance' ? (
                          <span className="ml-2 shrink-0 text-xs font-semibold text-blue-600">
                            +¥7,000〜¥200,000/月
                          </span>
                        ) : (
                          <span className="ml-2 shrink-0 text-xs font-semibold text-blue-600">
                            +{option.price.toLocaleString()}円
                            {option.unit === 'per_language' ? '/言語' : ''}
                          </span>
                        )}
                      </div>
                      {isIncluded && (
                        <p className="mt-2 text-xs text-emerald-600">このオプションは基本料金に含まれています。</p>
                      )}
                      {option.code === 'visual_design_custom' && !isIncluded && (
                        <p className="mt-2 text-xs text-blue-600">
                          ※ サイト設計（IA/ワイヤー）カスタム・アニメーション演出（カスタム）を含みます
                        </p>
                      )}
                      {option.code === 'multilingual_design_adjustment' && !isIncluded && (
                        <p className="mt-2 text-xs text-blue-600">
                          ※ ページ数・言語数規模に応じて料金が変動します
                        </p>
                      )}
                      {disabled && !isIncluded && (
                        <p className="mt-2 text-xs text-slate-400">マーケ支援パック選択中は個別選択できません。</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <FormError message={errors.selectedOptions?.message} />
      </section>

  <section className="space-y-4">
        <header>
          <h3 className="text-lg font-semibold text-slate-900">出力形式</h3>
          <p className="text-sm text-slate-500">見積の出力形式を設定します。</p>
        </header>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-700">税込表示</p>
          <p className="mt-1 text-xs text-slate-500">
            税込表示をONにすると、10%の消費税を加算した金額でサマリを表示します。
          </p>
          <label className="mt-3 flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              checked={includeTax}
              onChange={(event) =>
                setValue('includeTax', event.target.checked, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
            <span className="text-sm">{includeTax ? '税込合計で表示する' : '税抜合計で表示する'}</span>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">備考・補足事項</label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="例: サイト公開後にA/Bテストを実施したい。フォームはSalesforceと連携予定 など"
          {...register('notes')}
        />
        <FormError message={errors.notes?.message} />
      </section>
    </div>
  );
};
