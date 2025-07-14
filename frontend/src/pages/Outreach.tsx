import React from 'react';
import PodcastSection from '../components/outreach/PodcastSection';
import BlogSection from '../components/outreach/BlogSection';
import CommentSection from '../components/outreach/CommentSection';

const Outreach: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 space-y-16 max-w-6xl">
      <PodcastSection />
      <BlogSection />
      <CommentSection />
    </div>
  );
};

export default Outreach;