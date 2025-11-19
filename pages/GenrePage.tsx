import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getByGenre } from '../services/tmdbService';
import { Content, ContentType } from '../types';
import Card from '../components/Card';

const GenrePage: React.FC = () => {
  const { type, genreId, genreName } = useParams<{ type: ContentType, genreId: string, genreName: string }>();
  const [results, setResults] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByGenre = async () => {
      if (!type || !genreId || !['movie', 'tv'].includes(type)) return;
      try {
        setLoading(true);
        const contentResults = await getByGenre(type as 'movie' | 'tv', parseInt(genreId));
        setResults(contentResults);
      } catch (error) {
        console.error("Error fetching content by genre:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchByGenre();
  }, [type, genreId]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">
        {decodeURIComponent(genreName || '')} <span className="capitalize">{type === 'tv' ? 'TV Shows' : 'Movies'}</span>
      </h1>
      {loading ? (
        <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-red"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map(item => (
            <Card key={item.id} item={item} type={type as 'movie' | 'tv'} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">No results found for this genre.</p>
      )}
    </div>
  );
};

export default GenrePage;
