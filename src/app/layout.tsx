import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: "Afinador de Violão",
  description:
    "Afinador online de violão de alta sensibilidade. Detecção de pitch em tempo real (algoritmo MPM) com suporte a múltiplas afinações e calibração A4.",
  applicationName: "Afinador",
  keywords: [
    "afinador",
    "afinador de violão",
    "afinador online",
    "tuner",
    "guitar tuner",
    "drop d",
    "open g",
  ],
  openGraph: {
    title: "Afinador de Violão",
    description: "Afinador online preciso, em tempo real, direto do navegador.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
