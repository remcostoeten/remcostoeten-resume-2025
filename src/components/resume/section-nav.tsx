'use client'

const sections = [
	{ label: 'Experience', href: '#experience' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Education', href: '#education' }
]

export function SectionNav() {
	return (
		<nav className='hidden sm:block shrink-0 pt-1.5' aria-label='Resume sections'>
			<ul className='flex items-center gap-4 text-[11px] text-muted-foreground/70'>
				{sections.map((section, i) => (
					<li key={section.href} className='flex items-center gap-4'>
						{i > 0 && (
							<span className='text-border' aria-hidden='true'>
								·
							</span>
						)}
						<a
							href={section.href}
							onClick={(e) => {
								e.preventDefault()
								document
									.querySelector(section.href)
									?.scrollIntoView({ behavior: 'smooth' })
							}}
							className='transition-colors hover:text-foreground'
						>
							{section.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
