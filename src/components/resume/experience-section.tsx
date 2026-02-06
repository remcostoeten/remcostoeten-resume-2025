import type { Experience } from '@/lib/resume-data'

interface ExperienceSectionProps {
	experience: Experience[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
	return (
		<section id='experience' className='scroll-mt-16'>
			<h3 className='text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 mb-5'>
				Experience
			</h3>
			<div className='space-y-6'>
				{experience.map((job, index) => (
					<article key={index}>
						<div className='flex flex-wrap items-baseline justify-between gap-x-4'>
							<h4 className='text-base font-semibold text-foreground'>{job.role}</h4>
							<span className='text-sm text-muted-foreground'>{job.period}</span>
						</div>
						<p className='text-sm font-medium text-muted-foreground mt-0.5'>
							{job.company}
						</p>
						<ul className='mt-2 space-y-1.5 text-sm text-muted-foreground'>
							{job.bullets.map((bullet, bulletIndex) => (
								<li key={bulletIndex} className='flex gap-2 leading-relaxed'>
									<span className='text-foreground mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-current' />
									<span
										dangerouslySetInnerHTML={{
											__html: bullet.replace(
												/(Next\.js|TypeScript|React Query|React|GraphQL|Django|JavaScript|SCSS|Laravel|WCAG AA|Magento 2|PHTML|BEM|Razor|Shape Up)/g,
												'<strong class="text-foreground">$1</strong>'
											)
										}}
									/>
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</section>
	)
}
