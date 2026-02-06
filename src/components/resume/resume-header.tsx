import Link from 'next/link'
import { Mail, MapPin, Phone, Github, Linkedin, Globe } from 'lucide-react'
import { DownloadResumeButton } from './download-resume-button'
import { parseBold } from '@/lib/utils'
import { SectionNav } from './section-nav'
import type { ResumeBasics } from '@/lib/resume-data'

interface ResumeHeaderProps {
	basics: ResumeBasics
	summary: string[]
}

const contactLinkClass =
	"relative flex items-center gap-1.5 pb-0.5 transition-colors hover:text-foreground after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-transparent after:content-[''] after:transition-colors hover:after:bg-border/60 focus-visible:after:bg-border/60"

const externalLinkClass =
	'flex items-center gap-1.5 underline decoration-muted-foreground/30 underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50'

export function ResumeHeader({ basics, summary }: ResumeHeaderProps) {
	return (
		<header className='border-b border-border pb-8'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
						{basics.name}
					</h1>
					<h2 className='mt-2 text-lg text-muted-foreground'>{basics.title}</h2>
				</div>
				<SectionNav />
			</div>

			<div className='mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground'>
				<span className='flex items-center gap-1.5'>
					<MapPin className='h-3.5 w-3.5' />
					{basics.location}
				</span>
				<Link href={`mailto:${basics.email}`} className={contactLinkClass}>
					<Mail className='h-3.5 w-3.5' />
					{basics.email}
				</Link>
				<Link href={`tel:${basics.phone}`} className={contactLinkClass}>
					<Phone className='h-3.5 w-3.5' />
					{basics.phone}
				</Link>
			</div>

			<div className='mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground'>
				<Link
					href={basics.github}
					target='_blank'
					rel='noopener noreferrer'
					className={externalLinkClass}
				>
					<Github className='h-3.5 w-3.5' />
					GitHub
				</Link>
				<Link
					href={basics.linkedin}
					target='_blank'
					rel='noopener noreferrer'
					className={externalLinkClass}
				>
					<Linkedin className='h-3.5 w-3.5' />
					LinkedIn
				</Link>
				<Link
					href={basics.site}
					target='_blank'
					rel='noopener noreferrer'
					className={externalLinkClass}
				>
					<Globe className='h-3.5 w-3.5' />
					Portfolio
				</Link>
			</div>

			<div className='mt-6 text-sm text-pretty leading-relaxed text-muted-foreground space-y-3'>
				{summary.map((line, i) => (
					<p key={i}>{parseBold(line)}</p>
				))}
			</div>

			<div className='mt-6'>
				<DownloadResumeButton />
			</div>
		</header>
	)
}
