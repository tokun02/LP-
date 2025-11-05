import { NextResponse } from 'next/server';

// 環境変数チェック用のAPIエンドポイント
// 本番環境では削除するか、認証を追加することを推奨
export async function GET() {
  const DEV_EMAIL_RAW = process.env.DEV_EMAIL || '未設定';
  const DEV_EMAILS = DEV_EMAIL_RAW !== '未設定' 
    ? DEV_EMAIL_RAW.split(',').map((email) => email.trim()).filter((email) => email.length > 0)
    : [];

  const envVars = {
    DEV_EMAIL: DEV_EMAIL_RAW,
    DEV_EMAILS: DEV_EMAILS.length > 0 ? DEV_EMAILS : '未設定',
    SMTP_HOST: process.env.SMTP_HOST || '未設定',
    SMTP_PORT: process.env.SMTP_PORT || '未設定',
    SMTP_USER: process.env.SMTP_USER || '未設定',
    SMTP_PASS: process.env.SMTP_PASS ? `設定済み（${process.env.SMTP_PASS.length}文字）` : '未設定',
    FROM_EMAIL: process.env.FROM_EMAIL || '未設定',
    NODE_ENV: process.env.NODE_ENV || '未設定',
  };

  const requiredVars = ['DEV_EMAIL', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'FROM_EMAIL'];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  const allSet = missingVars.length === 0;

  return NextResponse.json(
    {
      status: allSet ? '✅ すべての環境変数が設定されています' : '❌ 一部の環境変数が設定されていません',
      allSet,
      missingVars,
      envVars: {
        ...envVars,
        // セキュリティのため、SMTP_PASSは長さのみ表示
        SMTP_PASS: process.env.SMTP_PASS ? `設定済み（${process.env.SMTP_PASS.length}文字）` : '未設定',
      },
      hint: allSet
        ? '環境変数は正常に設定されています。メール送信機能が利用可能です。'
        : `以下の環境変数が設定されていません: ${missingVars.join(', ')}`,
    },
    { status: allSet ? 200 : 500 },
  );
}

