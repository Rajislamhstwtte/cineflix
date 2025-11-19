import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';
import GenrePage from './pages/GenrePage';
import Header from './components/Header';
import Footer from './components/Footer';
import StartupAnimation from './components/StartupAnimation';
import AuthPage from './pages/AuthPage';
import { WatchlistProvider } from './context/WatchlistContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent: React.FC = () => {
  const location = useLocation();
  return (
    <main className="flex-grow page-transition" key={location.pathname}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:type/:id" element={<DetailPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Route>
        <Route path="/genre/:type/:genreId/:genreName" element={<GenrePage />} />
      </Routes>
    </main>
  );
};

export default function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  if (showAnimation) {
    return <StartupAnimation onAnimationEnd={() => setShowAnimation(false)} />;
  }

  return (
    <AuthProvider>
      <WatchlistProvider>
        <HashRouter>
          <div className="bg-brand-black min-h-screen text-white font-sans flex flex-col">
            <Header />
            <AppContent />
            <Footer />
          </div>
        </HashRouter>
      </WatchlistProvider>
    </AuthProvider>
  );
};