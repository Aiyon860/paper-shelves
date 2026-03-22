import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Playfair_Display } from "next/font/google";
import { NetworkStatus } from "@/components/NetworkStatus";
import { SuccessToast } from "@/components/SuccessToast";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getBaseUrl } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    template: "%s | Paper Shelves",
    default: "Paper Shelves",
  },
  description:
    "A modern digital library application to manage your book collection.",
  applicationName: "Paper Shelves",
  openGraph: {
    title: {
      template: "%s | Paper Shelves",
      default: "Paper Shelves",
    },
    description:
      "A modern digital library application to manage your book collection.",
    url: "/",
    siteName: "Paper Shelves",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | Paper Shelves",
      default: "Paper Shelves",
    },
    description:
      "A modern digital library application to manage your book collection.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className="relative flex min-h-screen flex-col"
            id="app-container"
          >
            <Header />
            <main
              className="flex-1"
              id="main-content"
              role="main"
              aria-label="Main Content"
            >
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" />
          <NetworkStatus />
          <Suspense>
            <SuccessToast />
          </Suspense>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
