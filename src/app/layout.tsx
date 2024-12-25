import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreWrapper from "@/wrappers/StoreWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedVerse: Journey Beyond the Textbook",
  description: "MedVerse: Journey Beyond the Textbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  );
}
