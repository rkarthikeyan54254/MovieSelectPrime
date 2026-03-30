import React from 'react';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'USA' }
];

export function RegionSelector({ selectedRegion, onRegionChange }: RegionSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => (
        <button
          key={region.code}
          onClick={() => onRegionChange(region.code)}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            selectedRegion === region.code
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'chic-glass text-text-secondary hover:bg-white/5'
          }`}
        >
          {region.name}
        </button>
      ))}
    </div>
  );
}