import React from 'react';

export function SkeletonCard() {
  return (
    <div className="chic-glass rounded-[2.5rem] overflow-hidden shadow-2xl animate-pulse border-0">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[45%] h-[400px] lg:h-[700px] bg-white/5" />
        <div className="w-full lg:w-[55%] p-8 lg:p-16 space-y-10 flex flex-col justify-center bg-white/3">
          <div className="space-y-6">
            <div className="h-16 lg:h-24 bg-white/5 rounded-2xl w-3/4" />
            <div className="space-y-4">
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-16 bg-white/10 rounded-full w-full sm:w-48" />
            <div className="h-16 bg-white/5 rounded-full w-full sm:w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}