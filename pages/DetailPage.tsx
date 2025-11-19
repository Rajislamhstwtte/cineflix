import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getContentDetails, getTVSeason, getSimilarContent } from '../services/tmdbService';
import { getAnimeDetails, getAnimeRecommendations } from '../services/jikanService';
import { Content, Anime, ContentType, TVSeason } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import VideoPlayer from '../components/VideoPlayer';
import ActionButtons from '../components/ActionButtons';
import OfficialWatchProviders from '../components/OfficialWatchProviders';
import EpisodeGuide from '../components/EpisodeGuide';
import Carousel from '../components/Carousel';
import { useOnScreen } from '../hooks/useOnScreen';
import CastCarousel from '../components/CastCarousel';

const AnimatedSection: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, 0.2);
    return (
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {children}
        </div>
    );
};


const DetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: ContentType, id: string }>();
  const [details, setDetails] = useState<Content | Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<(Content | Anime)[]>([]);
  
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [seasonData, setSeasonData] = useState<TVSeason | null>(null);
  const [loadingSeason, setLoadingSeason] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
    const fetchDetailsAndRecommendations = async () => {
      if (!type || !id) return;
      try {
        setLoading(true);
        setError(null);
        setSeasonData(null);
        setCurrentSeason(1);
        setCurrentEpisode(1);
        setRecommendations([]);
        
        let data: Content | Anime;
        if (type === 'anime') {
          data = await getAnimeDetails(id);
          const recs = await getAnimeRecommendations(id);
          setRecommendations(recs);
        } else {
          data = await getContentDetails(type, id);
          const similar = await getSimilarContent(type, id);
          setRecommendations(similar);
        }
        setDetails(data);

      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Could not load content details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsAndRecommendations();
  }, [type, id]);
  
  useEffect(() => {
    if (type === 'tv' && id && details) {
        const fetchSeason = async () => {
            setLoadingSeason(true);
            try {
                const season = await getTVSeason(id, currentSeason);
                setSeasonData(season);
            } catch (err) {
                console.error(`Error fetching season ${currentSeason}:`, err);
                setSeasonData(null);
            } finally {
                setLoadingSeason(false);
            }
        };
        fetchSeason();
    }
  }, [type, id, details, currentSeason]);

  const handleSeasonChange = (season: number) => {
    setCurrentSeason(season);
    setCurrentEpisode(1); 
  };

  const handleEpisodeSelect = (episodeNumber: number) => {
    setCurrentEpisode(episodeNumber);
    playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const renderDetails = () => {
    if (!details) return null;

    const isAnime = 'mal_id' in details;
    const isTV = type === 'tv';
    const title = isAnime ? details.title : (details.title || details.name);
    const overview = isAnime ? details.synopsis : details.overview;
    const posterPath = isAnime ? details.images.jpg.large_image_url : `${TMDB_IMAGE_BASE_URL}w500${details.poster_path}`;
    const backdropPath = isAnime ? details.images.jpg.large_image_url : `${TMDB_IMAGE_BASE_URL}original${details.backdrop_path}`;
    const releaseDate = isAnime ? details.year : (details.release_date || details.first_air_date);
    const rating = isAnime ? details.score : details.vote_average;
    const genres = isAnime ? details.genres.map(g => g.name) : details.genres?.map(g => g.name);
    
    const contentDetails = details as Content;
    const watchProviders = !isAnime ? contentDetails['watch/providers']?.results.US : null;
    const cast = !isAnime ? contentDetails.credits?.cast : [];
    const director = !isAnime ? contentDetails.credits?.crew?.find(c => c.job === 'Director') : undefined;

    let recommendationTitle = '';
    if (type === 'movie') recommendationTitle = 'Similar Movies';
    else if (type === 'tv') recommendationTitle = 'Similar TV Shows';
    else if (type === 'anime') recommendationTitle = 'Recommended Anime';

    return (
      <div className="overflow-x-hidden">
        <div className="relative h-[40vh] md:h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${backdropPath})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-48 relative z-10 pb-16">
          <div className="md:flex md:space-x-8">
            <div className="flex-shrink-0 w-48 md:w-64 mx-auto md:mx-0">
              <img src={posterPath} alt={title} className="rounded-lg shadow-lg w-full" />
            </div>
            <div className="mt-6 md:mt-0 text-center md:text-left flex-grow">
              <h1 className="text-3xl md:text-5xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{title}</h1>
              <div className="flex items-center justify-center md:justify-start flex-wrap gap-x-4 gap-y-2 mt-2 text-gray-400">
                <span>{new Date(releaseDate || '').getFullYear()}</span>
                <span>•</span>
                <span>{rating ? rating.toFixed(1) : 'N/A'} ★</span>
                {director && <span>•</span>}
                {director && <span>Director: {director.name}</span>}
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                {genres?.map(genre => <span key={genre} className="bg-brand-dark px-2 py-1 rounded-full text-sm">{genre}</span>)}
              </div>
              <p className="mt-6 max-w-2xl mx-auto md:mx-0">{overview}</p>
              <ActionButtons details={details} type={type!} />
            </div>
          </div>
          <div ref={playerRef}>
            <AnimatedSection>
              <VideoPlayer 
                details={details} 
                type={type!} 
                currentSeason={currentSeason}
                currentEpisode={currentEpisode}
                onSeasonChange={handleSeasonChange}
                onEpisodeChange={setCurrentEpisode}
                seasonData={seasonData}
              />
            </AnimatedSection>
          </div>
          {isTV && (
            <AnimatedSection>
              <EpisodeGuide 
                seasonData={seasonData} 
                numberOfSeasons={(details as Content).number_of_seasons || 0} 
                currentSeason={currentSeason} 
                currentEpisode={currentEpisode}
                onSeasonChange={handleSeasonChange} 
                onEpisodeSelect={handleEpisodeSelect}
                loading={loadingSeason} 
              />
            </AnimatedSection>
          )}
          {!isAnime && cast && cast.length > 0 && (
            <AnimatedSection>
                <CastCarousel cast={cast} />
            </AnimatedSection>
          )}
          <AnimatedSection><OfficialWatchProviders providers={watchProviders} /></AnimatedSection>
          {recommendations.length > 0 && (
            <AnimatedSection>
                <Carousel title={recommendationTitle} items={recommendations} type={type!} />
            </AnimatedSection>
          )}
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center text-xl text-gray-400">{error}</div>;
  }

  return <div>{renderDetails()}</div>;
};

export default DetailPage;