"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resumeData } from "@/lib/resume-data"

export function DownloadResumeButton() {
  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

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
      doc.setFont("helvetica", fontStyle)
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

    // Summary paragraphs
    resumeData.summary.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph, contentWidth)
      lines.forEach((line: string) => {
        addText(line, margin, y, { fontSize: 9, color: mutedForeground })
        y += 4
      })
      y += 2
    })

    // Current role paragraph matching website
    const currentRole = `Currently at Brainstud / Allyyoucanlearn, building modern e-learning platforms with Next.js and TypeScript under the Shape Up methodology.`
    const currentRoleLines = doc.splitTextToSize(currentRole, contentWidth)
    currentRoleLines.forEach((line: string) => {
      addText(line, margin, y, { fontSize: 9, color: mutedForeground })
      y += 4
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

      // Bullets with dot prefix
      job.bullets.forEach((bullet) => {
        checkPageBreak(10)
        const bulletLines = doc.splitTextToSize(bullet, contentWidth - 6)
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
    ]

    const labelWidth = 22
    skillCategories.forEach(({ key, label }) => {
      checkPageBreak(8)
      addText(`${label}:`, margin, y, { fontSize: 9, fontStyle: "bold", color: foreground })
      const skillsText = resumeData.skills[key].join(" · ")
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

      // Description
      const descLines = doc.splitTextToSize(project.desc, contentWidth)
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
    const footer = "Built with Next.js and Tailwind CSS, deployed on Vercel."
    const footerWidth = doc.getTextWidth(footer)
    addText(footer, pageWidth / 2 - footerWidth / 2, y, { fontSize: 8, color: mutedForeground })

    // Save
    doc.save("remco-stoeten-resume.pdf")
  }

  return (
    <Button onClick={generatePDF} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
      <Download className="h-4 w-4" />
      Download Resume
    </Button>
  )
}
