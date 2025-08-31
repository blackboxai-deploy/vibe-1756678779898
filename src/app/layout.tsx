import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Programa Brasil Saudável - Governo Federal",
  description: "Cartão Alimentar Brasil Saudável - Apoio à alimentação e produção nacional. Consulte seu CPF e receba até R$ 600 mensais em alimentos 100% nacionais.",
  keywords: "brasil saudável, cartão alimentar, governo federal, cpf, benefício social, alimentação nacional",
  authors: [{ name: "Ministério do Desenvolvimento e Assistência Social" }],
  robots: "index, follow",
  openGraph: {
    title: "Programa Brasil Saudável - Governo Federal",
    description: "Consulte seu CPF e receba até R$ 600 mensais em alimentos 100% nacionais",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa Brasil Saudável - Governo Federal",
    description: "Consulte seu CPF e receba até R$ 600 mensais em alimentos 100% nacionais",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#168821" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}