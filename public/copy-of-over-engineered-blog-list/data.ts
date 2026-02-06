import { BlogPost } from './types'

export const BLOG_POSTS: BlogPost[] = [
	{
		id: '1',
		slug: '/posts/over-engineering-my-site',
		title: 'New site 🎉 Self-induced neuronal deficiency is an over-engineering catalyst',
		summary:
			'Building a simple personal website that spiraled into over-engineering territory: custom npm packages, monorepo setup, multiple APIs integration, and several scrapped features along the way. A tale of how personal projects can become unnecessarily complex.',
		date: '2025-10-06',
		publishedAt: 'Oct 6, 2025',
		readTime: '5 min',
		views: 1243,
		tags: ['Engineering', 'Design', 'Ramblings'],
		content: `It started as a simple idea: *"I just need a place to put my thoughts."*

Three months, two monorepo migrations, and a custom build tool later, I finally have... a place to put my thoughts. But was it worth it? Absolutely not. Would I do it again? In a heartbeat.

## The Stack

I decided to forego the usual suspects (Next.js, Remix) initially to write my own static site generator. Why? Because I hate myself, apparently. But also because I wanted to understand the **build process** intimately.

\`\`\`javascript
// The initial build script
const build = async () => {
  const posts = await fs.readdir('./posts');
  // ... complexity ensues
}
\`\`\`

### Key Features I Didn't Need But Added Anyway:

- Real-time weather data in the footer (because why not?)
- A custom markdown parser that supports ASCII art natively
- **Three** different state management libraries just to toggle dark mode

In the end, I moved everything to Next.js because I missed Hot Module Replacement. The irony is not lost on me.`
	},
	{
		id: '2',
		slug: '/posts/animated-number-component',
		title: 'Building an Animated Number Component',
		summary:
			'A reusable React component for smooth number animations with accessibility and performance in mind.',
		date: '2024-10-04',
		publishedAt: 'Oct 4, 2024',
		readTime: '4 min',
		views: 856,
		tags: ['React', 'Animation', 'A11y'],
		content: `Animating numbers is tricky. You want it to feel mechanical, like a slot machine or an old odometer, but also digital and fluid. In this post, we'll break down the \`AnimatedNumber\` component used on this very site.

## The Concept

Instead of just incrementing a number, we create a vertical strip of digits from 0 to 9 (repeated). By changing the \`transform: translateY()\` property, we can slide the correct digit into view.

### Accessibility First

Visual flair shouldn't compromise usability. We ensure screen readers see the static number while the visual DOM handles the chaos.

\`\`\`tsx
<span aria-label={value}>
  <span aria-hidden="true">
    {/* visual strips */}
  </span>
</span>
\`\`\`

This approach ensures that while your eyes enjoy the show, assistive technology gets the data immediately.`
	},
	{
		id: '3',
		slug: '/posts/react-server-components',
		title: 'Rethinking State in Server Components',
		summary:
			'Exploration of how we handle ephemeral state when moving from client-side rendering to a server-first architecture. Pitfalls, patterns, and performance implications.',
		date: '2024-09-28',
		publishedAt: 'Sep 28, 2024',
		readTime: '7 min',
		tags: ['React', 'RSC', 'Architecture'],
		content: `React Server Components (RSC) represent the biggest paradigm shift in the React ecosystem since hooks. But they also fundamentally change how we think about **state**.

## The Mental Model

Traditionally, we thought of our app as a tree of components that *re-render* on the client. With RSC, parts of that tree are static HTML sent from the server, never to hydrate again.

> "Constraints liberate." — The restrictions RSC places on us force better architectural decisions.

### When to use Client Components

Interactivity is the dividing line. Does it need \`useState\`? Client. Is it just fetching data? Server. It sounds simple, but the boundaries can get blurry when you're passing props deeply.`
	},
	{
		id: '4',
		slug: '/posts/why-i-use-typescript',
		title: 'Why I stick with TypeScript',
		summary:
			'A look into why TypeScript has become indispensable in my daily workflow. It is not just about types; it is about confidence, refactoring capabilities, and self-documenting code.',
		date: '2024-08-12',
		publishedAt: 'Aug 12, 2024',
		readTime: '6 min',
		views: 432,
		tags: ['TypeScript', 'Development', 'Opinion'],
		content: `I used to be a JavaScript purist. "Why write more code to do the same thing?" I'd ask. Then I worked on a codebase with 50,000 lines of untyped JS.

## The Turning Point

Refactoring a core utility function without types is like playing Jenga in the dark. You pull a block (change a prop name) and pray the tower doesn't collapse (runtime error in production).

### It's about the IDE

TypeScript isn't just a linter; it's an engine that powers your IDE's autocomplete and navigation. The ability to "Go to Definition" with 100% accuracy is a productivity multiplier.

Once you get past the initial setup friction, you realize that the time spent writing types is paid back tenfold in debugging time saved.`
	}
]
