import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import FloatingButtons from "@/components/FloatingButtons";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Strikers - SEO and Digital Marketing Agency",
  description: "Boost your online presence with Online Strikers, your trusted digital marketing partner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <Providers>
          <ThemeProvider>
            {children}
            <Toaster />
            <FloatingButtons />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
