
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { liveTVChannels } from '../data/liveTVChannels';

declare const Hls: any;

const MAX_CONSECUTIVE_FAILS = 5;

type StreamStatus = 'connecting' | 'playing' | 'recovering' | 'failed';

const LiveTVPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const [status, setStatus] = useState<StreamStatus>('connecting');
  const [statusMessage, setStatusMessage] = useState('');
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [failedChannels, setFailedChannels] = useState<Set<string>>(new Set());

  const channel = liveTVChannels.find(c => c.id === channelId);

  const handleTryAnother = useCallback(() => {
    if (!channel) {
        navigate('/live');
        return;
    };

    const categoryChannels = liveTVChannels.filter(c => c.category === channel.category);
    const currentIndex = categoryChannels.findIndex(c => c.id === channel.id);
    
    let nextChannel = null;
    for (let i = 1; i < categoryChannels.length; i++) {
        const nextIndex = (currentIndex + i) % categoryChannels.length;
        const potentialNextChannel = categoryChannels[nextIndex];
        if (!failedChannels.has(potentialNextChannel.id)) {
            nextChannel = potentialNextChannel;
            break;
        }
    }

    if (nextChannel) {
        navigate(`/live/${nextChannel.id}`);
    } else {
        setStatus('failed');
        setStatusMessage("All channels in this category seem to be unavailable. Please try another category.");
        if(hlsRef.current) hlsRef.current.destroy();
    }
  }, [channel, navigate, failedChannels]);

  useEffect(() => {
    setStatus('connecting');
    setStatusMessage('Connecting to stream...');
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    if (!channel) {
      navigate('/live/plex-movies'); // Default to a reliable channel
      return;
    }

    const videoElement = videoRef.current;
    if (videoElement) {
      if (Hls.isSupported()) {
        if (hlsRef.current) hlsRef.current.destroy();
        
        const hls = new Hls({ startFragPrefetch: true });
        hlsRef.current = hls;
        hls.loadSource(channel.url);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setStatus('playing');
          setConsecutiveFails(0); 
          videoElement.play().catch(e => console.error("Autoplay prevented:", e));
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.error(`HLS.js error: type: ${data.type}, details: ${data.details}, fatal: ${data.fatal}`);

            if (data.type === Hls.ErrorTypes.NETWORK_ERROR && data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
                setFailedChannels(prev => new Set(prev).add(channel.id));
                const newFailCount = consecutiveFails + 1;
                setConsecutiveFails(newFailCount);
                
                if (newFailCount >= MAX_CONSECUTIVE_FAILS) {
                    setStatus('failed');
                    setStatusMessage("Multiple channels appear to be offline. Please select another channel manually.");
                    if(hlsRef.current) hlsRef.current.destroy();
                } else {
                    setStatus('recovering');
                    setStatusMessage(`Channel unavailable. Trying the next one... (${newFailCount}/${MAX_CONSECUTIVE_FAILS})`);
                    hls.destroy();
                    fallbackTimer = setTimeout(handleTryAnother, 1500);
                }
                return;
            }
            
            if (data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError();
                  break;
                default:
                  setStatus('failed');
                  setStatusMessage("An unexpected error occurred. Please try another channel.");
                  hls.destroy();
                  break;
              }
            }
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = channel.url;
        videoElement.addEventListener('loadedmetadata', () => {
          setStatus('playing');
          setConsecutiveFails(0);
          videoElement.play().catch(e => console.error("Autoplay prevented:", e));
        });
      }
    }
    
    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [channel, navigate, handleTryAnother, consecutiveFails]);

  if (!channel) return null;
  
  const relatedChannels = liveTVChannels.filter(c => c.category === channel.category && c.id !== channel.id).slice(0, 12);

  return (
    <div className="pt-16 bg-brand-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4 text-white flex items-center">
            <img src={channel.logo} alt={channel.name} className="h-10 mr-4 bg-white/10 rounded-md p-1" />
            {channel.name}
        </h1>
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800 relative">
          <video ref={videoRef} controls className="w-full h-full" />
          {status !== 'playing' && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
              {status === 'connecting' || status === 'recovering' ? (
                <>
                  <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white mb-4"></div>
                  <p className="text-gray-300">{statusMessage}</p>
                </>
              ) : ( // status === 'failed'
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-red mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">Stream Unavailable</h3>
                  <p className="text-gray-300 mb-6">{statusMessage}</p>
                   <button onClick={() => navigate('/live')} className="bg-brand-red text-white font-bold py-2 px-4 rounded hover:bg-red-700">
                     Back to Channel Guide
                   </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">More in {channel.category}</h2>
           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
             {relatedChannels.map(ch => (
                 <button
                    key={ch.id}
                    onClick={() => {
                        setConsecutiveFails(0); // Reset fails on manual selection
                        navigate(`/live/${ch.id}`);
                    }}
                    title={ch.name}
                    className="p-2 rounded-lg transition-colors aspect-square flex items-center justify-center bg-brand-dark hover:bg-gray-800 hover:scale-105 transform duration-200"
                 >
                    <img src={ch.logo} alt={ch.name} className="max-w-full max-h-16 object-contain" />
                 </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTVPage;