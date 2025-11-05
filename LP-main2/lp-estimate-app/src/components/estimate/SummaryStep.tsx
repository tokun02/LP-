"use client";

import { useMemo, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { EstimateBreakdown, EstimateFormValues } from '@/types/estimate';

type SummaryStepProps = {
  breakdown: EstimateBreakdown;
  onReset: () => void;
  onBack: () => void;
};

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string | string[] | undefined;
}) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  const displayValue = Array.isArray(value) ? value.join('／') : value;

  return (
    <div className="flex items-start justify-between gap-2 rounded-lg border-2 border-slate-200 bg-white px-2.5 py-2 text-[13px] sm:gap-4 sm:px-5 sm:py-4 sm:text-base">
      <span className="font-semibold text-slate-900">{label}</span>
      <span className="text-right text-slate-700 leading-relaxed break-words">{displayValue}</span>
    </div>
  );
};

export const SummaryStep = ({ breakdown, onReset, onBack }: SummaryStepProps) => {
  const { getValues } = useFormContext<EstimateFormValues>();
  const values = getValues();
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // クライアント側でフォントを登録（ブラウザ環境でのみ実行）
  useEffect(() => {
    // SSR中は実行しない
    if (typeof window === 'undefined') return;
    
    // 動的インポートで@react-pdf/rendererをロード
    import('@react-pdf/renderer').then(({ Font }) => {
      try {
        Font.register({
          family: 'NotoSansJP',
          fonts: [
            {
              src: '/fonts/static/NotoSansJP-Regular.ttf',
              fontWeight: 400,
            },
            {
              src: '/fonts/static/NotoSansJP-Medium.ttf',
              fontWeight: 500,
            },
            {
              src: '/fonts/static/NotoSansJP-Bold.ttf',
              fontWeight: 700,
            },
          ],
        });
      } catch (error) {
        // フォント登録エラーは無視（既に登録されている可能性がある）
        console.warn('Font registration warning:', error);
      }
    }).catch((error) => {
      console.warn('Failed to load @react-pdf/renderer:', error);
    });
  }, []);

  const pdfFileName = useMemo(
    () => `Webサイト見積_${(values.projectName || '案件').replace(/\s+/g, '_')}.pdf`,
    [values.projectName],
  );

  // PDFダウンロード時にメールを送信
  const handlePdfDownload = async () => {
    // ブラウザ環境でのみ実行
    if (typeof window === 'undefined') return;
    
    try {
      setIsSendingEmail(true);
      
      // 動的インポートで@react-pdf/rendererをロード
      const { pdf } = await import('@react-pdf/renderer');
      const { EstimatePdfDocument } = await import('@/components/pdf/EstimatePdf');
      
      // PDFを生成してダウンロード
      const doc = <EstimatePdfDocument values={values} breakdown={breakdown} />;
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // メール送信（非同期で実行、エラーが発生してもPDFダウンロードは完了）
      try {
        const response = await fetch('/api/send-estimate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values,
            breakdown,
          }),
        });

        const result = await response.json();
        
        if (!response.ok) {
          console.error('メール送信エラー:', result);
          // エラーが発生してもユーザーに通知しない（PDFダウンロードは成功しているため）
        } else if (result.success && !result.skipped) {
          console.log('✅ メール送信成功:', result.message);
        } else if (result.skipped) {
          console.log('⚠️ 開発環境: メール送信をスキップしました（環境変数が設定されていません）');
        }
      } catch (fetchError) {
        console.error('❌ メール送信API呼び出しエラー:', fetchError);
        // エラーが発生してもユーザーに通知しない（PDFダウンロードは成功しているため）
      }
    } catch (error) {
      console.error('❌ PDF生成エラー:', error);
      alert('PDFの生成に失敗しました。ページを再読み込みして再度お試しください。');
    } finally {
      setIsSendingEmail(false);
    }
  };

  // ヒアリング項目が入力されているかチェック
  const hasHearingData = useMemo(() => {
    return !!(
      values.companyName ||
      values.contactPersonName ||
      values.contactPosition ||
      values.contactEmail ||
      values.contactPhone ||
      values.location ||
      values.industry ||
      values.employeeSize ||
      (values.projectPurpose && values.projectPurpose.length > 0) ||
      values.projectPurposeOther ||
      values.pageStructureRequest ||
      values.targetGender ||
      (values.targetAgeGroups && values.targetAgeGroups.length > 0) ||
      values.targetCharacteristics ||
      values.brandImage ||
      (values.brandValues && values.brandValues.length > 0) ||
      (values.brandGoals && values.brandGoals.length > 0) ||
      values.competitorUrl ||
      (values.competitorGoodPoints && values.competitorGoodPoints.length > 0) ||
      (values.competitorImprovePoints && values.competitorImprovePoints.length > 0) ||
      (values.companyStrengths && values.companyStrengths.length > 0) ||
      (values.differentiationIdeas && values.differentiationIdeas.length > 0) ||
      values.budgetDetail ||
      values.budgetNote ||
      values.deadline ||
      values.deadlineSpecific ||
      values.existingSite ||
      values.existingSiteUrl ||
      (values.currentSiteIssues && values.currentSiteIssues.length > 0) ||
      values.monthlyVisitCount ||
      values.mainColor ||
      values.logoProvided ||
      (values.photoMaterials && values.photoMaterials.length > 0) ||
      values.photoShortageHandling ||
      (values.basicFeatures && values.basicFeatures.length > 0) ||
      (values.advancedFeatures && values.advancedFeatures.length > 0) ||
      values.cmsChoice ||
      values.updateStyle ||
      values.seoImportance ||
      values.targetKeywords ||
      (values.currentMarketing && values.currentMarketing.length > 0) ||
      (values.snsIntegration && values.snsIntegration.length > 0) ||
      values.ga4Status ||
      values.domainChoice ||
      values.domainExisting ||
      values.serverChoice ||
      values.sslChoice ||
      (values.devicesSupported && values.devicesSupported.length > 0) ||
      values.maintenanceContract ||
      values.backupChoice ||
      values.securityImportance ||
      values.approvalFlow ||
      values.approvalFlowDetails ||
      values.pastWebExperience ||
      values.pastWebExperienceDetails ||
      values.priorities ||
      values.otherRequests ||
      values.feedback ||
      values.notes
    );
  }, [values]);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* ヒアリング項目 */}
      <section className="space-y-2 sm:space-y-4">
        <header>
          <h3 className="title-compact sm:text-lg font-semibold text-slate-900">ヒアリング内容</h3>
          <p className="lead-compact sm:text-base text-slate-700">入力いただいたヒアリング項目を表示しています。</p>
          <p className="lead-compact sm:text-sm text-slate-600 mt-2">
            ※ 本ヒアリングシートは参考資料です。確定見積もりはヒアリングをした後日にご提示いたします。
          </p>
        </header>
        <div className="rounded-lg sm:rounded-xl border border-blue-200 bg-blue-50 card-ultra sm:p-6 shadow-sm">
          {!hasHearingData ? (
            <div className="text-center py-4 sm:py-8">
              <p className="lead-compact sm:text-base text-slate-700">
                記入した項目がありません。ヒアリングページで入力いただいた内容がここに表示されます。
              </p>
            </div>
          ) : (
            <div className="stack-compact sm:space-y-3">
            {/* 基本情報 */}
            <SummaryRow label="会社名" value={values.companyName} />
            <SummaryRow label="ご担当者名" value={values.contactPersonName} />
            <SummaryRow label="役職・部署" value={values.contactPosition} />
            <SummaryRow label="担当者メール" value={values.contactEmail} />
            <SummaryRow label="電話番号" value={values.contactPhone} />
            <SummaryRow label="所在地" value={values.location} />
            <SummaryRow label="業種・業態" value={values.industry === 'その他' ? `${values.industry}（${values.industryOther}）` : values.industry} />
            <SummaryRow label="従業員数" value={values.employeeSize} />

            {/* プロジェクト概要 */}
            <SummaryRow label="ウェブサイト制作の目的" value={values.projectPurpose} />
            {values.projectPurposeOther && <SummaryRow label="目的（その他）" value={values.projectPurposeOther} />}
            <SummaryRow label="ページ構成についてのご要望" value={values.pageStructureRequest} />
            <SummaryRow label="メインターゲットの性別" value={values.targetGender} />
            <SummaryRow label="メインターゲットの年齢層" value={values.targetAgeGroups} />
            <SummaryRow label="ターゲットユーザーの特徴・属性" value={values.targetCharacteristics} />

            {/* ブランドイメージ */}
            <SummaryRow label="ブランドを一言で" value={values.brandImage} />
            <SummaryRow label="大切にしている価値観" value={values.brandValues} />
            <SummaryRow label="目指しているもの" value={values.brandGoals} />

            {/* 競合分析 */}
            <SummaryRow label="競合サイトのURL" value={values.competitorUrl} />
            <SummaryRow label="競合の良い点" value={values.competitorGoodPoints} />
            <SummaryRow label="競合の改善点" value={values.competitorImprovePoints} />
            <SummaryRow label="自社の強み" value={values.companyStrengths} />
            <SummaryRow label="差別化の工夫" value={values.differentiationIdeas} />

            {/* 予算・スケジュール */}
            <SummaryRow label="予算の詳細" value={values.budgetDetail} />
            <SummaryRow label="予算に関する補足事項" value={values.budgetNote} />
            <SummaryRow label="希望納期" value={values.deadline} />
            <SummaryRow label="具体的な希望日" value={values.deadlineSpecific} />

            {/* 現在のウェブサイト状況 */}
            <SummaryRow label="既存サイトの有無" value={values.existingSite} />
            <SummaryRow label="既存サイトのURL" value={values.existingSiteUrl} />
            <SummaryRow label="現在のサイトの問題点" value={values.currentSiteIssues} />
            <SummaryRow label="月間アクセス数" value={values.monthlyVisitCount} />

            {/* デザイン要望 */}
            <SummaryRow label="希望するメインカラー" value={values.mainColor} />
            <SummaryRow label="ロゴデータの提供状況" value={values.logoProvided} />
            <SummaryRow label="写真・画像素材の提供" value={values.photoMaterials} />
            <SummaryRow label="素材が不足している場合の対応" value={values.photoShortageHandling} />

            {/* 機能要件 */}
            <SummaryRow label="必要な基本機能" value={values.basicFeatures} />
            <SummaryRow label="高度な機能" value={values.advancedFeatures} />
            <SummaryRow label="CMSの希望" value={values.cmsChoice} />
            <SummaryRow label="更新スタイル" value={values.updateStyle} />

            {/* SEO・マーケティング */}
            <SummaryRow label="SEO対策の重要度" value={values.seoImportance} />
            <SummaryRow label="狙いたいキーワード" value={values.targetKeywords} />
            <SummaryRow label="現在実施中のマーケティング施策" value={values.currentMarketing} />
            <SummaryRow label="SNS連携の希望" value={values.snsIntegration} />
            <SummaryRow label="Googleアナリティクス・サーチコンソールの導入" value={values.ga4Status} />

            {/* 技術・インフラ */}
            <SummaryRow label="ドメインについて" value={values.domainChoice} />
            <SummaryRow label="既存ドメイン" value={values.domainExisting} />
            <SummaryRow label="サーバーについて" value={values.serverChoice} />
            <SummaryRow label="SSL証明書の導入" value={values.sslChoice} />
            <SummaryRow label="対応デバイス" value={values.devicesSupported} />

            {/* 保守・運用 */}
            <SummaryRow label="契約形態のご希望" value={values.maintenanceContract} />
            <SummaryRow label="バックアップの希望" value={values.backupChoice} />
            <SummaryRow label="セキュリティ対策の重要度" value={values.securityImportance} />

            {/* プロジェクト進行 */}
            <SummaryRow label="決裁者・承認フロー" value={values.approvalFlow} />
            <SummaryRow label="承認プロセスについての詳細" value={values.approvalFlowDetails} />
            <SummaryRow label="過去のウェブサイト制作経験" value={values.pastWebExperience} />
            <SummaryRow label="過去の経験の詳細" value={values.pastWebExperienceDetails} />
            {(values.priorities && values.priorities.length > 0) && (
              <SummaryRow label="弊社に期待すること" value={values.priorities.join(', ')} />
            )}
            <SummaryRow label="その他の要望・補足事項" value={values.otherRequests} />
            <SummaryRow label="ヒアリングシートについてのご感想" value={values.feedback} />
            <SummaryRow label="その他の要望・補足事項" value={values.notes} />
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <header>
          <h3 className="title-compact sm:text-lg font-semibold text-slate-900">参考概算見積内訳</h3>
          <p className="lead-compact sm:text-base text-slate-700 mb-2 sm:mb-4">選択したパッケージとオプションの明細です。</p>
          <p className="lead-compact sm:text-sm text-slate-600 mb-2 sm:mb-4">
            ※ 参考程度の概算です。確定見積もりはヒアリングをした後日にご提示いたします。
          </p>
        </header>
        <div className="overflow-hidden rounded-lg sm:rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto -mx-4 px-4">
          <table className="min-w-full divide-y divide-slate-200 text-[13px] sm:text-base">
            <thead className="bg-slate-100 text-[11px] sm:text-sm uppercase tracking-wide text-slate-900 font-semibold">
              <tr>
                <th scope="col" className="px-2 py-2 sm:px-4 sm:py-3 text-left">
                  項目
                </th>
                <th scope="col" className="px-2 py-2 sm:px-4 sm:py-3 text-right">
                  単価
                </th>
                <th scope="col" className="px-2 py-2 sm:px-4 sm:py-3 text-right">
                  数量
                </th>
                <th scope="col" className="px-2 py-2 sm:px-4 sm:py-3 text-right">
                  小計
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {breakdown.items.map((item) => (
                <tr key={item.code} className="text-slate-700">
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <div className="font-medium text-xs sm:text-sm">{item.label}</div>
                    <div className="text-[10px] sm:text-sm text-slate-600 font-medium">{item.category}</div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-right text-xs sm:text-sm sm:px-4 sm:py-3">
                    {item.unitAmount.toLocaleString()}円
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-right text-xs sm:text-sm sm:px-4 sm:py-3">{item.quantity}</td>
                  <td className="whitespace-nowrap px-2 py-2 text-right font-semibold text-xs sm:text-sm sm:px-4 sm:py-3">
                    {item.total.toLocaleString()}円
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>

      <section className="space-y-2 sm:space-y-3">
        <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-white card-ultra sm:p-6 shadow-sm">
          <div className="stack-compact sm:gap-4 text-[13px] sm:text-base text-slate-700">
            <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-1.5 sm:pb-3">
              <span>小計</span>
              <span className="font-semibold">{breakdown.subtotal.toLocaleString()}円</span>
            </div>
            <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-1.5 sm:pb-3">
              <span>消費税 ({Math.round(breakdown.taxRate * 100)}%)</span>
              <span className="font-semibold">{breakdown.tax.toLocaleString()}円</span>
            </div>
            <div className="flex items-center justify-between text-[15px] sm:text-base font-extrabold text-slate-800">
              <span>税込合計</span>
              <span>{breakdown.totalWithTax.toLocaleString()}円</span>
            </div>
            <div className="flex items-center justify-between text-[15px] sm:text-base font-extrabold text-slate-900">
              <span>税抜合計</span>
              <span>{breakdown.totalWithoutTax.toLocaleString()}円</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-ultra sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePdfDownload}
              disabled={isSendingEmail}
              {...(isSendingEmail && { 'aria-busy': true })}
              className={clsx(
                'btn btn-primary btn-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed',
                !isSendingEmail && 'btn-primary-indigo'
              )}
            >
              {isSendingEmail ? 'PDF生成中…' : 'PDFをダウンロード'}
            </button>
            {isSendingEmail && (
              <span className="text-[13px] sm:text-sm text-slate-700 text-center sm:text-left font-medium">メール送信中...</span>
            )}
          </div>
          <p className="hint-compact sm:text-sm text-slate-700 break-words max-w-sm sm:max-w-none">
            PDFは参考概算見積のドラフト版です。PDFダウンロード時にメールでお送りします。
            <br />
            <span className="text-xs text-slate-600">
              ※ 確定見積もりはヒアリングをした後日にご提示いたします。
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-ultra sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-outline btn-sm w-full sm:w-auto"
          >
            修正する
          </button>
          <button
            type="button"
            onClick={onReset}
            className="btn btn-outline btn-sm btn-reset-red w-full sm:w-auto"
          >
            入力をリセット
          </button>
        </div>
      </section>
    </div>
  );
};
