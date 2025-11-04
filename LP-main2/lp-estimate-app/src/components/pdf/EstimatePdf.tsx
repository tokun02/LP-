import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { basePackages, options as tariffOptions } from '@/data/tariffs';
import { SITE_PURPOSE_TO_PACKAGE } from '@/data/form-options';
import type { EstimateBreakdown, EstimateFormValues } from '@/types/estimate';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 32,
    fontSize: 11,
    fontFamily: 'NotoSansJP',
    color: '#1f2937',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1d4ed8',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 12,
    color: '#475569',
  },
  section: {
    marginBottom: 16,
    padding: 12,
    border: '1pt solid #e2e8f0',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0f2fe',
    padding: 8,
    borderRadius: 6,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottom: '1pt solid #f1f5f9',
  },
  totals: {
    marginTop: 12,
    paddingTop: 8,
    borderTop: '1pt solid #e2e8f0',
  },
});

type EstimatePdfDocumentProps = {
  values: EstimateFormValues;
  breakdown: EstimateBreakdown;
  generatedAt?: Date;
};

export const EstimatePdfDocument = ({ values, breakdown, generatedAt = new Date() }: EstimatePdfDocumentProps) => {
  const primaryPurpose = values.sitePurpose[0];
  const primaryPackageCode = primaryPurpose ? SITE_PURPOSE_TO_PACKAGE[primaryPurpose] : values.basePackage;
  const primaryPackage =
    basePackages.find((pkg) => pkg.code === primaryPackageCode) ??
    basePackages.find((pkg) => pkg.code === values.basePackage) ??
    basePackages[0];
  const recommendedOptions = primaryPackage.suggestedOptions
    .map((code) => tariffOptions.find((opt) => opt.code === code)?.name ?? code)
    .slice(0, 4);

  return (
    <Document title={`Webサイト見積_${values.projectName || '案件'}`}>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Webサイト制作見積書（ドラフト）</Text>
          <Text style={styles.subtitle}>作成日: {generatedAt.toLocaleDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>案件情報</Text>
          <View style={styles.row}>
            <Text>案件名</Text>
            <Text>{values.projectName || '未設定'}</Text>
          </View>
          <View style={styles.row}>
            <Text>クライアント</Text>
            <Text>{values.clientName || '未入力'}</Text>
          </View>
          <View style={styles.row}>
            <Text>サイト用途</Text>
            <Text>{values.sitePurpose.join('／')}</Text>
          </View>
          <View style={styles.row}>
            <Text>想定予算</Text>
            <Text>{values.budgetRange}</Text>
          </View>
          <View style={styles.row}>
            <Text>公開希望</Text>
            <Text>{values.launchDate || '未定'}</Text>
          </View>
        </View>

        {primaryPackage && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>用途別の想定構成</Text>
            <View style={{ marginBottom: 6 }}>
              <Text>
                テンプレート: {primaryPackage.name}（基本{primaryPackage.includedPages}ページ含む）
              </Text>
            </View>
            <View style={{ marginBottom: 6 }}>
              <Text>想定セクション: {primaryPackage.highlightSections.slice(0, 6).join('／')}</Text>
            </View>
            <View>
              <Text>
                推奨オプション: {recommendedOptions.length > 0 ? recommendedOptions.join('／') : '特になし'}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>見積内訳</Text>
          <View style={styles.tableHeader}>
            <Text style={{ width: '40%' }}>項目</Text>
            <Text style={{ width: '20%', textAlign: 'right' }}>単価</Text>
            <Text style={{ width: '20%', textAlign: 'right' }}>数量</Text>
            <Text style={{ width: '20%', textAlign: 'right' }}>小計</Text>
          </View>
          {breakdown.items.map((item) => (
            <View key={item.code} style={styles.tableRow}>
              <Text style={{ width: '40%' }}>{item.label}</Text>
              <Text style={{ width: '20%', textAlign: 'right' }}>{item.unitAmount.toLocaleString()}円</Text>
              <Text style={{ width: '20%', textAlign: 'right' }}>{item.quantity}</Text>
              <Text style={{ width: '20%', textAlign: 'right' }}>{item.total.toLocaleString()}円</Text>
            </View>
          ))}
          <View style={styles.totals}>
            <View style={styles.row}>
              <Text>小計</Text>
              <Text>{breakdown.subtotal.toLocaleString()}円</Text>
            </View>
            <View style={styles.row}>
              <Text>消費税 ({Math.round(breakdown.taxRate * 100)}%)</Text>
              <Text>{breakdown.tax.toLocaleString()}円</Text>
            </View>
            <View style={[styles.row, { fontWeight: 'bold', fontSize: 12 }]}>
              <Text>税込合計</Text>
              <Text>{breakdown.totalWithTax.toLocaleString()}円</Text>
            </View>
          </View>
        </View>

        {values.notes && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>備考</Text>
            <Text>{values.notes}</Text>
          </View>
        )}
      </Page>

      {/* ヒアリング内容ページ */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>ヒアリング内容</Text>
          <Text style={styles.subtitle}>作成日: {generatedAt.toLocaleDateString()}</Text>
        </View>

        {/* 基本情報 */}
        {(values.companyName || values.contactPersonName || values.contactPosition || values.contactEmail || values.contactPhone || values.location || values.industry || values.employeeSize) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>基本情報</Text>
            {values.companyName && (
              <View style={styles.row}>
                <Text>会社名</Text>
                <Text>{values.companyName}</Text>
              </View>
            )}
            {values.contactPersonName && (
              <View style={styles.row}>
                <Text>ご担当者名</Text>
                <Text>{values.contactPersonName}</Text>
              </View>
            )}
            {values.contactPosition && (
              <View style={styles.row}>
                <Text>役職・部署</Text>
                <Text>{values.contactPosition}</Text>
              </View>
            )}
            {values.contactEmail && (
              <View style={styles.row}>
                <Text>担当者メール</Text>
                <Text>{values.contactEmail}</Text>
              </View>
            )}
            {values.contactPhone && (
              <View style={styles.row}>
                <Text>電話番号</Text>
                <Text>{values.contactPhone}</Text>
              </View>
            )}
            {values.location && (
              <View style={styles.row}>
                <Text>所在地</Text>
                <Text>{values.location}</Text>
              </View>
            )}
            {values.industry && (
              <View style={styles.row}>
                <Text>業種・業態</Text>
                <Text>{values.industry === 'その他' ? `${values.industry}（${values.industryOther || ''}）` : values.industry}</Text>
              </View>
            )}
            {values.employeeSize && (
              <View style={styles.row}>
                <Text>従業員数</Text>
                <Text>{values.employeeSize}</Text>
              </View>
            )}
          </View>
        )}

        {/* プロジェクト概要 */}
        {(values.projectPurpose || values.projectPurposeOther || values.pageStructureRequest || values.targetGender || values.targetAgeGroups || values.targetCharacteristics) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>プロジェクト概要</Text>
            {values.projectPurpose && values.projectPurpose.length > 0 && (
              <View style={styles.row}>
                <Text>ウェブサイト制作の目的</Text>
                <Text>{values.projectPurpose.join('／')}</Text>
              </View>
            )}
            {values.projectPurposeOther && (
              <View style={styles.row}>
                <Text>目的（その他）</Text>
                <Text>{values.projectPurposeOther}</Text>
              </View>
            )}
            {values.pageStructureRequest && (
              <View style={styles.row}>
                <Text>ページ構成についてのご要望</Text>
                <Text>{values.pageStructureRequest}</Text>
              </View>
            )}
            {values.targetGender && (
              <View style={styles.row}>
                <Text>メインターゲットの性別</Text>
                <Text>{values.targetGender}</Text>
              </View>
            )}
            {values.targetAgeGroups && values.targetAgeGroups.length > 0 && (
              <View style={styles.row}>
                <Text>メインターゲットの年齢層</Text>
                <Text>{values.targetAgeGroups.join('／')}</Text>
              </View>
            )}
            {values.targetCharacteristics && (
              <View style={styles.row}>
                <Text>ターゲットユーザーの特徴・属性</Text>
                <Text>{values.targetCharacteristics}</Text>
              </View>
            )}
          </View>
        )}

        {/* ブランドイメージ */}
        {(values.brandImage || values.brandValues || values.brandGoals) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>ブランドイメージ</Text>
            {values.brandImage && (
              <View style={styles.row}>
                <Text>ブランドを一言で</Text>
                <Text>{values.brandImage}</Text>
              </View>
            )}
            {values.brandValues && values.brandValues.length > 0 && (
              <View style={styles.row}>
                <Text>大切にしている価値観</Text>
                <Text>{values.brandValues.join('／')}</Text>
              </View>
            )}
            {values.brandGoals && values.brandGoals.length > 0 && (
              <View style={styles.row}>
                <Text>目指しているもの</Text>
                <Text>{values.brandGoals.join('／')}</Text>
              </View>
            )}
          </View>
        )}

        {/* 競合分析 */}
        {(values.competitorUrl || values.competitorGoodPoints || values.competitorImprovePoints || values.companyStrengths || values.differentiationIdeas) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>競合分析</Text>
            {values.competitorUrl && (
              <View style={styles.row}>
                <Text>競合サイトのURL</Text>
                <Text>{values.competitorUrl}</Text>
              </View>
            )}
            {values.competitorGoodPoints && values.competitorGoodPoints.length > 0 && (
              <View style={styles.row}>
                <Text>競合の良い点</Text>
                <Text>{values.competitorGoodPoints.join('／')}</Text>
              </View>
            )}
            {values.competitorImprovePoints && values.competitorImprovePoints.length > 0 && (
              <View style={styles.row}>
                <Text>競合の改善点</Text>
                <Text>{values.competitorImprovePoints.join('／')}</Text>
              </View>
            )}
            {values.companyStrengths && values.companyStrengths.length > 0 && (
              <View style={styles.row}>
                <Text>自社の強み</Text>
                <Text>{values.companyStrengths.join('／')}</Text>
              </View>
            )}
            {values.differentiationIdeas && values.differentiationIdeas.length > 0 && (
              <View style={styles.row}>
                <Text>差別化の工夫</Text>
                <Text>{values.differentiationIdeas.join('／')}</Text>
              </View>
            )}
          </View>
        )}

        {/* 予算・スケジュール */}
        {(values.budgetDetail || values.budgetNote || values.deadline || values.deadlineSpecific) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>予算・スケジュール</Text>
            {values.budgetDetail && (
              <View style={styles.row}>
                <Text>予算の詳細</Text>
                <Text>{values.budgetDetail}</Text>
              </View>
            )}
            {values.budgetNote && (
              <View style={styles.row}>
                <Text>予算に関する補足事項</Text>
                <Text>{values.budgetNote}</Text>
              </View>
            )}
            {values.deadline && (
              <View style={styles.row}>
                <Text>希望納期</Text>
                <Text>{values.deadline}</Text>
              </View>
            )}
            {values.deadlineSpecific && (
              <View style={styles.row}>
                <Text>具体的な希望日</Text>
                <Text>{values.deadlineSpecific}</Text>
              </View>
            )}
          </View>
        )}

        {/* 現在のウェブサイト状況 */}
        {(values.existingSite || values.existingSiteUrl || values.currentSiteIssues || values.monthlyVisitCount) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>現在のウェブサイト状況</Text>
            {values.existingSite && (
              <View style={styles.row}>
                <Text>既存サイトの有無</Text>
                <Text>{values.existingSite}</Text>
              </View>
            )}
            {values.existingSiteUrl && (
              <View style={styles.row}>
                <Text>既存サイトのURL</Text>
                <Text>{values.existingSiteUrl}</Text>
              </View>
            )}
            {values.currentSiteIssues && values.currentSiteIssues.length > 0 && (
              <View style={styles.row}>
                <Text>現在のサイトの問題点</Text>
                <Text>{values.currentSiteIssues.join('／')}</Text>
              </View>
            )}
            {values.monthlyVisitCount && (
              <View style={styles.row}>
                <Text>月間アクセス数</Text>
                <Text>{values.monthlyVisitCount}</Text>
              </View>
            )}
          </View>
        )}

        {/* デザイン要望 */}
        {(values.mainColor || values.logoProvided || values.photoMaterials || values.photoShortageHandling) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>デザイン要望</Text>
            {values.mainColor && (
              <View style={styles.row}>
                <Text>希望するメインカラー</Text>
                <Text>{values.mainColor}</Text>
              </View>
            )}
            {values.logoProvided && (
              <View style={styles.row}>
                <Text>ロゴデータの提供状況</Text>
                <Text>{values.logoProvided}</Text>
              </View>
            )}
            {values.photoMaterials && values.photoMaterials.length > 0 && (
              <View style={styles.row}>
                <Text>写真・画像素材の提供</Text>
                <Text>{values.photoMaterials.join('／')}</Text>
              </View>
            )}
            {values.photoShortageHandling && (
              <View style={styles.row}>
                <Text>素材が不足している場合の対応</Text>
                <Text>{values.photoShortageHandling}</Text>
              </View>
            )}
          </View>
        )}

        {/* 機能要件 */}
        {(values.basicFeatures || values.advancedFeatures || values.cmsChoice || values.updateStyle) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>機能要件</Text>
            {values.basicFeatures && values.basicFeatures.length > 0 && (
              <View style={styles.row}>
                <Text>必要な基本機能</Text>
                <Text>{values.basicFeatures.join('／')}</Text>
              </View>
            )}
            {values.advancedFeatures && values.advancedFeatures.length > 0 && (
              <View style={styles.row}>
                <Text>高度な機能</Text>
                <Text>{values.advancedFeatures.join('／')}</Text>
              </View>
            )}
            {values.cmsChoice && (
              <View style={styles.row}>
                <Text>CMSの希望</Text>
                <Text>{values.cmsChoice}</Text>
              </View>
            )}
            {values.updateStyle && (
              <View style={styles.row}>
                <Text>更新スタイル</Text>
                <Text>{values.updateStyle}</Text>
              </View>
            )}
          </View>
        )}

        {/* SEO・マーケティング */}
        {(values.seoImportance || values.targetKeywords || values.currentMarketing || values.snsIntegration || values.ga4Status) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>SEO・マーケティング</Text>
            {values.seoImportance && (
              <View style={styles.row}>
                <Text>SEO対策の重要度</Text>
                <Text>{values.seoImportance}</Text>
              </View>
            )}
            {values.targetKeywords && (
              <View style={styles.row}>
                <Text>狙いたいキーワード</Text>
                <Text>{values.targetKeywords}</Text>
              </View>
            )}
            {values.currentMarketing && values.currentMarketing.length > 0 && (
              <View style={styles.row}>
                <Text>現在実施中のマーケティング施策</Text>
                <Text>{values.currentMarketing.join('／')}</Text>
              </View>
            )}
            {values.snsIntegration && values.snsIntegration.length > 0 && (
              <View style={styles.row}>
                <Text>SNS連携の希望</Text>
                <Text>{values.snsIntegration.join('／')}</Text>
              </View>
            )}
            {values.ga4Status && (
              <View style={styles.row}>
                <Text>Googleアナリティクス・サーチコンソールの導入</Text>
                <Text>{values.ga4Status}</Text>
              </View>
            )}
          </View>
        )}

        {/* 技術・インフラ */}
        {(values.domainChoice || values.domainExisting || values.serverChoice || values.sslChoice || values.devicesSupported) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>技術・インフラ</Text>
            {values.domainChoice && (
              <View style={styles.row}>
                <Text>ドメインについて</Text>
                <Text>{values.domainChoice}</Text>
              </View>
            )}
            {values.domainExisting && (
              <View style={styles.row}>
                <Text>既存ドメイン</Text>
                <Text>{values.domainExisting}</Text>
              </View>
            )}
            {values.serverChoice && (
              <View style={styles.row}>
                <Text>サーバーについて</Text>
                <Text>{values.serverChoice}</Text>
              </View>
            )}
            {values.sslChoice && (
              <View style={styles.row}>
                <Text>SSL証明書の導入</Text>
                <Text>{values.sslChoice}</Text>
              </View>
            )}
            {values.devicesSupported && values.devicesSupported.length > 0 && (
              <View style={styles.row}>
                <Text>対応デバイス</Text>
                <Text>{values.devicesSupported.join('／')}</Text>
              </View>
            )}
          </View>
        )}

        {/* 保守・運用 */}
        {(values.maintenanceContract || values.backupChoice || values.securityImportance) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>保守・運用</Text>
            {values.maintenanceContract && (
              <View style={styles.row}>
                <Text>契約形態のご希望</Text>
                <Text>{values.maintenanceContract}</Text>
              </View>
            )}
            {values.backupChoice && (
              <View style={styles.row}>
                <Text>バックアップの希望</Text>
                <Text>{values.backupChoice}</Text>
              </View>
            )}
            {values.securityImportance && (
              <View style={styles.row}>
                <Text>セキュリティ対策の重要度</Text>
                <Text>{values.securityImportance}</Text>
              </View>
            )}
          </View>
        )}

        {/* プロジェクト進行 */}
        {(values.approvalFlow || values.approvalFlowDetails || values.projectPriority || values.pastExperience) && (
          <View style={styles.section}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>プロジェクト進行</Text>
            {values.approvalFlow && (
              <View style={styles.row}>
                <Text>決裁者・承認フロー</Text>
                <Text>{values.approvalFlow}</Text>
              </View>
            )}
            {values.approvalFlowDetails && (
              <View style={styles.row}>
                <Text>承認プロセスについての詳細</Text>
                <Text>{values.approvalFlowDetails}</Text>
              </View>
            )}
            {values.projectPriority && (
              <View style={styles.row}>
                <Text>プロジェクトの優先度</Text>
                <Text>{values.projectPriority}</Text>
              </View>
            )}
            {values.pastExperience && (
              <View style={styles.row}>
                <Text>過去のウェブサイト制作経験</Text>
                <Text>{values.pastExperience}</Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};
