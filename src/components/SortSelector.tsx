import React from 'react';
import { TrendingUp, Star, Calendar, Type } from 'lucide-react';

interface SortSelectorProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc', icon: TrendingUp },
  { label: 'Rating', value: 'vote_average.desc', icon: Star },
  { label: 'Newest', value: 'primary_release_date.desc', icon: Calendar },
  { label: 'Title', value: 'original_title.asc', icon: Type },
];

export function SortSelector({ selectedSort, onSortChange }: SortSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            selectedSort === option.value
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'chic-glass text-text-secondary hover:bg-white/5'
          }`}
        >
          <option.icon className="w-4 h-4" />
          {option.label}
        </button>
      ))}
    </div>
  );
}