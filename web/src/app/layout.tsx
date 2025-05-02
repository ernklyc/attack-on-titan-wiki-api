import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attack on Titan API Explorer",
  description: "Explore characters, episodes, locations, and more from Attack on Titan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">© 2025 Attack on Titan API Explorer</p>
              </div>
              <div className="flex space-x-4">
                <a href="https://github.com/your-username/attack-on-titan-api" className="text-gray-300 hover:text-white">
                  GitHub
                </a>
                <a href="/api-docs" className="text-gray-300 hover:text-white">
                  API Documentation
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
