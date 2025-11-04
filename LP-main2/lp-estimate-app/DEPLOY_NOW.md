# 🚀 Netlifyデプロイ手順（簡易版）

## 方法1: GitHub連携（推奨・最も簡単）

### ステップ1: GitHubにプッシュ
```bash
cd E:\LP222\LP-main3\LP-main2\lp-estimate-app
git add .
git commit -m "Netlifyデプロイ準備完了"
git push origin main
```

### ステップ2: Netlifyでサイトを作成
1. https://www.netlify.com/ にアクセス
2. ログイン（GitHubアカウントでログイン推奨）
3. 「Add new site」→「Import an existing project」をクリック
4. GitHubを選択
5. リポジトリを選択（例: `LP222` または該当リポジトリ）
6. ブランチを選択（例: `main` または `main3`）

### ステップ3: ビルド設定（自動設定）
- **Build command**: `npm run build`（自動設定）
- **Publish directory**: `.next`（自動設定）
- **Base directory**: `LP-main3/LP-main2/lp-estimate-app`（プロジェクトのパスに応じて調整）

### ステップ4: 環境変数を設定
1. サイトの設定 > 「Environment variables」を開く
2. 以下の環境変数を追加：

```
DEV_EMAIL=wooyoung2119sayakaame@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
FROM_EMAIL=your-gmail@gmail.com
NODE_VERSION=18
```

**重要**: 
- `SMTP_USER`はGmailアドレス（例: `your-email@gmail.com`）
- `SMTP_PASS`はGmailアプリパスワード（16文字、スペースなし）
- アプリパスワードの生成方法は `GMAIL_SETUP_GUIDE.md` を参照

### ステップ5: デプロイ開始
1. 「Deploy site」をクリック
2. ビルドが完了するまで待機（約3-5分）
3. デプロイが完了すると、サイトURLが表示されます

---

## 方法2: Netlify CLIでデプロイ

### ステップ1: Netlify CLIでログイン
```bash
cd E:\LP222\LP-main3\LP-main2\lp-estimate-app
npm install -g netlify-cli
netlify login
```

### ステップ2: サイトを初期化
```bash
netlify init
```
- プロンプトに従って設定
- 既存サイトに接続するか、新規サイトを作成するか選択

### ステップ3: 環境変数を設定
```bash
netlify env:set DEV_EMAIL "wooyoung2119sayakaame@gmail.com"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER "your-gmail@gmail.com"
netlify env:set SMTP_PASS "your-16-char-app-password"
netlify env:set FROM_EMAIL "your-gmail@gmail.com"
```

### ステップ4: デプロイ
```bash
netlify deploy --prod
```

---

## ✅ デプロイ後の確認事項

1. **サイトが正常に表示されるか確認**
   - Netlifyダッシュボードで表示されるURLにアクセス
   - トップページが正常に表示されるか確認

2. **PDFダウンロード機能をテスト**
   - 見積フォームを入力
   - 「PDFをダウンロード」ボタンをクリック
   - PDFが正常に生成されるか確認

3. **メール送信機能をテスト**
   - PDFダウンロード時にメールが送信されるか確認
   - `DEV_EMAIL`にメールが届くか確認

4. **エラーログの確認**
   - Netlifyダッシュボード > Functions > ログを確認
   - エラーがないか確認

---

## 🔧 トラブルシューティング

### ビルドエラーが発生する場合
1. **Node.jsバージョンの確認**
   - Netlifyダッシュボードで `NODE_VERSION=18` を設定
   - `.nvmrc` ファイルが存在することを確認

2. **ビルドログの確認**
   - Netlifyダッシュボード > Deploys > ビルドログを確認
   - エラーメッセージを確認

### メール送信が動作しない場合
1. **環境変数の確認**
   - Netlifyダッシュボードで環境変数が正しく設定されているか確認
   - `SMTP_PASS`が16文字のアプリパスワードであることを確認

2. **Functionsログの確認**
   - Netlifyダッシュボード > Functions > ログを確認
   - エラーメッセージを確認

---

## 📚 関連ドキュメント

- [詳細なデプロイガイド](./NETLIFY_DEPLOY_GUIDE.md)
- [Gmail設定ガイド](./GMAIL_SETUP_GUIDE.md)
- [Netlify公式ドキュメント](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)

---

## 🎉 デプロイ成功！

デプロイが完了したら、Netlifyダッシュボードで表示されるURLを確認してください。
サイトが正常に動作していることを確認できたら、本番環境へのデプロイ完了です！

