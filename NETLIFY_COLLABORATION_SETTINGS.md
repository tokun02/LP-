# Netlify 共同開発設定ガイド

## 現在の設定（共同開発可能）

### 設定内容
- **Production branch**: `main3`（本番環境）
- **Branch deploys**: `Deploy all branches pushed to the repository` ✅
- **Deploy Previews**: `Any pull request against your production branch / branch deploy branches` ✅

## この設定で可能になること

### ✅ 共同開発が完全に可能

1. **すべてのブランチが自動デプロイ**
   - チームメンバーが任意のブランチにプッシュすると、自動的にデプロイされます
   - 例: `feature/new-feature`, `develop`, `hotfix/bug-fix` など

2. **Pull Requestプレビュー**
   - PRを作成すると、自動的にプレビュー環境が作成されます
   - レビュー前に動作確認が可能

3. **ブランチごとのURL**
   - 各ブランチに固有のURLが生成されます
   - 例: `https://feature-new-feature--your-site.netlify.app`

## ブランチごとのURL形式

### Production（本番環境）
- **URL**: `https://your-site.netlify.app`
- **ブランチ**: `main3`
- **用途**: 本番環境

### Branch Deploys（ブランチデプロイ）
- **URL**: `https://branch-name--your-site.netlify.app`
- **ブランチ**: すべてのブランチ（main3以外）
- **用途**: 開発・テスト環境

### Deploy Previews（プレビュー環境）
- **URL**: `https://deploy-preview-123--your-site.netlify.app`
- **ブランチ**: PRが作成されたブランチ
- **用途**: PRレビュー用

## 注意事項と推奨事項

### ⚠️ 注意点

1. **リソース消費**
   - すべてのブランチがデプロイされるため、ビルド時間とリソース消費が増えます
   - Netlifyの無料プランでは、月間ビルド時間に制限があります（300分）

2. **ブランチ名の管理**
   - ブランチ名がURLに含まれるため、適切な命名規則を推奨
   - 例: `feature/`, `develop/`, `hotfix/` などのプレフィックスを使用

3. **環境変数の管理**
   - 本番環境と開発環境で異なる環境変数が必要な場合
   - Netlifyダッシュボードで環境変数のScopeを設定できます

### ✅ 推奨事項

1. **環境変数のScope設定**
   - **Production**: 本番用の環境変数（APIキーなど）
   - **All scopes**: すべての環境で使用する環境変数
   - **Deploy previews**: PRプレビューのみ

2. **ブランチ命名規則**
   ```
   feature/新機能名
   develop/開発ブランチ
   hotfix/バグ修正
   release/リリース準備
   ```

3. **不要なブランチの削除**
   - マージ済みのブランチは削除して、リソースを節約

## より制御された設定（オプション）

もし「すべてのブランチ」ではなく「特定のブランチのみ」をデプロイしたい場合：

### 設定変更方法

1. Netlifyダッシュボード → **「Site settings」** → **「Build & deploy」** → **「Branch deploys」**
2. **「Deploy all branches」** → **「Let me add individual branches」**に変更
3. デプロイしたいブランチを個別に追加（例: `develop`, `staging`）

### メリット
- 必要なブランチのみデプロイできるため、リソース消費を抑制
- より明確な環境管理が可能

### デメリット
- 新しいブランチを追加するたびに設定が必要

## 現在の設定で問題ない場合

**「Deploy all branches」**のままで問題ありません。以下の場合に特に適しています：

- ✅ 小規模チーム
- ✅ 頻繁にブランチを作成・削除する開発フロー
- ✅ すべてのブランチで動作確認したい場合
- ✅ ビルド時間に余裕がある場合

## トラブルシューティング

### ブランチがデプロイされない場合

1. **ブランチ名の確認**: 特殊文字が含まれていないか確認
2. **GitHub連携の確認**: リポジトリが正しく連携されているか確認
3. **ビルドログの確認**: エラーがないか確認

### ビルド時間が不足する場合

1. **不要なブランチの削除**: マージ済みブランチを削除
2. **ビルド設定の最適化**: `npm ci`の代わりに`npm install`を使用（キャッシュを活用）
3. **Netlifyプランの見直し**: 有料プランへのアップグレードを検討

