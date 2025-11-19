
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import { WatchlistButton } from './WatchlistButton';

interface HeroSliderProps {
  content: Content[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  // FIX: Use ReturnType<typeof setTimeout> for browser compatibility instead of NodeJS.Timeout
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === content.length - 1 ? 0 : prevIndex + 1
        ),
      7000 // Change slide every 7 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, content.length, resetTimeout]);

  if (!content || content.length === 0) {
    return (
      <div className="h-[60vh] md:h-[90vh] bg-brand-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? content.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === content.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }

  const handlePlay = (item: Content) => {
    const type = item.title ? 'movie' : 'tv';
    navigate(`/${type}/${item.id}`);
  };

  const currentSlide = content[currentIndex];

  return (
    <div 
        className="relative h-[60vh] md:h-[90vh] w-full group"
        onMouseEnter={() => resetTimeout()}
    >
      {content.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{ opacity: slideIndex === currentIndex ? 1 : 0 }}
        >
          <div
            className={`w-full h-full bg-cover bg-center ${slideIndex === currentIndex ? 'animate-kenburns' : ''}`}
            style={{ backgroundImage: `url(${TMDB_IMAGE_BASE_URL}original${slide.backdrop_path})` }}
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col justify-center h-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold line-clamp-2 transition-all duration-500">
            {currentSlide.title || currentSlide.name}
          </h1>
          <p className="mt-4 text-gray-300 line-clamp-3 transition-all duration-500">
            {currentSlide.overview}
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={() => handlePlay(currentSlide)}
              className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-300 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </button>
            <WatchlistButton 
               item={{
                 id: currentSlide.id,
                 type: currentSlide.title ? 'movie' : 'tv',
                 title: currentSlide.title || currentSlide.name || 'Unknown',
                 poster_path: currentSlide.poster_path
               }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 z-20 cursor-pointer p-2 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={goToPrevious}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </div>
      <div className="absolute top-1/2 right-5 -translate-y-1/2 z-20 cursor-pointer p-2 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={goToNext}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {content.map((_, slideIndex) => (
            <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'}`}
            ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
