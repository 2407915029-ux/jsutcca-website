import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jsutcca.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JSUTCCA",
    template: "%s | JSUTCCA"
  },
  description: "Campus stray cat rescue, neutering, medical care, adoption, and public event records.",
  openGraph: {
    title: "JSUTCCA",
    description: "Campus stray cat rescue, neutering, medical care, adoption, and public event records.",
    url: siteUrl,
    siteName: "JSUTCCA",
    locale: "zh_CN",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
