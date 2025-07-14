import React from 'react';
import { ThumbsUp, ThumbsDown, Reply } from 'lucide-react';
import { Comment } from '../../types';

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading, error }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/6 mb-3"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div 
          key={comment.id} 
          className="comment-item p-4 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {comment.avatar_url ? (
                <img
                  src={comment.avatar_url}
                  alt={comment.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium text-slate-800">{comment.name}</h4>
                <span className="text-xs text-slate-500">
                  {new Date(comment.created_at).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="mt-2 text-slate-600">{comment.comment_text}</p>
              <div className="flex items-center gap-4 mt-3">
                <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={14} />
                  <span>{comment.id % 10}</span>
                </button>
                <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition-colors">
                  <ThumbsDown size={14} />
                  <span>{comment.id % 3}</span>
                </button>
                <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors">
                  <Reply size={14} />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;