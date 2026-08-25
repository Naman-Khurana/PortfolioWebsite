import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naman Khurana — Backend Software Engineer",
  description:
    "The Engineer's Journey: A continuous cinematic portfolio experience following Naman Khurana through distributed systems, backend engineering, and high-performance architectures.",
  keywords: [
    "Naman Khurana",
    "Backend Software Engineer",
    "Java",
    "Spring Boot",
    "PostgreSQL",
    "Distributed Systems",
    "System Design",
  ],
  authors: [{ name: "Naman Khurana" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0c10] text-[#f0f6fc] antialiased selection:bg-sky-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
