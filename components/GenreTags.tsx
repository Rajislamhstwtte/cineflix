import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/tmdbService';
import { Genre } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

interface GenreTagsProps {
  mediaType: 'movie' | 'tv';
  title: string;
}

const GenreTags: React.FC<GenreTagsProps> = ({ mediaType, title }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(containerRef, 0.2);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const genreList = await getGenres(mediaType);
        setGenres(genreList);
      } catch (error) {
        console.error(`Error fetching ${mediaType} genres:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, [mediaType]);

  const renderSkeletons = () => (
    <div className="flex flex-wrap gap-3 justify-center">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-brand-dark/50 h-10 w-32 rounded-full animate-pulse"></div>
      ))}
    </div>
  );
  
  if (genres.length === 0 && !loading) return null;

  return (
    <div ref={containerRef} className="my-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      {loading ? renderSkeletons() : (
        <div className="flex flex-wrap gap-3 justify-center">
          {genres.map((genre, index) => (
            <Link
              key={genre.id}
              to={`/genre/${mediaType}/${genre.id}/${encodeURIComponent(genre.name)}`}
              className="px-5 py-2 text-md font-semibold text-gray-300 bg-brand-dark/50 border border-gray-700 rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-brand-red hover:text-white hover:shadow-lg hover:shadow-brand-red/30"
              style={{
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.3s, box-shadow 0.3s',
                transitionDelay: `${isVisible ? index * 50 : 0}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {genre.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreTags;
