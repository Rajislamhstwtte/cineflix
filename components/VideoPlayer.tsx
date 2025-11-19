
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content, Anime, ContentType, TVSeason } from '../types';

interface VideoPlayerProps {
  details: Content | Anime;
  type: ContentType;
  currentSeason: number;
  currentEpisode: number;
  onSeasonChange: (season: number) => void;
  onEpisodeChange: (episode: number) => void;
  seasonData: TVSeason | null;
}

const slugify = (text: string) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

const MOVIE_TV_SOURCES = [
    { name: 'VidSrc', url: (type: string, id: string, s?: number, e?: number) => type === 'tv' ? `https://vidsrc.to/embed/tv/${id}/${s}/${e}`: `https://vidsrc.to/embed/movie/${id}` },
    { name: 'VidSrc Me', url: (type: string, id: string, s?: number, e?: number) => type === 'tv' ? `https://vidsrc.me/embed/${id}/${s}-${e}` : `https://vidsrc.me/embed/${id}` },
    { name: 'MoviesAPI', url: (type: string, id: string, s?: number, e?: number) => type === 'tv' ? `https://moviesapi.club/tv/${id}-${s}-${e}` : `https://moviesapi.club/movie/${id}` },
    { name: '2Embed', url: (type: string, id: string, s?: number, e?: number) => `https://www.2embed.to/embed/imdb/${type}?imdb=${id}${type === 'tv' ? `&s=${s}&e=${e}`: ''}`},
    { name: 'AutoEmbed', url: (type: string, id: string, s?: number, e?: number) => type === 'tv' ? `https://autoembed.to/tv/imdb/${id}-${s}-${e}` : `https://autoembed.to/movie/imdb/${id}`},
    { name: 'MultiEmbed', url: (_type: string, id: string) => `https://multiembed.mov/?video_id=${id}&player=classic` },
];

const ANIME_SOURCES = [
    { name: 'GogoAnime', url: (title: string, episode: number) => `https://gogoanime.bid/videos/${slugify(title)}-episode-${episode}` },
    { name: 'Anitaku', url: (title: string, episode: number) => `https://anitaku.to/${slugify(title)}-episode-${episode}`},
    { name: 'AnimeFlick', url: (title: string, episode: number) => `https://animeflick.net/watch/${slugify(title)}-episode-${episode}`},
];


const VideoPlayer: React.FC<VideoPlayerProps> = ({ details, type, currentSeason, currentEpisode, onSeasonChange, onEpisodeChange, seasonData }) => {
  const [activeTab, setActiveTab] = useState<'stream' | 'trailer'>('stream');
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const audioMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const isAnime = type === 'anime';
  const isTV = type === 'tv';
  
  const [streamSourceIndex, setStreamSourceIndex] = useState(() => {
    const savedSourceIndex = localStorage.getItem(`cineflix-stream-source-${type}`);
    const index = savedSourceIndex ? parseInt(savedSourceIndex, 10) : 0;
    const sourceLength = isAnime ? ANIME_SOURCES.length : MOVIE_TV_SOURCES.length;
    return index < sourceLength ? index : 0;
  });

  const contentDetails = details as Content;
  const animeDetails = details as Anime;

  const tmdbId = !isAnime ? String(contentDetails.id) : undefined;
  const imdbId = !isAnime ? contentDetails.external_ids?.imdb_id : undefined;
  const malId = isAnime ? animeDetails.mal_id : undefined;
  const title = animeDetails.title || contentDetails.title || contentDetails.name || 'Video';
  const trailerKey = isAnime ? animeDetails.trailer?.youtube_id : contentDetails.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key;

  const totalEpisodes = isAnime ? animeDetails.episodes : (seasonData?.episodes?.length || 0);
  const totalSeasons = isTV ? contentDetails.number_of_seasons : 0;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (audioMenuRef.current && !audioMenuRef.current.contains(event.target as Node)) {
            setShowAudioMenu(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSourceChange = () => {
    setStreamSourceIndex(prevIndex => {
      const sourceLength = isAnime ? ANIME_SOURCES.length : MOVIE_TV_SOURCES.length;
      const newIndex = (prevIndex + 1) % sourceLength;
      localStorage.setItem(`cineflix-stream-source-${type}`, newIndex.toString());
      return newIndex;
    });
  };
  
  const handleNextEpisode = () => {
    if (currentEpisode < totalEpisodes) {
        onEpisodeChange(currentEpisode + 1);
    } else if (isTV && currentSeason < (totalSeasons || 0)) {
        onSeasonChange(currentSeason + 1);
    }
  };
  
  const handleDubSearch = (dubType: string) => {
    const searchQuery = `${title} ${dubType}`;
    setShowAudioMenu(false);
    navigate(`/search/${searchQuery}`);
  };

  let streamUrl = '';
  if (isAnime) {
      streamUrl = ANIME_SOURCES[streamSourceIndex].url(title, currentEpisode);
  } else if (imdbId || tmdbId) {
      streamUrl = MOVIE_TV_SOURCES[streamSourceIndex].url(type, imdbId || tmdbId!, currentSeason, currentEpisode);
  }

  const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`;

  const canStream = (isAnime && malId) || imdbId || tmdbId;
  const canPlayTrailer = !!trailerKey;
  
  useEffect(() => {
    setActiveTab(canStream ? 'stream' : 'trailer');
  }, [canStream, trailerKey]);

  return (
    <div className="my-8">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-700 mb-4 pb-2 gap-2">
        <div className="flex self-start">
          {canStream && (
             <button onClick={() => setActiveTab('stream')} className={`py-2 px-4 font-semibold ${activeTab === 'stream' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400'}`}>Watch</button>
          )}
          {canPlayTrailer && (
             <button onClick={() => setActiveTab('trailer')} className={`py-2 px-4 font-semibold ${activeTab === 'trailer' ? 'border-b-2 border-brand-red text-white' : 'text-gray-400'}`}>Trailer</button>
          )}
        </div>
        {activeTab === 'stream' && canStream && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 self-end">
            {(isTV || isAnime) && (
              <div className="flex items-center gap-2">
                {isTV && totalSeasons && totalSeasons > 1 && (
                  <select value={currentSeason} onChange={e => onSeasonChange(Number(e.target.value))} className="bg-brand-dark border border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red">
                    {[...Array(totalSeasons)].map((_, i) => <option key={i+1} value={i+1}>Season {i+1}</option>)}
                  </select>
                )}
                {totalEpisodes > 1 && (
                  <select value={currentEpisode} onChange={e => onEpisodeChange(Number(e.target.value))} className="bg-brand-dark border border-gray-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-red">
                    {[...Array(totalEpisodes)].map((_, i) => <option key={i+1} value={i+1}>Episode {i+1}</option>)}
                  </select>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
               <span className="text-sm text-gray-400 hidden sm:inline">Source: {isAnime ? ANIME_SOURCES[streamSourceIndex].name : MOVIE_TV_SOURCES[streamSourceIndex].name}</span>
               
               <button onClick={handleSourceChange} className="font-bold bg-brand-red hover:bg-red-700 text-white py-1 px-3 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-red/50 text-sm">
                   Change Source
               </button>

               {!isAnime && (
                 <div className="relative" ref={audioMenuRef}>
                    <button onClick={() => setShowAudioMenu(prev => !prev)} className="font-bold bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/50 text-sm flex items-center gap-1" title="Select audio language">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3.5 2.5a.5.5 0 000 1h2a.5.5 0 000-1h-2zM6 10a.5.5 0 000 1h5a.5.5 0 000-1H6z"/></svg>
                      Select Audio
                    </button>
                    {showAudioMenu && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-brand-dark/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg z-20 origin-bottom-right animate-fade-scale-in">
                             <button onClick={() => handleDubSearch('(Hindi Dub)')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Find Hindi Dub</button>
                             <button onClick={() => handleDubSearch('(Multi Audio)')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Find Multi Audio</button>
                             <p className="px-4 py-2 text-xs text-gray-500">Select an option to search for a new stream.</p>
                        </div>
                    )}
                 </div>
               )}

               {(isTV || isAnime) && currentEpisode < totalEpisodes && (
                  <button onClick={handleNextEpisode} className="font-bold bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-md transition-colors text-sm">
                    Next Ep →
                  </button>
               )}
            </div>
          </div>
        )}
      </div>
       <div className="aspect-video bg-black rounded-lg overflow-hidden relative shadow-lg shadow-brand-red/10">
        {activeTab === 'stream' ? (
            canStream ? (
                <iframe key={streamUrl} src={streamUrl} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full" title={`Stream - ${title}`}></iframe>
            ) : (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-gray-400 p-4">
                    <p className="text-lg text-center">No direct stream available.</p>
                </div>
            )
        ) : (
            canPlayTrailer ? (
                <div className="w-full h-full relative">
                  <iframe src={trailerUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" title={`Trailer - ${title}`}></iframe>
                   <div className="absolute bottom-2 right-2 bg-black/60 p-1 px-2 rounded-md">
                        <a href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-300 hover:text-white hover:underline transition-colors" title="If the video doesn't play, watch it directly on YouTube">Watch on YouTube</a>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-gray-400">
                    <p className="text-lg">Trailer not available.</p>
                </div>
            )
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;