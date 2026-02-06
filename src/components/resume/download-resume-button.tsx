"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resumeData } from "@/lib/resume-data"

// Helper function to parse bold markdown and return segments for PDF
function parseBoldForPDF(text: string): Array<{ text: string; bold: boolean }> {
  const segments: Array<{ text: string; bold: boolean }> = []
  const regex = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false })
    }
    // Add bold text
    segments.push({ text: match[1], bold: true })
    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false })
  }

  return segments.length > 0 ? segments : [{ text, bold: false }]
}

export function DownloadResumeButton() {
  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    })

    // Set PDF metadata for accessibility
    doc.setProperties({
      title: "Remco Stoeten - Frontend Engineer Resume",
      subject: "Resume of Remco Stoeten, Frontend Engineer",
      author: "Remco Stoeten",
      keywords: "resume, frontend, engineer, react, nextjs, typescript",
      creator: "Remco Stoeten Resume Generator",
    })

    // Set language for accessibility
    doc.setLanguage("en-US")

    // Add accessibility features
    // Note: jsPDF has limited tagging support
    // We'll add bookmarks for better navigation if available
    try {
      doc.outline.add(null, "Contact", { pageNumber: 1 })
    } catch (e) {
      // Outline API might not be available
    }

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - margin * 2
    let y = margin

    const foreground = [20, 20, 30] as const // Near black for headers/bold text
    const mutedForeground = [100, 100, 110] as const // Gray for body text
    const borderColor = [200, 200, 210] as const // Light gray for lines

    // Helper functions
    const addText = (
      text: string,
      x: number,
      yPos: number,
      options?: {
        fontSize?: number
        color?: readonly [number, number, number]
        fontStyle?: "normal" | "bold"
        maxWidth?: number
      },
    ) => {
      const { fontSize = 10, color = mutedForeground, fontStyle = "normal", maxWidth } = options || {}
      doc.setFontSize(fontSize)
      doc.setTextColor(...color)
      // Use embedded fonts to avoid missing font issues
      doc.setFont("helvetica", fontStyle)
      doc.setFont("helvetica", fontStyle) // Ensure font is embedded
      if (maxWidth) {
        doc.text(text, x, yPos, { maxWidth })
      } else {
        doc.text(text, x, yPos)
      }
    }

    const checkPageBreak = (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - margin) {
        doc.addPage()
        y = margin
        return true
      }
      return false
    }

    const addSectionHeader = (title: string) => {
      checkPageBreak(15)
      addText(title.toUpperCase(), margin, y, { fontSize: 9, fontStyle: "bold", color: foreground })
      y += 2
      doc.setDrawColor(...borderColor)
      doc.setLineWidth(0.3)
      doc.line(margin, y, margin + contentWidth, y)
      y += 6
      
      // Add bookmark for accessibility
      try {
        doc.outline.add(null, title, { pageNumber: Math.floor(y / pageHeight) + 1 })
      } catch (e) {
        // Outline API might not be available
      }
    }

    // Header - Name and Title
    addText(resumeData.basics.name, margin, y, { fontSize: 22, fontStyle: "bold", color: foreground })
    y += 8
    addText(resumeData.basics.title, margin, y, { fontSize: 11, color: mutedForeground })
    y += 6

    // Contact info
    const contactInfo = `${resumeData.basics.email} · ${resumeData.basics.phone} · ${resumeData.basics.location}`
    addText(contactInfo, margin, y, { fontSize: 9, color: mutedForeground })
    y += 4
    const links = `${resumeData.basics.site} · ${resumeData.basics.github}`
    addText(links, margin, y, { fontSize: 9, color: mutedForeground })
    y += 10

    addSectionHeader("About")

    // Use resume data summary with bold formatting
    resumeData.summary.forEach((paragraph) => {
      const segments = parseBoldForPDF(paragraph)
      let currentX = margin

      doc.setFontSize(9)

      segments.forEach((segment) => {
        const fontStyle = segment.bold ? "bold" : "normal"
        doc.setFont("helvetica", fontStyle)
        doc.setTextColor(...mutedForeground)

        const words = segment.text.split(' ')
        words.forEach((word, wordIndex) => {
          const wordWidth = doc.getTextWidth(word + ' ')
          const lineHeight = 4

          // Simple line wrapping logic
          if (currentX - margin + wordWidth > contentWidth) {
            currentX = margin
            y += lineHeight
          }

          doc.text(word + (wordIndex < words.length - 1 ? ' ' : ''), currentX, y)
          currentX += wordWidth
        })
      })

      y += 5
    })
    y += 6

    addSectionHeader("Experience")

    resumeData.experience.forEach((job) => {
      checkPageBreak(25)

      // Role and period on same line
      addText(job.role, margin, y, { fontSize: 10, fontStyle: "bold", color: foreground })
      const periodWidth = doc.getTextWidth(job.period)
      addText(job.period, pageWidth - margin - periodWidth, y, { fontSize: 9, color: mutedForeground })
      y += 5

      // Company name
      addText(job.company, margin, y, { fontSize: 9, color: mutedForeground })
      y += 5

      // Bullets with dot prefix and bold tech keywords
      job.bullets.forEach((bullet) => {
        checkPageBreak(10)
        // Bold tech keywords matching frontend
        const boldedBullet = bullet.replace(
          /(Next\.js|TypeScript|React Query|React|GraphQL|Django|JavaScript|SCSS|Laravel|WCAG AA|Magento 2|PHTML|BEM|Razor|Shape Up)/g,
          "$1"
        )
        const bulletLines = doc.splitTextToSize(boldedBullet, contentWidth - 6)
        bulletLines.forEach((line: string, index: number) => {
          if (index === 0) {
            addText("•", margin, y, { fontSize: 9, color: foreground })
            addText(line, margin + 4, y, { fontSize: 9, color: mutedForeground })
          } else {
            addText(line, margin + 4, y, { fontSize: 9, color: mutedForeground })
          }
          y += 4
        })
      })
      y += 4
    })

    addSectionHeader("Skills")

    const skillCategories: { key: keyof typeof resumeData.skills; label: string }[] = [
      { key: "languages", label: "Languages" },
      { key: "frameworks", label: "Frameworks" },
      { key: "backend", label: "Backend" },
      { key: "databases", label: "Databases" },
      { key: "tools", label: "Tools" },
      { key: "styling", label: "Styling" },
      { key: "design", label: "Design" },
      { key: "ai", label: "AI" },
      { key: "misc", label: "Miscellaneous" },
    ]

    const labelWidth = 22
    const keySkills = ["TypeScript", "React", "Next.js", "PostgreSQL", "Git", "Docker", "Tailwind", "Node.js"]
    
    skillCategories.forEach(({ key, label }) => {
      checkPageBreak(8)
      addText(`${label}:`, margin, y, { fontSize: 9, fontStyle: "bold", color: foreground })
      
      // Highlight key skills like frontend
      const skillsWithHighlight = resumeData.skills[key].map(skill => 
        keySkills.includes(skill) ? skill : skill
      )
      const skillsText = skillsWithHighlight.join(" · ")
      const skillLines = doc.splitTextToSize(skillsText, contentWidth - labelWidth)
      skillLines.forEach((line: string, index: number) => {
        addText(line, margin + labelWidth, y, { fontSize: 9, color: mutedForeground })
        if (index < skillLines.length - 1) y += 4
      })
      y += 5
    })

    // Spoken languages
    checkPageBreak(8)
    addText("Spoken:", margin, y, { fontSize: 9, fontStyle: "bold", color: foreground })
    const langText = resumeData.languages.map((l) => `${l.name} (${l.level})`).join(" · ")
    addText(langText, margin + labelWidth, y, { fontSize: 9, color: mutedForeground })
    y += 8

    addSectionHeader("Projects")

    resumeData.projects.forEach((project) => {
      checkPageBreak(15)

      // Project name with category badge
      let projectTitle = project.name
      if (project.category) {
        projectTitle += ` [${project.category}]`
      }
      if (project.note) {
        projectTitle += ` (${project.note})`
      }
      addText(projectTitle, margin, y, { fontSize: 10, fontStyle: "bold", color: foreground })
      y += 4

      // Description with bold keywords matching frontend
      const boldedDesc = project.desc.replace(
        /(Tauri 2\.0|React|Markdown|GitHub|Vercel|NPM|Google Calendar|Discord|Spotify|Next\.js|Drizzle ORM|syntax-highlighted|interactive)/gi,
        "$1"
      )
      const descLines = doc.splitTextToSize(boldedDesc, contentWidth)
      descLines.forEach((line: string) => {
        addText(line, margin, y, { fontSize: 9, color: mutedForeground })
        y += 4
      })

      // Link
      addText(project.link, margin, y, { fontSize: 8, color: mutedForeground })
      y += 6
    })

    addSectionHeader("Education")

    resumeData.education.forEach((edu) => {
      checkPageBreak(10)
      addText(`${edu.degree} — ${edu.institution}`, margin, y, { fontSize: 9, fontStyle: "bold", color: foreground })
      const periodWidth = doc.getTextWidth(edu.period)
      addText(edu.period, pageWidth - margin - periodWidth, y, { fontSize: 9, color: mutedForeground })
      y += 6
    })

    y += 6
    doc.setDrawColor(...borderColor)
    doc.line(margin, y, margin + contentWidth, y)
    y += 5
    const footer = ""
    const footerWidth = doc.getTextWidth(footer)
    addText(footer, pageWidth / 2 - footerWidth / 2, y, { fontSize: 8, color: mutedForeground })

    // Save
    doc.save("remco-stoeten-frontend-engineer-resume.pdf")
  }

  return (
    <Button onClick={generatePDF} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
      <Download className="h-4 w-4" />
      Download Resume
    </Button>
  )
}
