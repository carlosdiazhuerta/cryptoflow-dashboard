import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import DashboardShell from "@/components/DashboardShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CryptoTracker | Premium Dashboard",
  description: "Real-time cryptocurrency tracking with professional analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <DashboardShell>
              {children}
            </DashboardShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
