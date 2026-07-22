import React from 'react';

// Import local Griffin logo PNG image assets
import griffinLogoGold from './src/assets/images/Griffin_logo_gold.png';
import griffinLogoWhite from './src/assets/images/Griffin_logo_white.png';

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
  let logoSrc = griffinLogoGold;

  if (variant === 'white') {
    logoSrc = griffinLogoWhite;
  } else if (variant === 'dark') {
    logoSrc = griffinLogoGold;
  } else if (variant === 'adaptive') {
    if (scrolled) {
      logoSrc = griffinLogoGold;
    } else {
      logoSrc = griffinLogoWhite;
    }
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={logoSrc}
        alt="DeWitt Moss Capital Griffin Crest Logo"
        className="h-full w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

