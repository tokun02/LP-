# Netlify設定ガイド

## 推奨設定値

Netlifyダッシュボードの「Site settings > Build & deploy > Build settings」で以下の値を設定してください：

### 必須設定

1. **Runtime / Version**
   - **値**: `Node.js 20`
   - **理由**: Next.js 15.5.6はNode.js 18.17以上が必要ですが、.nvmrcでNode.js 20を指定しているため

2. **Base directory**
   - **値**: `LP-main2/lp-estimate-app`
   - **状態**: ✅ 既に設定済み

3. **Package directory**
   - **値**: （空欄のまま、または設定しない）
   - **理由**: Base directoryと同じ場所にあるため不要

4. **Build command**
   - **値**: `npm ci && npm run build`
   - **状態**: ✅ 既に設定済み（推奨）

5. **Publish directory**
   - **値**: `.next`
   - **理由**: Base directoryからの相対パス（`LP-main2/lp-estimate-app/.next`は自動的に解決される）
   - **注意**: `@netlify/plugin-nextjs`プラグインが自動的に処理するため、空欄でも動作します

6. **Functions directory**
   - **値**: `netlify/functions`
   - **理由**: Base directoryからの相対パス
   - **状態**: ✅ 既に設定済み

### オプション設定

- **Deploy log visibility**: `Logs are public`（既に設定済み）
- **Build status**: `Active`（既に設定済み）

## 環境変数

Netlifyダッシュボードの「Site settings > Environment variables」で以下の環境変数を設定してください：

- `NODE_ENV`: `production`（自動設定される）
- その他の環境変数（APIキー、データベース接続情報など）は必要に応じて設定

## 注意事項

- `@netlify/plugin-nextjs`プラグインが自動的にNext.jsの設定を処理します
- `netlify.toml`ファイルでも設定可能ですが、Netlifyダッシュボードの設定が優先されます
- Build commandで`npm ci`を使用することで、依存関係の再現性が保証されます

