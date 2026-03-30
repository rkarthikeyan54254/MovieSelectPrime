import React from 'react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = ['English', 'Tamil', 'Hindi', 'Telugu'];

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <button
          key={language}
          onClick={() => onLanguageChange(language)}
          className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
            selectedLanguage === language
              ? 'bg-white text-black shadow-lg shadow-white/10'
              : 'chic-glass text-text-secondary hover:bg-white/5'
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );
}