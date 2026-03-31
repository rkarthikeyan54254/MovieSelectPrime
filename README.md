# FlickPick 🎬
### Curated cinema, delivered with a click.

[![FlickPick](https://img.shields.io/badge/Flick-Pick-purple?style=for-the-badge)](https://movieselectprime.netlify.app/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge)](https://tailwindcss.com/)

**FlickPick** is a premium, cinematic discovery engine designed to end the "endless scroll." It curates high-fidelity cinema from global streaming giants like **Netflix**, **Amazon Prime Video**, and **Zee5**, delivering your next favorite movie through a sleek, high-impact "Spotlight" experience.

---

## ✨ Features

- 🎯 **Universal Streaming Hub**: Discover content across Netflix, Prime Video, and Zee5 simultaneously.
- 🎭 **Cinematic Spotlight**: A heroic shuffle experience that showcases movies with high-fidelity visuals and typography.
- 🎞️ **Direct Deep-Linking**: Bypasses the standard TMDb intermediate page to take you directly to the movie's platform.
- 📅 **Advanced Curation**: Precision filtering by Region (India, US), Language, Decade, Genre, and Popularity.
- 🍿 **Film Editorial Detail Pages**: High-end movie pages featuring full-bleed backdrops, trailers, cast exhibits, and streaming metadata.
- 🎨 **Sleek & Chic UI**: Immersive glassmorphism, OLED-optimized dark mode, and smooth physics-based animations.
- 📽️ **Cinematic Intermissions**: Engaging, context-aware empty states for rare search combinations.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) for type-safe, component-based architecture.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) utilizing custom glassmorphism utilities and OLED dark mode design tokens.
- **Routing**: [React Router 6](https://reactrouter.com/) for seamless navigation between the spotlight and movie detail pages.
- **API**: [Axios](https://axios-http.com/) for robust integration with the [TMDb (The Movie Database) API](https://www.themoviedb.org/documentation/api).
- **Icons**: [Lucide React](https://lucide.dev/) for a consistent, minimal iconography set.
- **Build Tool**: [Vite](https://vitejs.dev/) for high-performance development and production bundling.

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rkarthikeyan54254/flickpick.git
   cd flickpick
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   FlickPick uses the TMDb API. Ensure your environment is configured with a valid API key in `src/services/tmdb.ts` (or via `.env` in a production setup).

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 📦 Project Structure

```
flickpick/
├── src/
│   ├── components/     # High-fidelity UI components (Selectors, Card, etc.)
│   ├── pages/          # Full-page views (Home, MovieDetail)
│   ├── services/       # API integration & platform redirect logic
│   ├── types/          # Strict TypeScript interfaces for Movie data
│   ├── App.tsx         # Layout wrapper & global navigation
│   └── main.tsx        # Application entry point
├── public/             # Cinematic assets (Hero, Favicon)
└── tailwind.config.js  # Custom "Chic" design tokens
```

---

## 🎯 Core Mechanics

### The Spotlight Shuffle
FlickPick uses a unique shuffling algorithm that ensures you never see the same recommendation twice in a single session. Once the pool is exhausted, it automatically refreshes the "reel" for a fresh experience.

### Universal Search Logic
The app dynamically constructs search deep-links for various platforms (Netflix, Prime, etc.) based on movie metadata and the user's selected region, ensuring a "zero-hop" transition from discovery to viewing.

---

## 🙏 Acknowledgments

- **Data Source**: Comprehensive movie metadata provided by [TMDB](https://www.themoviedb.org/).
- **Streaming Platforms**: Netflix, Amazon Prime Video, and Zee5.
- **Design Philosophy**: Built with a focus on cinematic impact and modern editorial aesthetics.

---

Made with ❤️ for Cinephiles by **rkarthikeyan54254** & **AI**
