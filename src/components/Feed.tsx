import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { MediaItem, Comment } from '../types';
import Player from './Player';

interface FeedProps {
  items: MediaItem[];
  comments: Record<string, Comment[]>;
  onLike: (id: string) => void;
  onComment: (id: string, content: string) => void;
}

export default function Feed({ items, comments, onLike, onComment }: FeedProps) {
  const [activeMedia, setActiveMedia] = React.useState<string | null>(null);
  const [newComment, setNewComment] = React.useState('');

  const handleCommentSubmit = (mediaId: string) => {
    if (newComment.trim()) {
      onComment(mediaId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <img
                src={`https://api.dicebear.com/7.x/avatars/svg?seed=${item.userId}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-semibold">{item.artist}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-4">{item.title}</h2>
            
            <Player
              media={item}
              onEnded={() => setActiveMedia(null)}
            />

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => onLike(item.id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
              >
                <Heart className="w-5 h-5" />
                <span>{item.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>{comments[item.id]?.length || 0}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="border-t px-4 py-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border rounded-full px-4 py-1 text-sm focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleCommentSubmit(item.id)}
                className="px-4 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700"
              >
                Post
              </button>
            </div>
            
            <div className="mt-4 space-y-3">
              {comments[item.id]?.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <img
                    src={`https://api.dicebear.com/7.x/avatars/svg?seed=${comment.userId}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">User_{comment.userId}</span>
                      {" "}{comment.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}