import React from 'react';

const RainbowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  // Intermediate colors can be calculated or chosen manually.
  // For this example, I'll choose two colors that visually appear between the provided colors.
  const innerColor = "#3b82f6"; // Blue
  const outerColor = "#10b981"; // Green
  const middleColor1 = "#18dbcb"; // A color between blue and green

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 17a10 10 0 0 0-20 0" stroke={outerColor} strokeWidth="2" />
      <path d="M6 17a6 6 0 0 1 12 0" stroke={middleColor1} strokeWidth="2" />
      <path d="M10 17a2 2 0 0 1 4 0" stroke={innerColor} strokeWidth="2" />
    </svg>
  );
};

export default RainbowIcon;
