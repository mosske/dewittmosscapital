import React from 'react';

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
  // Determine colors based on variant and scrolled state
  let primaryColor = '#C5A059'; // Gold
  let borderColor = '#C5A059';  // Gold
  
  if (variant === 'white') {
    primaryColor = '#FFFFFF';
    borderColor = '#FFFFFF';
  } else if (variant === 'dark') {
    primaryColor = '#1C1917'; // stone-900
    borderColor = '#1C1917';
  } else if (variant === 'adaptive') {
    if (scrolled) {
      primaryColor = '#C5A059'; // Gold columns
      borderColor = '#C5A059';  // Gold border
    } else {
      primaryColor = '#FFFFFF'; // White columns
      borderColor = '#FFFFFF';  // White border
    }
  }

  return (
    <svg
      viewBox="0 0 100 150"
      className={className}
      id="dmc-vector-logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Elegant Outer Border */}
      <rect
        x="4"
        y="4"
        width="92"
        height="142"
        fill="none"
        stroke={borderColor}
        strokeWidth="4"
        rx="2"
      />

      {/* Building Silhouette / Column Elements */}
      {/* All shapes are filled with primaryColor */}
      
      {/* Column 1 (Leftmost, Shortest) */}
      <polygon
        points="10,124 14,118 14,142 10,142"
        fill={primaryColor}
      />

      {/* Column 2 */}
      <polygon
        points="17,104 21,98 21,142 17,142"
        fill={primaryColor}
      />

      {/* Column 3 */}
      <polygon
        points="24,84 28,78 28,142 24,142"
        fill={primaryColor}
      />

      {/* Column 4 */}
      <polygon
        points="31,64 35,58 35,142 31,142"
        fill={primaryColor}
      />

      {/* Column 5 */}
      <polygon
        points="38,44 42,38 42,142 38,142"
        fill={primaryColor}
      />

      {/* Column 6 (Tallest Thin Column) */}
      <polygon
        points="45,24 49,18 49,142 45,142"
        fill={primaryColor}
      />

      {/* Main Large Building (Column 7) */}
      {/* 
        - Left peak is tallest: (53, 10)
        - Roof slants down to: (76, 45)
        - Steps down vertically to: (76, 85)
        - Second slant to: (90, 105)
        - Right wall down to bottom: (90, 142)
      */}
      <polygon
        points="53,10 76,45 76,85 90,105 90,142 53,142"
        fill={primaryColor}
      />
    </svg>
  );
};
