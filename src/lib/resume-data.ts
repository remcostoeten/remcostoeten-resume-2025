export interface ResumeBasics {
  name: string
  title: string
  location: string
  email: string
  phone: string
  site: string
  github: string
  linkedin: string
}

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
}

export interface Project {
  name: string
  desc: string
  link: string
  category?: string
  note?: string
}

export interface Skills {
  languages: string[]
  frameworks: string[]
  styling: string[]
  backend: string[]
  databases: string[]
  tools: string[]
  design: string[]
  ai: string[]
  misc: string[]
}

export interface Language {
  name: string
  level: string
}

export interface Resume {
  basics: ResumeBasics
  summary: string[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skills
  languages: Language[]
}

export const resumeData: Resume = {
  basics: {
    name: "Remco Stoeten",
    title: "Front End Engineer, TypeScript and React (Next.js)",
    location: "Lemmer, The Netherlands",
    email: "stoetenremco.rs@gmail.com",
    phone: "+31 6 36590707",
    site: "https://remcostoeten-nl.vercel.app",
    github: "https://github.com/remcostoeten",
    linkedin: "https://linkedin.com/in/remco-stoeten",
  },
  summary: [
    "Front-end engineer with a degree in graphic design and over eight years of experience across B2B/B2C e-commerce, open-source govtech, large-scale in-house SaaS, and e-learning platforms.",
    "Strong product mindset with a focus on performance, scalability, and user experience.",
    "Actively working with AI, both integrating APIs into products and leveraging AI to enhance developer experience and internal tooling.",
    "Comfortable in fully remote and hybrid environments. Experienced with Scrum, Kanban, Shape Up, and autonomous teams.",
  ],
  experience: [
    {
      company: "Brainstud / Allyoucanlearn",
      role: "Front End Developer",
      period: "2025 — Present",
      bullets: [
        "Building a modern e-learning platform with Next.js, TypeScript and React Query.",
        "Working under the Shape Up methodology delivering scoped and iterative features.",
        "Collaborating with a Laravel backend team through a custom REST layer.",
      ],
    },
    {
      company: "Pleio",
      role: "Front End Developer",
      period: "2023 — 2025",
      bullets: [
        "Developed fully open source government platforms using React, GraphQL and Django.",
        "Rebuilt the FSV fraud detection platform in JavaScript, SCSS and Django.",
        "Improved reliability and maintainability of a core intranet site builder used across government institutions.",
        "Implemented WCAG AA compliance and accessibility standards for government applications.",
      ],
    },
    {
      company: "Lasaulec / Distil",
      role: "Software Developer",
      period: "2022 — 2023",
      bullets: [
        "Rebuilt the complete webshop front-end using Razor, SCSS and JavaScript.",
        "Delivered production features autonomously for React-based internal applications.",
      ],
    },
    {
      company: "Tickles",
      role: "Front End Developer",
      period: "2016 — 2022",
      bullets: ["Built custom Magento 2 webshops for B2B and B2C clients using PHTML, BEM SCSS and JavaScript."],
    },
  ],
  education: [
    {
      institution: "ROC Friese Poort Sneek",
      degree: "Graphic Design Degree",
      period: "2012 — 2016",
    },
  ],
  projects: [
    {
      name: "Skriuw",
      desc: "Note-taking and productivity platform available as web app, PWA, or native desktop app (Tauri/Rust). Cloud, self-hosted, or fully offline. Block editor with wikilinks, BYOK for AI and database, daily notes, 25+ keyboard shortcuts, and deep customization. macOS, Windows, and Linux.",
      link: "https://skriuw.vercel.app",
      category: "app",
      note: "In active development",
    },
    {
      name: "Dora",
      desc: "High-performance, keyboard-centric database explorer built with Rust and Tauri. At ~8.5MB vs pgAdmin's ~400MB. Features query execution, data visualization, migration tooling, ORM schema generation, SSH tunneling, and a custom Go CLI for builds and releases. Fully offline, zero telemetry.",
      link: "https://doradb.vercel.app",
      category: "app",
      note: "In active development",
    },
    {
      name: "Beautiful Code Block",
      desc: "React component for displaying syntax-highlighted code blocks with search, line numbers, and interactive features.",
      link: "https://beautiful-codeblock.vercel.app/",
      category: "ui-component",
    },
    {
      name: "Beautiful File Tree",
      desc: "React component for visualizing project folder structures with interactive tree views and customization options.",
      link: "https://beautiful-file-tree-v2.vercel.app",
      category: "ui-component",
    },
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Shell (bash, fish, zsh)", "Scripting (Python*, Lua)"],
    frameworks: ["React", "Next.js", "TanStack Start", "SolidStart*", "Qwik*", "Svelte*"],
    styling: ["CSS", "SCSS/Less/Sass", "Styled Components", "Tailwind CSS"],
    backend: ["Node.js", "Hono", "ElysiaJS", "Express", "Go*", "Tauri/Rust*"],
    databases: ["PostgreSQL", "SQLite", "LibSQL", "Turso", "Drizzle ORM", "Prisma"],
    tools: ["Git", "Docker", "Vite", "pnpm", "Bun", "Linux", "SSH", "CLI/DX tooling"],
    design: ["Figma", "Photoshop"],
    ai: ["API integration (Vercel AI SDK, OpenRouter)", "Whatever tool fits the job best"],
    misc: ["Playwright", "Vitest", "GitHub Actions", "Vercel", "Cloudflare", "GraphQL", "REST", "tRPC", "Monorepos", "WCAG/a11y"],
  },
  languages: [
    { name: "Dutch", level: "Native" },
    { name: "Frisian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
}
