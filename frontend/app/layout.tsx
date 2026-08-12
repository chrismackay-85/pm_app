import type { Metadata } from "next";
import { Wix_Madefor_Display, STIX_Two_Text, Inconsolata } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const wixMadeforDisplay = Wix_Madefor_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const stixTwoText = STIX_Two_Text({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
});

const inconsolata = Inconsolata({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pattern PM",
  description: "Kanban board and rollout roadmap for the Salesforce CRM project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${wixMadeforDisplay.variable} ${stixTwoText.variable} ${inconsolata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-light-gray">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
