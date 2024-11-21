import React from 'react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = ['English', 'Tamil', 'Hindi', 'Telugu'];

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
      {languages.map((language) => (
        <button
          key={language}
          onClick={() => onLanguageChange(language)}
          className={`btn-language text-sm md:text-base ${
            selectedLanguage === language
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );
}