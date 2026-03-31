import React from 'react';
import { PROVIDERS } from '../services/tmdb';

interface ProviderSelectorProps {
  selectedRegion: string;
  selectedProviders: number[];
  onProviderToggle: (providerId: number) => void;
}

export function ProviderSelector({ selectedRegion, selectedProviders, onProviderToggle }: ProviderSelectorProps) {
  const availableProviders = PROVIDERS[selectedRegion as keyof typeof PROVIDERS] || PROVIDERS['IN'];

  return (
    <div className="flex flex-wrap gap-3">
      {availableProviders.map((provider) => {
        const isActive = selectedProviders.includes(provider.id);
        
        return (
          <button
            key={provider.id}
            onClick={() => onProviderToggle(provider.id)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              isActive 
                ? 'bg-white text-black border-white shadow-lg shadow-white/10' 
                : 'chic-glass text-text-secondary border-glass-border hover:bg-white/5'
            }`}
          >
            {provider.name}
          </button>
        );
      })}
    </div>
  );
}