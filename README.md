# Movie Select Prime 🎬

![Website Link](https://movieselectprime.netlify.app/)

![Movie Select Prime](https://img.shields.io/badge/Movie%20Select-Prime-00A8E1)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Movie Select Prime is an AI-powered movie recommendation platform that helps users discover their next favorite movie on Amazon Prime Video. No more endless scrolling – just click and enjoy!

## ✨ Features

- 🎯 Smart movie recommendations from Prime Video
- 🌍 Region-specific content (India & United States)
- 🗣️ Multiple language support (English, Hindi, Tamil)
- 📅 Decade-based filtering (70s to Latest)
- 🎲 Unique movie shuffling algorithm
- 🎨 Beautiful, responsive UI with smooth animations
- 🚀 Built with modern web technologies

## 🛠️ Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- TMDB API for movie data
- Vite for blazing-fast builds
- Lucide React for beautiful icons

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-select-prime.git
cd movie-select-prime
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_API_KEY` | Your TMDB API key |

## 📦 Project Structure

```
movie-select-prime/
├── src/
│   ├── components/        # React components
│   ├── services/         # API services
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx          # Main application
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## 🎯 Core Features

### Region Selection
- Switch between India and US Prime Video catalogs
- Region-specific content and recommendations

### Language Filtering
- English movies
- Hindi movies
- Tamil movies

### Decade-based Filtering
- 70s classics
- 80s favorites
- 90s hits
- 2K era
- Latest releases (past 2 years)

### Smart Shuffling
- Unique movie recommendations
- No repeats until all movies are shown
- Automatic refresh of movie pool

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Available on [Prime Video](https://www.primevideo.com/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ and AI
