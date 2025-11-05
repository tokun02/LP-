#!/bin/bash
# Netlify環境変数設定スクリプト
# 実行方法: bash set-env-vars.sh

echo "Netlify環境変数を設定します..."

# 実際のGmailアプリパスワードを入力してください
read -p "Gmailアドレスを入力してください (例: your-email@gmail.com): " SMTP_USER
read -p "Gmailアプリパスワードを入力してください (16文字、スペースなし): " SMTP_PASS

# 環境変数を設定
echo ""
echo "環境変数を設定中..."

netlify env:set DEV_EMAIL "wooyoung2119sayakaame@gmail.com"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER "$SMTP_USER"
netlify env:set SMTP_PASS "$SMTP_PASS"
netlify env:set FROM_EMAIL "$SMTP_USER"

echo ""
echo "✅ 環境変数の設定が完了しました！"
echo "次に 'netlify deploy --prod' を実行してデプロイしてください。"

