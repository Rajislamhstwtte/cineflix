
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { searchContent } from '../services/tmdbService';
import { Content } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
          const results = await searchContent(debouncedQuery);
          setSuggestions(results.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
          setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(query);
  };
  
  const handleSuggestionClick = (item: Content) => {
    setQuery('');
    setShowSuggestions(false);
    const type = item.media_type === 'tv' ? 'tv' : 'movie';
    navigate(`/${type}/${item.id}`);
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
  }

  const getYear = (dateString?: string) => {
    return dateString ? new Date(dateString).getFullYear() : 'N/A';
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setShowSuggestions(true)}
          placeholder="Search..."
          className="w-full bg-brand-dark border border-gray-700 text-white rounded-full py-2 pl-10 pr-4 transition-all focus:outline-none focus:ring-2 focus:ring-brand-red focus:shadow-lg focus:shadow-brand-red/30"
        />
        {query && (
           <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
           </button>
        )}
      </form>
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-brand-dark/90 backdrop-blur-sm border border-gray-700 rounded-md overflow-hidden z-10 animate-fade-scale-in">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((item) => (
                <li key={item.id}>
                   <button
                    className="flex items-center w-full text-left p-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleSuggestionClick(item)}
                   >
                    <img
                      src={item.poster_path ? `${TMDB_IMAGE_BASE_URL}w92${item.poster_path}` : 'https://via.placeholder.com/92x138.png?text=N/A'}
                      alt={item.title || item.name}
                      className="w-12 h-[72px] object-cover rounded-sm"
                    />
                    <div className="ml-3">
                        <p className="font-semibold line-clamp-1">{item.title || item.name}</p>
                        <p className="text-sm text-gray-400">
                            {getYear(item.release_date || item.first_air_date)} · <span className="capitalize">{item.media_type}</span>
                        </p>
                    </div>
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-700">
                <Link to={`/search/${query}`} onClick={() => setShowSuggestions(false)} className="block w-full text-center p-2 text-brand-red font-semibold hover:bg-gray-800">
                    View all results
                </Link>
              </li>
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-400">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;