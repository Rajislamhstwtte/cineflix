
import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import { WatchlistItem } from '../types';

interface WatchlistButtonProps {
    item: WatchlistItem;
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({ item }) => {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(item.id, item.type);

    const handleToggleWatchlist = () => {
        if(inWatchlist) {
            removeFromWatchlist(item.id, item.type);
        } else {
            addToWatchlist(item);
        }
    };

    return (
        <button
            onClick={handleToggleWatchlist}
            className="bg-black/50 text-white font-bold py-2 px-6 rounded-md border border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:border-white hover:shadow-lg hover:shadow-brand-red/40 flex items-center"
        >
            {inWatchlist ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            )}
            My List
        </button>
    );
};