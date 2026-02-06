import { useState, useEffect } from 'react'
import { motion as motionOriginal, AnimatePresence } from 'framer-motion'
import { Music, GitBranch } from 'lucide-react'
import { getLatestCommit, CommitData } from '../core/github-service'
import { getLatestTracks, SpotifyTrack } from '../core/spotify-service'

// Workaround for framer-motion type mismatch
const motion = motionOriginal as any

// Custom Bezier for snappy yet smooth movement (Emphasized Deceleration)
const BEZIER_EASE = [0.25, 1, 0.5, 1]

const Equalizer = () => (
	<div className='flex items-end gap-[1px] h-2.5 ml-1.5' aria-hidden='true'>
		<div className='w-[2px] bg-green-500/60 animate-[music-bar_0.8s_ease-in-out_infinite]' />
		<div className='w-[2px] bg-green-500/60 animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]' />
		<div className='w-[2px] bg-green-500/60 animate-[music-bar_0.5s_ease-in-out_infinite_0.2s]' />
	</div>
)

// Your 5 latest projects
const LATEST_PROJECTS = [
	{
		owner: 'remcostoeten',
		repo: 'remcostoeten.nl',
		name: 'remcostoeten.nl',
		color: 'text-blue-400'
	},
	{ owner: 'remcostoeten', repo: 'drizzleasy', name: 'drizzleasy', color: 'text-yellow-400' },
	{ owner: 'remcostoeten', repo: 'fync', name: 'fync', color: 'text-orange-400' },
	{ owner: 'remcostoeten', repo: 'next-forge', name: 'next-forge', color: 'text-purple-400' },
	{ owner: 'remcostoeten', repo: 'planorama', name: 'planorama', color: 'text-green-400' }
]

export const ActivitySection = () => {
	const [songIndex, setSongIndex] = useState(0)
	const [activityIndex, setActivityIndex] = useState(0)
	const [commits, setCommits] = useState<(CommitData & { color: string })[]>([])
	const [tracks, setTracks] = useState<SpotifyTrack[]>([])
	const [loading, setLoading] = useState(true)

	// Fetch GitHub commits and Spotify tracks on mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch commits from latest projects
				const commitPromises = LATEST_PROJECTS.map(async (project) => {
					const commit = await getLatestCommit(project.owner, project.repo)
					return commit
						? { ...commit, color: project.color, projectName: project.name }
						: null
				})

				const commitResults = await Promise.all(commitPromises)
				const validCommits = commitResults.filter(Boolean) as (CommitData & {
					color: string
					projectName: string
				})[]
				setCommits(validCommits)

				// Fetch Spotify tracks
				const spotifyTracks = await getLatestTracks()
				setTracks(spotifyTracks)
			} catch (error) {
				console.error('Error fetching activity data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	// Cycle Music every 5 seconds
	useEffect(() => {
		if (tracks.length === 0) return
		const interval = setInterval(() => {
			setSongIndex((prev) => (prev + 1) % tracks.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [tracks.length])

	// Cycle Activity every 4 seconds
	useEffect(() => {
		if (commits.length === 0) return
		const interval = setInterval(() => {
			setActivityIndex((prev) => (prev + 1) % commits.length)
		}, 4000)
		return () => clearInterval(interval)
	}, [commits.length])

	const currentTrack = tracks[songIndex] || { name: 'Loading...', artist: '...', url: '#' }
	const currentCommit = commits[activityIndex] || {
		message: 'Loading recent commits...',
		url: '#',
		shortHash: '....',
		color: 'text-muted-foreground',
		projectName: 'Loading...',
		hash: '....',
		date: '',
		author: ''
	}

	if (loading) {
		return (
			<div className='w-full rounded-xl border border-border/40 bg-muted/10 p-1 md:p-1.5 mb-12 animate-enter shadow-sm group'>
				<div className='relative flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border/40 bg-background/40 backdrop-blur-sm rounded-lg overflow-hidden'>
					<div className='flex-1 flex items-center gap-4 p-4'>
						<div className='shrink-0 w-10 h-10 rounded-lg bg-accent/5 border border-accent/10 animate-pulse' />
						<div className='flex-1'>
							<div className='h-4 bg-muted rounded animate-pulse mb-2' />
							<div className='h-3 bg-muted rounded w-3/4 animate-pulse' />
						</div>
					</div>
					<div className='flex-1 flex items-center gap-4 p-4'>
						<div className='shrink-0 w-10 h-10 rounded-lg bg-green-500/5 border border-green-500/10 animate-pulse' />
						<div className='flex-1'>
							<div className='h-4 bg-muted rounded animate-pulse mb-2' />
							<div className='h-3 bg-muted rounded w-3/4 animate-pulse' />
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full rounded-xl border border-border/40 bg-muted/10 p-1 md:p-1.5 mb-12 animate-enter shadow-sm group'>
			<div className='relative flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border/40 bg-background/40 backdrop-blur-sm rounded-lg overflow-hidden'>
				{/* Ambient Background Glow */}
				<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

				{/* Section 1: Building (Git Activity) */}
				<div className='flex-1 flex items-center gap-4 p-4 min-w-0'>
					<div className='shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-accent/5 border border-accent/10 text-accent'>
						<GitBranch className='w-5 h-5' />
					</div>

					<div className='flex-1 min-w-0 flex flex-col justify-center h-full overflow-hidden'>
						<div className='flex items-center gap-2 mb-0.5'>
							<span className='text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70'>
								Building
							</span>
							<span className='w-1 h-1 rounded-full bg-accent animate-pulse' />
						</div>

						<AnimatePresence mode='wait'>
							<motion.div
								key={activityIndex}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -20, opacity: 0 }}
								transition={{ duration: 0.5, ease: BEZIER_EASE }}
								className='flex items-center gap-2 w-full'
							>
								<motion.a
									href={currentCommit.url}
									target='_blank'
									rel='noopener noreferrer'
									className={`text-sm font-medium truncate shrink-0 ${currentCommit.color} hover:underline`}
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, ease: BEZIER_EASE, delay: 0.05 }}
								>
									{currentCommit.projectName}
								</motion.a>

								<span className='text-muted-foreground/30 font-light hidden sm:inline-block'>
									/
								</span>

								<motion.span
									className='text-xs text-muted-foreground font-mono truncate'
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, ease: BEZIER_EASE, delay: 0.1 }}
								>
									{currentCommit.message.split('\n')[0]}
								</motion.span>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Section 2: Listening (Music) */}
				<div className='flex-1 flex items-center gap-4 p-4 min-w-0'>
					<div className='shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/5 border border-green-500/10 text-green-500'>
						<Music className='w-5 h-5' />
					</div>

					<div className='flex-1 min-w-0 flex flex-col justify-center h-full overflow-hidden'>
						<div className='flex items-center gap-2 mb-0.5'>
							<span className='text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70'>
								Whilst probably listening to
							</span>
							<Equalizer />
						</div>

						<AnimatePresence mode='wait'>
							<motion.div
								key={songIndex}
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: -20, opacity: 0 }}
								transition={{ duration: 0.5, ease: BEZIER_EASE }}
								className='w-full truncate flex items-center gap-2'
							>
								<motion.a
									href={currentTrack.url}
									target='_blank'
									rel='noopener noreferrer'
									className='text-sm font-medium text-foreground truncate block hover:underline'
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, ease: BEZIER_EASE, delay: 0.05 }}
								>
									{currentTrack.name}
								</motion.a>

								<motion.span
									className='text-xs text-muted-foreground truncate block'
									initial={{ y: 10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, ease: BEZIER_EASE, delay: 0.1 }}
								>
									{currentTrack.artist}
								</motion.span>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	)
}
