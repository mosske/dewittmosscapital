import React from 'react';

// Import local transparent PNG image assets
import logoBlack from './src/assets/images/logo-black.png';
import logoWhite from './src/assets/images/logo-white.png';
import logoGold from './src/assets/images/logo-gold.png';

interface LogoProps {
  className?: string;
  variant?: 'gold' | 'white' | 'dark' | 'adaptive';
  scrolled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'adaptive',
  scrolled = false
}) => {
  let logoSrc = logoGold;

  if (variant === 'white') {
    logoSrc = logoWhite;
  } else if (variant === 'dark') {
    logoSrc = logoBlack;
  } else if (variant === 'adaptive') {
    if (scrolled) {
      logoSrc = logoGold;
    } else {
      logoSrc = logoWhite;
    }
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={logoSrc}
        alt="DeWitt Moss Dosaj Crest Logo"
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

