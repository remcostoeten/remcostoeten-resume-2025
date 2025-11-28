import { h as head, e as escape_html, c as attr, d as attributes } from "../../chunks/vendor.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, children } = $$props;
    let title = `${data.resume.basics.name} - ${data.resume.basics.title}`;
    const structuredDataScript = {
      type: "application/ld+json",
      innerHTML: JSON.stringify(data.structuredData, null, 2)
    };
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta name="title"${attr("content", title)}/> <meta name="description"${attr("content", data.resume.summary[0])}/> <meta name="keywords"${attr("content", data.resume.skills.languages.slice(0, 10).join(", "))}/> <meta property="og:type" content="website"/> <meta property="og:url"${attr("content", data.resume.basics.site)}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", data.resume.summary[0])}/> <meta property="og:image"${attr("content", `${data.resume.basics.site}/og-image.jpg`)}/> <meta property="og:image:alt"${attr("content", `${data.resume.basics.name} - Professional Resume`)}/> <meta property="twitter:card" content="summary_large_image"/> <meta property="twitter:url"${attr("content", data.resume.basics.site)}/> <meta property="twitter:title"${attr("content", title)}/> <meta property="twitter:description"${attr("content", data.resume.summary[0])}/> <meta property="twitter:image"${attr("content", `${data.resume.basics.site}/og-image.jpg`)}/> <meta name="author"${attr("content", data.resume.basics.name)}/> <meta name="robots" content="index, follow"/> <meta name="language" content="English"/> <meta name="generator" content="SvelteKit"/> <link rel="canonical"${attr("href", data.resume.basics.site)}/> <script${attributes({ ...structuredDataScript })} onload="this.__e=event" onerror="this.__e=event"><\/script> <link rel="icon" type="image/svg+xml" href="/favicon.svg"/> <link rel="icon" type="image/png" href="/favicon.png"/> <link rel="apple-touch-icon" href="/apple-touch-icon.png"/> <link rel="manifest" href="/manifest.json"/> <meta name="theme-color" content="#3b82f6"/> <meta name="mobile-web-app-capable" content="yes"/> <meta name="apple-mobile-web-app-capable" content="yes"/> <meta name="apple-mobile-web-app-status-bar-style" content="default"/> <link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 print:bg-white"><a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 z-50">Skip to main content</a> <main id="main-content" class="container mx-auto px-4 py-8 max-w-4xl print:max-w-none print:p-0">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="mt-16 border-t border-gray-200 bg-white print:border-gray-300"><div class="container mx-auto px-4 py-8 max-w-4xl"><div class="text-center text-sm text-gray-600 print:text-black"><p class="mb-2">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} ${escape_html(data.resume.basics.name)}. Built with <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">SvelteKit</a> for maximum accessibility and performance.</p> <p class="text-xs">This site follows WCAG 2.1 AA guidelines and is optimized for screen readers and keyboard navigation.</p></div></div></footer></div> <div aria-live="polite" aria-atomic="true" class="sr-only"></div> <div class="fixed top-0 left-0 w-full h-1 bg-blue-600 transform -translate-x-full transition-transform duration-300 ease-out z-50" role="progressbar" aria-label="Loading" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>`);
  });
}
export {
  _layout as default
};
