import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/tmdbService';
import { Genre } from '../types';

const GenreDropdown: React.FC = () => {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllGenres = async () => {
      try {
        setLoading(true);
        const [movies, tv] = await Promise.all([
          getGenres('movie'),
          getGenres('tv'),
        ]);
        setMovieGenres(movies);
        setTvGenres(tv);
      } catch (error) {
        console.error("Error fetching genres for dropdown:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllGenres();
  }, []);

  return (
    <div className="group relative">
      <button className="text-gray-300 hover:text-white transition-colors flex items-center">
        Genres
        <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-brand-dark/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 invisible group-hover:visible z-50 p-4">
        {loading ? (
            <div className="text-center text-gray-400">Loading genres...</div>
        ) : (
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-bold text-brand-red mb-2 border-b border-gray-600 pb-1">Movie Genres</h3>
                    <ul className="space-y-1">
                        {movieGenres.slice(0, 10).map(genre => (
                            <li key={genre.id}>
                                <Link to={`/genre/movie/${genre.id}/${encodeURIComponent(genre.name)}`} className="block text-sm text-gray-300 hover:text-white hover:underline">
                                    {genre.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-brand-red mb-2 border-b border-gray-600 pb-1">TV Show Genres</h3>
                    <ul className="space-y-1">
                        {tvGenres.slice(0, 10).map(genre => (
                             <li key={genre.id}>
                                <Link to={`/genre/tv/${genre.id}/${encodeURIComponent(genre.name)}`} className="block text-sm text-gray-300 hover:text-white hover:underline">
                                    {genre.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default GenreDropdown;