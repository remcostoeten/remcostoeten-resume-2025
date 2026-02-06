import Link from "next/link"
import { Mail, MapPin, Phone, Github, Linkedin, Globe } from "lucide-react"
import { DownloadResumeButton } from "./download-resume-button"
import type { ResumeBasics } from "@/lib/resume-data"

interface ResumeHeaderProps {
  basics: ResumeBasics
  summary: string[]
}

export function ResumeHeader({ basics, summary }: ResumeHeaderProps) {
  return (
    <header className="border-b border-border pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{basics.name}</h1>
        <h2 className="mt-2 text-lg text-muted-foreground">{basics.title}</h2>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {basics.location}
        </span>
        <Link
          href={`mailto:${basics.email}`}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          {basics.email}
        </Link>
        <Link
          href={`tel:${basics.phone}`}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          {basics.phone}
        </Link>
        <Link
          href={basics.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </Link>
        <Link
          href={basics.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </Link>
        <Link
          href={basics.site}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Globe className="h-3.5 w-3.5" />
          Portfolio
        </Link>
      </div>

      <div className="mt-6 text-sm text-pretty leading-relaxed text-muted-foreground space-y-3">
        {summary.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="mt-6">
        <DownloadResumeButton />
      </div>
    </header>
  )
}
