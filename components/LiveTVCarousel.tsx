import React from 'react';
import { liveTVChannels } from '../data/liveTVChannels';
import LiveChannelCard from './LiveChannelCard';

const LiveTVCarousel: React.FC = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 px-4 sm:px-6 lg:px-8">Live TV Channels</h2>
      <div className="flex overflow-x-auto space-x-4 px-4 sm:px-6 lg:px-8 pb-4 scrollbar-hide">
        {liveTVChannels.map(channel => (
          <LiveChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default LiveTVCarousel;