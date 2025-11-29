<script lang="ts">
	interface Props {
		summary: string[];
	}

	let { summary }: Props = $props();

	// Important terms and phrases to bold (ordered as they appear in the summary)
	const importantTerms = [
		'Front End Engineer',
		'eight years',
		'SaaS',
		'e commerce',
		'government platforms',
		'e learning systems',
		'Graphic Design degree',
		'visual design sensibility',
		'TypeScript',
		'React',
		'Next.js',
		'product thinking',
		'autonomy',
		'fully remote',
		'autonomous',
		'hybrid work environments',
		'Scrum',
		'Kanban',
		'Shape Up',
		'full stack architecture',
		'scalability',
		'design systems',
		'developer experience tooling'
	];

	function boldImportantTerms(text: string): string {
		let result = text;
		// Sort by length descending to match longer phrases first
		const sortedTerms = [...importantTerms].sort((a, b) => b.length - a.length);
		
		for (const term of sortedTerms) {
			const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
			result = result.replace(regex, (match) => `<strong>${match}</strong>`);
		}
		
		return result;
	}

	const formattedSummary = $derived(
		summary.map(sentence => boldImportantTerms(sentence)).join(' ')
	);
</script>

<section aria-labelledby="summary-heading">
	<h2 id="summary-heading" class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
		Professional Summary
	</h2>
	<p class="text-gray-700 leading-relaxed">
		{@html formattedSummary}
	</p>
</section>