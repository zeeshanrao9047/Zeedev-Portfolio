import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "Zeeshan Ahmad | Full-Stack Developer",
  description:
    "Portfolio of Zeeshan Ahmad, a full-stack developer with 5+ years of experience in React, Next.js, Node.js, Laravel and AWS, based in Lahore / Islamabad.",
};

export const viewport = { themeColor: "#13101f", viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
