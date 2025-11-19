import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import GenreDropdown from './GenreDropdown';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };
  
  const handleSignOut = async () => {
    try {
        await signOut();
        navigate('/');
    } catch (error) {
        console.error("Failed to sign out", error);
    }
  };

  const UserAvatar = () => {
    if (!user || !user.email) return null;
    const initial = user.email.charAt(0).toUpperCase();
    return (
        <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center font-bold text-lg" title={user.email}>
                {initial}
            </div>
            <button
                onClick={handleSignOut}
                className="bg-brand-dark/50 border border-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-dark transition-colors"
            >
                Sign Out
            </button>
        </div>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-brand-red tracking-wider">
            CINEFLIX
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <GenreDropdown />
            <Link to="/watchlist" className="text-gray-300 hover:text-white transition-colors">My Watchlist</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-grow max-w-xs">
            <SearchBar onSearch={handleSearch} />
          </div>
          {user ? (
            <UserAvatar />
          ) : (
            <Link to="/auth">
                <button className="bg-brand-red text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                    Sign In
                </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;