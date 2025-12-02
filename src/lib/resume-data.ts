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
    site: "https://remcostoeten.nl",
    github: "https://github.com/remcostoeten",
    linkedin: "https://linkedin.com/in/remco-stoeten",
  },
  summary: [
    "Front End Engineer with eight years of experience across SaaS, e-commerce, government platforms and e-learning systems.",
    "Graphic Design degree brings strong visual design sensibility to technical implementation.",
    "Focused on TypeScript, React, Next.js and modern tooling with strong product thinking and autonomy.",
    "Experienced with fully remote, autonomous, and hybrid work environments using Scrum, Kanban and Shape Up.",
    "Expanding expertise in full stack architecture, scalability, design systems and developer experience tooling.",
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
      desc: "A local-first desktop application for writing and organizing thoughts. Built with Tauri 2.0 and React, Skriuw blends note-taking and task management into a fast, private workspace with Markdown editing and offline access.",
      link: "https://skriuw.vercel.app",
      category: "app",
      note: "In active development",
    },
    {
      name: "Fync",
      desc: "Unified API wrapper for GitHub, Vercel, NPM, Google Calendar, Discord, Spotify and others.",
      link: "https://fync-docs.vercel.app/docs",
      category: "api",
    },
    {
      name: "Drizzleasy",
      desc: "CRUD generator for Next.js using Drizzle ORM with chainable syntax.",
      link: "https://drizzleasy.vercel.app",
      category: "api",
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
    languages: ["TypeScript", "JavaScript", "(S)CSS", "Shell (bash, fish, zsh)", "Scripting (Python*, Lua)"],
    frameworks: ["React", "Next.js", "Qwik", "Solid", "Svelte", "TanStack Query"],
    styling: ["Tailwind", "(S)CSS", "Styled Components"],
    backend: ["Node.js", "Hono", "Express"],
    databases: ["PostgreSQL", "SQLite", "LibSQL", "Turso", "Drizzle ORM", "Prisma"],
    tools: ["Git", "Docker", "Vite", "pnpm", "Bun", "CI/CD", "Linux", "SSH", "DX tooling"],
    design: ["Figma", "Photoshop"],
  },
  languages: [
    { name: "Dutch", level: "Native" },
    { name: "Frisian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
}
