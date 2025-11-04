# Netlifyデプロイガイド

このガイドでは、LP見積アプリをNetlifyにデプロイする手順を説明します。

## 📋 事前準備

### 1. Netlifyアカウントの作成
- https://www.netlify.com/ にアクセス
- アカウントを作成（GitHub連携推奨）

### 2. 必要なツール
- Node.js（v18以上推奨）
- Git
- Netlify CLI（オプション）

## 🚀 デプロイ方法

### 方法1: GitHub連携（推奨）

#### ステップ1: GitHubリポジトリにプッシュ
```bash
# リポジトリにコミット・プッシュ
git add .
git commit -m "Netlifyデプロイ準備"
git push origin main
```

#### ステップ2: Netlifyでサイトをインポート
1. Netlifyダッシュボードにログイン
2. 「Add new site」→「Import an existing project」をクリック
3. GitHubを選択してリポジトリを選択
4. ブランチを選択（例: `main` または `main3`）

#### ステップ3: ビルド設定
以下の設定が自動的に適用されます：
- **Build command**: `npm run build`
- **Publish directory**: `.next`

#### ステップ4: 環境変数の設定
Netlifyダッシュボードで以下の環境変数を設定：

**サイト設定 > 環境変数 > 新しい環境変数を追加**

```
DEV_EMAIL=wooyoung2119sayakaame@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
NODE_VERSION=18
```

#### ステップ5: デプロイ
- 「Deploy site」をクリック
- ビルドが完了するまで待機（約3-5分）

---

### 方法2: Netlify CLIを使用

#### ステップ1: Netlify CLIのインストール
```bash
npm install -g netlify-cli
```

#### ステップ2: ログイン
```bash
netlify login
```

#### ステップ3: サイトの初期化
```bash
cd LP-main3/LP-main2/lp-estimate-app
netlify init
```

#### ステップ4: 環境変数の設定
```bash
netlify env:set DEV_EMAIL "wooyoung2119sayakaame@gmail.com"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER "your-email@gmail.com"
netlify env:set SMTP_PASS "your-app-password"
netlify env:set FROM_EMAIL "your-email@gmail.com"
```

#### ステップ5: デプロイ
```bash
netlify deploy --prod
```

---

## ⚙️ 設定ファイル

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  directory = "netlify/functions"
```

### 必要な環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `DEV_EMAIL` | メール送信先アドレス | `wooyoung2119sayakaame@gmail.com` |
| `SMTP_HOST` | SMTPサーバー | `smtp.gmail.com` |
| `SMTP_PORT` | SMTPポート | `587` |
| `SMTP_USER` | SMTPユーザー名（メールアドレス） | `your-email@gmail.com` |
| `SMTP_PASS` | SMTPパスワード（アプリパスワード） | `16文字のアプリパスワード` |
| `FROM_EMAIL` | 送信元メールアドレス | `your-email@gmail.com` |
| `NODE_VERSION` | Node.jsバージョン（オプション） | `18` |

---

## 🔧 トラブルシューティング

### ビルドエラーが発生する場合

1. **Node.jsバージョンの確認**
   - Netlifyダッシュボードで `NODE_VERSION=18` を設定

2. **ビルドログの確認**
   - Netlifyダッシュボード > Deploys > ビルドログを確認

3. **依存関係の確認**
   ```bash
   npm install
   npm run build
   ```

### メール送信が動作しない場合

1. **環境変数の確認**
   - Netlifyダッシュボードで環境変数が正しく設定されているか確認

2. **Gmailアプリパスワードの確認**
   - アプリパスワードが正しく生成されているか確認
   - スペースなしの16文字であることを確認

3. **ログの確認**
   - Netlifyダッシュボード > Functions > ログを確認

---

## 📝 デプロイ後の確認事項

1. ✅ サイトが正常に表示されるか
2. ✅ PDFダウンロード機能が動作するか
3. ✅ メール送信機能が動作するか
4. ✅ フォーム送信が正常に動作するか

---

## 🔗 関連ドキュメント

- [Gmail設定ガイド](./GMAIL_SETUP_GUIDE.md)
- [Netlify公式ドキュメント](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)

