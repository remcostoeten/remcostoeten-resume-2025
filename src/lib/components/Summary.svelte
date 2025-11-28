<script lang="ts">
	interface Props {
		summary: string[];
	}

	let { summary }: Props = $props();
</script>

<section aria-labelledby="summary-heading">
	<h2 id="summary-heading" class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
		Professional Summary
	</h2>
	<p class="text-gray-700 leading-relaxed">
		{summary.join(' ')}
	</p>
</section>