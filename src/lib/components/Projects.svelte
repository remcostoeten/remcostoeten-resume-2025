<script lang="ts">
	import type { Project } from '$lib/types/resume';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();
</script>

<section aria-labelledby="projects-heading">
	<h2 id="projects-heading" class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
		Featured Projects
	</h2>

	<div class="space-y-6">
		{#each projects as project}
			<div>
				<h3 class="text-lg font-semibold text-gray-800">
					{#if project.link}
						<a href={project.link} target="_blank" rel="noopener noreferrer" class="hover:underline">
							{project.name}
						</a>
					{:else}
						{project.name}
					{/if}
				</h3>
				<p class="text-gray-700 leading-relaxed">{project.desc}</p>
			</div>
		{/each}
	</div>
</section>