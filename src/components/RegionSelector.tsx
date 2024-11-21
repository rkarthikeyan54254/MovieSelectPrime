import React from 'react';
import { MapPin } from 'lucide-react';

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
    <div className="flex flex-wrap justify-center gap-3">
      {regions.map(({ code, name }) => (
        <button
          key={code}
          onClick={() => onRegionChange(code)}
          className={`btn-region flex items-center gap-2 ${
            selectedRegion === code
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <MapPin className="w-4 h-4" />
          {name}
        </button>
      ))}
    </div>
  );
}