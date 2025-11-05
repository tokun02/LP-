import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import React from 'react';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';

import { HearingPdfDocument } from '../../src/components/pdf/HearingPdf';
import type { EstimateFormValues } from '../../src/types/estimate';

// 開発者のメールアドレス（環境変数から取得、デフォルト値設定）
const DEV_EMAIL = process.env.DEV_EMAIL || 'developer@example.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com';

export const handler: Handler = async (event, context) => {
  // CORS ヘッダーを設定（必要に応じて）
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // OPTIONS リクエストの処理（CORS preflight）
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // POST リクエストのみ処理
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}') as { values: EstimateFormValues };

    if (!body.values) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing form values' }),
      };
    }

    // PDFを生成
    const pdfDoc = React.createElement(HearingPdfDocument, { values: body.values }) as React.ReactElement<DocumentProps>;
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'ヒアリングシートをメール送信しました',
      }),
    };
  } catch (error) {
    console.error('Error sending hearing PDF:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'メール送信に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
