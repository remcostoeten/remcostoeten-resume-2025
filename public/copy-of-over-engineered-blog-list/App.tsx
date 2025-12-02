import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles, ArrowLeft, Hash, Search, X } from 'lucide-react';
import { BlogList } from './components/BlogList';
import { CategoryOverview } from './components/CategoryOverview';
import { BlogPostView } from './components/BlogPostView';
import { BLOG_POSTS } from './data';
import { BlogPost } from './types';
import Footer from './components/footer';
import { ActivitySection } from './components/ActivitySection';

type ViewState = 'home' | 'topics' | 'topic-detail' | 'post-detail';

const App: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!selectedTopic) return [];
    return BLOG_POSTS.filter(post => 
      post.tags?.some(tag => tag.toLowerCase() === selectedTopic.toLowerCase())
    );
  }, [selectedTopic]);

  const homePosts = useMemo(() => {
    if (!searchQuery.trim()) return BLOG_POSTS;
    const query = searchQuery.toLowerCase().trim();
    return BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleClearSearch = () => setSearchQuery('');

  const handleNavigate = (path: string) => {
    // 1. Route: Topics Index
    if (path === '/categories' || path === '/topics' || path === '/archive') {
        if (currentView === 'topics') return;
        transitionToView('topics');
        return;
    }
    
    // 2. Route: Topic Detail
    if (path.startsWith('/category/')) {
        const rawTopic = path.split('/category/')[1];
        if (rawTopic) {
            const topic = decodeURIComponent(rawTopic);
            setSelectedTopic(topic);
            transitionToView('topic-detail');
        }
        return;
    }
    
    // 3. Route: Home
    if (path === '/') {
        if (currentView === 'home') return;
        transitionToView('home');
        return;
    }

    // 4. Route: Post Detail
    const post = BLOG_POSTS.find(p => p.slug === path);
    if (post) {
        setSelectedPost(post);
        transitionToView('post-detail');
        return;
    }

    // 5. External Link Fallback
    setIsExiting(true);
    setTimeout(() => {
      window.location.href = path;
    }, 600); 
  };

  const transitionToView = (view: ViewState) => {
      setIsExiting(true);
      setTimeout(() => {
          setCurrentView(view);
          setIsExiting(false);
          window.scrollTo(0, 0);
      }, 600);
  };

  // Header Content Logic
  const renderHeader = () => {
    switch (currentView) {
        case 'post-detail':
            return null; // Hide main header on post detail
        case 'topics':
            return {
                title: 'Topics',
                subtitle: 'A collection of topics I write about, ranging from technical deep dives to design philosophy.',
                action: (
                    <button 
                        onClick={() => handleNavigate('/')}
                        className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Writing
                    </button>
                )
            };
        case 'topic-detail':
            return {
                title: selectedTopic ? (selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)) : 'Topic',
                subtitle: `Showing ${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'} about ${selectedTopic}.`,
                action: (
                    <button 
                        onClick={() => handleNavigate('/topics')}
                        className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        All Topics
                    </button>
                ),
                icon: <Hash className="w-6 h-6 text-accent mb-4" />
            };
        default: // 'home'
            return {
                title: 'Remco Stoeten',
                subtitle: (
                  <div className="space-y-4">
                    <p className="text-lg text-foreground/80 font-medium">
                      Frontend Engineer & UI Designer
                    </p>
                    <div className="leading-relaxed space-y-4 text-muted-foreground">
                        <p>
                            Remco Stoeten, 28 y/o dutch software engineer focused on front-end with a degree in <span className="text-foreground/80 italic">graphic design</span>. 
                            Roughly <span className="text-foreground/80 italic">8 years</span> of experience across b2b/b2c <span className="text-foreground/80 italic decoration-dotted underline underline-offset-4">e-commerce</span>, 
                            in-house <span className="text-foreground/80 italic decoration-dotted underline underline-offset-4">SaaS</span>, open source <span className="text-foreground/80 italic decoration-dotted underline underline-offset-4">government</span> projects, 
                            and currently in <span className="text-foreground/80 italic decoration-dotted underline underline-offset-4">e-learning</span>.
                        </p>
                        <p>
                            Big fan of proper <span className="text-foreground/80 italic">DX & tooling</span>, <span className="text-foreground/80 italic">design systems</span>, and <span className="text-foreground/80 italic">performance optimization</span>. 
                            Besides React/Next I have been tinkering around with <span className="text-foreground/80 italic">Lua, SolidJS, Qwik, Svelte, Rust, Python</span> and <span className="text-foreground/80 italic">Shell</span>, 
                            <span className="text-foreground/80 italic decoration-dotted underline underline-offset-4">backend architecture</span> and <span className="text-foreground/80 italic decoration-dotted underline underline-offset-4">infrastructure</span> to build more complete solutions. 
                            Always learning, always shipping.
                        </p>
                    </div>
                  </div>
                ),
                icon: (
                  <img 
                    src="https://github.com/remcostoeten.png" 
                    alt="Remco Stoeten" 
                    className="w-16 h-16 rounded-full border-2 border-border/50 mb-6 shadow-sm" 
                  />
                ),
                action: (
                    <button 
                        onClick={() => handleNavigate('/topics')}
                        className="group text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4 group-hover:animate-wiggle" />
                        Browse Topics
                    </button>
                )
            };
    }
  };

  const headerData = renderHeader();

  return (
    <div 
      className={`
        min-h-screen w-full flex flex-col
        transition-all duration-500 cubic-bezier(0.32, 0, 0.67, 0)
        ${isExiting 
          ? 'opacity-0 scale-[0.98] blur-xl translate-y-4 pointer-events-none' 
          : 'opacity-100 scale-100 blur-0 translate-y-0'
        }
      `}
    >
      <main className="px-6 py-12 md:px-12 md:py-24 max-w-3xl mx-auto w-full flex-grow">
        {headerData && (
          <header className="mb-12 flex flex-col sm:flex-row sm:items-start justify-between gap-8 animate-enter">
            <div>
              {headerData.icon}
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6 capitalize">
                {headerData.title}
              </h1>
              <div className="text-muted-foreground w-full">
                {headerData.subtitle}
              </div>
            </div>
            
            <div className="flex-shrink-0 sm:pt-2">
                {headerData.action}
            </div>
          </header>
        )}
        
        {/* Main Content Area */}
        {currentView === 'home' && (
            <>
                <ActivitySection />

                <div className="relative mb-8 group animate-enter" style={{ animationDelay: '100ms' }}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-accent transition-colors" />
                    </div>
                    <input 
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-muted/20 border border-border/40 rounded-lg pl-10 pr-10 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent focus:bg-muted/30 transition-all duration-200"
                    />
                    {searchQuery && (
                        <button 
                            onClick={handleClearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center h-full text-muted-foreground/50 hover:text-foreground transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {homePosts.length > 0 ? (
                    <BlogList 
                        posts={searchQuery ? homePosts : homePosts.slice(0, 3)} 
                        onNavigate={handleNavigate} 
                    />
                ) : (
                    <div className="text-center py-16 animate-enter">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/30 mb-4">
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-1">No posts found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            We couldn't find any posts matching "{searchQuery}"
                        </p>
                        <button 
                            onClick={handleClearSearch}
                            className="text-sm text-accent hover:underline underline-offset-4"
                        >
                            Clear search
                        </button>
                    </div>
                )}
                
                {!searchQuery && (
                  <div 
                    className="mt-8 flex justify-end animate-enter"
                    style={{ animationDelay: '400ms' }}
                  >
                    <button
                        onClick={() => handleNavigate('/archive')}
                        className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View all posts
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
            </>
        )}

        {currentView === 'topics' && (
            <CategoryOverview posts={BLOG_POSTS} onNavigate={handleNavigate} />
        )}

        {currentView === 'topic-detail' && (
            <BlogList posts={filteredPosts} onNavigate={handleNavigate} />
        )}

        {currentView === 'post-detail' && selectedPost && (
            <BlogPostView post={selectedPost} onNavigate={handleNavigate} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;