import React from 'react';

export default function Logo({ className = "w-8 h-8" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full text-primary"
      >
        {/* Dynamic 'C' arc that forms the main body */}
        <path 
          d="M 70 25 A 35 35 0 1 0 70 75" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round" 
        />
        {/* Rocket/Chevron element representing the 'Pilot' taking off */}
        <path 
          d="M 45 65 L 85 15 L 60 80 Z" 
          fill="currentColor" 
        />
      </svg>
    </div>
  );
}
