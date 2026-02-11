'use client'

import { useRef, useEffect, useState } from 'react'
import { siteConfig } from '../core/config'
import { ContactButton } from './ContactButton'
import {
	Github,
	Linkedin,
	Mail,
	Heart,
	Sparkles,
	ArrowUpRight,
	GitCommit,
	Loader2
} from 'lucide-react'
import { getLatestCommit, CommitData } from '../core/github-service'

function formatTimeAgo(dateString: string) {
	const date = new Date(dateString)
	const now = new Date()
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

	let interval = seconds / 31536000
	if (interval > 1) return Math.floor(interval) + ' years ago'

	interval = seconds / 2592000
	if (interval > 1) return Math.floor(interval) + ' months ago'

	interval = seconds / 86400
	if (interval > 1) return Math.floor(interval) + ' days ago'

	interval = seconds / 3600
	if (interval > 1) return Math.floor(interval) + ' hours ago'

	interval = seconds / 60
	if (interval > 1) return Math.floor(interval) + ' minutes ago'

	return Math.floor(seconds) + ' seconds ago'
}

// Helper component for external social links with slide-through animation
const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
	<a
		href={href}
		target='_blank'
		rel='noopener noreferrer'
		className='group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-border/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 active:scale-95 overflow-hidden'
	>
		<Icon className='w-4 h-4 text-foreground/70 group-hover:text-accent transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6' />
		<span className='text-foreground/80 group-hover:text-accent font-medium transition-colors duration-300'>
			{label}
		</span>

		{/* Slide-through arrow animation matching BlogCard */}
		<div className='relative w-3.5 h-3.5 ml-1 overflow-hidden' aria-hidden='true'>
			<ArrowUpRight className='absolute inset-0 w-3.5 h-3.5 text-foreground/40 group-hover:text-accent transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:-translate-y-full group-hover:translate-x-full' />
			<ArrowUpRight className='absolute inset-0 w-3.5 h-3.5 text-accent -translate-x-full translate-y-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-0 group-hover:translate-y-0' />
		</div>
	</a>
)

export default function Footer() {
	const githubUrl = siteConfig.social.githubUrl
	const linkedinUrl = siteConfig.social.linkedinUrl

	const [latestCommit, setLatestCommit] = useState<CommitData | null>(null)
	const [loading, setLoading] = useState(true)

	const bgRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)

	// Fetch GitHub Data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getLatestCommit('remcostoeten', 'remcostoeten.nl')
				setLatestCommit(data)
			} catch (e) {
				console.error('Failed to load commit info', e)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	// Parallax effect for the background
	useEffect(() => {
		const handleScroll = () => {
			if (!bgRef.current) return
			const scrollPosition = window.scrollY
			const offset = scrollPosition * 0.02
			bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Intersection Observer for staggered entrance
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect() // Only trigger once
				}
			},
			{ threshold: 0.1 } // Trigger when 10% visible
		)

		if (contentRef.current) {
			observer.observe(contentRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<footer className='border-t border-border/30 mt-16 relative overflow-hidden w-full group/footer'>
			{/* Dynamic Ambient Background with Parallax */}
			<div
				ref={bgRef}
				className='absolute -top-[25%] -left-0 w-full h-[150%] pointer-events-none overflow-hidden will-change-transform'
			>
				<div className='absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-accent/10 blur-[120px] animate-blob-float mix-blend-screen' />
				<div className='absolute top-[15%] right-[5%] w-[400px] h-[400px] bg-accent/5 blur-[90px] animate-blob-sway animation-delay-2000 mix-blend-screen' />
				<div className='absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[140px] animate-blob-pulse animation-delay-4000 mix-blend-screen' />
				<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90' />
			</div>

			<div
				ref={contentRef}
				className='max-w-3xl mx-auto px-6 md:px-12 py-12 sm:py-16 relative z-10'
			>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
					{/* Left section - Social links */}
					<div
						className={`lg:col-span-2 space-y-6 ${isVisible ? 'animate-enter' : 'opacity-0'}`}
						style={{ animationDelay: '0ms' }}
					>
						<div className='space-y-4'>
							<h3 className='text-lg font-semibold text-foreground flex items-center gap-2'>
								<Sparkles className='w-5 h-5 text-accent animate-pulse' />
								Let's Connect
							</h3>

							<p className='text-[16px] text-foreground/80 leading-relaxed max-w-lg'>
								Find me across the web or reach out directly. I'm always interested
								in hearing about new projects and ideas.
							</p>
						</div>

						{/* Social links with icons */}
						<div className='flex flex-wrap gap-4 sm:gap-6'>
							<SocialLink href={githubUrl} icon={Github} label='GitHub' />
							<SocialLink href={linkedinUrl} icon={Linkedin} label='LinkedIn' />

							<ContactButton className='group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 border border-border/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 active:scale-95 overflow-hidden'>
								<Mail className='w-4 h-4 text-foreground/70 group-hover:text-accent transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12' />
								<span className='text-foreground/80 group-hover:text-accent font-medium transition-colors duration-300'>
									Contact
								</span>

								<div
									className='relative w-3.5 h-3.5 ml-1 overflow-hidden'
									aria-hidden='true'
								>
									<ArrowUpRight className='absolute inset-0 w-3.5 h-3.5 text-foreground/40 group-hover:text-accent transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:-translate-y-full group-hover:translate-x-full' />
									<ArrowUpRight className='absolute inset-0 w-3.5 h-3.5 text-accent -translate-x-full translate-y-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-x-0 group-hover:translate-y-0' />
								</div>
							</ContactButton>
						</div>
					</div>

					{/* Right section - Build info (GitHub Activity) */}
					<div
						className={`lg:text-right space-y-4 ${isVisible ? 'animate-enter' : 'opacity-0'}`}
						style={{ animationDelay: '200ms' }}
					>
						<div className='inline-flex items-center gap-2 text-sm text-muted-foreground bg-background/30 px-3 py-1 rounded-full border border-border/20 backdrop-blur-sm self-start lg:self-end'>
							<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
							<span>System Status: Online</span>
						</div>

						<div className='space-y-2 flex flex-col lg:items-end'>
							{loading ? (
								<div className='flex items-center gap-2 text-xs text-muted-foreground animate-pulse'>
									<Loader2 className='w-3 h-3 animate-spin' />
									<span>Fetching latest activity...</span>
								</div>
							) : latestCommit ? (
								<>
									<a
										href={latestCommit.url}
										target='_blank'
										rel='noreferrer'
										className='group/commit block'
									>
										<p className='text-xs font-mono text-accent/80 group-hover/commit:text-accent transition-colors mb-1 flex items-center lg:justify-end gap-1.5'>
											<GitCommit className='w-3 h-3' />
											{latestCommit.shortHash}
											<ArrowUpRight className='w-2.5 h-2.5 opacity-0 -translate-x-1 translate-y-1 group-hover/commit:opacity-100 group-hover/commit:translate-x-0 group-hover/commit:translate-y-0 transition-all' />
										</p>
										<p className='text-xs text-muted-foreground hover:text-foreground transition-colors line-clamp-2 max-w-[200px] lg:text-right'>
											{latestCommit.message}
										</p>
									</a>
									<p className='text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium'>
										Updated {formatTimeAgo(latestCommit.date)}
									</p>
								</>
							) : (
								<p className='text-xs text-muted-foreground'>
									Local development environment
								</p>
							)}
						</div>
					</div>
				</div>

				<div
					className={`mt-12 pt-8 border-t border-border/20 ${isVisible ? 'animate-enter' : 'opacity-0'}`}
					style={{ animationDelay: '400ms' }}
				>
					<div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
						<p className='text-xs text-muted-foreground flex items-center gap-1'>
							Made with
							<Heart className='w-3 h-3 text-red-500 animate-pulse' />
							and lots of
							<Sparkles className='w-3 h-3 text-accent animate-pulse' />
						</p>

						<p className='text-xs text-muted-foreground'>
							© {new Date().getFullYear()} Remco Stoeten
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
