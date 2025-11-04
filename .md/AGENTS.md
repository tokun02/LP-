# Repository Guidelines

## プロジェクト構造とモジュール構成
本リポジトリはモノレポ構成で、アプリケーションは`apps/`に配置します。`apps/api`はNestJSベースの決済オーケストレータ、`apps/checkout`は埋め込みチェックアウトUI、`apps/dashboard`は事業者向けツールです。共有ライブラリや型定義は`packages/`（例：`packages/chain-adapters`、`packages/sdk-browser`、`packages/typings`）にまとめます。インフラと運用手順は`infra/`に置き、企画・設計ドキュメントはルート直下の`*.md`に保持します。Supabaseのマイグレーションは`apps/api/migrations/`へ追加し、対応する型を`packages/typings/`で更新してください。

## ビルド・テスト・開発コマンド
依存関係はリポジトリ直下で`pnpm install`を実行して一括導入します。ローカル開発では`pnpm --filter api dev`（API）、`pnpm --filter checkout dev`（チェックアウトUI）、`pnpm --filter dashboard dev`（ダッシュボード）を使います。全パッケージのビルドは`pnpm build`、静的解析は`pnpm lint`、整形は`pnpm format`で実行します。スキーマを変更した際は`pnpm --filter api db:generate`で生成物を更新し、差分を確認してください。

## コーディングスタイルと命名規約
TypeScriptはstrict modeとES2022モジュールを前提とし、インデントは2スペース、フォーマッタはPrettier（`pnpm format`）を使用します。変数・関数は`camelCase`、ReactコンポーネントやNestプロバイダ、DTOは`PascalCase`、環境変数は`UPPER_SNAKE_CASE`で命名します。SQLマイグレーションではスネークケース（例：`payment_id`、`confirmed_at`）を徹底し、特異な処理には簡潔なコメントを添えます。ログやエラー文言はJPYC仕様書と用語を合わせてください。

## テストガイドライン
共有パッケージとアダプターはVitest、NestJSモジュールはJestでテストします。全体テストは`pnpm test`、APIのスモークテストは`pnpm --filter api test:e2e`を実行します。統合テストは`__tests__/integration/`に配置し、ファイル名は`<feature>.spec.ts`形式に統一します。`apps/api`のステートメントカバレッジは85%以上を維持し、主要変更時は`reports/coverage/`に成果物を残します。チェーンアダプターへ変更を加える場合は、PR前に`pnpm --filter chain-adapters test:replay`でリプレイハーネスを確認してください。

## コミットとプルリクエストガイドライン
コミットメッセージはConventional Commits（`feat:`、`fix:`、`chore:`、`refactor:`など）を使用し、件名は72文字以内、本文でリスクやロールバック手順を明記します。プルリクエストでは目的、影響するチェーンや環境、関連Issue、UI/APIの変更点を記述し、必要に応じてスクリーンショットやトレースを添付します。ウォレット連携、鍵管理、Webhook検証、制裁/KYC処理に触れる場合はセキュリティレビューを依頼し、CI成功と手動確認を済ませてからマージしてください。

## セキュリティと設定のヒント
シークレットはVault管理下の環境ファイルに保管し、`.env*`をコミットしないでください。Webhook署名鍵は四半期ごとにローテーションし、手順を`infra/runbooks/`へ記録します。本番反映前にはRPC冗長構成、制裁スクリーニング設定、MPC/HSMの稼働、Supabaseロールポリシーを点検し、JPYC決済のコンプライアンス要件を満たしていることを確認します。

## 日本語厳守ルール
コード内コメント、ドキュメント、エラーメッセージ、ログ、UI表示は原則日本語で記述します。API、DB、UIなど一般的な技術用語は英語のまま利用できますが、説明文は日本語で補足してください。変数名や関数名は英語でも構いませんが、付随するコメントは日本語で統一し、データベースのカラムコメントも日本語で記載します。

## 📅 ファイル更新時の日時記載ルール
すべてのファイル更新時には、以下の形式で日時を記載する：
- ファイルの先頭または適切な場所に `<!-- 最終更新: YYYY-MM-DD HH:MM -->` を追加
- 重要な変更時は `<!-- 変更履歴: YYYY-MM-DD - 変更内容 -->` を記載
- ドキュメントファイル（.md）は特に必須とする