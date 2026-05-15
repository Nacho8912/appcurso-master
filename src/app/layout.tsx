import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Master en IA Agéntica con Python | AgentesPro",
  description: "Programa formativo de alto nivel para construir agentes inteligentes reales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#050505]`}>
        {children}
      </body>
    </html>
  );
}
