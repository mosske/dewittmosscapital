import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  imageUrl: string;
  fallbackImageUrl?: string; // used only if imageUrl fails to load (e.g. file not uploaded yet)
  overlayGradient?: string; // e.g. "linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.75))"
  children?: React.ReactNode;
  className?: string;
  minHeight?: string;
  backgroundPosition?: string;
  parallaxIntensity?: 'medium' | 'high' | 'ultra';
  backgroundSize?: 'cover' | 'contain' | string;
  backgroundRepeat?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl,
  fallbackImageUrl,
  overlayGradient = 'linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.75))',
  children,
  className = '',
  minHeight = '500px',
  backgroundPosition = 'center center',
  parallaxIntensity = 'high',
  backgroundSize = 'cover',
  backgroundRepeat = 'no-repeat'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the primary image; if it cannot be loaded and a fallback is given, switch to the fallback.
  const [activeUrl, setActiveUrl] = useState(imageUrl);
  useEffect(() => {
    setActiveUrl(imageUrl);
    if (!fallbackImageUrl) return;
    let cancelled = false;
    const probe = new Image();
    probe.onerror = () => {
      if (!cancelled) setActiveUrl(fallbackImageUrl);
    };
    probe.src = imageUrl;
    return () => {
      cancelled = true;
    };
  }, [imageUrl, fallbackImageUrl]);

  // Track scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Calculate increased parallax shift based on intensity
  const yShift = parallaxIntensity === 'ultra' ? ['-40%', '40%'] : parallaxIntensity === 'high' ? ['-32%', '32%'] : ['-20%', '20%'];
  const topOffset = parallaxIntensity === 'ultra' ? '-40%' : parallaxIntensity === 'high' ? '-32%' : '-20%';
  const containerHeight = parallaxIntensity === 'ultra' ? '180%' : parallaxIntensity === 'high' ? '164%' : '140%';

  // map scrollYProgress to translate the background image smoothly with high amplitude
  const y = useTransform(scrollYProgress, [0, 1], yShift);

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
          height: containerHeight,
          top: topOffset,
          backgroundImage: `${overlayGradient}, url('${activeUrl}')`,
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          backgroundRepeat: backgroundRepeat,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-[inherit] flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};