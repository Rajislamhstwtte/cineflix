
import React from 'react';
import { Link } from 'react-router-dom';
import { streamingPlatforms } from '../data/streamingPlatforms';

const StreamingPlatformLinks: React.FC = () => {
  return (
    <div className="my-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Streaming Service Portals
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
        {streamingPlatforms.map((platform) => (
          <Link
            key={platform.id}
            to={`/portal/${platform.id}`}
            className="flex flex-col items-center justify-center p-4 bg-brand-dark rounded-lg border border-gray-800 hover:bg-gray-800 hover:scale-105 transform transition-all duration-200 ease-in-out"
            title={`Open ${platform.name} Portal`}
          >
            <img
              src={platform.logo}
              alt={`${platform.name} Logo`}
              className="h-8 sm:h-10 object-contain"
              style={{ filter: platform.name === 'Max' || platform.name === 'Disney+' ? 'invert(1)' : 'none' }}
            />
            <span className="text-sm text-gray-400 mt-3 font-semibold hidden sm:block">
              {platform.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StreamingPlatformLinks;
