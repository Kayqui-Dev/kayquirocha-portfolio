import type { Metadata } from "next";
import { Playfair_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kayqui Origami | Interação IA & Force Crush",
  description: "Uma experiência interativa tridimensional de origami utilizando visão computacional (MediaPipe Holistic) e animações GSAP.",
  keywords: [
    "Kayqui Rocha",
    "Origami",
    "MediaPipe",
    "Holistic Tracking",
    "GSAP",
    "Force Crush",
    "Webcam Interaction",
    "Creative Development"
  ],
  authors: [{ name: "Kayqui Rocha Godinho" }],
  creator: "Kayqui Rocha Godinho",
  openGraph: {
    title: "Kayqui Origami | Interação IA & Force Crush",
    description: "Uma experiência interativa tridimensional de origami utilizando visão computacional.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayqui Origami | Interação IA & Force Crush",
    description: "Uma experiência interativa tridimensional de origami utilizando visão computacional.",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#000000] text-[#f4f4f5]">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
