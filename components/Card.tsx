
import React from 'react';
import { Link } from 'react-router-dom';
import { Content, Anime, ContentType } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';

interface CardProps {
  item: Content | Anime;
  type: ContentType;
}

const Card: React.FC<CardProps> = ({ item, type }) => {
  const isAnime = type === 'anime';
  
  const id = isAnime ? (item as Anime).mal_id : (item as Content).id;
  const title = isAnime ? (item as Anime).title : ((item as Content).title || (item as Content).name);
  const posterPath = isAnime ? (item as Anime).images.jpg.large_image_url : ((item as Content).poster_path ? `${TMDB_IMAGE_BASE_URL}w342${(item as Content).poster_path}` : 'https://via.placeholder.com/342x513.png?text=No+Image');

  return (
    <Link to={`/${type}/${id}`} className="flex-shrink-0 w-40 md:w-48 group">
      <div className="relative rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-red/40">
        <img
          src={posterPath}
          alt={title}
          className="w-full h-auto object-cover aspect-[2/3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-3">
            <div className="w-12 h-12 border-2 border-white/50 rounded-full flex items-center justify-center mb-2 group-hover:border-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </div>
            <h3 className="text-white text-sm font-bold line-clamp-2">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;