import React, { useRef, useEffect } from 'react'
import { Calendar, Clock, ArrowUpRight, Eye } from 'lucide-react'
import { BlogCardProps } from '../types'
import { AnimatedNumber } from './AnimatedNumber'

export const BlogCard: React.FC<BlogCardProps> = ({ post, index, onNavigate }) => {
	const cardRef = useRef<HTMLAnchorElement>(null)
	const asciiRef = useRef<HTMLDivElement>(null)
	const formattedIndex = (index + 1).toString().padStart(2, '0')

	// Animation Stagger Logic
	const listStagger = index * 150
	const baseDuration = 1000 + listStagger

	const indexDuration = baseDuration
	const dateDuration = baseDuration + 400
	const readTimeDuration = baseDuration + 800
	const viewsDuration = baseDuration + 1200

	// Animation Frame Ref for ASCII
	const frameRef = useRef<number>(0)

	// ASCII State
	const asciiCharsRef = useRef<string[]>([])

	// Initialize ASCII pattern
	useEffect(() => {
		const chars = ['+', '.', ':', '-', '·', ' ']
		asciiCharsRef.current = Array.from({ length: 1200 }, () => {
			// Sparser pattern (more spaces) to avoid the "filled" look
			return Math.random() > 0.85 ? ' ' : chars[Math.floor(Math.random() * chars.length)]
		})
		if (asciiRef.current) {
			asciiRef.current.innerText = asciiCharsRef.current.join('')
		}
	}, [])

	useEffect(() => {
		const asciiChars = ['+', '.', ':', '-', '·', ' ']

		const animate = () => {
			// --- ASCII Mutation (Subtle background data stream) ---
			if (asciiRef.current && asciiCharsRef.current.length > 0) {
				// Change fewer characters per frame for a more stable "matrix" look
				for (let i = 0; i < 5; i++) {
					const idx = Math.floor(Math.random() * asciiCharsRef.current.length)
					if (Math.random() > 0.5) {
						asciiCharsRef.current[idx] =
							asciiChars[Math.floor(Math.random() * asciiChars.length)]
					}
				}
				asciiRef.current.innerText = asciiCharsRef.current.join('')
			}

			frameRef.current = requestAnimationFrame(animate)
		}

		frameRef.current = requestAnimationFrame(animate)

		return () => {
			if (frameRef.current) cancelAnimationFrame(frameRef.current)
		}
	}, [])

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// allow cmd/ctrl + click to open in new tab without triggering transition
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
			return
		}
		e.preventDefault()
		onNavigate(post.slug)
	}

	const handleTagClick = (e: React.MouseEvent, tag: string) => {
		e.preventDefault()
		e.stopPropagation()
		onNavigate(`/category/${tag.toLowerCase()}`)
	}

	return (
		<a
			ref={cardRef}
			href={post.slug}
			onClick={handleClick}
			className='group relative block animate-enter active:scale-[0.995] transition-transform duration-200 overflow-hidden first:rounded-t-2xl last:rounded-b-2xl [&:last-child>article]:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'
			style={{
				animationDelay: `${index * 100}ms`
			}}
			aria-label={`Read article: ${post.title}`}
		>
			{/* Neutral Gradient Background on Hover */}
			<div
				className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
				aria-hidden='true'
			/>

			{/* ASCII Texture Layer (Subtle, Fades in on Hover) */}
			<div
				className='absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none'
				aria-hidden='true'
			>
				<div
					ref={asciiRef}
					className='w-full h-full font-mono text-[10px] leading-[10px] text-muted-foreground/10 break-all select-none tracking-widest p-4'
				/>
			</div>

			<article className='relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-8 px-6 border-b border-border/40 z-10'>
				<div className='flex-1 min-w-0'>
					<header className='flex items-start gap-3'>
						<span
							className='text-4xl font-bold text-muted-foreground/20 leading-none flex items-center min-h-[3.5rem] select-none'
							aria-hidden='true'
						>
							<AnimatedNumber value={formattedIndex} duration={indexDuration} />
						</span>

						<div className='flex-1'>
							<h3 className='font-medium text-lg text-foreground group-hover:text-accent transition-colors duration-200 leading-snug'>
								{post.title}
							</h3>

							<p className='text-xs text-muted-foreground/60 line-clamp-2 mt-1.5 leading-relaxed text-balance'>
								{post.summary}
							</p>

							{/* Tags */}
							{post.tags && post.tags.length > 0 && (
								<div className='flex flex-wrap gap-2 mt-3 mb-1' aria-label='Tags'>
									{post.tags.map((tag) => (
										<button
											key={tag}
											onClick={(e) => handleTagClick(e, tag)}
											className='inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted/50 text-muted-foreground/80 border border-transparent hover:border-accent/20 hover:bg-accent/10 hover:text-accent transition-colors duration-300 cursor-pointer'
										>
											{tag}
										</button>
									))}
								</div>
							)}

							<footer className='flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground'>
								<div className='flex items-center gap-1.5'>
									<Calendar
										className='w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:-rotate-12 group-hover:text-accent'
										aria-hidden='true'
									/>
									<time dateTime={post.date}>
										<AnimatedNumber
											value={post.publishedAt}
											duration={dateDuration}
										/>
									</time>
								</div>

								<span className='text-muted-foreground/30' aria-hidden='true'>
									·
								</span>

								<div
									className='flex items-center gap-1.5'
									aria-label='Estimated read time'
								>
									<Clock
										className='w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent'
										aria-hidden='true'
									/>
									<span className='tabular-nums font-medium'>
										<AnimatedNumber
											value={post.readTime}
											duration={readTimeDuration}
										/>
									</span>
								</div>

								{post.views && (
									<>
										<span
											className='text-muted-foreground/30'
											aria-hidden='true'
										>
											·
										</span>
										<div
											className='flex items-center gap-1.5'
											aria-label={`${post.views} views`}
										>
											<Eye
												className='w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent'
												aria-hidden='true'
											/>
											<span className='tabular-nums font-medium'>
												<AnimatedNumber
													value={post.views.toLocaleString()}
													duration={viewsDuration}
												/>
											</span>
										</div>
									</>
								)}
							</footer>
						</div>
					</header>
				</div>

				<div className='flex-shrink-0 ml-auto sm:ml-0' aria-hidden='true'>
					<div className='relative w-10 h-10 rounded-full bg-muted/50 group-hover:bg-accent/20 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-110'>
						{/* Icon 1: Exits top-right */}
						<ArrowUpRight className='absolute w-4 h-4 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:-translate-y-6 group-hover:translate-x-6' />

						{/* Icon 2: Enters from bottom-left */}
						<ArrowUpRight className='absolute w-4 h-4 text-accent -translate-x-6 translate-y-6 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0' />
					</div>
				</div>
			</article>
		</a>
	)
}
