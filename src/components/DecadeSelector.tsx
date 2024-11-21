import React from 'react';

interface DecadeSelectorProps {
  selectedDecade: string;
  onDecadeChange: (decade: string) => void;
}

const decades = ['70s', '80s', '90s', '2K', 'Latest'];

export function DecadeSelector({ selectedDecade, onDecadeChange }: DecadeSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
      {decades.map((decade) => (
        <button
          key={decade}
          onClick={() => onDecadeChange(decade)}
          className={`btn-decade text-sm md:text-base ${
            selectedDecade === decade
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {decade}
        </button>
      ))}
    </div>
  );
}