import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/resume-data"

interface ProjectsSectionProps {
  projects: Project[]
}

function boldKeywords(text: string) {
  return text.replace(
    /(Tauri 2\.0|React|Markdown|GitHub|Vercel|NPM|Google Calendar|Discord|Spotify|Next\.js|Drizzle ORM|syntax-highlighted|interactive)/gi,
    '<strong class="text-foreground font-semibold">$1</strong>',
  )
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 mb-5">
        Projects
      </h3>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="text-sm">
            <div className="flex items-baseline gap-2 flex-wrap">
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                {project.name}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
              {project.category && (
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                  {project.category}
                </span>
              )}
              {project.note && (
                <span className="text-[10px] font-medium text-muted-foreground italic">({project.note})</span>
              )}
            </div>
            <p
              className="text-muted-foreground mt-1 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: boldKeywords(project.desc) }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
