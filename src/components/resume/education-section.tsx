import type { Education } from "@/lib/resume-data"

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 mb-5">
        Education
      </h3>
      <div className="space-y-3">
        {education.map((edu, index) => (
          <div key={index} className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm">
            <div>
              <span className="font-semibold text-foreground">{edu.degree}</span>
              <span className="text-muted-foreground"> — {edu.institution}</span>
            </div>
            <span className="text-muted-foreground">{edu.period}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground text-center">
        Built with <strong className="text-foreground">Next.js</strong> and{" "}
        <strong className="text-foreground">Tailwind CSS</strong>, deployed on{" "}
        <strong className="text-foreground">Vercel</strong>.
      </footer>
    </section>
  )
}
