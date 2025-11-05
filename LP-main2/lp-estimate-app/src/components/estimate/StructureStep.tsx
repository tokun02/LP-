"use client";

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { basePackages, options as tariffOptions } from '@/data/tariffs';
import type { EstimateFormValues } from '@/types/estimate';
import { FormError } from '@/components/ui/form-error';
import clsx from 'clsx';

export const StructureStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EstimateFormValues>();

  const currentPackage = watch('basePackage');
  const projectType = watch('projectType') || 'new';
  const pageCount = watch('pageCount');
  const wireframeType = watch('wireframeType');

  const selectedPackage = useMemo(
    () => basePackages.find((pkg) => pkg.code === currentPackage),
    [currentPackage],
  );

  const suggestedOptionLabels = useMemo(() => {
    if (!selectedPackage) return [];
    return selectedPackage.suggestedOptions
      .map((code) => tariffOptions.find((opt) => opt.code === code)?.name ?? code)
      .slice(0, 3);
  }, [selectedPackage]);

  return (
    <div className="space-y-6 sm:space-y-10">
      <section className="space-y-2 sm:space-y-6">
        <header>
          <h3 className="title-compact sm:text-lg text-slate-900">プロジェクト種別を選択</h3>
          <p className="mt-1 lead-compact sm:text-sm text-slate-500">
            新規作成か再作成かを選択してください。再作成の場合は専用価格が適用されます。
          </p>
        </header>
        <div className="grid gap-ultra md:gap-4 md:grid-cols-2">
          <label
            className={clsx(
              'flex cursor-pointer items-center gap-2.5 sm:gap-4 rounded-lg sm:rounded-xl border p-2.5 sm:p-4 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500/40',
              projectType === 'new'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-blue-300',
            )}
          >
            <input
              type="radio"
              value="new"
              checked={projectType === 'new'}
              onChange={() => setValue('projectType', 'new', { shouldDirty: true, shouldValidate: true })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="title-compact sm:font-semibold text-slate-900">新規作成</div>
              <div className="mt-0.5 lead-compact sm:text-sm text-slate-600">新しいサイトを一から作成します</div>
            </div>
          </label>
          <label
            className={clsx(
              'flex cursor-pointer items-center gap-2.5 sm:gap-4 rounded-lg sm:rounded-xl border p-2.5 sm:p-4 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500/40',
              projectType === 'renewal'
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-blue-300',
            )}
          >
            <input
              type="radio"
              value="renewal"
              checked={projectType === 'renewal'}
              onChange={() => setValue('projectType', 'renewal', { shouldDirty: true, shouldValidate: true })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="title-compact sm:font-semibold text-slate-900">再作成（リニューアル）</div>
              <div className="mt-0.5 lead-compact sm:text-sm text-slate-600">既存サイトのリニューアル・作り直しです</div>
            </div>
          </label>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-6">
        <header>
          <h3 className="title-compact sm:text-lg text-slate-900">サイトテンプレートを選択</h3>
          <p className="mt-1 lead-compact sm:text-sm text-slate-500">
            ヒアリング結果に合わせてテンプレートを選び、用途別の推奨構成を確認します。
          </p>
        </header>
        <div className="grid gap-ultra md:gap-4 md:grid-cols-3">
          {basePackages.map((pkg) => {
            const active = currentPackage === pkg.code;
            return (
              <label
                key={pkg.code}
                className={clsx(
                  'block h-full cursor-pointer rounded-lg sm:rounded-xl border card-ultra sm:p-4 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500/40',
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300',
                )}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="title-compact sm:text-sm font-semibold">{pkg.name}</span>
                  <div className="text-right shrink-0">
                    {projectType === 'renewal' ? (
                      <div>
                        <span className="text-[11px] sm:text-xs font-medium text-blue-600">
                          {((pkg.basePrice * 0.7) | 0).toLocaleString()}〜{((pkg.basePrice * 0.9) | 0).toLocaleString()}円
                        </span>
                        <span className="ml-0.5 text-[9px] sm:text-[10px] text-slate-500">（再作成価格・税込）</span>
                      </div>
                    ) : (
                      <span className="text-[11px] sm:text-xs font-medium text-blue-600">{pkg.basePrice.toLocaleString()}円〜</span>
                    )}
                  </div>
                </div>
                <p className="mt-1.5 hint-compact sm:text-xs text-slate-500">{pkg.description}</p>
                <p className="mt-1.5 hint-compact sm:text-xs text-slate-400">想定ページ: {pkg.includedPages}ページ</p>
                <p className="mt-1 hint-compact sm:text-xs text-slate-400">推奨: {pkg.recommendedFor}</p>
                <div className="mt-2 flex flex-wrap gap-0.5 sm:gap-1">
                  {pkg.highlightSections.slice(0, 3).map((section) => (
                    <span
                      key={section}
                      className="rounded-full bg-white/70 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-blue-600 shadow-sm"
                    >
                      {section}
                    </span>
                  ))}
                </div>
                <input
                  type="radio"
                  value={pkg.code}
                  className="sr-only"
                  {...register('basePackage')}
                />
              </label>
            );
          })}
        </div>
        <FormError message={errors.basePackage?.message} />
      </section>

      <section className="space-y-3 sm:space-y-6">
        <header>
          <h3 className="title-compact sm:text-lg text-slate-900">ページ構成とボリューム</h3>
          <p className="mt-1 lead-compact sm:text-sm text-slate-500">
            想定される下層ページや特集ページがある場合は合計ページ数を入力してください。
          </p>
        </header>
        <div className="grid gap-ultra sm:gap-6 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block label-compact sm:text-base font-semibold text-slate-900 mb-1 sm:mb-3">
              総ページ数 <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="number"
              min={1}
              max={50}
              className="w-full rounded-lg border-2 border-slate-300 field-compact input-zoom-safe shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[44px] bg-white sm:px-4 sm:py-3.5 sm:text-base sm:min-h-[52px] sm:rounded-xl"
              {...register('pageCount', { valueAsNumber: true })}
            />
            <FormError message={errors.pageCount?.message} />
            <p className="mt-1.5 hint-compact sm:text-xs text-slate-500">
              {selectedPackage
                ? `基本料金に ${selectedPackage.includedPages} ページ含まれ、追加分は1ページあたり${selectedPackage.additionalPageUnitPrice.toLocaleString()}円です。`
                : '基本料金に含まれるページ数を基準に追加分のみカウントしてください。'}
            </p>
          </div>
          <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 card-ultra sm:p-4 text-xs sm:text-sm text-slate-600">
            <p className="font-medium text-slate-700">選択中のプラン</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-blue-600">{selectedPackage?.name}</p>
            <p className="mt-1.5 hint-compact sm:text-xs text-slate-500 leading-relaxed">{selectedPackage?.description}</p>
            <p className="mt-1.5 sm:mt-3 hint-compact sm:text-xs text-slate-500">
              ページ数: <span className="font-semibold text-slate-700">{pageCount}ページ</span>
            </p>
            {suggestedOptionLabels.length > 0 && (
              <p className="mt-1.5 hint-compact sm:text-xs text-slate-500">推奨オプション: {suggestedOptionLabels.join('／')}</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <header>
          <h3 className="text-lg font-semibold text-slate-900">ワイヤーフレーム・構成設計</h3>
          <p className="text-sm text-slate-500">
            サイトの構造とレイアウト設計方法を選択します。
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {([
            { id: 'template', label: 'テンプレート', description: 'コストと制作期間を抑えられます' },
            { id: 'semi-custom', label: 'セミオーダー', description: 'テンプレートをベースに、ご要望に合わせてカスタマイズします。' },
            { id: 'full-custom', label: 'フルオーダー', description: '完全オリジナルのワイヤーフレームから作成します。' },
          ] as const).map((option) => {
            const active = wireframeType === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setValue('wireframeType', option.id, { shouldDirty: true, shouldValidate: true });
                }}
                className={clsx(
                  'rounded-xl border p-5 text-left shadow-sm transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                  active
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-500/30'
                    : 'border-slate-200 bg-white hover:border-blue-300',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">{option.label}</h4>
                    {option.id === 'full-custom' && (
                      <span className="mt-1 inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                        完全オリジナル
                      </span>
                    )}
                  </div>
                  {active && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white shadow-md">
                      ✓
                    </div>
                  )}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">{option.description}</p>
                {option.id === 'semi-custom' && (
                  <p className="mt-3 text-[10px] font-medium text-indigo-600">
                    ※ セミオーダーの場合、追加費用が発生する場合があります
                  </p>
                )}
                {option.id === 'full-custom' && (
                  <p className="mt-3 text-[10px] font-medium text-indigo-600">
                    ※ フルオーダーの場合、追加費用が発生します
                  </p>
                )}
              </button>
            );
          })}
        </div>
        <FormError message={errors.wireframeType?.message} />
      </section>
    </div>
  );
};
