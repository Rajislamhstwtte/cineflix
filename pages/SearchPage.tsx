
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchContent } from '../services/tmdbService';
import { Content } from '../types';
import Card from '../components/Card';

const SearchPage: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [results, setResults] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const searchResults = await searchContent(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Error performing search:", error);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [query]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">Search results for "{query}"</h1>
      {loading ? (
        <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-red"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map(item => (
            <Card key={item.id} item={item} type={item.media_type as 'movie' | 'tv'} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
