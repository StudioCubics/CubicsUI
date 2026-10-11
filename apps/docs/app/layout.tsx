import type { Metadata } from "next";
import { Fira_Code, Outfit, Titillium_Web } from "next/font/google";
import {
  ContrastProvider,
  PointerLightProvider,
  ThemeProvider,
} from "@cubicsui/components";
import "./globals.css";

export const firaCode = Fira_Code({
  variable: "--font-code",
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
});
export const outfit = Outfit({
  variable: "--font-h",
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
});
export const titiliumWeb = Titillium_Web({
  variable: "--font-p",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cubics UI",
  description:
    "A Library of different components, templates, functions and hooks that will streamline your workflow as a web developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${titiliumWeb.variable} ${firaCode.variable}`}
      >
        <ThemeProvider>
          <ContrastProvider>
            <PointerLightProvider>{children}</PointerLightProvider>
          </ContrastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
