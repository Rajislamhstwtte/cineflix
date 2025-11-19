
import React, { useState, useRef, useEffect } from 'react';

const DownloadButton: React.FC = () => {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDownloadClick = (quality: string) => {
        alert(`Attempting to find a ${quality} download link...\n\nNote: Direct downloads depend on the streaming source. If a download doesn't start, try changing the stream source or use a browser extension designed for video downloading.`);
        setShowOptions(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowOptions(prev => !prev)}
                className="bg-black/50 text-white font-bold py-2 px-6 rounded-md border border-white/50 transition-all duration-300 transform hover:-translate-y-1 hover:border-white hover:shadow-lg hover:shadow-brand-red/40 flex items-center"
                aria-label="Download"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
            </button>
            {showOptions && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-brand-dark/90 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg z-20 origin-bottom-left animate-fade-scale-in">
                    <button onClick={() => handleDownloadClick('1080p')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">1080p (Full HD)</button>
                    <button onClick={() => handleDownloadClick('720p')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">720p (HD)</button>
                    <button onClick={() => handleDownloadClick('360p')} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">360p (Standard)</button>
                </div>
            )}
        </div>
    );
};

export default DownloadButton;