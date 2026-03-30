import React from 'react';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' }
];

export function RegionSelector({ selectedRegion, onRegionChange }: RegionSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
      {regions.map((region) => (
        <button
          key={region.code}
          onClick={() => onRegionChange(region.code)}
          className={`btn-region text-sm md:text-base ${
            selectedRegion === region.code
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {region.name}
        </button>
      ))}
    </div>
  );
}