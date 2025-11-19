import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark py-8 mt-auto border-t border-gray-800 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <div className="flex justify-center flex-wrap items-center gap-x-6 gap-y-4 mb-4">
            {/* Facebook */}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1" title="Facebook">
                <svg className="w-7 h-7" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1" title="Instagram">
                <svg className="w-7 h-7" fill="url(#instagram-gradient)" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                        <radialGradient id="instagram-gradient" cx="0.3" cy="1" r="1">
                            <stop offset="0%" stopColor="#FDCB52"/>
                            <stop offset="25%" stopColor="#FD8D32"/>
                            <stop offset="50%" stopColor="#F5333F"/>
                            <stop offset="75%" stopColor="#C837AB"/>
                            <stop offset="100%" stopColor="#4F5BD5"/>
                        </radialGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.483.01-4.7.068-2.68.122-3.633 1.142-3.753 3.753-.058 1.218-.068 1.586-.068 4.7s.01 3.483.068 4.7c.12 2.61 1.07 3.633 3.753 3.753 1.217.058 1.583.068 4.7.068s3.483-.01 4.7-.068c2.68-.122 3.633-1.142 3.753-3.753.058-1.218.068-1.586.068-4.7s-.01-3.483-.068-4.7c-.12-2.61-1.07-3.633-3.753-3.753C15.483 3.975 15.116 3.965 12 3.965zM12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.528a3.365 3.365 0 110-6.73 3.365 3.365 0 010 6.73zM16.965 6.57a1.265 1.265 0 100 2.53 1.265 1.265 0 000-2.53z"/>
                </svg>
            </a>
            {/* X (Twitter) */}
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1" title="X">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            {/* Telegram */}
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1" title="Telegram">
              <svg className="w-7 h-7" fill="#24A1DE" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.71 4.29l-17.42 6.83a1 1 0 0 0 .1 1.88l4.37 1.34 1.34 4.37a1 1 0 0 0 1.88.1l6.83-17.42a1 1 0 0 0-1.78-1.78zM8.47 15.53l-1-3.29 7.2-7.2a.5.5 0 0 0-.71-.71l-7.2 7.2-3.29-1L18.93 5.07z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:-translate-y-1" title="TikTok">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.98-1.7-2.16-2.42-4.84-2.22-7.46.21-2.57 1.53-4.99 3.53-6.62 1.81-1.45 4.09-2.3 6.36-2.32.02 3.33.01 6.65.02 9.98.01.05-.02.13-.03.19-.21.2-.43.38-.67.52-.53.31-1.11.52-1.7.62-1.11.17-2.25-.13-3.14-.81-.51-.4-1.01-.83-1.49-1.28-.14-.13-.28-.26-.42-.41v-3.79c.98 1.14 2.11 1.94 3.4 2.45 1.55.6 3.25.75 4.95.46.03-1.58.01-3.15.01-4.73.01-1.24-.4-2.42-1.1-3.35C14.24 1.41 13.43.62 12.525.02z"/></svg>
            </a>
        </div>
        <div className="border-t border-gray-800 pt-4 mt-4">
            <p className="text-sm">
            &copy; {new Date().getFullYear()} CineFlix. All rights reserved. A Project by RAJ.
            </p>
            <p className="text-xs mt-2">
            This site does not store any files on our server, we only link to the media which is hosted on 3rd party services.
            </p>
        </div>
      </div>
      {/* RAJ Floating Logo */}
      <div className="fixed bottom-4 right-4 z-50 group">
        <div className="w-16 h-16 bg-brand-dark/50 border-2 border-gray-700 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-red/50 group-hover:border-brand-red">
          <span className="text-2xl font-bold text-gray-300 transition-colors group-hover:text-white">R</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;