// 最終更新: 2025-01-27
import type { Metadata } from "next";

const pageTitle = "LP Estimate App｜セミオーダー";
const pageDescription = "セミオーダープランのご案内";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: ["LP Estimate App", "Web制作", "セミオーダー"],
  other: {
    "format-detection": "telephone=no",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "https://lp-estimate.app/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://lp-estimate.app/",
    siteName: pageTitle,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function SemiCustomPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">セミオーダー</h1>
        </div>
      </div>
    </div>
  );
}
