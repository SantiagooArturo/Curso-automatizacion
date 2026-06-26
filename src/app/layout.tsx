import type { Metadata } from "next";
import { Mulish, Bowlby_One, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/auth/AuthProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: "Cine de Santiago — Réplica visual",
  description: "Estrenos, promociones y la mejor dulcería en un solo lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("scroll-smooth", mulish.variable, bowlby.variable, "font-sans", geist.variable)}>
      <body style={{ fontFamily: "var(--font-mulish), system-ui, sans-serif" }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
