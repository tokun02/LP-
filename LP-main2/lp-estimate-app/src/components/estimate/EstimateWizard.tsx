"use client";

import { useEffect, useMemo, useState } from 'react';
import { FormProvider, type FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BasicInfoStep } from '@/components/estimate/BasicInfoStep';
import { EstimateSummaryPanel } from '@/components/estimate/EstimateSummaryPanel';
import { OptionsStep } from '@/components/estimate/OptionsStep';
import { StructureStep } from '@/components/estimate/StructureStep';
import { SummaryStep } from '@/components/estimate/SummaryStep';
import { useEstimateStore } from '@/store/use-estimate-store';
import type { EstimateFormValues, FormSection } from '@/types/estimate';
import { estimateSchema } from '@/validation/estimate';
import clsx from 'clsx';

type StepDefinition = {
  id: FormSection;
  label: string;
  description: string;
  component: () => React.ReactElement | null;
  fields: FieldPath<EstimateFormValues>[];
};

const steps: StepDefinition[] = [
  {
    id: 'basic',
    label: 'ヒアリング',
    description: '案件の目的とターゲットを整理します。',
    component: BasicInfoStep,
    fields: [
      'projectName',
      'clientName',
      'contactEmail',
      'sitePurpose',
      'serviceOverview',
      'targetAudience',
      'launchDate',
      'budgetRange',
      'serverDomain',
      'assetsProvided',
    ],
  },
  {
    id: 'structure',
    label: '構成・デザイン',
    description: 'ページ構成とデザイン強度を定義します。',
    component: StructureStep,
    fields: ['basePackage', 'pageCount', 'designIntensity', 'multilingualCount'],
  },
  {
    id: 'options',
    label: '機能・オプション',
    description: '必要なオプション機能を選択します。',
    component: OptionsStep,
    fields: ['selectedOptions', 'maintenance', 'notes', 'includeTax'],
  },
  {
    id: 'summary',
    label: 'サマリー',
    description: '見積内容を確認し、PDFや共有に備えます。',
    component: () => null,
    fields: [],
  },
];

const StepIndicator = ({
  currentStep,
  onSelect,
}: {
  currentStep: FormSection;
  onSelect: (step: FormSection) => void;
}) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {steps.map((step, index) => {
        const status = index === currentIndex ? 'current' : index < currentIndex ? 'complete' : 'upcoming';
        return (
          <li key={step.id}>
            <button
              type="button"
              onClick={() => onSelect(step.id)}
              className={clsx(
                'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                status === 'current' && 'border-blue-500 bg-blue-50 text-blue-700',
                status === 'complete' && 'border-emerald-500 bg-emerald-50 text-emerald-700',
                status === 'upcoming' && 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
              )}
            >
              <span
                className={clsx(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold',
                  status === 'current' && 'border-blue-500 bg-blue-100 text-blue-700',
                  status === 'complete' && 'border-emerald-500 bg-emerald-100 text-emerald-700',
                  status === 'upcoming' && 'border-slate-300 bg-slate-100 text-slate-500',
                )}
              >
                {index + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold">{step.label}</span>
                <span className="mt-1 block text-xs text-slate-500">{step.description}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export const EstimateWizard = () => {
  const { values, breakdown, currentStep, setStep, updateValues, reset } = useEstimateStore();
  const [isInitialised, setIsInitialised] = useState(false);

  const formMethods = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: values,
    mode: 'onChange',
  });

  useEffect(() => {
    if (!isInitialised) {
      formMethods.reset(values);
      setIsInitialised(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialised, values]);

  useEffect(() => {
    const subscription = formMethods.watch((formValues) => {
      updateValues(formValues as EstimateFormValues);
    });
    return () => subscription.unsubscribe();
  }, [formMethods, updateValues]);

  const currentIndex = useMemo(
    () => Math.max(0, steps.findIndex((step) => step.id === currentStep)),
    [currentStep],
  );

  const activeStep = steps[currentIndex] ?? steps[0];
  const isSummary = activeStep.id === 'summary';
  const ActiveComponent = activeStep.component ?? (() => null);

  // フォームの値を監視
  const watchedValues = formMethods.watch();

  // 必須項目のバリデーション（BasicInfoStepの場合）
  const isBasicInfoValid = useMemo(() => {
    if (currentStep !== 'basic') return true; // basic以外は常に有効
    
    // 必須セクションのチェック
    const requiredSections = [
      // 1. 基本情報（詳細）
      {
        fields: ['companyName', 'contactPersonName', 'contactPhone'],
        check: (v: EstimateFormValues) => {
          return v.companyName && v.contactPersonName && v.contactPhone;
        },
      },
      // 2. プロジェクト概要（詳細）
      {
        fields: ['projectPurpose'],
        check: (v: EstimateFormValues) => {
          return v.projectPurpose && Array.isArray(v.projectPurpose) && v.projectPurpose.length > 0;
        },
      },
      // 3. ブランドイメージ・ポジショニング
      {
        fields: ['brandImage', 'brandValues', 'brandGoals'],
        check: (v: EstimateFormValues) => {
          const brandImage = !!v.brandImage;
          const brandValues = Array.isArray(v.brandValues) && v.brandValues.length > 0;
          const brandGoals = Array.isArray(v.brandGoals) && v.brandGoals.length > 0;
          return brandImage && brandValues && brandGoals;
        },
      },
      // 4. 競合分析・差別化戦略
      {
        fields: ['competitorGoodPoints', 'competitorImprovePoints', 'companyStrengths'],
        check: (v: EstimateFormValues) => {
          const goodPoints = Array.isArray(v.competitorGoodPoints) && v.competitorGoodPoints.length > 0;
          const improvePoints = Array.isArray(v.competitorImprovePoints) && v.competitorImprovePoints.length > 0;
          const strengths = Array.isArray(v.companyStrengths) && v.companyStrengths.length > 0;
          return goodPoints && improvePoints && strengths;
        },
      },
      // 5. 予算・スケジュール（詳細）
      {
        fields: ['budgetDetail', 'deadline'],
        check: (v: EstimateFormValues) => {
          return !!v.budgetDetail && !!v.deadline;
        },
      },
      // 6. 現在のウェブサイト状況
      {
        fields: ['existingSite'],
        check: (v: EstimateFormValues) => {
          return !!v.existingSite;
        },
      },
      // 7. デザイン要望・参考サイト
      {
        fields: ['mainColor', 'logoProvided'],
        check: (v: EstimateFormValues) => {
          return !!v.mainColor && !!v.logoProvided;
        },
      },
      // 8. 機能要件
      {
        fields: ['basicFeatures', 'cmsChoice'],
        check: (v: EstimateFormValues) => {
          const basicFeatures = Array.isArray(v.basicFeatures) && v.basicFeatures.length > 0;
          return basicFeatures && !!v.cmsChoice;
        },
      },
      // 9. SEO・マーケティング要件
      {
        fields: ['seoImportance'],
        check: (v: EstimateFormValues) => {
          return !!v.seoImportance;
        },
      },
      // 10. 技術・インフラ要件
      {
        fields: ['domainChoice', 'serverChoice'],
        check: (v: EstimateFormValues) => {
          return !!v.domainChoice && !!v.serverChoice;
        },
      },
      // 11. 保守・運用について
      {
        fields: ['maintenanceContract'],
        check: (v: EstimateFormValues) => {
          return !!v.maintenanceContract;
        },
      },
      // 12. プロジェクト進行・その他
      {
        fields: ['approvalFlow'],
        check: (v: EstimateFormValues) => {
          return !!v.approvalFlow;
        },
      },
    ];
    
    // すべての必須セクションが完了しているかチェック
    return requiredSections.every((section) => section.check(watchedValues as EstimateFormValues));
  }, [currentStep, watchedValues]);

  const handleReset = () => {
    reset();
    setIsInitialised(false);
  };

  const goToStep = (step: FormSection) => {
    const targetIndex = steps.findIndex((item) => item.id === step);
    if (targetIndex <= currentIndex) {
      setStep(step);
    }
  };

  const sendHearingPdf = async (formValues: EstimateFormValues) => {
    try {
      // 環境に応じてAPIエンドポイントを決定
      // 開発環境: Next.js API Route (/api/send-hearing-pdf)
      // 本番環境 (Netlify): Netlify Functions (/.netlify/functions/send-hearing-pdf)
      let apiUrl = '/api/send-hearing-pdf';
      
      // ブラウザ環境で実行時のみ、Netlify環境を検出
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const port = window.location.port;
        
        // Netlify Functions環境の検出（本番環境または netlify dev）
        // netlify dev は通常 port 8888 を使用
        if (port === '8888' || hostname.includes('netlify.app')) {
          apiUrl = '/.netlify/functions/send-hearing-pdf';
        }
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: formValues }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        console.warn('ヒアリングPDF送信が失敗しました（開発環境では無視されます）:', errorData);
        // 開発環境ではエラーを無視して処理を続行
      } else {
        console.log('ヒアリングPDFが正常に送信されました');
      }
    } catch (error) {
      // ネットワークエラーやAPIルートが存在しない場合のエラーを無視
      // 開発環境では環境変数が設定されていない可能性があるため
      console.warn('ヒアリングPDF送信中にエラーが発生しました（開発環境では無視されます）:', error);
      // エラーがあっても処理は続行（ユーザー体験を優先）
    }
  };

  const goNext = async () => {
    const step = steps[currentIndex];
    if (!step) return;
    const isValid = await formMethods.trigger(step.fields, { shouldFocus: true });
    if (!isValid) return;

    // ヒアリング完了時（ステップ1からステップ2へ）にPDFを送信
    if (step.id === 'basic') {
      const formValues = formMethods.getValues();
      // 非同期で送信（ユーザーを待たせない）
      sendHearingPdf(formValues).catch(console.error);
    }

    const nextStep = steps[currentIndex + 1];
    if (nextStep) {
      setStep(nextStep.id);
    }
  };

  const goBack = () => {
    if (currentIndex === 0) return;
    const previous = steps[currentIndex - 1];
    setStep(previous.id);
  };

  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-blue-100/40 backdrop-blur">
      <div className="space-y-6">
        <StepIndicator currentStep={currentStep} onSelect={goToStep} />
        <div className="h-1 w-full rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <FormProvider {...formMethods}>
          {isSummary ? (
            <div className="space-y-8">
              <SummaryStep breakdown={breakdown} onReset={handleReset} onBack={() => setStep('options')} />
              <div className="lg:hidden">
                <EstimateSummaryPanel breakdown={breakdown} />
              </div>
            </div>
          ) : (
            <form
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault();
                goNext();
              }}
            >
              <ActiveComponent />
              <div className="lg:hidden">
                <EstimateSummaryPanel breakdown={breakdown} />
              </div>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className={clsx(
                    'inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    currentIndex === 0
                      ? 'cursor-not-allowed border-slate-200 text-slate-300'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-100',
                  )}
                  disabled={currentIndex === 0}
                >
                  戻る
                </button>
                <button
                  type="submit"
                  disabled={!isBasicInfoValid}
                  className={clsx(
                    'inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
                    isBasicInfoValid
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'cursor-not-allowed bg-slate-400 opacity-50',
                  )}
                >
                  {currentStep === 'options' ? '見積を確認する' : '次のステップへ'}
                </button>
              </div>
              {!isBasicInfoValid && currentStep === 'basic' && (
                <div className="flex justify-end pt-2">
                  <p className="text-xs text-red-600">
                    必須項目が入力されていません。すべての必須セクションを完了してください。
                  </p>
                </div>
              )}
            </form>
          )}
        </FormProvider>
        <div className="hidden lg:block">
          <EstimateSummaryPanel breakdown={breakdown} />
        </div>
      </div>
    </div>
  );
};
