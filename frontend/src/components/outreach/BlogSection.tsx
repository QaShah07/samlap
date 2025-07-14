import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface BlogPost {
  id: number;
  title: string;
  category: 'policy_updates' | 'communication_analysis' | 'media_mentions';
  excerpt: string;
  slug: string;
  image_url: string | null;
  published_on: string;
}

const formatCategory = (category: string): string => {
  switch (category) {
    case 'policy_updates':
      return 'Policy Updates';
    case 'communication_analysis':
      return 'Communication Analysis';
    case 'media_mentions':
      return 'Media Mentions';
    default:
      return category;
  }
};

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await api.get<BlogPost[]>('/outreach/blogs/');
        setBlogPosts(response.data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog\" className="animate-pulse">
        <h2 className="text-3xl font-semibold mb-8 text-slate-800">Blog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog">
        <h2 className="text-3xl font-semibold mb-8 text-slate-800">Blog</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      </section>
    );
  }

  return (
    <section id="blog">
      <h2 className="text-3xl font-semibold mb-8 text-slate-800">Blog</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full"
          >
            <div className="h-48 bg-slate-100 overflow-hidden">
              {post.image_url ? (
                <img 
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-400">No Image</span>
                </div>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
                {formatCategory(post.category)}
              </span>
              <h3 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
              <div className="pt-2 mt-auto">
                <a 
                  href={`/blog/${post.slug}`} 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Read more →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;