import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "A dashboard showing sales data for recent years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}