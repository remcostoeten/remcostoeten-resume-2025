import { ExperienceSection } from "./experience-section"
import { ProjectsSection } from "./projects-section"
import { SkillsSection } from "./skills-section"
import { EducationSection } from "./education-section"
import { resumeData } from "@/lib/resume-data"
import { parseBold } from "@/lib/utils"
import type { Experience, Education, Project, Skills, Language } from "@/lib/resume-data"

interface ResumeContentProps {
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skills
  languages: Language[]
}

export function ResumeContent({ experience, education, projects, skills, languages }: ResumeContentProps) {
  return (
    <div className="space-y-24">
      <section id="about" className="scroll-mt-24">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground lg:sr-only">About</h3>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {resumeData.summary.map((paragraph, index) => (
            <p key={index}>{parseBold(paragraph)}</p>
          ))}
          <p>
            Currently at <span className="font-medium text-foreground">Brainstud / Allyyoucanlearn</span>, building
            modern e-learning platforms with Next.js and TypeScript under the Shape Up methodology.
          </p>
        </div>
      </section>

      <ExperienceSection experience={experience} />
      <SkillsSection skills={skills} languages={languages} />
      <EducationSection education={education} />
      <ProjectsSection projects={projects} />
    </div>
  )
}
