import { e as escape_html, c as attr, f as stringify, i as ensure_array_like, j as html, h as head, k as attr_class } from "../../chunks/vendor.js";
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { basics } = $$props;
    const printEmail = basics.email.replace("@", " [at] ").replace(/\./g, " [dot] ");
    $$renderer2.push(`<header class="mb-12 text-center sm:text-left"><h1 class="text-4xl font-bold text-gray-900 mb-2 tracking-tight">${escape_html(basics.name)}</h1> <p class="text-xl text-gray-600 mb-4 font-medium">${escape_html(basics.title)}</p> <nav aria-label="Contact information" class="space-y-2 text-gray-600 print:space-y-1"><div class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0"><div class="flex items-center justify-center sm:justify-start"><svg class="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg> <span>${escape_html(basics.location)}</span></div> <div class="flex items-center justify-center sm:justify-start"><svg class="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> <a${attr("href", `mailto:${stringify(basics.email)}`)} class="hover:text-blue-600 transition-colors print:hidden"${attr("aria-label", `Send email to ${stringify(basics.name)}`)}>${escape_html(basics.email)}</a> <span class="hidden print:inline">${escape_html(printEmail)}</span></div> <div class="flex items-center justify-center sm:justify-start"><svg class="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> <a${attr("href", `tel:${stringify(basics.phone.replace(/[\s\+]/g, ""))}`)} class="hover:text-blue-600 transition-colors print:hidden"${attr("aria-label", `Call ${stringify(basics.name)}`)}>${escape_html(basics.phone)}</a> <span class="hidden print:inline">${escape_html(basics.phone)}</span></div></div> <div aria-label="Online profiles" class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 pt-4 border-t border-gray-200 print:border-0"><a${attr("href", basics.site)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1" aria-label="Personal website"><svg class="w-4 h-4 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zM9.954 4.569c-1.299.246-2.29 1.558-2.578 3.431h2.578V4.569zm0 5.962v3.431c-1.299-.246-2.29-1.558-2.578-3.431h2.578zm2.092 0h2.578c-.288-1.873-1.279-3.185-2.578-3.431v3.431zm0-5.962v3.431c1.299-.246 2.29-1.558 2.578-3.431h-2.578zm-4.184 5.962c.288-1.873 1.279-3.185 2.578-3.431v3.431H6.862zm4.184 5.962v-3.431c-1.299.246-2.29 1.558-2.578 3.431h2.578zm2.092 0c-.288-1.873-1.279-3.185-2.578-3.431v3.431h2.578zM15.917 9c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9z" clip-rule="evenodd"></path></svg> <span>Portfolio</span></a> <a${attr("href", basics.github)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1" aria-label="GitHub profile"><svg class="w-4 h-4 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path></svg> <span>GitHub</span></a> <a${attr("href", basics.linkedin)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1" aria-label="LinkedIn profile"><svg class="w-4 h-4 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path></svg> <span>LinkedIn</span></a></div></nav></header>`);
  });
}
function Summary($$renderer, $$props) {
  let { summary } = $$props;
  $$renderer.push(`<section id="summary" aria-labelledby="summary-heading" class="mb-12"><h2 id="summary-heading" class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">Professional Summary</h2> <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100 print:bg-white print:border-gray-300"><div class="prose prose-blue max-w-none"><ul class="space-y-3 text-gray-700 leading-relaxed" role="list"><!--[-->`);
  const each_array = ensure_array_like(summary);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let point = each_array[index];
    $$renderer.push(`<li class="flex items-start" role="listitem"><span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0 print:bg-black" aria-hidden="true"></span> <span class="text-balance">${escape_html(point)}</span></li>`);
  }
  $$renderer.push(`<!--]--></ul></div></div></section>`);
}
function Experience($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { experience } = $$props;
    $$renderer2.push(`<section id="experience" aria-labelledby="experience-heading"><h2 id="experience-heading" class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">Professional Experience</h2> <div class="space-y-8"><!--[-->`);
    const each_array = ensure_array_like(experience);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let job = each_array[index];
      $$renderer2.push(`<article class="relative pl-8 print:pl-6"${attr("aria-labelledby", `job-${index}-title`)}>`);
      if (index !== experience.length - 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute left-3 top-8 w-0.5 h-full bg-gray-300 print:bg-gray-400" aria-hidden="true"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="absolute left-0 top-2 w-6 h-6 bg-blue-600 border-4 border-white rounded-full print:border-black" aria-hidden="true"></div> <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100 print:shadow-none print:border-gray-300"><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3"><div class="flex-1"><h3${attr("id", `job-${index}-title`)} class="text-xl font-semibold text-gray-900 mb-1">${escape_html(job.role)}</h3> <p class="text-lg text-gray-700 font-medium">${escape_html(job.company)}</p></div> <time${attr("datetime", job.period.replace(",", "-"))} class="text-sm text-gray-500 font-medium mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap print:text-black">${escape_html(job.period)}</time></div> `);
      if (job.bullets.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<ul class="space-y-2 text-gray-600" role="list"><!--[-->`);
        const each_array_1 = ensure_array_like(job.bullets);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let bullet = each_array_1[$$index];
          $$renderer2.push(`<li class="flex items-start"><span class="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0 print:bg-black" aria-hidden="true"></span> <span class="text-balance leading-relaxed">${html(bullet)}</span></li>`);
        }
        $$renderer2.push(`<!--]--></ul>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></article>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function Projects($$renderer, $$props) {
  let { projects } = $$props;
  $$renderer.push(`<section id="projects" aria-labelledby="projects-heading"><h2 id="projects-heading" class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">Featured Projects</h2> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
  const each_array = ensure_array_like(projects);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let project = each_array[$$index];
    $$renderer.push(`<article class="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-colors print:border-gray-300 print:break-inside-avoid"><h3 class="text-lg font-semibold text-gray-900 mb-2">`);
    if (project.link) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<a${attr("href", project.link)} target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"${attr("aria-label", `Visit ${stringify(project.name)} project`)}>${escape_html(project.name)} <svg class="inline-block w-4 h-4 ml-1 align-middle" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg></a>`);
    } else {
      $$renderer.push("<!--[!-->");
      $$renderer.push(`${escape_html(project.name)}`);
    }
    $$renderer.push(`<!--]--></h3> <p class="text-gray-600 leading-relaxed text-balance">${escape_html(project.desc)}</p> `);
    if (project.link) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="mt-4 pt-4 border-t border-gray-100"><a${attr("href", project.link)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"${attr("aria-label", `View ${stringify(project.name)} project details`)}>View Project <svg class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a></div>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--></article>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Skills($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { skills, languages } = $$props;
    const skillCategories = [
      { key: "languages", title: "Languages" },
      { key: "frameworks", title: "Frameworks & Libraries" },
      { key: "styling", title: "Styling & UI" },
      { key: "backend", title: "Backend" },
      { key: "databases", title: "Databases & ORM" },
      { key: "tools", title: "Tools & DevOps" },
      { key: "design", title: "Design Tools" }
    ];
    $$renderer2.push(`<section id="skills" aria-labelledby="skills-heading" class="space-y-8"><h2 id="skills-heading" class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">Skills &amp; Languages</h2> <div class="grid md:grid-cols-2 gap-8"><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3> <div class="space-y-4"><!--[-->`);
    const each_array = ensure_array_like(skillCategories);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let category = each_array[$$index_1];
      if (skills[category.key] && skills[category.key].length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-gray-50 rounded-lg p-4 print:bg-white print:border print:border-gray-300"><h4 class="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wide">${escape_html(category.title)}</h4> <div class="flex flex-wrap gap-2" role="list"${attr("aria-label", `${category.title} technologies`)}><!--[-->`);
        const each_array_1 = ensure_array_like(skills[category.key]);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let skill = each_array_1[$$index];
          $$renderer2.push(`<span class="inline-block px-3 py-1 text-sm bg-white text-gray-800 border border-gray-200 rounded-full print:bg-white print:border-gray-400" role="listitem">${escape_html(skill)}</span>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div> <div><h3 class="text-lg font-semibold text-gray-900 mb-4">Languages</h3> <div class="bg-gray-50 rounded-lg p-4 print:bg-white print:border print:border-gray-300" role="list" aria-label="Spoken languages"><!--[-->`);
    const each_array_2 = ensure_array_like(languages);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let lang = each_array_2[$$index_2];
      $$renderer2.push(`<div class="flex items-center justify-between py-2 border-b border-gray-200 last:border-0 print:border-gray-300" role="listitem"><span class="font-medium text-gray-900">${escape_html(lang.name)}</span> <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 print:border-gray-400">${escape_html(lang.level)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></section>`);
  });
}
function Education($$renderer, $$props) {
  let { education } = $$props;
  $$renderer.push(`<section id="education" aria-labelledby="education-heading"><h2 id="education-heading" class="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">Education</h2> <div class="space-y-4"><!--[-->`);
  const each_array = ensure_array_like(education);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let edu = each_array[index];
    $$renderer.push(`<article class="bg-gray-50 rounded-lg p-6 print:bg-white print:border print:border-gray-300"><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between"><div class="flex-1"><h3 class="text-lg font-semibold text-gray-900 mb-1">${escape_html(edu.degree)}</h3> <p class="text-gray-700">${escape_html(edu.institution)}</p></div> <time${attr("datetime", edu.period.replace(",", "-"))} class="text-sm text-gray-500 font-medium mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap print:text-black">${escape_html(edu.period)}</time></div></article>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const { resume } = data;
    const sections = [
      { id: "summary", title: "Summary", icon: "📋" },
      { id: "experience", title: "Experience", icon: "💼" },
      { id: "projects", title: "Projects", icon: "🚀" },
      { id: "skills", title: "Skills", icon: "⚡" },
      { id: "education", title: "Education", icon: "🎓" }
    ];
    let activeSection = "summary";
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(resume.basics.name)} - ${escape_html(resume.basics.title)} | Professional Resume</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", resume.summary[0])}/> <meta name="keywords"${attr("content", resume.skills.languages.join(", "))}/> <link rel="canonical"${attr("href", resume.basics.site)}/> <script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: resume.basics.name,
			jobTitle: resume.basics.title,
			description: resume.summary[0],
			url: resume.basics.site,
			email: resume.basics.email,
			telephone: resume.basics.phone.replace(/[\\s\\+]/g, ''),
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
	<\/script>`);
    });
    $$renderer2.push(`<nav aria-label="Resume sections navigation" class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 mb-8 print:hidden"><div class="container mx-auto px-4 max-w-4xl"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900">Quick Navigation</h2> <div class="flex space-x-1 overflow-x-auto py-2"><!--[-->`);
    const each_array = ensure_array_like(sections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `#${stringify(section.id)}`)}${attr_class("flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap", void 0, {
        "text-blue-600": activeSection === section.id,
        "bg-blue-50": activeSection === section.id
      })}${attr("aria-current", activeSection === section.id ? "true" : void 0)}><span class="mr-1">${escape_html(section.icon)}</span> ${escape_html(section.title)}</a>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></nav> <div class="space-y-12"><section aria-label="Personal information">`);
    Header($$renderer2, { basics: resume.basics });
    $$renderer2.push(`<!----></section> `);
    Summary($$renderer2, { summary: resume.summary });
    $$renderer2.push(`<!----> `);
    Experience($$renderer2, { experience: resume.experience });
    $$renderer2.push(`<!----> `);
    Projects($$renderer2, { projects: resume.projects });
    $$renderer2.push(`<!----> `);
    Skills($$renderer2, { skills: resume.skills, languages: resume.languages });
    $$renderer2.push(`<!----> `);
    Education($$renderer2, { education: resume.education });
    $$renderer2.push(`<!----></div> <div class="no-print fixed bottom-6 right-6 z-30"><button type="button" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors" aria-label="Print resume"><svg class="w-5 h-5 inline-block mr-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg> Print Resume</button></div> <div class="no-print fixed bottom-6 right-36 z-30"><a href="/resume.pdf" download="remco-stoeten-resume.pdf" class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors inline-flex items-center" aria-label="Download PDF resume"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download PDF</a></div> <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">Resume loaded successfully. Use Tab to navigate through sections.</div>`);
  });
}
export {
  _page as default
};
