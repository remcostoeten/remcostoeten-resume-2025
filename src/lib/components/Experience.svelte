<script lang="ts">
	import type { Experience } from '$lib/types/resume';

	interface Props {
		experience: Experience[];
	}

	let { experience }: Props = $props();
</script>

<section aria-labelledby="experience-heading">
	<h2 id="experience-heading" class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
		Professional Experience
	</h2>

	<div class="space-y-6">
		{#each experience as job}
			<div>
				<div class="flex justify-between items-baseline">
					<div>
						<h3 class="text-lg font-semibold text-gray-800">{job.role}</h3>
						<p class="text-md font-medium text-gray-600">{job.company}</p>
					</div>
					<p class="text-sm text-gray-500 font-mono">{job.period}</p>
				</div>
				<ul class="list-disc list-inside mt-2 space-y-1 text-gray-700">
					{#each job.bullets as bullet}
						<li>{@html bullet}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>