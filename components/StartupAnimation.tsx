import React, { useEffect, useState } from 'react';

interface StartupAnimationProps {
  onAnimationEnd: () => void;
}

const StartupAnimation: React.FC<StartupAnimationProps> = ({ onAnimationEnd }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Total animation time before fade-out starts
    const animationDuration = 3000; // 3 seconds
    // Fade-out transition time
    const fadeOutDuration = 500; // 0.5 seconds

    const timer = setTimeout(() => {
      setFadingOut(true);
      // Call onAnimationEnd after the fade-out is complete
      setTimeout(onAnimationEnd, fadeOutDuration);
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div
      className={`fixed inset-0 bg-brand-black flex items-center justify-center z-[100] transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* 
        NOTE: You need to provide your own sound file. 
        Place a file named 'startup-sound.mp3' in the public directory.
        A "tudum" sound works best.
      */}
      <audio src="/startup-sound.mp3" autoPlay />
      <div className="netflix-intro">
        <h1 className="text-6xl md:text-8xl netflix-logo">
          CINEFLIX
        </h1>
      </div>
    </div>
  );
};

export default StartupAnimation;