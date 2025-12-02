import React, { useEffect, useRef, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Eye, Hash, Sparkles, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { BlogPost } from '../types';
import { AnimatedNumber } from "./AnimatedNumber";
import { BLOG_POSTS } from '../data';
import { BlogList } from './BlogList';

// Helper to access global Prism and Marked
declare const Prism: any;
declare const marked: any;

interface BlogPostViewProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
}

const ShareButtons: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}${slug}`);
  }, [slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!url) return null;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=Check out this article: ${encodeURIComponent(url)}`,
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 border-y border-border/40 my-12 animate-enter" style={{ animationDelay: '600ms' }}>
      <span className="text-sm font-medium text-muted-foreground">Share this post</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted/50 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all duration-200"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-muted/50 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all duration-200 relative"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          
          {/* Tooltip */}
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-accent text-accent-foreground text-[10px] font-bold rounded shadow-lg animate-enter whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onNavigate }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState('');
  
  const handleTagClick = (tag: string) => {
    onNavigate(`/category/${tag.toLowerCase()}`);
  };

  // Logic to find related posts based on tags
  const relatedPosts = useMemo(() => {
    if (!post.tags || post.tags.length === 0) return [];
    
    return BLOG_POSTS.filter(p => {
        // Exclude current post
        if (p.id === post.id) return false;
        // Check for matching tags
        return p.tags?.some(tag => post.tags?.includes(tag));
    }).slice(0, 3); // Limit to 3 posts
  }, [post]);

  // Parse Markdown when post changes and inject lazy loading
  useEffect(() => {
    let finalHtml = '';

    if (typeof marked !== 'undefined' && post.content) {
      // Configure marked to handle potential indentation issues from template literals
      const cleanContent = post.content.replace(/^\s+/gm, ''); 
      finalHtml = marked.parse(cleanContent);
    } else {
      finalHtml = post.content || '';
    }

    // Inject lazy loading and async decoding into image tags
    finalHtml = finalHtml.replace(/<img /g, '<img loading="lazy" decoding="async" ');
    
    setHtmlContent(finalHtml);
  }, [post.content]);

  // Enhancing the Code Blocks with a Custom UI
  useEffect(() => {
    if (contentRef.current && htmlContent && typeof Prism !== 'undefined') {
      // 1. Highlight all code
      Prism.highlightAllUnder(contentRef.current);

      // 2. Wrap <pre> tags with our custom aesthetic wrapper
      const preTags = contentRef.current.querySelectorAll('pre');
      
      preTags.forEach((pre) => {
        // Avoid double-wrapping if useEffect runs twice
        if (pre.parentElement?.classList.contains('code-window-content')) return;

        // Create the wrapper structure
        // <div class="code-window">
        //   <div class="header">...</div>
        //   <div class="content"><pre>...</pre></div>
        // </div>

        const wrapper = document.createElement('div');
        wrapper.className = 'relative my-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-border/30 shadow-2xl group/code';
        
        // Header
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-border/10';
        
        // Mac Window Controls
        const controls = document.createElement('div');
        controls.className = 'flex gap-2';
        ['bg-red-500/80', 'bg-yellow-500/80', 'bg-green-500/80'].forEach(color => {
            const dot = document.createElement('div');
            dot.className = `w-3 h-3 rounded-full ${color}`;
            controls.appendChild(dot);
        });

        // Language Label (Extract from class)
        const code = pre.querySelector('code');
        const languageClass = code?.className.match(/language-(\w+)/);
        const language = languageClass ? languageClass[1] : 'text';
        
        const label = document.createElement('div');
        label.className = 'absolute left-1/2 -translate-x-1/2 text-[11px] font-mono font-medium text-muted-foreground/60 uppercase tracking-widest pointer-events-none select-none';
        label.textContent = language;

        // Copy Button Container
        const copyBtn = document.createElement('button');
        copyBtn.className = 'opacity-0 group-hover/code:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white';
        copyBtn.ariaLabel = "Copy code";
        
        // Initial Icon (Copy)
        copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

        // Copy Logic
        copyBtn.addEventListener('click', async () => {
            const textToCopy = code?.innerText || '';
            try {
                await navigator.clipboard.writeText(textToCopy);
                // Change icon to check
                copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400"><path d="M20 6 9 17l-5-5"/></svg>`;
                setTimeout(() => {
                    // Revert
                    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                }, 2000);
            } catch (err) {
                console.error("Failed to copy", err);
            }
        });

        // Assemble Header
        header.appendChild(controls);
        header.appendChild(label);
        header.appendChild(copyBtn);

        // Content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'code-window-content p-4 overflow-x-auto custom-scrollbar';
        
        // Remove default pre margin/bg since wrapper handles it
        pre.style.margin = '0';
        pre.style.background = 'transparent';
        pre.style.borderRadius = '0';

        // DOM Swap
        if (pre.parentNode) {
            pre.parentNode.insertBefore(wrapper, pre);
            contentDiv.appendChild(pre);
            wrapper.appendChild(header);
            wrapper.appendChild(contentDiv);
        }
      });
    }
  }, [htmlContent]);

  return (
    <article className="max-w-3xl mx-auto w-full">
      {/* Header Section */}
      <header className="mb-12">
        <button 
          onClick={() => onNavigate('/')}
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 animate-enter"
          style={{ animationDelay: '0ms' }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to list
        </button>

        <h1 
          className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight animate-enter"
          style={{ animationDelay: '100ms' }}
        >
          {post.title}
        </h1>

        <div 
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-enter"
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 opacity-60" />
            <time dateTime={post.date}>
              <AnimatedNumber value={post.publishedAt} duration={800} />
            </time>
          </div>
          
          <span className="text-muted-foreground/30">·</span>
          
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 opacity-60" />
            <span className="tabular-nums">
              <AnimatedNumber value={post.readTime} duration={900} />
            </span>
          </div>

          {post.views && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 opacity-60" />
                <span className="tabular-nums">
                  <AnimatedNumber value={post.views.toLocaleString()} duration={1000} />
                </span>
              </div>
            </>
          )}
        </div>

        {post.tags && (
          <div 
            className="flex flex-wrap gap-2 mt-6 animate-enter"
            style={{ animationDelay: '300ms' }}
          >
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 text-xs font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Hash className="w-3 h-3 opacity-50" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <hr 
        className="border-border/40 mb-12 animate-enter"
        style={{ animationDelay: '400ms' }}
      />

      {/* Content */}
      <div 
        ref={contentRef}
        className="prose prose-invert prose-lg max-w-none animate-enter 
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-p:leading-relaxed prose-p:text-muted-foreground
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-transparent prose-pre:border-none prose-pre:p-0
        prose-li:text-muted-foreground
        prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-muted-foreground
        "
        style={{ animationDelay: '500ms' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Share Buttons */}
      <ShareButtons title={post.title} slug={post.slug} />

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div 
          className="mt-8 pt-12 animate-enter"
          style={{ animationDelay: '700ms' }}
        >
           <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              <h2 className="text-xl font-bold text-foreground">Read Next</h2>
           </div>
           
           {/* Reusing BlogList for consistency */}
           <div className="-mx-6"> 
             <BlogList posts={relatedPosts} onNavigate={onNavigate} />
           </div>
        </div>
      )}
    </article>
  );
};