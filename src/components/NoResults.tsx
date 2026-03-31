import React from 'react';
import { Film, RefreshCw, Sparkles, SearchX } from 'lucide-react';

interface NoResultsProps {
  selectedLanguage: string;
  selectedDecade: string;
  hasProviders: boolean;
  onBroadenSearch: () => void;
  onUniversalShuffle: () => void;
}

export function NoResults({ 
  selectedLanguage, 
  selectedDecade, 
  hasProviders, 
  onBroadenSearch, 
  onUniversalShuffle 
}: NoResultsProps) {
  if (!hasProviders) {
    return (
      <div className="chic-glass rounded-[3rem] py-20 px-8 text-center border-dashed border-white/10 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-white/5 rounded-full animate-pulse">
            <Film className="w-12 h-12 text-text-secondary" />
          </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          EQUIPMENT <br />
          <span className="text-gradient-chic italic">OFFLINE.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-md mx-auto font-medium mb-10">
          Our projector needs a signal. Please select at least one streaming app to start the show.
        </p>
      </div>
    );
  }

  return (
    <div className="chic-glass rounded-[3rem] py-20 px-8 text-center border-dashed border-white/10 animate-fade-in overflow-hidden relative">
      {/* Film Grain Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://media.giphy.com/media/oEI9uWUPr9WUM/giphy.gif')] bg-cover" />
      
      <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-white/5 rounded-full">
            <SearchX className="w-12 h-12 text-purple-500" />
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
          Lost <br />
          <span className="text-gradient-chic italic">Reel.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto font-medium mb-4 leading-relaxed">
          Even our projectionist couldn't find a <span className="text-white font-bold">{selectedDecade} {selectedLanguage}</span> movie in these archives. 
          It's either a lost masterpiece or just not on these streaming apps.
        </p>

        <p className="text-sm text-text-secondary/60 uppercase tracking-[0.2em] font-black mb-12">
          Intermission: Try broadening the search.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onBroadenSearch}
            className="chic-btn-primary px-8 py-4 flex items-center gap-2 group w-full sm:w-auto justify-center"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Broaden Search
          </button>
          
          <button
            onClick={onUniversalShuffle}
            className="chic-btn-secondary px-8 py-4 flex items-center gap-2 group w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Universal Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}