<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Summary from '$lib/components/Summary.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';

	interface Props {
		data: {
			resume: import('$lib/types/resume').Resume;
		};
	}

	let { data }: Props = $props();
	const { resume } = data;
</script>

<svelte:head>
	<!-- Page-specific SEO -->
	<title>{resume.basics.name} - {resume.basics.title} | Professional Resume</title>
	<meta name="description" content={resume.summary[0]} />
	<meta name="keywords" content="{resume.skills.languages.join(', ')}" />

	<!-- Canonical URL -->
	<link rel="canonical" href={resume.basics.site} />

	<!-- JSON-LD for SEO -->
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: resume.basics.name,
			jobTitle: resume.basics.title,
			description: resume.summary[0],
			url: resume.basics.site,
			email: resume.basics.email,
			telephone: resume.basics.phone.replace(/[\s\+]/g, ''),
			address: {
				'@type': 'PostalAddress',
				addressLocality: resume.basics.location,
				addressCountry: 'NL'
			},
			sameAs: [resume.basics.github, resume.basics.linkedin, resume.basics.site],
			knowsAbout: resume.skills.languages,
			alumniOf: resume.education.map(edu => ({
				'@type': 'EducationalOrganization',
				name: edu.institution
			}))
		}, null, 2)}
	</script>
</svelte:head>

<!-- Main Resume Content -->
<main class="container mx-auto max-w-4xl p-8 bg-white shadow-lg my-8">
	<Header basics={resume.basics} />
	<div class="space-y-8">
		<Summary summary={resume.summary} />
		<Experience experience={resume.experience} />
		<Projects projects={resume.projects} />
		<Skills skills={resume.skills} languages={resume.languages} />
		<Education education={resume.education} />
	</div>
</main>