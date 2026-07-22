import React from 'react';

// Import local image assets
import logoBlack from './src/assets/images/griffin_logo_black_1784704831108.jpg';
import logoWhite from './src/assets/images/griffin_logo_white_1784704846226.jpg';
import logoGold from './src/assets/images/griffin_logo_gold_1784704861085.jpg';

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
  let blendClass = 'mix-blend-screen';

  if (variant === 'white') {
    logoSrc = logoWhite;
    blendClass = 'mix-blend-screen';
  } else if (variant === 'dark') {
    logoSrc = logoBlack;
    blendClass = 'mix-blend-multiply';
  } else if (variant === 'adaptive') {
    if (scrolled) {
      logoSrc = logoGold;
      blendClass = 'mix-blend-screen';
    } else {
      logoSrc = logoWhite;
      blendClass = 'mix-blend-screen';
    }
  }

  return (
    <div className={`inline-flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={logoSrc}
        alt="DeWitt Moss Dosaj Crest Logo"
        className={`h-full w-auto object-contain rounded-sm ${blendClass}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

