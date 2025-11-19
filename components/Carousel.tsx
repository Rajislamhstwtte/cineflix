
import React, { useRef } from 'react';
import Card from './Card';
import { Content, Anime, ContentType } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

interface CarouselProps {
  title: string;
  items: (Content | Anime)[];
  type: ContentType;
}

const Carousel: React.FC<CarouselProps> = ({ title, items, type }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(containerRef, 0.2);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  if (!items || items.length === 0) {
    return null;
  }

  const getItemKey = (item: Content | Anime) => {
    return 'mal_id' in item ? item.mal_id : item.id;
  };

  return (
    <div ref={containerRef} className={`my-8 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
      <h2 className="text-2xl font-bold mb-4 px-4 sm:px-6 lg:px-8">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 px-4 sm:px-6 lg:px-8 pb-4 scrollbar-hide"
          style={{
             maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          {items.map(item => (
            <Card key={getItemKey(item)} item={item} type={type} />
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;