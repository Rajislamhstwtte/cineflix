
import React, { useState, useEffect, useRef } from 'react';

interface ShareButtonProps {
    title: string;
    url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [copied, setCopied] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setShowShareOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleShare = async () => {
        const isValidUrl = url && (url.startsWith('http://') || url.startsWith('https://'));

        if (navigator.share && isValidUrl) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out ${title} on CineFlix!`,
                    url: url,
                });
            } catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    console.log('Share action was cancelled by the user.');
                } else {
                    console.error('Error sharing:', error);
                    setShowShareOptions(true);
                }
            }
        } else {
            setShowShareOptions(prev => !prev);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowShareOptions(false);
            }, 2000);
        });
    };

    return (
        <div className="relative" ref={shareRef}>
            <button
                onClick={handleShare}
                className="bg-black/50 text-white font-bold py-2 px-6 rounded-md border border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:border-white hover:shadow-lg hover:shadow-brand-red/40 flex items-center"
                aria-label="Share"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
            </button>
            {showShareOptions && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-brand-dark/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg z-20 origin-bottom-right animate-fade-scale-in">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                        Share on Facebook
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out ${title}!`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                        Share on Twitter
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${title}! ${url}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                        Share on WhatsApp
                    </a>
                    <button onClick={handleCopy} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                        {copied ? 'Link Copied!' : 'Copy Link'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShareButton;