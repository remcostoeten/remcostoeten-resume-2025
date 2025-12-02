import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remco Stoeten - Front End Engineer Resume",
    short_name: "Remco Stoeten",
    description: "Front End Engineer with 8 years of experience specializing in TypeScript, React, and Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#0a192f",
    theme_color: "#64c8b4",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "productivity", "utilities"],
    lang: "en",
    dir: "ltr",
  }
}
