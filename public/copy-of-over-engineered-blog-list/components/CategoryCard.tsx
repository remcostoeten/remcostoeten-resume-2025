import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, FileText, Hash } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

interface CategoryCardProps {
  name: string;
  count: number;
  index: number;
  onNavigate: (slug: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, count, index, onNavigate }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);
  const formattedIndex = (index + 1).toString().padStart(2, '0');
  
  // Animation Stagger Logic
  const listStagger = index * 150; 
  const baseDuration = 1000 + listStagger;
  const indexDuration = baseDuration;
  const countDuration = baseDuration + 400;

  // ASCII State
  const frameRef = useRef<number>(0);
  const asciiCharsRef = useRef<string[]>([]);
  
  // Initialize ASCII pattern
  useEffect(() => {
    const chars = ['#', '/', '\\', ':', '.', ' '];
    asciiCharsRef.current = Array.from({ length: 800 }, () => {
      // Slightly denser pattern for categories to distinguish from posts
      return Math.random() > 0.8 ? ' ' : chars[Math.floor(Math.random() * chars.length)];
    });
    if (asciiRef.current) {
        asciiRef.current.innerText = asciiCharsRef.current.join('');
    }
  }, []);

  useEffect(() => {
    const asciiChars = ['#', '/', '\\', ':', '.', ' '];
    
    const animate = () => {
      if (asciiRef.current && asciiCharsRef.current.length > 0) {
        for (let i = 0; i < 3; i++) {
           const idx = Math.floor(Math.random() * asciiCharsRef.current.length);
           if (Math.random() > 0.5) {
               asciiCharsRef.current[idx] = asciiChars[Math.floor(Math.random() * asciiChars.length)];
           }
        }
        asciiRef.current.innerText = asciiCharsRef.current.join('');
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate(`/category/${name.toLowerCase()}`);
  };

  return (
    <a 
      ref={cardRef}
      href={`/category/${name.toLowerCase()}`}
      onClick={handleClick}
      className="group relative block animate-enter active:scale-[0.995] transition-transform duration-200 overflow-hidden first:rounded-t-2xl last:rounded-b-2xl [&:last-child>article]:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={`View ${count} posts in ${name}`}
    >
      {/* Neutral Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

      {/* ASCII Texture Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      >
        <div 
            ref={asciiRef}
            className="w-full h-full font-mono text-[10px] leading-[10px] text-muted-foreground/10 break-all select-none tracking-widest p-4"
        />
      </div>

      <article className="relative flex items-center justify-between gap-4 py-8 px-6 border-b border-border/40 z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-6">
            <span className="text-4xl font-bold text-muted-foreground/20 leading-none flex items-center min-h-[3.5rem] select-none w-16" aria-hidden="true">
              <AnimatedNumber value={formattedIndex} duration={indexDuration} />
            </span>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Hash className="w-4 h-4 text-accent/50 animate-subtle-rotate" />
                <h3 className="font-medium text-xl text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                  {name}
                </h3>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:scale-110" />
                <span className="tabular-nums font-medium">
                   <AnimatedNumber value={count} duration={countDuration} />
                </span>
                <span className="opacity-60">posts available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0" aria-hidden="true">
          <div className="relative w-12 h-12 rounded-full bg-muted/50 group-hover:bg-accent/20 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-110">
             <ArrowUpRight className="absolute w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:-translate-y-6 group-hover:translate-x-6" />
             <ArrowUpRight className="absolute w-5 h-5 text-accent -translate-x-6 translate-y-6 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </div>
      </article>
    </a>
  );
};