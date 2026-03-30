import React from 'react';

interface DecadeSelectorProps {
  selectedDecade: string;
  onDecadeChange: (decade: string) => void;
}

const decades = ['70s', '80s', '90s', '2K', 'Latest'];

export function DecadeSelector({ selectedDecade, onDecadeChange }: DecadeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {decades.map((decade) => (
        <button
          key={decade}
          onClick={() => onDecadeChange(decade)}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            selectedDecade === decade
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'chic-glass text-text-secondary hover:bg-white/5'
          }`}
        >
          {decade}
        </button>
      ))}
    </div>
  );
}