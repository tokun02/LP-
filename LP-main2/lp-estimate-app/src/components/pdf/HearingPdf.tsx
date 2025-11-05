import React from 'react';
import { Document, Page, StyleSheet, Text, View, type DocumentProps } from '@react-pdf/renderer';

import type { EstimateFormValues } from '@/types/estimate';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 32,
    fontSize: 10,
    fontFamily: 'NotoSansJP',
    color: '#1f2937',
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '2pt solid #1d4ed8',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1d4ed8',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    border: '1pt solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e293b',
    paddingBottom: 6,
    borderBottom: '1pt solid #cbd5e1',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingVertical: 4,
  },
  label: {
    width: '35%',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  value: {
    width: '65%',
    fontSize: 10,
    color: '#1f2937',
  },
  listItem: {
    marginBottom: 6,
    paddingLeft: 8,
    fontSize: 10,
  },
  emptyText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#94a3b8',
  },
});

type HearingPdfDocumentProps = {
  values: EstimateFormValues;
  generatedAt?: Date;
};

// 既存のコンポーネント（後方互換性のため残す）
export const HearingPdfDocument = ({ values, generatedAt = new Date() }: HearingPdfDocumentProps) => {
  const formatValue = (value: unknown): string => {
    if (!value) return '未入力';
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join('、') : '未入力';
    }
    if (typeof value === 'boolean') {
      return value ? 'はい' : 'いいえ';
    }
    return String(value);
  };

  return (
    <Document title={`ヒアリングシート_${values.companyName || values.clientName || '案件'}`}>
      <Page size="A4" style={styles.page}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.heading}>ウェブサイト制作 ヒアリングシート（参考資料）</Text>
          <Text style={styles.subtitle}>作成日: {generatedAt.toLocaleDateString('ja-JP')}</Text>
          <Text style={styles.subtitle}>エンジニア向け資料（内部共有用）</Text>
          <Text style={[styles.subtitle, { fontSize: 9, color: '#94a3b8', marginTop: 4 }]}>
            ※ 本ヒアリングシートは参考資料です。確定見積もりはヒアリング時に別途ご提示いたします。
          </Text>
        </View>

        {/* 1. 基本情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 基本情報</Text>
          <View style={styles.row}>
            <Text style={styles.label}>会社名・団体名</Text>
            <Text style={styles.value}>{formatValue(values.companyName || values.clientName)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ご担当者名</Text>
            <Text style={styles.value}>{formatValue(values.contactPersonName)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>役職・部署</Text>
            <Text style={styles.value}>{formatValue(values.contactPosition)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>メールアドレス</Text>
            <Text style={styles.value}>{formatValue(values.contactEmail)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.value}>{formatValue(values.contactPhone)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>所在地</Text>
            <Text style={styles.value}>{formatValue(values.location)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>業種・業態</Text>
            <Text style={styles.value}>
              {formatValue(values.industry)}
              {values.industryOther ? `（${values.industryOther}）` : ''}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>従業員数</Text>
            <Text style={styles.value}>{formatValue(values.employeeSize)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>公開希望日</Text>
            <Text style={styles.value}>{formatValue(values.launchDate)}</Text>
          </View>
        </View>

        {/* 2. プロジェクト概要 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. プロジェクト概要</Text>
          <View style={styles.row}>
            <Text style={styles.label}>制作の目的</Text>
            <Text style={styles.value}>{formatValue(values.projectPurpose)}</Text>
          </View>
          {values.projectPurposeOther && (
            <View style={styles.row}>
              <Text style={styles.label}>目的（その他）</Text>
              <Text style={styles.value}>{values.projectPurposeOther}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>ページ構成要望</Text>
            <Text style={styles.value}>{formatValue(values.pageStructureRequest)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ターゲット性別</Text>
            <Text style={styles.value}>{formatValue(values.targetGender)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ターゲット年齢層</Text>
            <Text style={styles.value}>{formatValue(values.targetAgeGroups)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ターゲット特徴</Text>
            <Text style={styles.value}>{formatValue(values.targetCharacteristics)}</Text>
          </View>
        </View>

        {/* 3. ブランドイメージ */}
        {(values.brandImage || values.brandValues || values.brandGoals) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. ブランドイメージ・ポジショニング</Text>
            <View style={styles.row}>
              <Text style={styles.label}>ブランドを一言で</Text>
              <Text style={styles.value}>{formatValue(values.brandImage)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>大切にしている価値観</Text>
              <Text style={styles.value}>{formatValue(values.brandValues)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>目指しているもの</Text>
              <Text style={styles.value}>{formatValue(values.brandGoals)}</Text>
            </View>
          </View>
        )}

        {/* 4. 競合分析 */}
        {(values.competitorUrl || values.competitorGoodPoints || values.companyStrengths) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. 競合分析・差別化戦略</Text>
            <View style={styles.row}>
              <Text style={styles.label}>競合サイトURL</Text>
              <Text style={styles.value}>{formatValue(values.competitorUrl)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>競合の良い点</Text>
              <Text style={styles.value}>{formatValue(values.competitorGoodPoints)}</Text>
            </View>
            {values.competitorGoodDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>競合詳細</Text>
                <Text style={styles.value}>{values.competitorGoodDetails}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>競合の改善点</Text>
              <Text style={styles.value}>{formatValue(values.competitorImprovePoints)}</Text>
            </View>
            {values.competitorImproveDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>改善点詳細</Text>
                <Text style={styles.value}>{values.competitorImproveDetails}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>自社の強み</Text>
              <Text style={styles.value}>{formatValue(values.companyStrengths)}</Text>
            </View>
            {values.companyStrengthsDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>強みの詳細</Text>
                <Text style={styles.value}>{values.companyStrengthsDetails}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>差別化の工夫</Text>
              <Text style={styles.value}>{formatValue(values.differentiationIdeas)}</Text>
            </View>
            {values.differentiationDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>差別化詳細</Text>
                <Text style={styles.value}>{values.differentiationDetails}</Text>
              </View>
            )}
          </View>
        )}

        {/* 5. 予算・スケジュール */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 予算・スケジュール</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ご予算</Text>
            <Text style={styles.value}>{formatValue(values.budgetDetail)}</Text>
          </View>
          {values.budgetNote && (
            <View style={styles.row}>
              <Text style={styles.label}>予算補足事項</Text>
              <Text style={styles.value}>{values.budgetNote}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>希望納期</Text>
            <Text style={styles.value}>{formatValue(values.deadline)}</Text>
          </View>
          {values.deadlineSpecific && (
            <View style={styles.row}>
              <Text style={styles.label}>具体的な希望日</Text>
              <Text style={styles.value}>{values.deadlineSpecific}</Text>
            </View>
          )}
        </View>

        {/* 6. 現在のウェブサイト状況 */}
        {values.existingSite && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. 現在のウェブサイト状況</Text>
            <View style={styles.row}>
              <Text style={styles.label}>既存サイトの有無</Text>
              <Text style={styles.value}>{formatValue(values.existingSite)}</Text>
            </View>
            {values.existingSiteUrl && (
              <View style={styles.row}>
                <Text style={styles.label}>既存サイトURL</Text>
                <Text style={styles.value}>{values.existingSiteUrl}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>現在のサイトの問題点</Text>
              <Text style={styles.value}>{formatValue(values.currentSiteIssues)}</Text>
            </View>
            {values.currentSiteIssuesOther && (
              <View style={styles.row}>
                <Text style={styles.label}>問題点（その他）</Text>
                <Text style={styles.value}>{values.currentSiteIssuesOther}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>月間アクセス数</Text>
              <Text style={styles.value}>{formatValue(values.monthlyVisitCount)}</Text>
            </View>
          </View>
        )}

        {/* 7. デザイン要望 */}
        {(values.referenceSiteReason || values.mainColor || values.logoProvided) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. デザイン要望・参考サイト</Text>
            {values.referenceSiteReason && (
              <View style={styles.row}>
                <Text style={styles.label}>参考サイトの理由</Text>
                <Text style={styles.value}>{values.referenceSiteReason}</Text>
              </View>
            )}
            {values.avoidSiteReason && (
              <View style={styles.row}>
                <Text style={styles.label}>避けたいサイトの理由</Text>
                <Text style={styles.value}>{values.avoidSiteReason}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>希望メインカラー</Text>
              <Text style={styles.value}>
                {formatValue(values.mainColor)}
                {values.mainColorOther ? `（${values.mainColorOther}）` : ''}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>ロゴデータ提供</Text>
              <Text style={styles.value}>{formatValue(values.logoProvided)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>写真・画像素材</Text>
              <Text style={styles.value}>{formatValue(values.photoMaterials)}</Text>
            </View>
            {values.photoMaterialsDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>素材詳細</Text>
                <Text style={styles.value}>{values.photoMaterialsDetails}</Text>
              </View>
            )}
            {values.photoShortageHandling && (
              <View style={styles.row}>
                <Text style={styles.label}>素材不足時の対応</Text>
                <Text style={styles.value}>{values.photoShortageHandling}</Text>
              </View>
            )}
          </View>
        )}

        {/* 8. 機能要件 */}
        {(values.basicFeatures || values.advancedFeatures || values.cmsChoice) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. 機能要件</Text>
            <View style={styles.row}>
              <Text style={styles.label}>必要な基本機能</Text>
              <Text style={styles.value}>{formatValue(values.basicFeatures)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>高度な機能</Text>
              <Text style={styles.value}>{formatValue(values.advancedFeatures)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>CMSの希望</Text>
              <Text style={styles.value}>{formatValue(values.cmsChoice)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>更新方法</Text>
              <Text style={styles.value}>{formatValue(values.updateStyle)}</Text>
            </View>
          </View>
        )}

        {/* 9. SEO・マーケティング */}
        {(values.seoImportance || values.targetKeywords || values.currentMarketing) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. SEO・マーケティング要件</Text>
            <View style={styles.row}>
              <Text style={styles.label}>SEO対策の重要度</Text>
              <Text style={styles.value}>{formatValue(values.seoImportance)}</Text>
            </View>
            {values.targetKeywords && (
              <View style={styles.row}>
                <Text style={styles.label}>狙いたいキーワード</Text>
                <Text style={styles.value}>{values.targetKeywords}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>現在実施中の施策</Text>
              <Text style={styles.value}>{formatValue(values.currentMarketing)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>SNS連携の希望</Text>
              <Text style={styles.value}>{formatValue(values.snsIntegration)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>GA4導入状況</Text>
              <Text style={styles.value}>{formatValue(values.ga4Status)}</Text>
            </View>
          </View>
        )}

        {/* 10. 技術・インフラ */}
        {(values.domainChoice || values.serverChoice || values.sslChoice) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. 技術・インフラ要件</Text>
            <View style={styles.row}>
              <Text style={styles.label}>ドメインについて</Text>
              <Text style={styles.value}>
                {formatValue(values.domainChoice)}
                {values.domainExisting ? `（${values.domainExisting}）` : ''}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>サーバーについて</Text>
              <Text style={styles.value}>{formatValue(values.serverChoice)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>SSL証明書</Text>
              <Text style={styles.value}>{formatValue(values.sslChoice)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>対応デバイス</Text>
              <Text style={styles.value}>{formatValue(values.devicesSupported)}</Text>
            </View>
          </View>
        )}

        {/* 11. 保守・運用 */}
        {(values.maintenanceContract || values.backupChoice || values.securityImportance) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. 保守・運用について</Text>
            <View style={styles.row}>
              <Text style={styles.label}>契約形態</Text>
              <Text style={styles.value}>{formatValue(values.maintenanceContract)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>バックアップの希望</Text>
              <Text style={styles.value}>{formatValue(values.backupChoice)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>セキュリティ対策の重要度</Text>
              <Text style={styles.value}>{formatValue(values.securityImportance)}</Text>
            </View>
          </View>
        )}

        {/* 12. プロジェクト進行・その他 */}
        {(values.approvalFlow || values.priorities || values.otherRequests) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. プロジェクト進行・その他</Text>
            <View style={styles.row}>
              <Text style={styles.label}>決裁者・承認フロー</Text>
              <Text style={styles.value}>{formatValue(values.approvalFlow)}</Text>
            </View>
            {values.approvalFlowDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>承認フロー詳細</Text>
                <Text style={styles.value}>{values.approvalFlowDetails}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>過去のWEB制作経験</Text>
              <Text style={styles.value}>{formatValue(values.pastWebExperience)}</Text>
            </View>
            {values.pastWebExperienceDetails && (
              <View style={styles.row}>
                <Text style={styles.label}>過去の経験詳細</Text>
                <Text style={styles.value}>{values.pastWebExperienceDetails}</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>期待すること・重視すること</Text>
              <Text style={styles.value}>{formatValue(values.priorities)}</Text>
            </View>
            {values.otherRequests && (
              <View style={styles.row}>
                <Text style={styles.label}>その他のご要望</Text>
                <Text style={styles.value}>{values.otherRequests}</Text>
              </View>
            )}
            {values.feedback && (
              <View style={styles.row}>
                <Text style={styles.label}>ヒアリングシートへのご感想</Text>
                <Text style={styles.value}>{values.feedback}</Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

// ファクトリ関数：ReactElement<DocumentProps>を返す
export function createHearingDocument({
  values,
  generatedAt = new Date(),
}: HearingPdfDocumentProps): React.ReactElement<DocumentProps> {
  // HearingPdfDocumentは既にDocumentを含んでいるので、そのまま使用して型アサーション
  return React.createElement(HearingPdfDocument, { values, generatedAt }) as React.ReactElement<DocumentProps>;
}

