"use client";

type WireframePreviewProps = {
  type: 'standard-1' | 'standard-2' | 'standard-3' | 'semi-custom' | 'full-custom';
  templateId?: string; // テンプレートID（詳細なワイヤーフレーム表示用）
  previewUrl?: string; // プレビューURL（将来のデモページ用、現在は未使用）
};

// ワイヤーフレームのレイアウトを視覚的に表現するコンポーネント
// パフォーマンス最適化: 常にSVGで表示（iframeは使用しない）
// 詳細はクリック時に新規タブで表示されるため、初期読み込み時の負荷はゼロ
export const WireframePreview = ({ type, templateId }: WireframePreviewProps) => {
  // SVGでワイヤーフレームのレイアウトを表現
  // 注: 実際のデモサイトはクリック時に新規タブで開かれるため、ここでは表示しない
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
            {/* セミオーダー: テンプレートIDに応じた異なるデザイン */}
            {templateId === 'semi-custom-1' && (
              <>
                {/* セミオーダー1: シンプルカスタマイズ - 1カラム + カスタムエリア */}
                <rect x="20" y="15" width="360" height="35" rx="2" fill="#8b5cf6" opacity="0.25" stroke="#8b5cf6" strokeDasharray="3 3" />
                <text x="30" y="35" fontSize="10" fill="#6d28d9" fontWeight="bold">ヘッダー（カスタマイズ可）</text>
                <rect x="20" y="55" width="360" height="25" rx="2" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="30" y="72" fontSize="9" fill="#6d28d9">カスタムバナー</text>
                <rect x="20" y="85" width="360" height="90" rx="2" fill="#64748b" opacity="0.2" />
                <text x="30" y="105" fontSize="9" fill="#475569">メインコンテンツ（1カラム）</text>
                <rect x="30" y="115" width="340" height="50" rx="1" fill="#94a3b8" opacity="0.15" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="40" y="135" fontSize="8" fill="#6d28d9">カスタマイズエリア</text>
                <rect x="20" y="180" width="360" height="30" rx="2" fill="#94a3b8" opacity="0.25" />
                <text x="30" y="198" fontSize="9" fill="#64748b">フッター</text>
              </>
            )}
            {templateId === 'semi-custom-2' && (
              <>
                {/* セミオーダー2: スタンダードカスタマイズ - 2カラム + カスタムウィジェット */}
                <rect x="20" y="15" width="360" height="40" rx="2" fill="#8b5cf6" opacity="0.25" stroke="#8b5cf6" strokeDasharray="3 3" />
                <text x="30" y="38" fontSize="10" fill="#6d28d9" fontWeight="bold">ヘッダー・ナビ（カスタマイズ）</text>
                <rect x="20" y="60" width="240" height="100" rx="2" fill="#64748b" opacity="0.2" />
                <text x="30" y="80" fontSize="9" fill="#475569">メインコンテンツ</text>
                <rect x="30" y="90" width="220" height="60" rx="1" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="40" y="110" fontSize="8" fill="#6d28d9">カスタムセクション</text>
                <rect x="270" y="60" width="110" height="100" rx="2" fill="#94a3b8" opacity="0.2" />
                <text x="280" y="80" fontSize="9" fill="#64748b">サイドバー</text>
                <rect x="280" y="90" width="90" height="25" rx="1" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="285" y="107" fontSize="8" fill="#6d28d9">カスタムウィジェット</text>
                <rect x="20" y="165" width="360" height="35" rx="2" fill="#94a3b8" opacity="0.25" />
                <text x="30" y="185" fontSize="9" fill="#64748b">フッター</text>
              </>
            )}
            {templateId === 'semi-custom-3' && (
              <>
                {/* セミオーダー3: プレミアムカスタマイズ - マルチセクション + 高度なカスタマイズ */}
                <rect x="20" y="10" width="360" height="45" rx="2" fill="#8b5cf6" opacity="0.25" stroke="#8b5cf6" strokeDasharray="3 3" />
                <text x="30" y="32" fontSize="10" fill="#6d28d9" fontWeight="bold">ヘッダー・グローバルナビ（カスタマイズ）</text>
                <rect x="20" y="60" width="360" height="35" rx="2" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="30" y="82" fontSize="9" fill="#6d28d9">カスタムヒーローセクション</text>
                <rect x="20" y="100" width="175" height="70" rx="2" fill="#64748b" opacity="0.2" />
                <text x="30" y="120" fontSize="9" fill="#475569">セクション1</text>
                <rect x="30" y="130" width="155" height="30" rx="1" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="40" y="150" fontSize="8" fill="#6d28d9">カスタム要素</text>
                <rect x="205" y="100" width="175" height="70" rx="2" fill="#64748b" opacity="0.2" />
                <text x="215" y="120" fontSize="9" fill="#475569">セクション2</text>
                <rect x="215" y="130" width="155" height="30" rx="1" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="225" y="150" fontSize="8" fill="#6d28d9">カスタム要素</text>
                <rect x="20" y="175" width="360" height="35" rx="2" fill="#94a3b8" opacity="0.25" />
                <text x="30" y="195" fontSize="9" fill="#64748b">フッター（カスタマイズ可）</text>
              </>
            )}
            {(!templateId || templateId === 'semi-custom-4') && (
              <>
                {/* セミオーダー4: ハイブリッド - 複合レイアウト */}
                <rect x="20" y="15" width="360" height="35" rx="2" fill="#8b5cf6" opacity="0.25" stroke="#8b5cf6" strokeDasharray="3 3" />
                <text x="30" y="35" fontSize="10" fill="#6d28d9" fontWeight="bold">ハイブリッドヘッダー</text>
                <rect x="20" y="55" width="360" height="30" rx="2" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeDasharray="2 2" />
                <text x="30" y="75" fontSize="9" fill="#6d28d9">複合バナー</text>
                <rect x="20" y="90" width="110" height="80" rx="2" fill="#64748b" opacity="0.2" />
                <text x="30" y="110" fontSize="8" fill="#475569">エリアA</text>
                <rect x="140" y="90" width="120" height="80" rx="2" fill="#64748b" opacity="0.2" />
                <text x="150" y="110" fontSize="8" fill="#475569">エリアB</text>
                <rect x="270" y="90" width="110" height="80" rx="2" fill="#64748b" opacity="0.2" />
                <text x="280" y="110" fontSize="8" fill="#475569">エリアC</text>
                <rect x="20" y="175" width="360" height="30" rx="2" fill="#94a3b8" opacity="0.25" />
                <text x="30" y="193" fontSize="9" fill="#64748b">フッター</text>
              </>
            )}
          </>
        )}

        {type === 'full-custom' && (
          <>
            {/* フルオーダー: テンプレートIDに応じた異なるオリジナルデザイン */}
            {templateId === 'full-custom-1' && (
              <>
                {/* フルオーダー1: シンプルオリジナル - ミニマルデザイン */}
                <rect x="20" y="15" width="360" height="40" rx="2" fill="#ec4899" opacity="0.15" stroke="#ec4899" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="30" y="38" fontSize="10" fill="#db2777" fontWeight="bold">オリジナルヘッダー（ミニマル）</text>
                <rect x="20" y="60" width="360" height="140" rx="2" fill="#f472b6" opacity="0.1" stroke="#ec4899" strokeDasharray="3 3" />
                <text x="180" y="90" fontSize="11" fill="#be185d" fontWeight="bold">完全オリジナルコンテンツ</text>
                <rect x="50" y="100" width="300" height="80" rx="1" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="180" y="145" fontSize="9" fill="#be185d">シンプルで効率的な構成</text>
                <rect x="20" y="205" width="360" height="15" rx="2" fill="#f472b6" opacity="0.15" />
                <text x="30" y="215" fontSize="8" fill="#be185d">ミニマルフッター</text>
              </>
            )}
            {templateId === 'full-custom-2' && (
              <>
                {/* フルオーダー2: スタンダードオリジナル - バランス重視 */}
                <rect x="20" y="10" width="360" height="45" rx="2" fill="#ec4899" opacity="0.15" stroke="#ec4899" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="30" y="35" fontSize="10" fill="#db2777" fontWeight="bold">オリジナルヘッダー</text>
                <rect x="20" y="60" width="360" height="30" rx="2" fill="#f472b6" opacity="0.1" stroke="#ec4899" strokeDasharray="3 3" />
                <text x="30" y="80" fontSize="9" fill="#be185d">ヒーローセクション</text>
                <rect x="20" y="95" width="170" height="75" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="30" y="115" fontSize="9" fill="#be185d">セクションA</text>
                <rect x="210" y="95" width="170" height="75" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="220" y="115" fontSize="9" fill="#be185d">セクションB</text>
                <rect x="20" y="175" width="360" height="35" rx="2" fill="#f472b6" opacity="0.15" />
                <text x="30" y="195" fontSize="9" fill="#be185d">オリジナルフッター</text>
              </>
            )}
            {templateId === 'full-custom-3' && (
              <>
                {/* フルオーダー3: プレミアムオリジナル - 高機能・多セクション */}
                <rect x="20" y="8" width="360" height="50" rx="2" fill="#ec4899" opacity="0.15" stroke="#ec4899" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="30" y="32" fontSize="10" fill="#db2777" fontWeight="bold">プレミアムオリジナルヘッダー</text>
                <rect x="20" y="63" width="360" height="35" rx="2" fill="#f472b6" opacity="0.1" stroke="#ec4899" strokeDasharray="3 3" />
                <text x="30" y="85" fontSize="9" fill="#be185d">大型ヒーローセクション</text>
                <rect x="20" y="103" width="115" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="30" y="123" fontSize="8" fill="#be185d">機能A</text>
                <rect x="145" y="103" width="115" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="155" y="123" fontSize="8" fill="#be185d">機能B</text>
                <rect x="270" y="103" width="110" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="280" y="123" fontSize="8" fill="#be185d">機能C</text>
                <rect x="20" y="158" width="360" height="40" rx="2" fill="#f472b6" opacity="0.1" stroke="#ec4899" strokeDasharray="3 3" />
                <text x="30" y="180" fontSize="9" fill="#be185d">追加セクション</text>
                <rect x="20" y="203" width="360" height="17" rx="2" fill="#f472b6" opacity="0.15" />
                <text x="30" y="214" fontSize="8" fill="#be185d">フッター</text>
              </>
            )}
            {(!templateId || templateId === 'full-custom-4') && (
              <>
                {/* フルオーダー4: エンタープライズオリジナル - 大規模・複雑構成 */}
                <rect x="20" y="5" width="360" height="55" rx="2" fill="#ec4899" opacity="0.15" stroke="#ec4899" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="30" y="30" fontSize="10" fill="#db2777" fontWeight="bold">エンタープライズヘッダー</text>
                <rect x="20" y="65" width="360" height="40" rx="2" fill="#f472b6" opacity="0.1" stroke="#ec4899" strokeDasharray="3 3" />
                <text x="30" y="88" fontSize="9" fill="#be185d">大型ヒーロー + ナビゲーション</text>
                <rect x="20" y="110" width="85" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="30" y="130" fontSize="8" fill="#be185d">モジュール1</text>
                <rect x="115" y="110" width="85" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="125" y="130" fontSize="8" fill="#be185d">モジュール2</text>
                <rect x="210" y="110" width="85" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="220" y="130" fontSize="8" fill="#be185d">モジュール3</text>
                <rect x="305" y="110" width="75" height="50" rx="2" fill="#f472b6" opacity="0.08" stroke="#ec4899" strokeDasharray="2 2" />
                <text x="315" y="130" fontSize="8" fill="#be185d">モジュール4</text>
                <rect x="20" y="165" width="360" height="30" rx="2" fill="#f472b6" opacity="0.1" stroke="#ec4899" strokeDasharray="3 3" />
                <text x="30" y="185" fontSize="9" fill="#be185d">追加セクション群</text>
                <rect x="20" y="200" width="360" height="20" rx="2" fill="#f472b6" opacity="0.15" />
                <text x="30" y="213" fontSize="8" fill="#be185d">エンタープライズフッター</text>
              </>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

