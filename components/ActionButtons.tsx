import React from 'react';
import { Content, Anime, ContentType } from '../types';
import { WatchlistButton } from './WatchlistButton';
import ShareButton from './ShareButton';
import DownloadButton from './DownloadButton';

interface ActionButtonsProps {
    details: Content | Anime;
    type: ContentType;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ details, type }) => {
    const isAnime = type === 'anime';
    const title = isAnime ? (details as Anime).title : ((details as Content).title || (details as Content).name);
    const posterPath = isAnime ? (details as Anime).images.jpg.large_image_url : (details as Content).poster_path;

    const watchlistItem = {
        id: isAnime ? (details as Anime).mal_id : (details as Content).id,
        type: type,
        title: title || 'Unknown',
        poster_path: posterPath,
    };

    const shareUrl = window.location.href;

    return (
        <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <WatchlistButton item={watchlistItem} />
            <ShareButton title={title || 'CineFlix Content'} url={shareUrl} />
            <DownloadButton />
        </div>
    );
};

export default ActionButtons;
