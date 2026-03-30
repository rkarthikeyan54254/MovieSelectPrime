import React from 'react';

interface VideoPlayerProps {
  videoKey: string;
}

export function VideoPlayer({ videoKey }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-200 dark:border-gray-700">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="Movie Trailer"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}