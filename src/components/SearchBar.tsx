import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH CINEMA..."
          className="chic-input pl-14 pr-12 text-sm font-black tracking-widest uppercase placeholder:text-text-secondary/30 transition-all duration-500 group-hover:bg-white/5"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary/50 group-focus-within:text-purple-500 transition-colors" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </div>
    </form>
  );
}