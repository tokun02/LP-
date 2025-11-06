"use client";

import type { EstimateBreakdown, FormSection } from '@/types/estimate';

type EstimateSummaryPanelProps = {
  breakdown: EstimateBreakdown;
  currentStep?: FormSection;
};

const formatCurrency = (value?: number | null) => {
  const numericValue = typeof value === 'number' && Number.isFinite(value) ? value : 0;
  return numericValue.toLocaleString();
};

export const EstimateSummaryPanel = ({ breakdown, currentStep }: EstimateSummaryPanelProps) => {
  // 「構成・デザイン」ステップの場合は、オプション関連のアイテムを除外
  const allItems = Array.isArray(breakdown?.items) ? breakdown.items : [];
  const filteredItems = currentStep === 'structure' 
    ? allItems.filter((item) => item.category !== 'オプション')
    : allItems;
  
  // フィルタリング後のアイテムで再計算
  const filteredSubtotal = filteredItems.reduce((acc, item) => acc + item.total, 0);
  const filteredTax = Math.round(filteredSubtotal * (breakdown?.taxRate ?? 0));
  const filteredTotalWithTax = filteredSubtotal + filteredTax;
  const filteredTotalWithoutTax = filteredSubtotal;
  const filteredDisplayTotal = breakdown?.displayTotal === breakdown?.totalWithTax 
    ? filteredTotalWithTax 
    : filteredTotalWithoutTax;

  const subtotal = formatCurrency(filteredSubtotal);
  const taxRatePercent = Math.round((breakdown?.taxRate ?? 0) * 100);
  const tax = formatCurrency(filteredTax);
  const displayTotal = formatCurrency(filteredDisplayTotal);
  
  // 基本料金に含まれる項目（0円の項目）を除外し、金額がある項目のみ表示
  const displayItems = filteredItems.filter((item) => item.total > 0);
  
  // 基本料金に含まれる項目を取得（表示用）
  const includedItems = filteredItems.filter((item) => item.total === 0 && item.category === '基本料金に含まれる');

  return (
    <aside className="sticky top-24 space-y-3 rounded-lg border border-slate-200 bg-white card-ultra sm:card-compact shadow-lg shadow-blue-100/30">
      <div>
        <h3 className="title-compact text-slate-900">参考概算見積</h3>
        <p className="hint-compact mt-0.5">入力内容に応じてリアルタイムに更新されます。</p>
        <p className="hint-compact mt-1 text-xs text-slate-500">
          ※ 参考程度の概算です。確定見積もりはヒアリングをした後日にご提示いたします。
        </p>
      </div>
      <div className="stack-compact text-[13px] text-slate-600">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <span>小計</span>
          <span className="font-semibold">{subtotal}円</span>
        </div>
        <div className="flex items-center justify-between">
          <span>消費税 ({taxRatePercent}%)</span>
          <span className="font-semibold">{tax}円</span>
        </div>
        <div className="flex items-center justify-between text-[15px] font-extrabold text-blue-600">
          <span>表示合計</span>
          <span>{displayTotal}円</span>
        </div>
        <div className="rounded-lg bg-slate-50 card-ultra hint-compact">
          税込・税抜は画面下部の切替スイッチから変更できます。
        </div>
      </div>
      <div className="space-y-2">
        {/* 基本料金に含まれる項目がある場合の表示 */}
        {includedItems.length > 0 && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-[11px] text-emerald-700">
            <p className="font-medium">基本料金に含まれる項目</p>
            <p className="mt-0.5 text-emerald-600">
              {includedItems.map((item) => {
                // 「（基本料金に含まれる）」を削除して表示
                const name = item.label.replace('（基本料金に含まれる）', '');
                return name;
              }).join('、')}
            </p>
          </div>
        )}
        
        {/* 有料項目の表示 */}
        {displayItems.length > 0 ? (
          <div className="stack-compact text-[12px] text-slate-600">
            {displayItems.map((item) => (
              <div key={item.code} className="flex items-center justify-between row-tight">
                <span className="text-slate-700 truncate pr-2">{item.label}</span>
                <span className="font-medium text-slate-900 shrink-0">+{formatCurrency(item.total)}円</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-slate-400 text-center py-2">
            追加オプションは選択されていません
          </p>
        )}
      </div>
    </aside>
  );
};
