import React from 'react';
import { BlogCard } from './BlogCard';
import { BlogListProps } from '../types';

export const BlogList: React.FC<BlogListProps> = ({ posts, onNavigate }) => {
  return (
    <ul className="flex flex-col m-0 p-0 list-none" role="list">
      {posts.map((post, index) => (
        <li key={post.id} className="block p-0 m-0">
          <BlogCard 
            post={post} 
            index={index}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
};