import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import api from '../../services/api';
import { Comment } from '../../types';

interface CommentFormProps {
  onCommentPosted: (newComment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCommentPosted }) => {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !commentText.trim()) {
      setError('Both name and comment are required.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: name.trim(),
        avatar_url: '',
        comment_text: commentText.trim(),
      };

      const response = await api.post<Comment>('/outreach/comments/', payload);
      onCommentPosted(response.data);

      // Clear form
      setName('');
      setCommentText('');
    } catch (err: any) {
      console.error('Failed to post comment:', err);
      setError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-form">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="comment_text" className="block text-sm font-medium text-slate-700 mb-1">
            Comment
          </label>
          <textarea
            id="comment_text"
            name="comment_text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            disabled={submitting}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`
              inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
              ${
                submitting
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
              }
              transition-colors duration-200
            `}
          >
            <Send size={18} />
            <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;