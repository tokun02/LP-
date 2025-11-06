import { NextRequest, NextResponse } from 'next/server';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';

import { createEstimateDocument } from '@/components/pdf/EstimatePdf';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { values, breakdown }: { values: EstimateFormValues; breakdown: EstimateBreakdown } = body;

    if (!values || !breakdown) {
      return NextResponse.json(
        { error: 'valuesとbreakdownが必要です' },
        { status: 400 },
      );
    }

    console.log('📄 PDF生成開始...');

    // 見積PDFを生成
    let pdfBuffer: Buffer;
    try {
      const pdfDoc = createEstimateDocument({
        values,
        breakdown,
      });
      pdfBuffer = await renderToBuffer(pdfDoc);
      console.log('✅ PDF生成成功、サイズ:', pdfBuffer.length, 'bytes');
    } catch (error) {
      console.error('❌ PDF生成エラー:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json(
        { error: `PDFの生成に失敗しました: ${errorMessage}` },
        { status: 500 },
      );
    }

    // BufferをUint8Arrayに変換してNextResponseに渡す（BodyInit型の要件を満たすため）
    // renderToBufferは常にBufferを返すが、型安全性を確保するため明示的なチェックを行う
    let responseBody: Uint8Array;

    if (Buffer.isBuffer(pdfBuffer)) {
      // Node Buffer -> Uint8Array（最も一般的なケース）
      responseBody = new Uint8Array(pdfBuffer);
    } else if (ArrayBuffer.isView(pdfBuffer)) {
      // TypedArrayまたはDataViewの場合
      const view = pdfBuffer as ArrayBufferView;
      responseBody = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    } else if ((pdfBuffer as unknown) instanceof ArrayBuffer) {
      // ArrayBufferの場合（型アサーションを使用してinstanceofチェックを許可）
      responseBody = new Uint8Array(pdfBuffer as ArrayBuffer);
    } else {
      // フォールバック（他の型の場合）- 直接Uint8Arrayに変換
      responseBody = new Uint8Array(pdfBuffer as ArrayLike<number>);
    }

    // PDFを返す（Uint8ArrayはBodyInitの有効な型の一つ）
    // 型アサーションを使用してBodyInitとして明示的に指定
    return new NextResponse(responseBody as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Webサイト見積_${(values.projectName || '案件').replace(/\s+/g, '_')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('❌ リクエスト処理エラー:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `リクエストの処理に失敗しました: ${errorMessage}` },
      { status: 500 },
    );
  }
}
