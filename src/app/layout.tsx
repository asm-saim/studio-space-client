import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster richColors closeButton position="top-right" theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}
