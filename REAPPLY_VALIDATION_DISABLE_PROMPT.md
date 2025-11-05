# 開発環境での必須項目バリデーション無効化 - 再適用用プロンプト

<!-- 最終更新: 2025-01-11 -->

## 📋 プロンプト（コピー&ペースト用）

```
開発環境で必須項目のバリデーションを無効化してください。

以下の変更を適用してください：

1. src/components/estimate/EstimateWizard.tsx
   - 必須項目バリデーションの`useMemo`内で、開発環境（NODE_ENV === 'development'）の場合は常にtrueを返すようにする
   - 開発環境判定用の定数`isDevelopment`を追加（useMemoの前に定義）
   - useMemoの依存配列に`isDevelopment`を追加

2. src/validation/estimate.ts
   - 開発環境判定用の定数`isDevelopment`を追加（インポート文の後、SITE_PURPOSE_VALUES_LOCALの定義の前）
   - 以下のフィールドの必須チェックを開発環境で無効化：
     * contactEmail: 開発環境ではオプショナル、メール形式チェックのみ（.optional().or(z.literal(''))を含む）
     * industry: 開発環境ではオプショナル（.optional()のみ）
     * targetGender: 開発環境ではオプショナル（.optional()のみ）
     * targetAgeGroups: 開発環境ではオプショナル（.optional()のみ）

本番環境では従来通り必須項目チェックが有効になるようにしてください。
```

## 🎯 使い方

1. 上記のプロンプトをコピー
2. AIアシスタントに送信
3. 変更が適用されることを確認
4. 開発サーバーを再起動して動作確認

## 📝 詳細な変更内容

詳細は `DEVELOPMENT_VALIDATION_DISABLE.md` を参照してください。

