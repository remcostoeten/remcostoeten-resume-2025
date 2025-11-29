<script lang="ts">
	import type { Project } from '$lib/types/resume';

	interface Props {
		projects: Project[];
		sectionTitle?: string;
		showLinks?: boolean;
	}

	let {
		projects,
		sectionTitle = "Featured Projects",
		showLinks = true
	}: Props = $props();
</script>

<section aria-labelledby="projects-heading">
	<h2 id="projects-heading" class="text-2xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 mb-4">
		{sectionTitle}
	</h2>

	<div class="space-y-6">
		{#each projects as project}
			<div class="group">
				<h3 class="text-lg font-semibold text-slate-900 mb-2">
					{#if showLinks && project.link}
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary-600 hover:text-primary-700 transition-colors hover:underline flex items-center gap-1"
						>
							{project.name}
							<svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
							</svg>
						</a>
					{:else}
						{project.name}
					{/if}
				</h3>
				<p class="text-slate-700 leading-relaxed">{project.desc}</p>
				{#if project.tech && project.tech.length > 0}
					<div class="flex flex-wrap gap-2 mt-2">
						{#each project.tech as tech}
							<span class="inline-block px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
								{tech}
							</span>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>