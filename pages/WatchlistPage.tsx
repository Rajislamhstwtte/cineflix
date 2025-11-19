
import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import Card from '../components/Card';
import { Content, Anime, WatchlistItem } from '../types';

const mapWatchlistItemToCardItem = (item: WatchlistItem): Content | Anime => {
  const commonProps = {
    title: item.title,
    name: item.title, 
  };

  if (item.type === 'anime') {
    return {
      ...commonProps,
      mal_id: item.id,
      images: { jpg: { large_image_url: item.poster_path || '' } },
      // Add other required Anime fields with dummy data if Card component needs them
      synopsis: '', score: 0, year: 0, episodes: 0, genres: [], trailer: { youtube_id: '' }
    } as Anime;
  } else {
    return {
      ...commonProps,
      id: item.id,
      poster_path: item.poster_path,
      // Add other required Content fields with dummy data if Card component needs them
      backdrop_path: null, overview: '', vote_average: 0
    } as Content;
  }
};


const WatchlistPage: React.FC = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {watchlist.map(item => {
            const cardItem = mapWatchlistItemToCardItem(item);
            return <Card key={`${item.type}-${item.id}`} item={cardItem} type={item.type} />;
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <p className="text-center text-gray-400 text-lg mt-4">Your watchlist is empty.</p>
          <p className="text-sm text-gray-500">Add movies and shows to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;