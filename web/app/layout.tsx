import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-montserrat",
});

const title = "Block Website";
const description = "BlockWebsite permite bloquear cualquier sitio web y eliminar distracciones";
const url = "https://block-website-nine.vercel.app";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title, 
    description: description, 
    url,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
