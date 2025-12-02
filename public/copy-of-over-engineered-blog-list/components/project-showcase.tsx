
import React from 'react';
import { Folder, Star, ArrowUpRight, GitFork } from 'lucide-react';

const PROJECTS = [
  {
    title: "Next-Forge",
    description: "Production-ready Next.js monorepo starter. Turbo, atomic design, and strict architectural boundaries.",
    tags: ["Next.js", "Turbo", "Architecture"],
    stars: 342,
    forks: 48,
    link: "https://github.com/remcostoeten/next-forge"
  },
  {
    title: "Planorama",
    description: "End-to-end SaaS platform for resource planning. Features real-time collaboration and analytics.",
    tags: ["SaaS", "tRPC", "Prisma"],
    stars: 215,
    forks: 26,
    link: "https://github.com/remcostoeten/planorama"
  },
  {
    title: "Drizzleasy",
    description: "Visual database schema viewer & manager for Drizzle ORM. View tables, relations, and generate migrations visually.",
    tags: ["TypeScript", "Drizzle", "React"],
    stars: 142,
    forks: 18,
    link: "https://github.com/remcostoeten/drizzleasy"
  },
  {
    title: "Fync",
    description: "Lightning fast file synchronizer written in Rust. Designed to sync dotfiles across machines instantly.",
    tags: ["Rust", "CLI", "Async"],
    stars: 67,
    forks: 8,
    link: "https://github.com/remcostoeten/fync"
  }
];

export const ProjectShowcase = () => {
    return (
        <div className="mb-12 animate-enter" style={{ animationDelay: '100ms' }}>
             <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 rounded-md bg-accent/10">
                    <Folder className="w-4 h-4 text-accent" />
                </div>
                <h2 className="text-lg font-bold text-foreground tracking-tight">Featured Projects</h2>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECTS.map((project, idx) => (
                    <a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col p-5 rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/10 hover:border-accent/30 transition-all duration-300 overflow-hidden"
                    >
                         {/* Hover Gradient */}
                         <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                         {/* Header */}
                         <div className="relative flex justify-between items-start mb-3 z-10">
                            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors tracking-tight">
                                {project.title}
                            </h3>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                         </div>

                         {/* Description */}
                         <p className="relative text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed z-10">
                            {project.description}
                         </p>

                         {/* Footer */}
                         <div className="relative mt-auto flex items-end justify-between z-10">
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map(tag => (
                                    <span 
                                        key={tag} 
                                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-background/50 text-muted-foreground/80 border border-border/50 group-hover:border-accent/20 group-hover:text-accent/80 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground/60">
                                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    <Star className="w-3 h-3 group-hover:text-yellow-400 transition-colors" />
                                    {project.stars}
                                </div>
                                <div className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                                    <GitFork className="w-3 h-3" />
                                    {project.forks}
                                </div>
                            </div>
                         </div>
                    </a>
                ))}
             </div>
        </div>
    )
}
