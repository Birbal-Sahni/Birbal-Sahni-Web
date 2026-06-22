import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import TechCursor from "@/components/TechCursor";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Team Birbal Sahni | Master-Slave Robotic Arm | AI + Robotics Bootcamp",
  description:
    "Team Birbal Sahni presents the Master-Slave Robotic Arm system — a high-fidelity teleoperation platform engineered at the AI + Robotics Bootcamp, Delhi. Real-time control, haptic feedback, sub-millimeter precision.",
  keywords: [
    "Birbal Sahni",
    "Robotic Arm",
    "Master-Slave",
    "AI Robotics",
    "Teleoperation",
    "Delhi Bootcamp",
  ],
  icons: {
    icon: "https://assets.techforge.pranab.xyz/assets/Logo-Dark.svg",
  },
  openGraph: {
    title: "Team Birbal Sahni | Master-Slave Robotic Arm",
    description:
      "Precision teleoperation at the speed of thought — engineered at the AI + Robotics Bootcamp, Delhi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#050208] text-[#eee9ff] grain relative">
        <TechCursor />
        {children}
      </body>
    </html>
  );
}
