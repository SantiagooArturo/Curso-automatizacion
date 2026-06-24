import type { Metadata } from "next";
import { Mulish, Bowlby_One } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
});

const bowlby = Bowlby_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bowlby",
});

export const metadata: Metadata = {
  title: "Cineplanet — Réplica visual",
  description: "Estrenos, promociones y la mejor dulcería en un solo lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${mulish.variable} ${bowlby.variable}`}>
      <body style={{ fontFamily: "var(--font-mulish), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
