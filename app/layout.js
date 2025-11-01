import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Myao Translate",
  description:
    "Myao Translate — 缅甸语/中文/英文智能互译平台，မြောက်ဘာသာပြန်ဝန်ဆောင်မှုမှာ မျိုးစုံစီးပွားရေးနှင့်နေ့စဉ်ဆက်သွယ်ရေးအတွက် တိကျသည့် ဘာသာပြန်ချက်များကို ပေးဆောင်သည်။",
  keywords: [
    "缅甸语翻译",
    "中文翻译",
    "英语翻译",
    "中缅英互译",
    "မြန်မာဘာသာမှတရုတ်ဘာသာ",
    "မြန်မာဘာသာမှအင်္ဂလိပ်ဘာသာ",
    "Myao Translate",
    "Burmese Chinese English translation",
  ],
  openGraph: {
    title: "Myao Translate | 中缅英智能互译平台",
    description:
      "面向缅甸用户的智能翻译工具，支持缅甸语/中文/英文即时互译，帮助商务、旅行及日常沟通。",
  },
  twitter: {
    card: "summary",
    title: "Myao Translate",
    description:
      "缅甸语、中文、英文三语互译助手，随时随地获得自然准确的翻译结果。",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
