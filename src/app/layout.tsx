import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "二つ名メーカー｜王道×シュール異名＆RPGステータス診断",
  description:
    "名前を入力するだけで、あなただけの『二つ名（異名）』とRPG風ステータス・推定戦闘力・固有スキルを魔導書が鑑定！Xで結果カード付きシェアが可能。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${shipporiMincho.className} antialiased min-h-screen bg-[#070605] text-stone-100`}>
        {children}
      </body>
    </html>
  );
}
