import React, { useCallback, useRef } from 'react';
import { playClickSound } from '../utils/sound';

interface NeonButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  doubleWidth?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  label, 
  onClick, 
  className = '', 
  variant = 'primary',
  doubleWidth = false 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    playClickSound();
    
    // Add a momentary intense glow via JS class toggling for extra feedback
    if (buttonRef.current) {
        buttonRef.current.classList.add('shadow-neon-strong', 'text-white', 'scale-95');
        setTimeout(() => {
            if(buttonRef.current) {
                buttonRef.current.classList.remove('shadow-neon-strong', 'text-white', 'scale-95');
            }
        }, 150);
    }
    
    onClick();
  }, [onClick]);

  const getBaseStyles = () => {
    let base = "relative overflow-hidden font-orbitron font-bold text-xl md:text-2xl transition-all duration-100 ease-out rounded-xl border select-none active:scale-95 flex items-center justify-center ";
    
    // Width
    base += doubleWidth ? "col-span-2 aspect-[2/0.85] md:aspect-[2/0.9]" : "aspect-square";
    
    switch (variant) {
        case 'accent': // Orange
            return `${base} border-neon text-neon bg-neon-bg hover:bg-neon/10 hover:shadow-neon shadow-[0_0_2px_#FF6F00]`;
        case 'secondary': // Gray/Dark
            return `${base} border-gray-700 text-gray-300 bg-[#1f1f1f] hover:border-neon hover:text-neon hover:shadow-neon`;
        case 'danger': // Clear (Red-ish hint or just distinct)
            return `${base} border-red-900/50 text-red-500 bg-[#1f1f1f] hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_10px_#ef4444]`;
        case 'primary': // Numbers
        default:
             return `${base} border-gray-800 text-white/90 bg-[#161616] hover:border-neon/50 hover:text-neon hover:shadow-neon-text`;
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`${getBaseStyles()} ${className}`}
      onClick={handleClick}
    >
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      <span className="relative z-10 drop-shadow-md">{label}</span>
    </button>
  );
};

export default NeonButton;
