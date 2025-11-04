"use client";

import type { EstimateBreakdown } from '@/types/estimate';

type EstimateSummaryPanelProps = {
  breakdown: EstimateBreakdown;
};

const formatCurrency = (value?: number | null) => {
  const numericValue = typeof value === 'number' && Number.isFinite(value) ? value : 0;
  return numericValue.toLocaleString();
};

export const EstimateSummaryPanel = ({ breakdown }: EstimateSummaryPanelProps) => {
  const subtotal = formatCurrency(breakdown?.subtotal);
  const taxRatePercent = Math.round((breakdown?.taxRate ?? 0) * 100);
  const tax = formatCurrency(breakdown?.tax);
  const displayTotal = formatCurrency(breakdown?.displayTotal);
  const items = Array.isArray(breakdown?.items) ? breakdown.items : [];

  return (
    <aside className="sticky top-24 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-100/30">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">概算見積</h3>
        <p className="text-xs text-slate-500">入力内容に応じてリアルタイムに更新されます。</p>
      </div>
      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>小計</span>
          <span className="font-semibold">{subtotal}円</span>
        </div>
        <div className="flex items-center justify-between">
          <span>消費税 ({taxRatePercent}%)</span>
          <span className="font-semibold">{tax}円</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-blue-600">
          <span>表示合計</span>
          <span>{displayTotal}円</span>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          税込・税抜は画面下部の切替スイッチから変更できます。
        </div>
      </div>
      <div className="space-y-2 text-xs text-slate-400">
        {items.slice(0, 4).map((item) => (
          <div key={item.code} className="flex items-center justify-between">
            <span>{item.label}</span>
            <span className="font-medium text-slate-500">+{formatCurrency(item.total)}円</span>
          </div>
        ))}
        {items.length > 4 && (
          <p className="text-right text-xs text-slate-400">他 {items.length - 4} 項目</p>
        )}
      </div>
    </aside>
  );
};
