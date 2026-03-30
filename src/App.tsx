import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-500 overflow-x-hidden">
      {/* Cinematic Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <nav className="flex justify-between items-center py-6 md:py-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg shadow-lg" />
            <span className="text-xl font-black tracking-tighter">MSP</span>
          </div>
          <ThemeToggle />
        </nav>
        
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>

        <footer className="py-12 mt-20 border-t border-glass-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-text-secondary text-sm">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} Movie Select Prime</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span>Data by TMDB</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for Cinephiles
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}