import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "江理工喵喵队",
    template: "%s | 江理工喵喵队"
  },
  description: "校园猫咪救助、绝育、医疗、领养与公益活动记录网站",
  openGraph: {
    title: "江理工喵喵队",
    description: "校园猫咪救助、绝育、医疗、领养与公益活动记录网站",
    url: siteUrl,
    siteName: "江理工喵喵队",
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
