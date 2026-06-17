import type { Metadata } from "next";
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
  title: "Kayqui Rocha | Full-Stack Developer & Atleta de Wrestling",
  description: "Portfólio pessoal de Kayqui Rocha Godinho. Desenvolvedor Full-Stack & Atleta de Luta Livre Olímpica (Wrestling). Unindo a resiliência e disciplina do esporte de combate com a precisão do desenvolvimento web moderno.",
  keywords: [
    "Kayqui Rocha Godinho",
    "Kayqui Rocha",
    "Desenvolvedor Full-Stack",
    "Full-Stack Developer",
    "Next.js Portfolio",
    "Wrestling Atleta",
    "Luta Livre Olimpica",
    "Kodava Solutions",
    "Supabase",
    "n8n",
    "IA",
  ],
  authors: [{ name: "Kayqui Rocha Godinho" }],
  creator: "Kayqui Rocha Godinho",
  openGraph: {
    title: "Kayqui Rocha | Full-Stack Developer & Atleta de Wrestling",
    description: "Unindo a resiliência do esporte de combate com a precisão do desenvolvimento web.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayqui Rocha | Full-Stack Developer & Atleta de Wrestling",
    description: "Unindo a resiliência do esporte de combate com a precisão do desenvolvimento web.",
  },
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
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#f4f4f5]">
        {children}
      </body>
    </html>
  );
}
