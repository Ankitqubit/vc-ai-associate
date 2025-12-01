import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AIProvider } from "@/lib/contexts/ai-context";
import { DealProvider } from "@/lib/contexts/deal-context";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VC AI Associate",
  description: "AI-powered assistant for venture capital workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CopilotKit runtimeUrl="/api/copilotkit" publicApiKey="ck_pub_08df0cf33c5a161dc675f870fda26bf8">
          <DealProvider>
            <AIProvider>
              {children}
            </AIProvider>
          </DealProvider>
        </CopilotKit>
      </body>
    </html>
  );
}
