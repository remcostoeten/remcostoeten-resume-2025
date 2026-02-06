import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/resume-data'

interface ProjectsSectionProps {
	projects: Project[]
}

function boldKeywords(text: string) {
	return text.replace(
		/(Tauri 2\.0|React|Markdown|GitHub|Vercel|NPM|Google Calendar|Discord|Spotify|Next\.js|Drizzle ORM|syntax-highlighted|interactive)/gi,
		'<strong class="text-foreground font-semibold">$1</strong>'
	)
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
	return (
		<section id='projects' className='scroll-mt-16'>
			<h3 className='text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 mb-5'>
				Hobby Projects
			</h3>
			<div className='space-y-4'>
				{projects.map((project, index) => (
					<div key={index} className='text-sm'>
						<div className='flex items-baseline gap-2 flex-wrap'>
							<div className='inline-flex items-center gap-1.5'>
								<Link
									href={project.link}
									target='_blank'
									rel='noopener noreferrer'
									className='font-semibold text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5'
								>
									{project.name}
									<ArrowUpRight className='h-3 w-3' />
								</Link>
								{project.github && (
									<Link
										href={project.github}
										target='_blank'
										rel='noopener noreferrer'
										className='text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-0.5'
										aria-label={`View ${project.name} on GitHub`}
									>
										<svg
											className='h-3.5 w-3.5'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
										</svg>
									</Link>
								)}
							</div>
							{project.category && (
								<span className='text-[10px] font-medium uppercase tracking-wide text-muted-foreground bg-secondary px-1.5 py-0.5 rounded'>
									{project.category}
								</span>
							)}
							{project.note && (
								<span className='text-[10px] font-medium text-muted-foreground italic'>
									({project.note})
								</span>
							)}
						</div>
						<p
							className='text-muted-foreground mt-1 leading-relaxed'
							dangerouslySetInnerHTML={{ __html: boldKeywords(project.desc) }}
						/>
					</div>
				))}
			</div>
			<p className='text-xs text-muted-foreground mt-4 italic'>
				* Most professional projects are closed source, but I'm happy to discuss them in an
				interview
			</p>
		</section>
	)
}
