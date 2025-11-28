
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/robots.txt" | "/sitemap.xml";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/robots.txt": Record<string, never>;
			"/sitemap.xml": Record<string, never>
		};
		Pathname(): "/" | "/robots.txt" | "/robots.txt/" | "/sitemap.xml" | "/sitemap.xml/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.htaccess" | "/favicon.svg" | "/manifest.json" | "/sw.js" | string & {};
	}
}