<script lang="ts">
	import type { Skills, Language } from '$lib/types/resume';

	interface Props {
		skills: Skills;
		languages: Language[];
	}

	let { skills, languages }: Props = $props();

	const skillCategories = [
		{ key: 'languages', title: 'Languages' },
		{ key: 'frameworks', title: 'Frameworks & Libraries' },
		{ key: 'styling', title: 'Styling & UI' },
		{ key: 'backend', title: 'Backend' },
		{ key: 'databases', title: 'Databases & ORM' },
		{ key: 'tools', title: 'Tools & DevOps' },
		{ key: 'design', title: 'Design Tools' }
	];
</script>

<section aria-labelledby="skills-heading">
	<h2 id="skills-heading" class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
		Technical Skills
	</h2>

	<div class="space-y-4">
		{#each skillCategories as category}
			{@const categorySkills = skills[category.key as keyof Skills]}
			{#if Array.isArray(categorySkills) && categorySkills.length > 0}
				<div class="grid grid-cols-4 items-baseline">
					<h3 class="text-md font-semibold text-gray-800 col-span-1">{category.title}:</h3>
					<p class="text-gray-700 col-span-3">
						{categorySkills.join(', ')}
					</p>
				</div>
			{/if}
		{/each}
		<div class="grid grid-cols-4 items-baseline">
			<h3 class="text-md font-semibold text-gray-800 col-span-1">Languages:</h3>
			<p class="text-gray-700 col-span-3">
				{languages.map(lang => `${lang.name} (${lang.level})`).join(', ')}
			</p>
		</div>
	</div>
</section>