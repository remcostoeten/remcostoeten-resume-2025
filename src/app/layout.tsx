import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/analytics"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

// <CHANGE> Complete SEO metadata for resume site
export const metadata: Metadata = {
  metadataBase: new URL("https://remcos.cv"),
  title: {
    default: "Remco Stoeten | Front End Engineer - TypeScript & React (Next.js)",
    template: "%s | Remco Stoeten",
  },
  description:
    "Front End Engineer with 8 years of experience in SaaS, e-commerce, government platforms, and e-learning systems. Specializing in TypeScript, React, and Next.js.",
  keywords: [
    "Front End Engineer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Software Engineer",
    "Web Developer",
    "Netherlands",
    "Remco Stoeten",
    "Full Stack Developer",
  ],
  authors: [{ name: "Remco Stoeten", url: "https://remcos.cv" }],
  creator: "Remco Stoeten",
  publisher: "Remco Stoeten",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://remcos.cv",
    siteName: "Remco Stoeten",
    title: "Remco Stoeten | Front End Engineer",
    description: "Front End Engineer with 8 years of experience specializing in TypeScript, React, and Next.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Remco Stoeten - Front End Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remco Stoeten | Front End Engineer",
    description: "Front End Engineer with 8 years of experience specializing in TypeScript, React, and Next.js.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://remcos.cv",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        {/* Uncomment below and add your GA4 measurement ID to analytics.tsx */}
        {/* <GoogleAnalytics /> */}
      </body>
    </html>
  )
}
