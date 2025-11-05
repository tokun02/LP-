# Netlify ブランチデプロイ設定ガイド

## 現在の設定

- **Production branch**: `main3`（本番環境）
- **Branch deploys**: 現在は「Deploy only the production branch」に設定されているため、main3ブランチのみがデプロイされます

## 共同開発で複数ブランチをデプロイ可能にする方法

### 方法1: Netlifyダッシュボードで設定（推奨）

1. **Netlifyダッシュボードにアクセス**
   - https://app.netlify.com にログイン
   - サイトを選択

2. **「Site settings」→「Build & deploy」→「Branch deploys」に移動**

3. **「Branch deploys」セクションで設定を変更**
   - **「Deploy only the production branch」**（現在の設定）
     - main3ブランチのみがデプロイされます
   
   - **「Let me add individual branches」**（推奨）
     - デプロイしたいブランチを個別に追加
     - 例: `develop`, `main3` を追加
     - これにより、指定したブランチがプッシュされると自動的にデプロイされます

   - **「Deploy all branches」**
     - すべてのブランチがデプロイされます（注意: リソース消費が増えます）

### 方法2: netlify.tomlで設定

`netlify.toml`ファイルにデプロイコンテキストを追加しました：

```toml
# Production: main3ブランチ（本番環境）
[context.production]
  command = "npm ci && npm run build"

# Branch deploys: developブランチ（開発環境）
[context.develop]
  command = "npm ci && npm run build"

# Branch deploys: その他のブランチ（プレビュー環境）
[context.branch-deploy]
  command = "npm ci && npm run build"
```

## 推奨設定

### ステージング環境と本番環境を分ける場合

1. **Production branch**: `main3`
   - 本番環境として使用
   - 自動的に`https://your-site.netlify.app`にデプロイ

2. **Branch deploys**: `develop`を追加
   - 開発・ステージング環境として使用
   - 自動的に`https://develop--your-site.netlify.app`にデプロイ

3. **Deploy Previews**: 有効
   - Pull Request作成時に自動的にプレビュー環境が作成される
   - `https://deploy-preview-123--your-site.netlify.app`形式のURL

## 設定手順（詳細）

### ステップ1: Branch deploysを有効化

1. Netlifyダッシュボード → **「Site settings」**
2. **「Build & deploy」** → **「Branch deploys」**
3. **「Let me add individual branches」**を選択
4. **「Add branch」**をクリック
5. ブランチ名を入力（例: `develop`）
6. **「Save」**をクリック

### ステップ2: 環境変数の設定（オプション）

ブランチごとに異なる環境変数を設定できます：

1. **「Site settings」** → **「Environment variables」**
2. **「Add a variable」**をクリック
3. 変数名と値を入力
4. **「Scopes」**で適用する環境を選択：
   - **All scopes**: すべての環境
   - **Production**: main3ブランチのみ
   - **Deploy previews**: PRプレビューのみ
   - **Branch deploys**: developブランチなど

### ステップ3: デプロイの確認

- `develop`ブランチにプッシュすると、自動的にデプロイが開始されます
- デプロイ完了後、`https://develop--your-site.netlify.app`でアクセス可能

## ブランチごとのURL

- **本番環境**: `https://your-site.netlify.app`（main3ブランチ）
- **開発環境**: `https://develop--your-site.netlify.app`（developブランチ）
- **プレビュー環境**: `https://deploy-preview-123--your-site.netlify.app`（PRプレビュー）

## 注意事項

1. **リソース消費**: 複数のブランチをデプロイすると、ビルド時間とリソース消費が増えます
2. **環境変数**: ブランチごとに異なる環境変数を設定することを推奨します（特にAPIキーなど）
3. **コスト**: Netlifyの無料プランでも複数ブランチのデプロイは可能ですが、ビルド時間に制限があります

## トラブルシューティング

### ブランチがデプロイされない場合

1. **ブランチ名の確認**: Netlifyダッシュボードでブランチ名が正しく設定されているか確認
2. **GitHub連携の確認**: リポジトリが正しく連携されているか確認
3. **ビルドログの確認**: デプロイログでエラーがないか確認

### 環境変数が適用されない場合

1. **Scopeの確認**: 環境変数のScopeが正しく設定されているか確認
2. **再デプロイ**: 環境変数変更後は、新しいデプロイが必要です

