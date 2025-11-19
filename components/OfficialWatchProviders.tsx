
import React from 'react';
import { WatchProviderCountryDetails, WatchProvider } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';

interface OfficialWatchProvidersProps {
    providers: WatchProviderCountryDetails | null | undefined;
}

const ProviderSection: React.FC<{ title: string; items: WatchProvider[]; link: string }> = ({ title, items, link }) => {
    if (!items || items.length === 0) return null;

    return (
        <div>
            <h4 className="text-xl font-semibold text-gray-300 mb-3">{title}</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {items.map(provider => (
                    <a
                        key={provider.provider_id}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2 bg-brand-dark rounded-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
                        title={provider.provider_name}
                    >
                        <img
                            src={`${TMDB_IMAGE_BASE_URL}w92${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-16 h-16 object-contain rounded-md"
                        />
                        <span className="text-xs text-center mt-2 text-gray-400 line-clamp-1">{provider.provider_name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};


const OfficialWatchProviders: React.FC<OfficialWatchProvidersProps> = ({ providers }) => {
    if (!providers || (!providers.flatrate && !providers.rent && !providers.buy)) {
        return (
            <div className="my-8 p-4 bg-brand-dark rounded-lg text-center text-gray-400">
                No official streaming, rental, or purchase options found for this title in your region.
            </div>
        );
    }

    return (
        <div className="my-8 p-4 md:p-6 bg-brand-dark/50 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-3">Where to Watch</h3>
            <div className="space-y-6">
                <ProviderSection title="Stream" items={providers.flatrate || []} link={providers.link} />
                <ProviderSection title="Rent" items={providers.rent || []} link={providers.link} />
                <ProviderSection title="Buy" items={providers.buy || []} link={providers.link} />
            </div>
        </div>
    );
};

export default OfficialWatchProviders;
