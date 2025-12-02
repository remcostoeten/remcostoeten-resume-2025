import type { Skills, Language } from "@/lib/resume-data"

interface SkillsSectionProps {
  skills: Skills
  languages: Language[]
}

const skillCategories: { key: keyof Skills; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "backend", label: "Backend" },
  { key: "databases", label: "Databases" },
  { key: "tools", label: "Tools" },
  { key: "styling", label: "Styling" },
  { key: "design", label: "Design" },
]

export function SkillsSection({ skills, languages }: SkillsSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 mb-5">
        Skills
      </h3>
      <div className="space-y-2 text-sm">
        {skillCategories.map(({ key, label }) => (
          <div key={key} className="flex gap-2">
            <span className="font-semibold text-foreground w-24 flex-shrink-0">{label}:</span>
            <span className="text-muted-foreground">
              {skills[key].map((skill, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-border"> · </span>}
                  <span
                    className={
                      ["TypeScript", "React", "Next.js", "PostgreSQL", "Git", "Docker", "Tailwind", "Node.js"].includes(
                        skill,
                      )
                        ? "font-medium text-foreground"
                        : ""
                    }
                  >
                    {skill}
                  </span>
                </span>
              ))}
            </span>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="font-semibold text-foreground w-24 flex-shrink-0">Spoken:</span>
          <span className="text-muted-foreground">
            {languages.map((lang, i) => (
              <span key={i}>
                {i > 0 && <span className="text-border"> · </span>}
                {lang.name} <span className="text-muted-foreground/70">({lang.level})</span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  )
}
