import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';

import { createEstimateDocument } from '@/components/pdf/EstimatePdf';
import { createHearingDocument } from '@/components/pdf/HearingPdf';
import type { EstimateBreakdown, EstimateFormValues } from '@/types/estimate';

// 日本語フォントを登録（サーバー側で実行）
const registerFonts = () => {
  try {
    const fontsDir = path.join(process.cwd(), 'public', 'fonts', 'static');
    const regularFont = path.join(fontsDir, 'NotoSansJP-Regular.ttf');
    const mediumFont = path.join(fontsDir, 'NotoSansJP-Medium.ttf');
    const boldFont = path.join(fontsDir, 'NotoSansJP-Bold.ttf');

    // フォントファイルが存在するか確認
    if (fs.existsSync(regularFont) && fs.existsSync(mediumFont) && fs.existsSync(boldFont)) {
      Font.register({
        family: 'NotoSansJP',
        fonts: [
          {
            src: regularFont,
            fontWeight: 400,
          },
          {
            src: mediumFont,
            fontWeight: 500,
          },
          {
            src: boldFont,
            fontWeight: 700,
          },
        ],
      });
    } else {
      console.warn('フォントファイルが見つかりません。デフォルトフォントを使用します。');
    }
  } catch (error) {
    // フォント登録エラーは無視（既に登録されている可能性がある）
    console.warn('Font registration warning:', error);
  }
};

// フォントを登録
registerFonts();

// 開発者のメールアドレス（環境変数から取得、デフォルト値設定）
const DEV_EMAIL = process.env.DEV_EMAIL || 'developer@example.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      values: EstimateFormValues;
      breakdown: EstimateBreakdown;
    };

    if (!body.values || !body.breakdown) {
      return NextResponse.json({ error: 'Missing form values or breakdown' }, { status: 400 });
    }

    // 環境変数の確認（開発環境では設定されていない可能性がある）
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const hasEmailConfig = SMTP_USER && SMTP_PASS && DEV_EMAIL;

    if (isDevelopment && !hasEmailConfig) {
      // 開発環境で環境変数が設定されていない場合は、ログのみ出力
      console.log('=== 見積PDF送信（開発モード）===');
      console.log('環境変数が設定されていないため、メール送信をスキップしました');
      console.log('設定が必要な環境変数: DEV_EMAIL, SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, FROM_EMAIL');
      console.log('現在の環境変数状態:', {
        DEV_EMAIL: DEV_EMAIL ? '設定済み' : '未設定',
        SMTP_USER: SMTP_USER ? '設定済み' : '未設定',
        SMTP_PASS: SMTP_PASS ? '設定済み（' + SMTP_PASS.length + '文字）' : '未設定',
        SMTP_HOST: SMTP_HOST,
        SMTP_PORT: SMTP_PORT,
        FROM_EMAIL: FROM_EMAIL ? '設定済み' : '未設定',
      });
      console.log('案件情報:', {
        companyName: body.values.companyName || body.values.clientName || '案件',
        projectName: body.values.projectName || '新規案件',
        contactEmail: body.values.contactEmail || '未入力',
      });

      return NextResponse.json({
        success: true,
        message: '開発環境: メール送信をスキップしました（環境変数が設定されていません）',
        skipped: true,
      });
    }

    // 環境変数が設定されているが、認証情報が正しくない可能性がある場合のチェック
    if (!SMTP_USER || !SMTP_PASS) {
      console.error('❌ SMTP認証情報が設定されていません');
      return NextResponse.json(
        {
          error: 'SMTP認証情報が設定されていません',
          hint: '.env.localファイルにSMTP_USERとSMTP_PASSを設定してください',
        },
        { status: 500 },
      );
    }

    console.log('📧 PDF生成開始...');
    
    // 見積PDFを生成（ファクトリ関数を使用）
    let estimatePdfBuffer: Buffer;
    try {
      const estimatePdfDoc = createEstimateDocument({
        values: body.values,
        breakdown: body.breakdown,
      });
      estimatePdfBuffer = await renderToBuffer(estimatePdfDoc);
      console.log('✅ 見積PDF生成成功');
    } catch (error) {
      console.error('❌ 見積PDF生成エラー:', error);
      throw new Error(`見積PDFの生成に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // ヒアリングPDFを生成（ファクトリ関数を使用）
    let hearingPdfBuffer: Buffer;
    try {
      const hearingPdfDoc = createHearingDocument({
        values: body.values,
      });
      hearingPdfBuffer = await renderToBuffer(hearingPdfDoc);
      console.log('✅ ヒアリングPDF生成成功');
    } catch (error) {
      console.error('❌ ヒアリングPDF生成エラー:', error);
      throw new Error(`ヒアリングPDFの生成に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      ...(isDevelopment && {
        // 開発環境でのみSSL証明書の検証をスキップ（本番環境では推奨されません）
        tls: {
          rejectUnauthorized: false,
        },
      }),
    });

    // メール送信
    const companyName = body.values.companyName || body.values.clientName || '案件';
    const projectName = body.values.projectName || '新規案件';
    const dateStr = new Date().toISOString().split('T')[0];
    const estimateFileName = `Webサイト見積_${projectName.replace(/\s+/g, '_')}_${dateStr}.pdf`;
    const hearingFileName = `ヒアリングシート_${companyName.replace(/\s+/g, '_')}_${dateStr}.pdf`;

    const totalAmount = body.breakdown.totalWithTax.toLocaleString();

    console.log('📧 メール送信開始...', {
      to: DEV_EMAIL,
      subject: `【見積PDF】${companyName}様 - ${projectName} (合計: ${totalAmount}円)`,
    });

    await transporter.sendMail({
      from: `"LP見積システム" <${FROM_EMAIL}>`,
      to: DEV_EMAIL,
      subject: `【見積PDF】${companyName}様 - ${projectName} (合計: ${totalAmount}円)`,
      html: `
        <h2>新しい見積PDFがダウンロードされました</h2>
        <p><strong>案件名:</strong> ${projectName}</p>
        <p><strong>会社名:</strong> ${companyName}</p>
        <p><strong>担当者:</strong> ${body.values.contactPersonName || body.values.clientName || '未入力'}</p>
        <p><strong>メール:</strong> ${body.values.contactEmail || '未入力'}</p>
        <p><strong>電話番号:</strong> ${body.values.contactPhone || '未入力'}</p>
        <p><strong>見積合計:</strong> ${totalAmount}円（税込）</p>
        <p><strong>ダウンロード日時:</strong> ${new Date().toLocaleString('ja-JP')}</p>
        <hr>
        <p>詳細は添付のPDFファイルをご確認ください。</p>
        <ul>
          <li>見積PDF: ${estimateFileName}</li>
          <li>ヒアリングPDF: ${hearingFileName}</li>
        </ul>
        <p>---</p>
        <p>このメールは自動送信されています。</p>
      `,
      attachments: [
        {
          filename: estimateFileName,
          content: estimatePdfBuffer,
          contentType: 'application/pdf',
        },
        {
          filename: hearingFileName,
          content: hearingPdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    console.log('✅ メール送信成功');

    return NextResponse.json({
      success: true,
      message: '見積PDFとヒアリングPDFをメール送信しました',
    });
  } catch (error) {
    console.error('❌ Error sending estimate PDF:', error);
    
    // 認証エラーの場合、詳細な情報を提供
    if (error instanceof Error && 'code' in error && error.code === 'EAUTH') {
      const isDevelopment = process.env.NODE_ENV !== 'production';
      console.error('認証エラーが発生しました。以下を確認してください:');
      console.error('1. Gmailの2段階認証が有効になっているか');
      console.error('2. アプリパスワードが正しく生成されているか');
      console.error('3. .env.localファイルのSMTP_USERとSMTP_PASSが正しく設定されているか');
      console.error('4. SMTP_USERはメールアドレス（例: your-email@gmail.com）');
      console.error('5. SMTP_PASSは16文字のアプリパスワード（スペースなし）');
      
      return NextResponse.json(
        {
          error: 'Gmail認証に失敗しました',
          details: 'ユーザー名またはパスワードが正しくありません',
          hint: isDevelopment
            ? [
                '1. Gmailの2段階認証を有効にしてください',
                '2. アプリパスワードを生成してください（https://myaccount.google.com/apppasswords）',
                '3. .env.localファイルのSMTP_USERとSMTP_PASSを確認してください',
                '4. SMTP_USER: メールアドレス（例: your-email@gmail.com）',
                '5. SMTP_PASS: 16文字のアプリパスワード（スペースなし）',
                '6. 開発サーバーを再起動してください',
              ]
            : 'Gmailの認証情報を確認してください',
        },
        { status: 500 },
      );
    }

    // その他のエラー
    const isDevelopment = process.env.NODE_ENV !== 'production';
    return NextResponse.json(
      {
        error: 'メール送信に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error',
        ...(isDevelopment && {
          hint: '環境変数（DEV_EMAIL, SMTP_USER, SMTP_PASS等）が正しく設定されているか確認してください',
        }),
      },
      { status: 500 },
    );
  }
}

