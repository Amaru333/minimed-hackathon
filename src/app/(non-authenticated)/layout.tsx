import { Navbar } from "@/components/common/Navbar";
import type { Metadata } from "next";

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
    <div>
      <Navbar />
      {children}
    </div>
  );
}
