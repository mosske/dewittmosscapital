import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  imageUrl: string;
  overlayGradient?: string; // e.g. "linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.75))"
  children?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  overlayGradient = 'linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.75))',
  children,
  className = '',
  minHeight = '500px'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // map scrollYProgress to translate the background image smoothly
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ minHeight }}
      id={`parallax-${imageUrl.split('/').pop()?.split('.')[0] || 'bg'}`}
    >
      {/* Parallax Background Wrapper */}
      <motion.div
        className="absolute inset-0 z-0 bg-stone-950 pointer-events-none"
        style={{
          y,
          height: '130%', // larger to prevent gaps during translation
          top: '-15%',
          backgroundImage: `${overlayGradient}, url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-[inherit] flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};
