import React from 'react';
import { ArrowDownAZ, TrendingUp, Star, Calendar } from 'lucide-react';

interface SortSelectorProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { label: 'Popularity', value: 'popularity.desc', icon: TrendingUp },
  { label: 'Top Rated', value: 'vote_average.desc', icon: Star },
  { label: 'Newest', value: 'primary_release_date.desc', icon: Calendar },
  { label: 'Title', value: 'original_title.asc', icon: ArrowDownAZ },
];

export function SortSelector({ selectedSort, onSortChange }: SortSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base ${
            selectedSort === option.value
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <option.icon className="w-4 h-4" />
          {option.label}
        </button>
      ))}
    </div>
  );
}