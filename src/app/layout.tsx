import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ServiceWorker } from "@/components/ServiceWorker";
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
  title: {
    default: "Afinador de Violão Online — Grátis e Preciso",
    template: "%s · Afinador de Violão",
  },
  description:
    "Afinador online de violão grátis. Detecção de pitch em tempo real com algoritmo MPM. Suporta afinações Padrão, Drop D, Open G, DADGAD e mais.",
  applicationName: "Afinador",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Afinador",
  },
  formatDetection: { telephone: false },
  keywords: [
    "afinador",
    "afinador de violão",
    "afinador online",
    "afinador online grátis",
    "afinador eletrônico online",
    "tuner",
    "guitar tuner",
    "drop d",
    "open g",
    "dadgad",
  ],
  openGraph: {
    title: "Afinador de Violão Online — Grátis e Preciso",
    description:
      "Afinador online preciso, em tempo real, direto do navegador. Sem instalar nada.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afinador de Violão Online",
    description: "Afinador online preciso, em tempo real, direto do navegador.",
  },
  robots: {
    index: true,
    follow: true,
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
        <ServiceWorker />
      </body>
    </html>
  );
}
