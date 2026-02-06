import React, { useMemo } from 'react'
import { CategoryCard } from './CategoryCard'
import { BlogPost } from '../types'

interface CategoryOverviewProps {
	posts: BlogPost[]
	onNavigate: (slug: string) => void
}

export const CategoryOverview: React.FC<CategoryOverviewProps> = ({ posts, onNavigate }) => {
	// Extract unique tags and count occurrences
	const categories = useMemo(() => {
		const tagMap = new Map<string, number>()

		posts.forEach((post) => {
			post.tags?.forEach((tag) => {
				tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
			})
		})

		// Convert map to array and sort by count (descending)
		return Array.from(tagMap.entries())
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
	}, [posts])

	return (
		<ul className='flex flex-col m-0 p-0 list-none' role='list'>
			{categories.map((category, index) => (
				<li key={category.name} className='block p-0 m-0'>
					<CategoryCard
						name={category.name}
						count={category.count}
						index={index}
						onNavigate={onNavigate}
					/>
				</li>
			))}
		</ul>
	)
}
