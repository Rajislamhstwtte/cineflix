import React from 'react';
import { TVSeason } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';

interface EpisodeGuideProps {
    seasonData: TVSeason | null;
    numberOfSeasons: number;
    currentSeason: number;
    currentEpisode: number;
    onSeasonChange: (season: number) => void;
    onEpisodeSelect: (episode: number) => void;
    loading: boolean;
}

const EpisodeGuide: React.FC<EpisodeGuideProps> = ({ seasonData, numberOfSeasons, currentSeason, currentEpisode, onSeasonChange, onEpisodeSelect, loading }) => {

    return (
        <div className="my-8 p-4 md:p-6 bg-brand-dark/50 rounded-lg border border-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Episodes</h3>
                {numberOfSeasons > 1 && (
                    <select
                        value={currentSeason}
                        onChange={(e) => onSeasonChange(Number(e.target.value))}
                        className="bg-brand-dark border border-gray-600 rounded-md px-3 py-1 text-base focus:outline-none focus:ring-1 focus:ring-brand-red"
                    >
                        {[...Array(numberOfSeasons)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Season {i + 1}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-48">
                     <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-red"></div>
                </div>
            ) : !seasonData || seasonData.episodes.length === 0 ? (
                <p className="text-gray-400">No episode information available for this season.</p>
            ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {seasonData.episodes.map(episode => (
                        <div 
                            key={episode.id} 
                            className={`flex items-start space-x-4 p-2 rounded-md transition-colors duration-200 cursor-pointer group ${
                                episode.episode_number === currentEpisode ? 'bg-brand-dark' : 'hover:bg-brand-dark'
                            }`}
                            onClick={() => onEpisodeSelect(episode.episode_number)}
                        >
                           <div className="flex-shrink-0 w-32 h-20 bg-black rounded-md overflow-hidden relative">
                                <img
                                    src={episode.still_path ? `${TMDB_IMAGE_BASE_URL}w300${episode.still_path}` : 'https://picsum.photos/300/169'}
                                    alt={episode.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                           <div className="flex-grow">
                                <h4 className={`font-bold transition-colors ${
                                    episode.episode_number === currentEpisode ? 'text-brand-red' : 'text-white'
                                }`}>{episode.episode_number}. {episode.name}</h4>
                                <p className="text-sm text-gray-400 line-clamp-2 mt-1">{episode.overview}</p>
                           </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EpisodeGuide;