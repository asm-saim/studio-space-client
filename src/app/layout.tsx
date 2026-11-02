import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeScript } from "@/components/theme/theme-script";
import { ThemedToaster } from "@/components/theme/themed-toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});


export const metadata: Metadata = {
  title: {
    template: "%s — StudioSpace",
    default: "StudioSpace — Peer-to-Peer Creative Studios",
  },
  description:
    "Discover and book photo studios, sound stages, podcast rooms, music suites, and art workshops by the hour — or host your own creative space on StudioSpace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The "dark" class is no longer hard-coded: ThemeScript sets it before first paint
    // (default dark, or the visitor's saved choice), hence suppressHydrationWarning.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ThemedToaster />
        </AuthProvider>
      </body>
    </html>
  );
}