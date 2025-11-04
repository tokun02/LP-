// 環境変数チェックスクリプト
// 実行方法: node check-env.js

const requiredEnvVars = [
  'DEV_EMAIL',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'FROM_EMAIL',
];

console.log('=== 環境変数チェック ===\n');

let hasError = false;

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    // パスワードは表示しない
    if (varName === 'SMTP_PASS') {
      console.log(`✅ ${varName}: ${'*'.repeat(value.length)} (${value.length}文字)`);
    } else {
      console.log(`✅ ${varName}: ${value}`);
    }
  } else {
    console.log(`❌ ${varName}: 設定されていません`);
    hasError = true;
  }
});

console.log('\n=== チェック結果 ===');
if (hasError) {
  console.log('❌ 一部の環境変数が設定されていません。');
  console.log('\n以下の内容を .env.local に設定してください：\n');
  console.log('# Gmail SMTP設定');
  console.log('DEV_EMAIL=wooyoung2119sayakaame@gmail.com');
  console.log('SMTP_HOST=smtp.gmail.com');
  console.log('SMTP_PORT=587');
  console.log('SMTP_USER=wooyoung2119sayakaame@gmail.com');
  console.log('SMTP_PASS=ここにアプリパスワードを貼り付け');
  console.log('FROM_EMAIL=wooyoung2119sayakaame@gmail.com');
  process.exit(1);
} else {
  console.log('✅ すべての環境変数が設定されています！');
  process.exit(0);
}

