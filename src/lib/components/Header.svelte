<script lang="ts">
	import type { Basics } from '$lib/types/resume';
	import { browser } from '$app/environment';

	interface Props {
		basics: Basics;
	}

	let { basics }: Props = $props();

	function handleDownloadCV() {
		if (browser) {
			window.print();
		}
	}
</script>

<header class="border-b pb-4 mb-8">
	<div class="flex justify-between items-start gap-4 mb-4">
		<div class="flex-1">
			<h1 class="text-3xl font-bold text-slate-900 tracking-wide">
				{basics.name}
			</h1>
			<p class="text-lg font-medium text-slate-700">
				{basics.title}
			</p>
		</div>
		<button
			on:click={handleDownloadCV}
			class="no-print px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center gap-2 font-medium text-sm"
			aria-label="Download CV as PDF"
		>
			<svg
				class="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			Download CV
		</button>
	</div>
	<div class="mt-4 text-sm text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
		<span class="font-medium">{basics.location}</span>
		<span class="text-slate-400">•</span>
		<a href="mailto:{basics.email}" class="text-primary-600 hover:text-primary-700 transition-colors hover:underline">{basics.email}</a>
		<span class="text-slate-400">•</span>
		<a href="tel:{basics.phone.replace(/[\s\+]/g, '')}" class="text-primary-600 hover:text-primary-700 transition-colors hover:underline">{basics.phone}</a>
		<span class="text-slate-400">•</span>
		<a href="{basics.site}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 transition-colors hover:underline">Portfolio</a>
		<span class="text-slate-400">•</span>
		<a href="{basics.github}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 transition-colors hover:underline">GitHub</a>
		<span class="text-slate-400">•</span>
		<a href="{basics.linkedin}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 transition-colors hover:underline">LinkedIn</a>
	</div>
</header>