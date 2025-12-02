export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content?: string; // HTML/Markdown string content
  date: string; // ISO 8601 string (e.g., '2025-10-06') for <time> tag
  publishedAt: string; // Formatted display string
  readTime: string;
  views?: number;
  tags?: string[];
}

export interface BlogListProps {
  posts: BlogPost[];
  onNavigate: (slug: string) => void;
}

export interface BlogCardProps {
  post: BlogPost;
  index: number;
  onNavigate: (slug: string) => void;
}