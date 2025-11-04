import type { EstimateBreakdown, EstimateFormValues, FormSection } from '@/types/estimate';
import { calculateEstimate } from '@/utils/calcEstimate';
import { SITE_PURPOSE_OPTIONS } from '@/data/form-options';
import { basePackages } from '@/data/tariffs';
import { estimateSchema } from '@/validation/estimate';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'web-estimate-app:v1';

const defaultSitePurpose = SITE_PURPOSE_OPTIONS[0];
const defaultPackage = basePackages.find((pkg) => pkg.code === defaultSitePurpose.value) ?? basePackages[0];

// スキーマのdefault/optionalに従って安全に初期値を生成（SSOT: Single Source of Truth）
// 初期値は空文字列でも許可するため、.safeParse()を使用してエラーを無視
const defaultValuesRaw = {
  projectName: '',
  clientName: '',
  contactEmail: '', // 必須だが初期値は空文字列を許可
  sitePurpose: [defaultSitePurpose.label],
  serviceOverview: '',
  targetAudience: '',
  launchDate: '',
  budgetRange: '30〜60万円',
  serverDomain: '既に保有',
  assetsProvided: [],
  basePackage: defaultPackage.code,
  projectType: 'new', // デフォルトは新規作成
  pageCount: defaultPackage.includedPages,
  designIntensity: 'standard',
  multilingualCount: 0,
  wireframeType: undefined,
  selectedOptions: defaultPackage.suggestedOptions.slice(0, 2),
  maintenance: 'なし',
  notes: '',
  includeTax: true,
  // siteTypeはスキーマでdefault('LP')が設定されているため、自動的に埋まる
};

// .safeParse()を使用してエラーを無視し、初期値として使用
const parseResult = estimateSchema.safeParse(defaultValuesRaw);
export const defaultFormValues: EstimateFormValues = parseResult.success
  ? parseResult.data
  : (defaultValuesRaw as EstimateFormValues); // 型アサーションでフォールバック

const hasChanged = (
  prev: EstimateFormValues,
  next: Partial<EstimateFormValues> | EstimateFormValues,
): boolean => {
  const entries = Object.entries(next) as [
    keyof EstimateFormValues,
    EstimateFormValues[keyof EstimateFormValues],
  ][];
  return entries.some(([key, value]) => prev[key] !== value);
};

type EstimateState = {
  values: EstimateFormValues;
  breakdown: EstimateBreakdown;
  currentStep: FormSection;
  setStep: (step: FormSection) => void;
  updateValues: (values: Partial<EstimateFormValues> | EstimateFormValues) => void;
  reset: () => void;
  recompute: (values?: EstimateFormValues) => void;
};

const compute = (values: EstimateFormValues): EstimateBreakdown => calculateEstimate(values);

export const useEstimateStore = create<EstimateState>()(
  persist(
    (set, get) => ({
      values: defaultFormValues,
      breakdown: compute(defaultFormValues),
      currentStep: 'basic',
      setStep: (step) => set({ currentStep: step }),
      updateValues: (incoming) => {
        const prevValues = get().values;
        if (!hasChanged(prevValues, incoming)) {
          return;
        }
        const nextValues = { ...prevValues, ...incoming };
        set({
          values: nextValues,
          breakdown: compute(nextValues),
        });
      },
      recompute: (manualValues) => {
        const source = manualValues ?? get().values;
        set({ breakdown: compute(source) });
      },
      reset: () =>
        set({
          values: defaultFormValues,
          breakdown: compute(defaultFormValues),
          currentStep: 'basic',
        }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ values: state.values }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const next = state.values ?? defaultFormValues;
          state.values = next;
          state.breakdown = compute(next);
        }
      },
    },
  ),
);
