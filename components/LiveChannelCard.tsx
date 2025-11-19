
import React from 'react';
import { Link } from 'react-router-dom';
import { LiveChannel } from '../types';

interface LiveChannelCardProps {
  channel: LiveChannel;
}

const LiveChannelCard: React.FC<LiveChannelCardProps> = ({ channel }) => {
  return (
    <Link to={`/live/${channel.id}`} className="flex-shrink-0 w-32 h-24 group">
      <div className="relative w-full h-full p-2 bg-brand-dark rounded-lg flex items-center justify-center transition-transform duration-300 transform group-hover:scale-105 group-hover:bg-gray-800">
        <img
          src={channel.logo}
          alt={channel.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </Link>
  );
};

export default LiveChannelCard;