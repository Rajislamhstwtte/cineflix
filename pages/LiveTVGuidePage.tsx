import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { liveTVChannels } from '../data/liveTVChannels';
import { LiveChannelCategory } from '../types';
import LiveChannelCard from '../components/LiveChannelCard';

const categories: LiveChannelCategory[] = ['Movies', 'Comedy', 'Documentary', 'Sports', 'India', 'News', 'Entertainment', 'Music', 'Kids', 'International'];

const LiveTVGuidePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<LiveChannelCategory | 'All'>('All');
  
  const filteredChannels = selectedCategory === 'All' 
    ? liveTVChannels 
    : liveTVChannels.filter(channel => channel.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <h1 className="text-4xl font-bold mb-4">Live TV Channels</h1>
      <p className="text-lg text-gray-400 mb-8">Watch free live TV channels from around the world.</p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === 'All' ? 'bg-brand-red text-white' : 'bg-brand-dark text-gray-300 hover:bg-gray-800'}`}
        >
          All Channels
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === category ? 'bg-brand-red text-white' : 'bg-brand-dark text-gray-300 hover:bg-gray-800'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredChannels.map(channel => (
          <LiveChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
       <div className="text-center text-gray-500 text-xs mt-12">
            <p>Disclaimer: CineFlix does not host or distribute any of the live streams found on this page.</p>
            <p>All streams are publicly available and provided by third-party services. Availability is not guaranteed.</p>
        </div>
    </div>
  );
};

export default LiveTVGuidePage;