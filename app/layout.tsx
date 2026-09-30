import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Choice Essentials",
  description: "Home essentials, car accessories, smart gadgets, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
