import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "@/styles/globals.css"

// Structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Remco Stoeten",
    jobTitle: "Front End Engineer",
    description:
        "Front End Engineer with 8 years of experience specializing in TypeScript, React, and Next.js",
    url: "https://remcos.cv",
    sameAs: [
        "https://github.com/remcostoeten",
        "https://linkedin.com/in/remco-stoeten",
        "https://remcostoeten.nl"
    ],
    knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "JavaScript",
        "Front End Development",
        "Web Development",
        "UI Development",
        "React Query",
        "Tailwind CSS",
        "Node.js",
        "SaaS Development",
        "E-commerce Development"
    ],
    worksFor: {
        "@type": "Organization",
        name: "Brainstud / Allyoucanlearn"
    },
    alumniOf: {
        "@type": "EducationalOrganization",
        name: "ROC Friese Poort Sneek"
    },
    address: {
        "@type": "PostalAddress",
        addressLocality: "Lemmer",
        addressCountry: "Netherlands"
    },
    email: "stoetenremco.rs@gmail.com",
    telephone: "+31 6 36590707"
}

const geistSans = GeistSans.variable
const geistMono = GeistMono.variable

// <CHANGE> Complete SEO metadata for resume site
export const metadata: Metadata = {
    metadataBase: new URL("https://remcos.cv"),
    title: {
        default:
            "Remco Stoeten | Front End Engineer - TypeScript & React (Next.js)",
        template: "%s | Remco Stoeten"
    },
    description:
        "Remco Stoeten - Front End Engineer with 8 years of experience building modern web applications with TypeScript, React, and Next.js. Specialized in SaaS, e-commerce, government platforms, and e-learning systems. Available for remote work from Netherlands.",
    keywords: [
        "Front End Engineer",
        "TypeScript Developer",
        "React Developer",
        "Next.js Developer",
        "Software Engineer",
        "Web Developer",
        "Full Stack Developer",
        "UI Developer",
        "JavaScript Developer",
        "Frontend Developer",
        "Netherlands",
        "Dutch Developer",
        "Remote Developer",
        "Freelance Developer",
        "React Query",
        "Tailwind CSS",
        "Node.js Developer",
        "Web Development",
        "SaaS Development",
        "E-commerce Developer",
        "Government Platforms",
        "E-learning Systems",
        "Remco Stoeten",
        "Lemmer",
        "Friesland"
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
            "max-snippet": -1
        }
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://remcos.cv",
        siteName: "Remco Stoeten",
        title: "Remco Stoeten | Front End Engineer",
        description:
            "Front End Engineer with 8 years of experience specializing in TypeScript, React, and Next.js.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Remco Stoeten - Front End Engineer"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Remco Stoeten | Front End Engineer",
        description:
            "Front End Engineer with 8 years of experience specializing in TypeScript, React, and Next.js.",
        images: ["/og-image.png"]
    },
    alternates: {
        canonical: "https://remcos.cv"
    },
    other: {
        "geo.region": "NL-FR",
        "geo.placename": "Lemmer",
        "geo.position": "52.8408;5.6172",
        ICBM: "52.8408, 5.6172",
        author: "Remco Stoeten",
        language: "English"
    },
    icons: {
        icon: [
            { url: "/favicon.png", type: "image/png", sizes: "32x32" },
            { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
            { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" }
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180" }]
    }
}

export const viewport: Viewport = {
    themeColor: "#0a192f",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={`${geistSans} ${geistMono}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />
            </head>
            <body className="py-12 font-sans antialiased">
                {children}
                <Analytics />
            </body>
        </html>
    )
}
