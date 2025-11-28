<script lang="ts">
	import type { Education } from '$lib/types/resume';

	interface Props {
		education: Education[];
	}

	let { education }: Props = $props();
</script>

<section aria-labelledby="education-heading">
	<h2 id="education-heading" class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
		Education
	</h2>

	<div class="space-y-4">
		{#each education as edu}
			<div class="flex justify-between items-baseline">
				<div>
					<h3 class="text-lg font-semibold text-gray-800">{edu.degree}</h3>
					<p class="text-md text-gray-600">{edu.institution}</p>
				</div>
				<p class="text-sm text-gray-500 font-mono">{edu.period}</p>
			</div>
		{/each}
	</div>
</section>