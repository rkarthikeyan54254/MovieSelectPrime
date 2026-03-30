import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-xl animate-pulse mx-auto max-w-4xl border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[450px] md:h-[600px] bg-gray-200 dark:bg-gray-700" />
        <div className="w-full md:w-1/2 p-6 md:p-10 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl w-full" />
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}