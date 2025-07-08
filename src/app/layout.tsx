import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokémon Explorer",
  description: "A visually stunning Next.js app to explore Pokémon with details fetched from PokeAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 min-h-screen`}
      >
        <header className="w-full py-6 mb-8 bg-transparent shadow-lg border-b border-blue-300">
          <div className="max-w-3xl mx-auto flex items-center justify-center">
            <Link href="/" className="flex items-center justify-center" aria-label="Home">
              {/* Pokéball SVG Logo */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="#fff" stroke="#2563eb" strokeWidth="4"/>
                <path d="M2 24h44" stroke="#2563eb" strokeWidth="4"/>
                <circle cx="24" cy="24" r="7" fill="#fff" stroke="#2563eb" strokeWidth="4"/>
                <circle cx="24" cy="24" r="3" fill="#2563eb"/>
                <path d="M24 2a22 22 0 0 1 22 22H2A22 22 0 0 1 24 2Z" fill="#2563eb"/>
              </svg>
            </Link>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-2 sm:px-0">
          {children}
        </div>
        <footer className="w-full py-4 mt-12 text-center text-sm text-blue bg-transparent border-t border-blue-300">
          Data from <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:underline">PokeAPI</a>
        </footer>
      </body>
    </html>
  );
}
