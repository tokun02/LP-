# フォントファイルの配置

このフォルダには、PDF生成に使用する日本語フォントファイルを配置してください。

## 必要なフォントファイル

以下の3つのフォントファイルを配置してください：

1. `NotoSansJP-Regular.woff2` (フォントウェイト: 400)
2. `NotoSansJP-Medium.woff2` (フォントウェイト: 500)
3. `NotoSansJP-Bold.woff2` (フォントウェイト: 700)

## ダウンロード方法

### 方法1: Google Fontsから直接ダウンロード

1. https://fonts.google.com/noto/specimen/Noto+Sans+JP にアクセス
2. 「Download family」をクリック
3. ダウンロードしたZIPファイルを解凍
4. `NotoSansJP-Regular.woff2`, `NotoSansJP-Medium.woff2`, `NotoSansJP-Bold.woff2` をこのフォルダに配置

### 方法2: Google Fonts Helperを使用

1. https://google-webfonts-helper.herokuapp.com/fonts/noto-sans-jp にアクセス
2. 必要なフォントウェイト（400, 500, 700）を選択
3. 「Select this style」をクリック
4. ダウンロードリンクをクリックして `.woff2` ファイルをダウンロード
5. ファイル名を適切にリネームしてこのフォルダに配置

### 方法3: GitHubからダウンロード

Noto Sans JPのフォントファイルは以下のGitHubリポジトリからも取得できます：
- https://github.com/google/fonts/tree/main/ofl/notosansjp

### 方法4: npm パッケージを使用

```bash
npm install @fontsource/noto-sans-jp
# その後、node_modules/@fontsource/noto-sans-jp/files/ からフォントファイルをコピー
```

## 注意事項

- フォントファイルを配置しないと、PDFの文字化けが発生します
- フォントファイルは必ず `.woff2` 形式を使用してください
- ファイル名は大文字小文字を正確に一致させる必要があります

