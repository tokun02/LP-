import { NextRequest, NextResponse } from 'next/server';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import path from 'path';
import fs from 'fs';

import { createEstimateDocument } from '@/components/pdf/EstimatePdf';
import type { EstimateBreakdown, EstimateFormValues } from '@/types/estimate';

// フォント登録状態を管理（モジュールレベルで一度だけ実行）
let fontsRegistered = false;

// 日本語フォントを登録（サーバー側で実行）
// Netlify環境でも動作するよう、複数のパスパターンを試行
const registerFonts = () => {
  // 既に登録済みの場合はスキップ
  if (fontsRegistered) {
    return true;
  }

  try {
    // 複数のパスパターンを試行（Netlify環境に対応）
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'fonts', 'static'),
      path.join(process.cwd(), 'LP-main2', 'lp-estimate-app', 'public', 'fonts', 'static'),
      path.join(process.cwd(), '.next', 'static', 'fonts'),
    ];

    let fontsFound = false;
    const fontsDebugInfo: string[] = [];
    
    for (const fontsDir of possiblePaths) {
      const regularFont = path.join(fontsDir, 'NotoSansJP-Regular.ttf');
      const mediumFont = path.join(fontsDir, 'NotoSansJP-Medium.ttf');
      const boldFont = path.join(fontsDir, 'NotoSansJP-Bold.ttf');

      const regularExists = fs.existsSync(regularFont);
      const mediumExists = fs.existsSync(mediumFont);
      const boldExists = fs.existsSync(boldFont);
      
      fontsDebugInfo.push(`${fontsDir}: Regular=${regularExists}, Medium=${mediumExists}, Bold=${boldExists}`);

      if (regularExists && mediumExists && boldExists) {
        try {
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
          fontsFound = true;
          fontsRegistered = true;
          console.log('✅ フォント登録成功:', fontsDir);
          break;
        } catch (registerError) {
          // 既に登録されている可能性がある場合は成功とみなす
          if (registerError instanceof Error && registerError.message.includes('already registered')) {
            fontsFound = true;
            fontsRegistered = true;
            console.log('✅ フォントは既に登録されています');
            break;
          }
          console.warn('フォント登録エラー（このパス）:', fontsDir, registerError);
        }
      }
    }

    if (!fontsFound) {
      console.warn('⚠️ フォントファイルが見つかりません。デフォルトフォントを使用します。');
      console.warn('フォント検索パス:', fontsDebugInfo);
      // フォントが見つからなくてもPDF生成は続行可能（デフォルトフォントで動作）
      fontsRegistered = true; // 再試行を防ぐ
    }

    return fontsFound;
  } catch (error) {
    // フォント登録エラーは無視（既に登録されている可能性がある）
    console.warn('⚠️ フォント登録エラー（無視して続行）:', error);
    fontsRegistered = true; // 再試行を防ぐ
    return false;
  }
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const debugInfo: Record<string, unknown> = {
    step: 'initialization',
    timestamp: new Date().toISOString(),
  };

  try {
    // デバッグ情報: 環境情報を収集
    debugInfo.environment = {
      nodeEnv: process.env.NODE_ENV,
      cwd: process.cwd(),
      platform: process.platform,
      arch: process.arch,
    };

    console.log('📄 PDF生成開始...', debugInfo);

    const body = await request.json();
    const { values, breakdown }: { values: EstimateFormValues; breakdown: EstimateBreakdown } = body;

    if (!values || !breakdown) {
      return NextResponse.json(
        { error: 'valuesとbreakdownが必要です' },
        { status: 400 },
      );
    }

    debugInfo.step = 'validation';
    debugInfo.valuesKeys = Object.keys(values);
    debugInfo.breakdownKeys = Object.keys(breakdown);

    // フォントを登録（各リクエストごとに実行、ただし登録済みの場合はスキップ）
    debugInfo.step = 'font_registration';
    const fontRegistered = registerFonts();
    debugInfo.fontRegistered = fontRegistered;

    // 見積PDFを生成
    let pdfBuffer: Buffer;
    try {
      debugInfo.step = 'document_creation';
      console.log('📝 PDFドキュメント作成開始...');
      
      const pdfDoc = createEstimateDocument({
        values,
        breakdown,
      });
      
      debugInfo.step = 'document_created';
      debugInfo.documentCreated = true;
      console.log('✅ PDFドキュメント作成完了、レンダリング開始...');
      
      debugInfo.step = 'rendering';
      debugInfo.renderStartTime = Date.now();
      
      // タイムアウト対策: 長時間実行を避けるため、Promise.raceを使用
      const renderPromise = renderToBuffer(pdfDoc);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('PDF生成がタイムアウトしました（30秒）')), 30000);
      });
      
      pdfBuffer = await Promise.race([renderPromise, timeoutPromise]);
      
      debugInfo.renderEndTime = Date.now();
      debugInfo.renderDuration = (debugInfo.renderEndTime as number) - (debugInfo.renderStartTime as number);
      debugInfo.step = 'rendering_complete';
      debugInfo.pdfSize = pdfBuffer.length;
      
      console.log('✅ PDF生成成功、サイズ:', pdfBuffer.length, 'bytes', '所要時間:', debugInfo.renderDuration, 'ms');
    } catch (error) {
      debugInfo.step = 'error';
      debugInfo.errorOccurred = true;
      debugInfo.errorTime = Date.now();
      debugInfo.totalDuration = (debugInfo.errorTime as number) - startTime;
      
      console.error('❌ PDF生成エラー:', error);
      
      // より詳細なエラー情報をログに出力
      if (error instanceof Error) {
        debugInfo.errorDetails = {
          message: error.message,
          stack: error.stack,
          name: error.name,
          cause: error.cause,
        };
        console.error('エラー詳細:', debugInfo.errorDetails);
      } else {
        debugInfo.errorDetails = {
          error: String(error),
          type: typeof error,
        };
      }
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // ユーザー向けのエラーメッセージを返す（デバッグ情報も含める）
      return NextResponse.json(
        { 
          error: `PDFの生成に失敗しました: ${errorMessage}`,
          debug: debugInfo,
          details: process.env.NODE_ENV === 'development' || process.env.NETLIFY_DEV ? (error instanceof Error ? error.stack : undefined) : undefined,
        },
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

    debugInfo.step = 'conversion';
    debugInfo.conversionComplete = true;
    debugInfo.totalDuration = Date.now() - startTime;

    console.log('✅ PDF生成完了、総所要時間:', debugInfo.totalDuration, 'ms');

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
    debugInfo.step = 'unhandled_error';
    debugInfo.errorOccurred = true;
    debugInfo.totalDuration = Date.now() - startTime;
    
    console.error('❌ リクエスト処理エラー:', error);
    
    if (error instanceof Error) {
      debugInfo.errorDetails = {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: `リクエストの処理に失敗しました: ${errorMessage}`,
        debug: debugInfo,
      },
      { status: 500 },
    );
  }
}
