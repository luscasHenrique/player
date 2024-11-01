import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { MediaItem, Comment } from './types';

// Mock data
const initialMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    artist: 'John Doe',
    type: 'audio',
    url: 'https://example.com/audio1.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    userId: 'user1',
    likes: 42,
    isOffline: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mountain View',
    artist: 'Jane Smith',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    userId: 'user2',
    likes: 28,
    isOffline: false,
    createdAt: new Date().toISOString(),
  },
];

const initialComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      userId: 'user3',
      content: 'Amazing track! 🎵',
      createdAt: new Date().toISOString(),
    },
  ],
};

function App() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMedia);
  const [comments, setComments] = useState<Record<string, Comment[]>>(initialComments);

  const handleLike = (id: string) => {
    setMediaItems(items =>
      items.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleComment = (mediaId: string, content: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: 'currentUser',
      content,
      createdAt: new Date().toISOString(),
    };

    setComments(prev => ({
      ...prev,
      [mediaId]: [...(prev[mediaId] || []), newComment],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for music, videos, or people..."
                className="ml-3 bg-transparent focus:outline-none w-full"
              />
            </div>
            
            <button className="ml-4 flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700">
              <Plus className="w-5 h-5" />
              <span>Upload</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          <Feed
            items={mediaItems}
            comments={comments}
            onLike={handleLike}
            onComment={handleComment}
          />
        </main>
      </div>
    </div>
  );
}

export default App;