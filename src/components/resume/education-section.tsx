import type { Education } from "@/lib/resume-data"

type Props = {
    education: Education[]
}

export function EducationSection({ education }: Props) {
    return (
        <section id="education" className="scroll-mt-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 mb-5">
                Education
            </h3>
            <div className="space-y-3">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm"
                    >
                        <div>
                            <span className="font-semibold text-foreground">
                                {edu.degree}
                            </span>
                            <span className="text-muted-foreground">
                                {" "}
                                — {edu.institution}
                            </span>
                        </div>
                        <span className="text-muted-foreground">
                            {edu.period}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
