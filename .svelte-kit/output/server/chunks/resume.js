const resumeData = {
  basics: {
    name: "Remco Stoeten",
    title: "Front End Engineer, TypeScript and React (Next.js)",
    location: "Lemmer, The Netherlands",
    email: "stoetenremco.rs@gmail.com",
    phone: "+31 6 36590707",
    site: "https://remcostoeten.nl",
    github: "https://github.com/remcostoeten",
    linkedin: "https://linkedin.com/in/remco-stoeten"
  },
  summary: [
    "Front End Engineer with eight years of experience across SaaS, e commerce, government platforms and e learning systems.",
    "Graphic Design degree brings strong visual design sensibility to technical implementation.",
    "Focused on TypeScript, React, Next.js and modern tooling with strong product thinking and autonomy.",
    "Comfortable with fully remote, autonomous, and hybrid work environments using Scrum, Kanban and Shape Up.",
    "Expanding expertise in full stack architecture and developer experience tooling."
  ],
  experience: [
    {
      company: "Brainstud / Allyyoucanlearn",
      role: "Front End Developer",
      period: "2025, current",
      bullets: [
        "Building a modern e learning platform with Next.js, TypeScript and React Query.",
        "Working under the Shape Up methodology delivering scoped and iterative features.",
        "Collaborating with a Laravel backend team through a custom REST layer."
      ]
    },
    {
      company: "Pleio",
      role: "Front End Developer",
      period: "2023, 2025",
      bullets: [
        "Developed fully open source government platforms using React, GraphQL and Django.",
        "Rebuilt the FSV fraud detection platform in JavaScript, SCSS and Django.",
        "Improved reliability and maintainability of a core intranet site builder used across government institutions.",
        "Implemented WCAG AA compliance and accessibility standards for government applications."
      ]
    },
    {
      company: "Lasaulec / Distil",
      role: "Software Developer",
      period: "2022, 2023",
      bullets: [
        "Rebuilt the complete webshop front end using Razor, SCSS and JavaScript.",
        "Delivered production features autonomously for React based internal applications."
      ]
    },
    {
      company: "Tickles",
      role: "Front End Developer",
      period: "2016, 2022",
      bullets: [
        "Built custom Magento 2 webshops for B2B and B2C clients using PHTML, BEM SCSS and JavaScript."
      ]
    }
  ],
  education: [
    {
      institution: "ROC Friese Poort Sneek",
      degree: "Graphic Design Degree",
      period: "2012, 2016"
    }
  ],
  projects: [
    {
      name: "Fync",
      desc: "Unified API wrapper for GitHub, Vercel, NPM, Spotify and others.",
      link: "https://docs-fync.vercel.app"
    },
    {
      name: "Drizzleasy",
      desc: "CRUD generator for Next.js using Drizzle ORM with chainable syntax.",
      link: "https://drizzleasy.vercel.app"
    },
    {
      name: "RYOA",
      desc: "Roll your own authentication in Next.js with JWT and OAuth.",
      link: "https://github.com/remcostoeten/nextjs-15-roll-your-own-authentication"
    }
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "(S)CSS", "Shell (bash, fish, zsh)", "Scripting (Python*, Lua)"],
    frameworks: ["React", "Next.js", "Qwik", "Solid", "Svelte", "TanStack Query"],
    styling: ["Tailwind", "(S)CSS", "Styled Components"],
    backend: ["Node.js", "Hono", "Express"],
    databases: ["PostgreSQL", "SQLite", "LibSQL", "Turso", "Drizzle ORM", "Prisma"],
    tools: ["Git", "Docker", "Vite", "pnpm", "Bun", "CI/CD", "Linux", "SSH", "DX tooling"],
    design: ["Figma", "Photoshop"]
  },
  languages: [
    { name: "Dutch", level: "Native" },
    { name: "Frisian", level: "Native" },
    { name: "English", level: "Professional" }
  ]
};
export {
  resumeData as r
};
