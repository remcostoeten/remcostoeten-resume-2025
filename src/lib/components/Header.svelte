<script lang="ts">
	import type { Basics } from '$lib/types/resume';

	interface Props {
		basics: Basics;
	}

	let { basics }: Props = $props();
</script>

<header class="text-center mb-8 border-b pb-4">
	<h1 class="text-4xl font-bold text-gray-800 tracking-wider">
		{basics.name}
	</h1>
	<p class="text-lg text-gray-600">
		{basics.title}
	</p>
	<div class="mt-4 text-sm text-gray-500 flex justify-center items-center space-x-4">
		<span>{basics.location}</span>
		<span class="text-gray-300">|</span>
		<a href="mailto:{basics.email}" class="hover:underline">{basics.email}</a>
		<span class="text-gray-300">|</span>
		<a href="tel:{basics.phone.replace(/[\s\+]/g, '')}" class="hover:underline">{basics.phone}</a>
		<span class="text-gray-300">|</span>
		<a href="{basics.site}" target="_blank" rel="noopener noreferrer" class="hover:underline">Portfolio</a>
		<span class="text-gray-300">|</span>
		<a href="{basics.github}" target="_blank" rel="noopener noreferrer" class="hover:underline">GitHub</a>
		<span class="text-gray-300">|</span>
		<a href="{basics.linkedin}" target="_blank" rel="noopener noreferrer" class="hover:underline">LinkedIn</a>
	</div>
</header>