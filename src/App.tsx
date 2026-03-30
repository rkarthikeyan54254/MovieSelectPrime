import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen bg-primary-gradient text-primary transition-colors duration-300 py-4 md:py-8 px-3 md:px-4">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>

        <footer className="mt-8 md:mt-12 text-center text-gray-400 space-y-3 md:space-y-4 px-4">
          <p className="text-sm md:text-base">Data provided by TMDB. Available on Prime Video.</p>
          <p className="text-xs md:text-sm">Movie Select Prime™ - All rights reserved © {new Date().getFullYear()}</p>
          <p className="flex items-center justify-center gap-2 text-sm">
            Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-current" /> and AI
          </p>
        </footer>
      </div>
    </div>
  );
}