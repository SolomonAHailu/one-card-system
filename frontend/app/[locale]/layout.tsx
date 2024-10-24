import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import StoreProvider from "@/store/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OCS",
  description: "OCS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <StoreProvider>
        <html lang="en">
          <body className={inter.className}>
            <main className="relative flex flex-col min-h-screen">
              <div className="flex-grow flex-1">
                <Navbar />
                {children}
              </div>
              <Footer />
            </main>
          </body>
        </html>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
