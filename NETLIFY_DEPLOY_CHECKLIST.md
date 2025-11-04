# Netlifyデプロイ確認チェックリスト

## ✅ 実施済みの対策

1. **Netlify環境変数の設定**
   - `GIT_SUBMODULE_STRATEGY=none`を設定済み

2. **Gitリポジトリのクリーンアップ**
   - `.gitmodules`ファイルを削除済み
   - `.gitignore`に`LP-main3/`を追加済み

3. **`netlify.toml`の確認**
   - `base = "LP-main2/lp-estimate-app"`（正しい相対パス）
   - `NODE_VERSION = "20"`（適切な設定）

## 🔍 デプロイ結果の確認方法

### 1. Netlifyダッシュボードで確認

1. https://app.netlify.com にアクセス
2. サイトを選択
3. **「Deploys」タブ**を開く
4. 最新のデプロイを確認

### 2. 確認すべきポイント

#### ✅ 成功している場合
- ✅ 「preparing repo」フェーズを通過
- ✅ 「Error checking out submodules」エラーが消えている
- ✅ 「Installing dependencies」に進んでいる
- ✅ 「Building site」に進んでいる
- ✅ 最終的に「Published」状態になる

#### ❌ まだ問題がある場合

**A. まだサブモジュールエラーが出る場合**
- 環境変数`GIT_SUBMODULE_STRATEGY=none`が正しく設定されているか確認
- 環境変数は「Build & deploy」→「Environment」で確認可能
- 設定後、**新しいデプロイをトリガー**する必要があります

**B. 別のエラーが出る場合**
- エラーメッセージを確認
- 一般的なエラー：
  - **Base directory does not exist**: `netlify.toml`の`base`パスを確認
  - **Build command failed**: `npm ci`や`npm run build`のエラーを確認
  - **Type errors**: 型エラーを修正

## 🚀 次のアクション

### デプロイが成功した場合
- 本番URLを確認
- アプリケーションが正常に動作するか確認

### デプロイが失敗した場合
1. エラーログの内容を確認
2. エラーの種類に応じて対応：
   - サブモジュールエラー → 環境変数の再確認
   - ビルドエラー → ローカルで`npm run build`を実行して確認
   - 型エラー → TypeScriptのエラーを修正

## 📝 トラブルシューティング

### 環境変数が反映されない場合
1. 環境変数を保存した後、**必ず新しいデプロイをトリガー**
2. 「Trigger deploy」→「Deploy site」をクリック
3. または、新しいコミットをプッシュ

### サブモジュールエラーが続く場合
1. GitHubリポジトリで`.gitmodules`ファイルが存在しないか確認
2. 存在する場合は、GitHubのWeb UIから削除
3. リポジトリの設定でサブモジュールが登録されていないか確認

## 🔗 参考リンク

- Netlify環境変数の設定: https://docs.netlify.com/environment-variables/overview/
- Gitサブモジュールの無効化: https://docs.netlify.com/configure-builds/repo-permissions-linking/#git-submodules


