<script lang="ts">
	import type { Basics } from '$lib/types/resume';

	interface Props {
		basics: Basics;
	}

	let { basics }: Props = $props();
</script>

<header class="mb-8 border-b pb-4">
	<h1 class="text-3xl font-bold text-slate-900 tracking-wide">
		{basics.name}
	</h1>
	<p class="text-lg font-medium text-slate-700">
		{basics.title}
	</p>
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