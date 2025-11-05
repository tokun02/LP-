# Netlify環境変数設定スクリプト
# 実行方法: .\set-env-vars.ps1

Write-Host "Netlify環境変数を設定します..." -ForegroundColor Cyan

# 実際のGmailアプリパスワードを入力してください
$SMTP_USER = Read-Host "Gmailアドレスを入力してください (例: your-email@gmail.com)"
$SMTP_PASS = Read-Host "Gmailアプリパスワードを入力してください (16文字、スペースなし)"

# 環境変数を設定
Write-Host "`n環境変数を設定中..." -ForegroundColor Yellow

netlify env:set DEV_EMAIL "wooyoung2119sayakaame@gmail.com"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER $SMTP_USER
netlify env:set SMTP_PASS $SMTP_PASS
netlify env:set FROM_EMAIL $SMTP_USER

Write-Host "`n✅ 環境変数の設定が完了しました！" -ForegroundColor Green
Write-Host "次に 'netlify deploy --prod' を実行してデプロイしてください。" -ForegroundColor Cyan

