import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import React from 'react';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';

import { HearingPdfDocument } from '@/components/pdf/HearingPdf';
import type { EstimateFormValues } from '@/types/estimate';

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
    const body = (await request.json()) as { values: EstimateFormValues };

    if (!body.values) {
      return NextResponse.json({ error: 'Missing form values' }, { status: 400 });
    }

    // 環境変数の確認（開発環境では設定されていない可能性がある）
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const hasEmailConfig = SMTP_USER && SMTP_PASS && DEV_EMAIL;

    if (isDevelopment && !hasEmailConfig) {
      // 開発環境で環境変数が設定されていない場合は、ログのみ出力
      console.log('=== ヒアリングシートPDF送信（開発モード）===');
      console.log('環境変数が設定されていないため、メール送信をスキップしました');
      console.log('設定が必要な環境変数: DEV_EMAIL, SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, FROM_EMAIL');
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

    // PDFを生成
    const pdfDoc = React.createElement(HearingPdfDocument, { values: body.values });
    const pdfBuffer = await renderToBuffer(pdfDoc);

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // メール送信
    const companyName = body.values.companyName || body.values.clientName || '案件';
    const projectName = body.values.projectName || '新規案件';
    const fileName = `ヒアリングシート_${companyName}_${new Date().toISOString().split('T')[0]}.pdf`;

    await transporter.sendMail({
      from: `"LP見積システム" <${FROM_EMAIL}>`,
      to: DEV_EMAIL,
      subject: `【新規ヒアリング】${companyName}様 - ${projectName}`,
      html: `
        <h2>新しいヒアリングシートが提出されました</h2>
        <p><strong>案件名:</strong> ${projectName}</p>
        <p><strong>会社名:</strong> ${companyName}</p>
        <p><strong>担当者:</strong> ${body.values.contactPersonName || '未入力'}</p>
        <p><strong>メール:</strong> ${body.values.contactEmail || '未入力'}</p>
        <p><strong>電話番号:</strong> ${body.values.contactPhone || '未入力'}</p>
        <p><strong>提出日時:</strong> ${new Date().toLocaleString('ja-JP')}</p>
        <hr>
        <p>詳細は添付のPDFファイルをご確認ください。</p>
        <p>---</p>
        <p>このメールは自動送信されています。</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'ヒアリングシートをメール送信しました',
    });
  } catch (error) {
    console.error('Error sending hearing PDF:', error);
    // 開発環境では詳細なエラー情報を返す
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

