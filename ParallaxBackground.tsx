import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';

interface ParallaxBackgroundProps {
  imageUrl: string;
  fallbackImageUrl?: string; // used only if imageUrl fails to load (e.g. file not uploaded yet)
  overlayGradient?: string; // e.g. "linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.75))"
  children?: React.ReactNode;
  className?: string;
  minHeight?: string;
  backgroundPosition?: string;
  parallaxIntensity?: 'fixed' | 'medium' | 'high' | 'ultra';
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
  const fullBleedFactor = 2; // 200% = 2x container height, -50% offset

  // Calculate parallax shift based on intensity
  const yShift = parallaxIntensity === 'ultra' ? ['-50%', '50%'] : parallaxIntensity === 'high' ? ['-48%', '48%'] : ['-40%', '40%'];
  const baseTopOffset = '-50%';

  // Container height and top offset for parallax
  const containerHeight = fullBleedFactor;
  const topOffset = baseTopOffset;

  // map scrollYProgress to translate the background image smoothly with high amplitude
  const y = useTransform(scrollYProgress, [0, 1], yShift);

  // 'fixed' = hero-style parallax, but the image layer is exactly one viewport tall and is moved so the
  // picture appears pinned to the screen while the block scrolls over it. Because the layer is only one
  // viewport tall (not 200% of the block), `cover` shows far more of the image instead of zooming in.
  const isFixed = parallaxIntensity === 'fixed';
  const sizeRef = useRef({ h: 0, v: 0 });
  const fixedY = useMotionValue('0px');
  const updateFixedY = () => {
    const { h, v } = sizeRef.current;
    fixedY.set(`${scrollYProgress.get() * (h + v) - v}px`);
  };
  useMotionValueEvent(scrollYProgress, 'change', () => {
    if (isFixed) updateFixedY();
  });
  useEffect(() => {
    if (!isFixed) return;
    const measure = () => {
      sizeRef.current = { h: containerRef.current?.offsetHeight || 0, v: window.innerHeight };
      updateFixedY();
    };
    measure();
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' && containerRef.current ? new ResizeObserver(measure) : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [isFixed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ minHeight }}
      id={`parallax-${imageUrl.split('/').pop()?.split('.')[0] || 'bg'}`}
    >
      {/* Parallax Background Wrapper */}
      <motion.div
        className="absolute z-0 bg-stone-950 pointer-events-none"
        style={{
          position: 'absolute',
          top: isFixed ? 0 : '-50%',
          left: 0,
          width: '100%',
          height: isFixed ? '100vh' : '200%',
          y: isFixed ? fixedY : y,
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