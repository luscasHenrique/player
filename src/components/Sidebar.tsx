import React from 'react';
import { Home, Music, Video, Users, MessageCircle, User, Settings } from 'lucide-react';

const navigation = [
  { name: 'Home', icon: Home },
  { name: 'My Music', icon: Music },
  { name: 'My Videos', icon: Video },
  { name: 'Following', icon: Users },
  { name: 'Messages', icon: MessageCircle },
  { name: 'Profile', icon: User },
  { name: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-600">Melodix</h1>
      </div>
      
      <nav className="mt-8">
        {navigation.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
}