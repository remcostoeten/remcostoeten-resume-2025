import Link from 'next/link'
import { Github, Linkedin, Globe } from 'lucide-react'
import { resumeData } from '@/lib/resume-data'

const navItems = [
	{ label: 'ABOUT', href: '#about' },
	{ label: 'EXPERIENCE', href: '#experience' },
	{ label: 'PROJECTS', href: '#projects' },
	{ label: 'SKILLS', href: '#skills' }
]

export function ResumeSidebar() {
	return (
		<div className='mt-12 lg:mt-0'>
			{/* Navigation */}
			<nav className='hidden lg:block' aria-label='In-page navigation'>
				<ul className='space-y-4'>
					{navItems.map((item) => (
						<li key={item.label}>
							<Link
								href={item.href}
								className='group flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground'
							>
								<span className='h-px w-8 bg-muted-foreground transition-all group-hover:w-16 group-hover:bg-foreground' />
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* Social Links */}
			<ul className='mt-8 flex items-center gap-5' aria-label='Social media'>
				<li>
					<Link
						href={resumeData.basics.github}
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground transition-colors hover:text-foreground'
						aria-label='GitHub (opens in new tab)'
					>
						<Github className='h-6 w-6' />
					</Link>
				</li>
				<li>
					<Link
						href={resumeData.basics.linkedin}
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground transition-colors hover:text-foreground'
						aria-label='LinkedIn (opens in new tab)'
					>
						<Linkedin className='h-6 w-6' />
					</Link>
				</li>
				<li>
					<Link
						href={resumeData.basics.site}
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground transition-colors hover:text-foreground'
						aria-label='Website (opens in new tab)'
					>
						<Globe className='h-6 w-6' />
					</Link>
				</li>
			</ul>
		</div>
	)
}
