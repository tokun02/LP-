## LP制作見積アプリ（Next.js × Netlify）

`.md` ディレクトリにまとめられた要件定義／設計資料をもとに構築した、LP制作の概算見積シミュレーターです。ヒアリングから料金算出、PDF出力までを Next.js App Router 上で完結させています。

### 主な特徴

- **マルチステップ・ヒアリングフォーム**: React Hook Form + Zod で構成し、目的・ターゲット・構成・オプションを段階的に入力。
- **料金テーブル連動のリアルタイム計算**: `src/data/tariffs.ts` のタリフ定義をもとに、デザイン係数や多言語数、各種オプションを即時計算。
- **Zustand + LocalStorage 永続化**: 入力途中でもブラウザに保存され、リロードしても内容を保持します。
- **PDFドラフト出力**: `@react-pdf/renderer` で概算見積書のドラフトをワンクリックでダウンロード可能。
- **ブランドトーンのLanding Page**: 要件書ベースでヒーロー、機能紹介、導入フローを整理し、アプリのコンテキストを提示しています。

### セットアップ

```bash
cd lp-estimate-app
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開くとアプリが表示されます。

### Netlify Functions セットアップ

このアプリはNetlify Functionsを使用してメール送信を行います。

#### 1. Netlify CLI のインストール（開発環境）

```bash
npm install -g netlify-cli
# または
npm install --save-dev netlify-cli
```

#### 2. ローカル開発環境での実行

```bash
# Netlify Functions を含めてローカル開発サーバーを起動
netlify dev
```

これにより、Next.jsとNetlify Functionsの両方が起動します。

#### 3. 環境変数の設定

Netlifyダッシュボードまたは `.env` ファイルで以下を設定してください：

**Netlifyダッシュボードでの設定方法:**
1. サイトの設定 > 環境変数 に移動
2. 以下の変数を追加：

```env
# 開発者メールアドレス（ヒアリングシート送信先）
DEV_EMAIL=developer@example.com

# SMTP設定（メール送信用）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 送信元メールアドレス
FROM_EMAIL=noreply@example.com
```

**ローカル開発用の `.env.local` ファイル:**
プロジェクトルートに `.env.local` を作成して同じ変数を設定します。

**Gmailを使用する場合の注意点:**
- Gmailの2段階認証を有効にする
- 「アプリパスワード」を生成して`SMTP_PASS`に設定する
- 通常のパスワードは使用できません

**メール送信機能について:**
- ヒアリング（ステップ1）完了時、自動的に開発者メールアドレスにPDFが送信されます
- メール送信に失敗しても、ユーザーの操作は中断されません（非同期処理）
- Netlify Functions (`netlify/functions/send-hearing-pdf.ts`) で処理されます

### プロジェクト構造

```
src/
  app/               # ランディングページ & レイアウト
  components/
    estimate/        # フォーム各ステップ、ウィザード、サマリー
    pdf/             # PDF出力用ドキュメント
    ui/              # 共通UI（エラーメッセージ等）
  data/              # 料金テーブル・フォーム選択肢
  store/             # Zustandストア（LocalStorage永続化）
  types/             # 型定義
  utils/             # 計算ロジック
  validation/        # Zodスキーマ
```

### 今後の拡張ヒント

- Netlify Functions / KV 連携（案件保存／共有リンク発行）
- PDF テンプレートのブランド対応と署名付きURL生成
- Vitest / Playwright による自動テスト追加
- Storybook でのコンポーネントカタログ化

### ライセンス

このアプリはリポジトリ同梱の `LICENSE` に従います。
