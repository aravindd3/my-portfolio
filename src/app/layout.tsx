import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Aravind V S | Embedded Systems, PCB Design & Firmware Engineer",
    template: "%s | Aravind V S",
  },
  description:
    "Engineering portfolio of Aravind V S, Electronics & Communication Engineering undergraduate specializing in embedded systems, KiCad 10.0 PCB layout, Embedded C firmware, and wired/wireless hardware protocols (UART, SPI, I²C, I²S, CAN, LoRa, Bluetooth, NFC).",
  keywords: [
    "Aravind V S",
    "Embedded Systems Engineer",
    "Embedded Hardware",
    "Firmware Development",
    "Embedded C",
    "PCB Design",
    "KiCad 10.0",
    "STM32F407",
    "ESP32-WROOM-32",
    "LoRa SX1278",
    "UART",
    "SPI",
    "I2C",
    "I2S",
    "CAN",
    "VIT-AP University",
  ],
  authors: [{ name: "Aravind V S" }],
  creator: "Aravind V S",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aravind V S | Embedded Systems, PCB Design & Firmware Engineer",
    description:
      "Electronics & Communication Engineering undergraduate at VIT-AP University building microcontroller systems, ERC-validated KiCad PCBs, and deterministic Embedded C firmware.",
    siteName: "Aravind V S — Embedded Hardware & Firmware Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aravind V S | Embedded Systems, PCB Design & Firmware Engineer",
    description:
      "Embedded hardware design, KiCad 10.0 PCB layout, Embedded C firmware, and wired/RF communication buses (UART, SPI, I²C, I²S, CAN, LoRa, Bluetooth, NFC).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-primary font-sans">
        <SmoothScrollProvider>
          <Providers>{children}</Providers>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
