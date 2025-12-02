"use client"

import { useEffect } from "react"

// Google Analytics - Uses environment variable
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  useEffect(() => {
    // Only load GA in production and if ID is configured
    if (
      process.env.NODE_ENV === "production" &&
      GA_MEASUREMENT_ID &&
      GA_MEASUREMENT_ID !== "G-XXXXXXXXXX"
    ) {
      // Load gtag.js script
      const script = document.createElement("script")
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag("js", new Date())
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  return null
}

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
