import { resumeData } from '@/lib/resume-data'
import { ResumeHeader } from '@/components/resume/resume-header'
import { ExperienceSection } from '@/components/resume/experience-section'
import { ProjectsSection } from '@/components/resume/projects-section'
import { SkillsSection } from '@/components/resume/skills-section'
import { EducationSection } from '@/components/resume/education-section'

export default function HomePage() {
	return (
		<div className='min-h-screen bg-background'>
			<div className='mx-auto max-w-3xl px-6 pb-12 pt-0 lg:pb-16'>
				<ResumeHeader basics={resumeData.basics} summary={resumeData.summary} />

				<main className='mt-10 space-y-10'>
					<ExperienceSection experience={resumeData.experience} />
					<SkillsSection skills={resumeData.skills} languages={resumeData.languages} />
					<ProjectsSection projects={resumeData.projects} />
					<EducationSection education={resumeData.education} />
				</main>
			</div>
		</div>
	)
}
