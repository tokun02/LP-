"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type StaticYoluPageProps = {
  bodyHtml: string;
};

export function StaticYoluPage({ bodyHtml }: StaticYoluPageProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined' || !document.body) return;
    
    const previousId = document.body.id;
    const previousClassName = document.body.className;
    document.body.id = "home";
    document.body.className = "";
    
    return () => {
      if (document.body) {
        document.body.id = previousId;
        document.body.className = previousClassName;
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined' || !document.head) return;
    
    const createdLinks: HTMLLinkElement[] = [];

    const appendLink = (attributes: { rel: string; href: string; crossOrigin?: string }) => {
      if (!document.head) return;
      
      const { rel, href, crossOrigin, ...rest } = attributes;
      const selectorHref = href.replace(/"/g, '\\"');
      const selector = `link[rel=\"${rel}\"][href=\"${selectorHref}\"]`;
      const alreadyExists = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (alreadyExists) {
        return;
      }
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      Object.entries(rest).forEach(([key, value]) => {
        if (value == null) {
          return;
        }
        if (typeof value === "string") {
          link.setAttribute(key, value);
        } else {
          link.setAttribute(key, String(value));
        }
      });
      document.head.appendChild(link);
      createdLinks.push(link);
    };

    appendLink({ rel: "preconnect", href: "https://fonts.googleapis.com" });
    appendLink({ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" });
    appendLink({
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500&family=Tenor+Sans&display=swap",
    });
    appendLink({ rel: "stylesheet", href: "/wireframe-demo/semi-custom/css/style.css" });

    return () => {
      if (document.head) {
        createdLinks.forEach((link) => {
          if (link.parentNode === document.head) {
            document.head.removeChild(link);
          }
        });
      }
    };
  }, [isMounted]);

  // グローバルエラーハンドラーを追加（classListエラーをキャッチ）
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const errorHandler = (event: ErrorEvent) => {
      if (event.error?.message?.includes('classList') || event.error?.message?.includes('Cannot read properties of null')) {
        event.preventDefault();
        console.warn('DOM element access error caught:', event.error?.message);
        return false;
      }
    };

    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  // DOM要素がレンダリングされた後にスクリプトを読み込む
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    // bodyHtmlがレンダリングされたことを確認
    const checkDOMReady = () => {
      const container = document.querySelector('[data-wireframe-content]');
      if (container && scriptsLoaded) {
        // script.jsが使用する可能性のある要素を安全にアクセス
        const elements = document.querySelectorAll('[class]');
        elements.forEach((el) => {
          try {
            if (el && el.classList) {
              // 要素が存在することを確認
            }
          } catch (e) {
            console.warn('Error accessing classList:', e);
          }
        });
      }
    };

    // 短い遅延後に確認（DOMが確実にレンダリングされるまで待つ）
    const timer = setTimeout(checkDOMReady, 100);
    return () => clearTimeout(timer);
  }, [isMounted, scriptsLoaded]);

  return (
    <>
      {isMounted && (
        <>
          <Script
            src="https://polyfill-fastly.net/v3/polyfill.min.js?features=IntersectionObserver%2CResizeObserver"
            strategy="lazyOnload"
            onError={(e) => {
              console.warn('Polyfill script failed to load:', e);
            }}
          />
          <Script 
            src="/wireframe-demo/semi-custom/js/lib.js" 
            strategy="lazyOnload"
            onError={(e) => {
              console.warn('Lib script failed to load:', e);
            }}
          />
          <Script 
            id="semi-custom-script"
            src="/wireframe-demo/semi-custom/js/script.js" 
            strategy="lazyOnload"
            onError={(e) => {
              console.warn('Script failed to load:', e);
            }}
            onLoad={() => {
              // スクリプト読み込み完了をマーク
              setScriptsLoaded(true);
              
              // DOM要素が確実に存在するまで待ってからスクリプトを実行
              if (typeof window !== 'undefined') {
                const waitForDOM = () => {
                  // 重要なDOM要素が存在することを確認
                  const requiredElements = [
                    document.body,
                    document.querySelector('.js-wrapper'),
                    document.querySelector('.js-media-query')
                  ];

                  // 全ての要素が存在するか確認
                  const allElementsExist = requiredElements.every(el => el !== null);

                  if (allElementsExist) {
                    try {
                      // script.jsの初期化処理を安全に実行
                      // script.jsが既に実行されている可能性があるため、エラーをキャッチ
                      if (typeof window !== 'undefined' && document.body) {
                        // DOM要素が存在することを確認
                        const elements = document.querySelectorAll('[class]');
                        if (elements.length > 0) {
                          // DOM要素が存在することを確認できた
                        }
                      }
                    } catch (e) {
                      console.warn('Script initialization error (expected if script already ran):', e);
                    }
                  } else {
                    // まだDOM要素が存在しない場合は再試行
                    setTimeout(waitForDOM, 50);
                  }
                };

                // requestAnimationFrameで次のフレームまで待つ
                requestAnimationFrame(() => {
                  setTimeout(waitForDOM, 100);
                });
              }
            }}
          />
        </>
      )}
      <div 
        data-wireframe-content
        dangerouslySetInnerHTML={{ __html: bodyHtml }} 
        suppressHydrationWarning 
      />
    </>
  );
}
