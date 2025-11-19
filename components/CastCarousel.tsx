
import React, { useRef } from 'react';
import { Cast } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

interface CastCarouselProps {
    cast: Cast[];
}

const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(containerRef, 0.2);

    if (!cast || cast.length === 0) {
        return null;
    }

    return (
        <div ref={containerRef} className={`my-8 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
            <h3 className="text-2xl font-bold mb-4 text-white">Top Cast</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                {cast.slice(0, 20).map((member) => (
                    <div key={member.id} className="flex-shrink-0 w-32 text-center group">
                        <div className="relative rounded-full overflow-hidden w-24 h-24 mx-auto border-2 border-gray-800 group-hover:border-brand-red transition-all duration-300 transform group-hover:scale-105">
                            <img
                                src={member.profile_path ? `${TMDB_IMAGE_BASE_URL}w185${member.profile_path}` : 'https://via.placeholder.com/185x185.png?text=N/A'}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="mt-2 font-semibold text-sm text-white line-clamp-2">{member.name}</p>
                        <p className="text-xs text-gray-400 line-clamp-2">{member.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastCarousel;
