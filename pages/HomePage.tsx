import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import Carousel from '../components/Carousel';
import GenreTags from '../components/GenreTags';
import { getTrending, getPopular, getDiscover } from '../services/tmdbService';
import { getTopAnime } from '../services/jikanService';
import { Content, Anime } from '../types';

const HomePage: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Content[]>([]);
  const [popularShows, setPopularShows] = useState<Content[]>([]);
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [bollywoodMovies, setBollywoodMovies] = useState<Content[]>([]);
  const [koreanDramas, setKoreanDramas] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true);
        const [
          trending, 
          popular, 
          anime,
          bollywood,
          korean
        ] = await Promise.all([
          getTrending('movie'),
          getPopular('tv'),
          getTopAnime(),
          getDiscover('movie', { with_original_language: 'hi', 'vote_count.gte': '100', sort_by: 'popularity.desc' }),
          getDiscover('tv', { with_original_language: 'ko', sort_by: 'popularity.desc' })
        ]);

        setTrendingMovies(trending);
        setPopularShows(popular);
        setTopAnime(anime);
        setBollywoodMovies(bollywood);
        setKoreanDramas(korean);

      } catch (error) {
        console.error("Error fetching homepage content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  if (loading) {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-red"></div>
        </div>
    );
  }

  return (
    <div>
      <HeroSlider content={trendingMovies} />
      <div className="py-8">
        <Carousel title="Trending Movies" items={trendingMovies} type="movie" />
        <Carousel title="Popular TV Shows" items={popularShows} type="tv" />
        <Carousel title="Top Rated Anime" items={topAnime} type="anime" />
        <Carousel title="Bollywood Blockbusters" items={bollywoodMovies} type="movie" />
        <Carousel title="Korean Dramas" items={koreanDramas} type="tv" />
        
        <GenreTags mediaType="movie" title="Browse by Movie Genre" />
        <GenreTags mediaType="tv" title="Browse by TV Show Genre" />
      </div>
    </div>
  );
};

export default HomePage;