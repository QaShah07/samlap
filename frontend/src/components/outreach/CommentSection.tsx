import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import api from '../../services/api';
import { Comment } from '../../types';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get<Comment[]>('/outreach/comments/');
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleNewComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section id="comments">
      <h2 className="text-3xl font-semibold mb-8 text-slate-800">Comments</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <CommentForm onCommentPosted={handleNewComment} />
        
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4 text-slate-700">Recent Comments</h3>
          <CommentList comments={comments} loading={loading} error={error} />
        </div>
      </div>
    </section>
  );
};

export default CommentSection;