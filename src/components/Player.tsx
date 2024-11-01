import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { MediaItem } from '../types';

interface PlayerProps {
  media: MediaItem;
  onEnded: () => void;
}

export default function Player({ media, onEnded }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.addEventListener('timeupdate', updateProgress);
      mediaRef.current.addEventListener('loadedmetadata', () => {
        setDuration(mediaRef.current?.duration || 0);
      });
    }
    return () => {
      if (mediaRef.current) {
        mediaRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [media]);

  const updateProgress = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      {media.type === 'video' ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={media.url}
          className="w-full rounded-lg"
          onEnded={onEnded}
        />
      ) : (
        <div className="relative">
          <img
            src={media.thumbnail || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'}
            alt={media.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={media.url}
            onEnded={onEnded}
          />
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleProgress}
            className="w-full mx-4 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SkipBack className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SkipForward className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-700" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}