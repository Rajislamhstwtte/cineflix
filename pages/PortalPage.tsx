
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { streamingPlatforms } from '../data/streamingPlatforms';

const PortalPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const platform = streamingPlatforms.find(p => p.id === serviceId);

    if (!platform) {
        return <Navigate to="/" />;
    }
    
    const embedUrl = platform.id === 'youtube' 
        ? 'https://www.youtube.com/embed/videoseries?list=PLHpt_S_i9ueIwiA7gKz8D_Tf2lQ9P_I_v' 
        : platform.url;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 flex flex-col" style={{ minHeight: 'calc(100vh - 5rem)' }}>
            <div className="mb-4 p-3 bg-brand-dark rounded-lg border border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                 <div className="flex items-center">
                    <img src={platform.logo} alt={platform.name} className="h-8 mr-3" style={{ filter: ['Max', 'Disney+', 'Hulu'].includes(platform.name) ? 'invert(1)' : 'none' }} />
                    <h1 className="text-xl font-bold">Portal: {platform.name}</h1>
                 </div>
            </div>
            <div className="flex-grow border-2 border-gray-800 rounded-lg overflow-hidden bg-black">
                {platform.embeddable ? (
                    <iframe
                        src={embedUrl}
                        title={platform.name}
                        className="w-full h-full"
                        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-brand-dark/50">
                        <img src={platform.logo} alt={platform.name} className="h-16 mb-6" style={{ filter: ['Max', 'Disney+', 'Hulu'].includes(platform.name) ? 'invert(1)' : 'none' }} />
                        <h2 className="text-2xl font-bold mb-2">Continue to {platform.name}</h2>
                        <p className="text-gray-400 mb-6 max-w-md">
                            For the best and most secure experience, this service needs to be opened in its own tab.
                        </p>
                        <a href={platform.url} target="_blank" rel="noopener noreferrer" className="bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 flex items-center gap-2">
                           <span>Continue to {platform.name}</span>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortalPage;