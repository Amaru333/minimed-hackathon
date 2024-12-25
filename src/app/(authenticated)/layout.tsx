import { AuthNavbar } from "@/components/common/AuthNavbar";
import AuthWrapper from "@/wrappers/AuthWrapper";
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
    <AuthWrapper>
      <AuthNavbar />
      {children}
    </AuthWrapper>
  );
}
