"use client";

type WireframePreviewProps = {
  type: 'standard-1' | 'standard-2' | 'standard-3' | 'semi-custom' | 'full-custom';
  previewUrl?: string;
};

// ワイヤーフレームのレイアウトを視覚的に表現するコンポーネント
export const WireframePreview = ({ type, previewUrl }: WireframePreviewProps) => {
  // URLがある場合はiframeで実際のページを表示（開発環境のみ）
  if (previewUrl && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-slate-300 bg-white shadow-inner">
        <iframe
          src={previewUrl}
          className="h-full w-full"
          title="ワイヤーフレームプレビュー"
          loading="lazy"
          style={{ border: 'none' }}
        />
      </div>
    );
  }

  // SVGでワイヤーフレームのレイアウトを表現
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-3 shadow-sm">
      <svg
        viewBox="0 0 400 225"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 背景グリッド */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="225" fill="url(#grid)" />

        {type === 'standard-1' && (
          <>
            {/* 標準テンプレート1（ベーシック）: シンプルな1カラム */}
            <rect x="20" y="20" width="360" height="30" rx="2" fill="#3b82f6" opacity="0.3" />
            <text x="30" y="40" fontSize="10" fill="#1e40af" fontWeight="bold">
              ヘッダー
            </text>
            <rect x="20" y="60" width="360" height="130" rx="2" fill="#64748b" opacity="0.2" />
            <text x="30" y="85" fontSize="9" fill="#475569">
              メインコンテンツ（1カラム）
            </text>
            <text x="30" y="105" fontSize="9" fill="#475569">
              シンプルでわかりやすい構成
            </text>
            <rect x="20" y="200" width="360" height="25" rx="2" fill="#94a3b8" opacity="0.3" />
            <text x="30" y="217" fontSize="9" fill="#64748b">
              フッター
            </text>
          </>
        )}

        {type === 'standard-2' && (
          <>
            {/* 標準テンプレート2（スタンダード）: ヘッダー + 2カラム + フッター */}
            <rect x="20" y="20" width="360" height="35" rx="2" fill="#3b82f6" opacity="0.3" />
            <text x="30" y="42" fontSize="10" fill="#1e40af" fontWeight="bold">
              ヘッダー・ナビゲーション
            </text>
            <rect x="20" y="65" width="220" height="105" rx="2" fill="#64748b" opacity="0.2" />
            <text x="30" y="90" fontSize="9" fill="#475569">
              メインコンテンツ
            </text>
            <text x="30" y="105" fontSize="9" fill="#475569">
              （2カラム）
            </text>
            <rect x="250" y="65" width="130" height="105" rx="2" fill="#94a3b8" opacity="0.2" />
            <text x="260" y="85" fontSize="9" fill="#64748b">
              サイドバー
            </text>
            <rect x="20" y="180" width="360" height="35" rx="2" fill="#94a3b8" opacity="0.3" />
            <text x="30" y="202" fontSize="9" fill="#64748b">
              フッター
            </text>
          </>
        )}

        {type === 'standard-3' && (
          <>
            {/* 標準テンプレート3（プレミアム）: 充実したセクション構成 */}
            <rect x="20" y="15" width="360" height="40" rx="2" fill="#3b82f6" opacity="0.3" />
            <text x="30" y="38" fontSize="10" fill="#1e40af" fontWeight="bold">
              ヘッダー・グローバルナビ
            </text>
            <rect x="20" y="60" width="360" height="30" rx="2" fill="#8b5cf6" opacity="0.2" />
            <text x="30" y="80" fontSize="9" fill="#6d28d9">
              ヒーローセクション
            </text>
            <rect x="20" y="95" width="360" height="35" rx="2" fill="#64748b" opacity="0.2" />
            <text x="30" y="115" fontSize="9" fill="#475569">
              特徴・サービス紹介
            </text>
            <rect x="20" y="135" width="175" height="35" rx="2" fill="#94a3b8" opacity="0.2" />
            <text x="30" y="155" fontSize="9" fill="#64748b">
              セクション1
            </text>
            <rect x="205" y="135" width="175" height="35" rx="2" fill="#94a3b8" opacity="0.2" />
            <text x="215" y="155" fontSize="9" fill="#64748b">
              セクション2
            </text>
            <rect x="20" y="180" width="360" height="35" rx="2" fill="#94a3b8" opacity="0.3" />
            <text x="30" y="202" fontSize="9" fill="#64748b">
              フッター（リンク・情報）
            </text>
          </>
        )}

        {type === 'semi-custom' && (
          <>
            {/* セミオーダー: テンプレートベース */}
            <rect x="20" y="20" width="360" height="30" rx="2" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeDasharray="4 4" />
            <text x="30" y="40" fontSize="10" fill="#6d28d9" fontWeight="bold">
              テンプレートベース
            </text>
            <rect x="20" y="60" width="175" height="130" rx="2" fill="#64748b" opacity="0.2" />
            <text x="30" y="85" fontSize="9" fill="#475569">
              カスタマイズ
            </text>
            <text x="30" y="100" fontSize="9" fill="#475569">
              可能エリア
            </text>
            <rect x="205" y="60" width="175" height="130" rx="2" fill="#94a3b8" opacity="0.2" />
            <text x="215" y="85" fontSize="9" fill="#64748b">
              テンプレート
            </text>
            <text x="215" y="100" fontSize="9" fill="#64748b">
              構造
            </text>
            <circle cx="370" cy="125" r="8" fill="#8b5cf6" opacity="0.5" />
            <text x="350" y="130" fontSize="8" fill="#6d28d9">
              +α
            </text>
          </>
        )}

        {type === 'full-custom' && (
          <>
            {/* フルオーダー: 完全オリジナル */}
            <rect x="20" y="20" width="360" height="185" rx="2" fill="#ec4899" opacity="0.1" stroke="#ec4899" strokeDasharray="6 6" strokeWidth="2" />
            <text x="180" y="50" fontSize="12" fill="#db2777" fontWeight="bold">
              完全オリジナル
            </text>
            <text x="150" y="80" fontSize="10" fill="#be185d">
              お客様のご要望に合わせて
            </text>
            <text x="140" y="100" fontSize="10" fill="#be185d">
              ワイヤーフレームから設計
            </text>
            <rect x="50" y="130" width="80" height="60" rx="2" fill="#f472b6" opacity="0.2" />
            <rect x="140" y="130" width="80" height="60" rx="2" fill="#f472b6" opacity="0.2" />
            <rect x="230" y="130" width="80" height="60" rx="2" fill="#f472b6" opacity="0.2" />
            <text x="170" y="170" fontSize="8" fill="#be185d">
              自由なレイアウト構成
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

