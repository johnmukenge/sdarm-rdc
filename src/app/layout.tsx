import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

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
    default:
      "SDARM-RDC — Église Adventiste du Septième Jour Mouvement de Réforme",
    template: "%s | SDARM-RDC",
  },
  description:
    "L'Église Adventiste du Septième Jour Mouvement de Réforme en République Démocratique du Congo. Actualités, sermons, études bibliques et ressources spirituelles.",
  keywords: [
    "adventiste",
    "réforme",
    "église",
    "SDR",
    "SDARM",
    "RDC",
    "Congo",
    "sabbat",
    "bible",
    "sermon",
    "Kinshasa",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "SDARM-RDC",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[hsl(var(--background))] font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
