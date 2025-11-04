# Netlify サブモジュールエラー修正ガイド

## 問題
Netlifyのデプロイで以下のエラーが発生：
```
Error checking out submodules: fatal: No url found for submodule path 'LP-main3' in .gitmodules
```

## 解決策

### 1. Netlify環境変数の設定（即座に有効）

Netlifyダッシュボードで以下を設定：
1. Site settings → Build & deploy → Environment
2. 環境変数を追加：
   - Key: `GIT_SUBMODULE_STRATEGY`
   - Value: `none`
3. Save

これにより、Netlifyがサブモジュールをチェックアウトしようとしなくなります。

### 2. リモートリポジトリの`.gitmodules`確認

GitHubのリポジトリで`.gitmodules`ファイルが存在するか確認し、存在する場合は削除してください。

### 3. ローカルでの確認

現在のローカルリポジトリには`.gitmodules`が存在しませんが、リモートリポジトリに存在する可能性があります。

## 推奨アクション

1. **即座の対応**: Netlify環境変数に`GIT_SUBMODULE_STRATEGY=none`を設定
2. **根本対応**: GitHubリポジトリから`.gitmodules`ファイルを削除（Web UI経由）

## `netlify.toml`の確認

現在の設定は正しいです：
```toml
[build]
base = "LP-main2/lp-estimate-app"  # ✅ 正しい相対パス
```


