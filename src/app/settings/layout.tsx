import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - VC AI Associate",
  description: "Configure your investment thesis and preferences",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
