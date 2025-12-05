import React from 'react';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operation: string | null;
  hasMemory: boolean;
}

const Display: React.FC<DisplayProps> = ({ value, previousValue, operation, hasMemory }) => {
  // Format numbers for display (add commas)
  const formatOperand = (operand: string) => {
    if (operand == null) return;
    const [integer, decimal] = operand.split('.');
    if (decimal == null) {
        return new Intl.NumberFormat('en-US').format(parseFloat(integer));
    }
    return `${new Intl.NumberFormat('en-US').format(parseFloat(integer))}.${decimal}`;
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl p-6 mb-6 border-2 border-gray-800 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Glow behind the screen */}
        <div className="absolute top-0 left-0 w-full h-2 bg-neon/20 blur-md"></div>

        {/* Status Indicators */}
        <div className="flex justify-between items-center h-6 text-xs font-orbitron text-neon/60 mb-2">
            <div>{hasMemory ? <span className="animate-pulse drop-shadow-[0_0_2px_#FF6F00]">M</span> : ''}</div>
            <div className="truncate opacity-70">
                {previousValue} {operation}
            </div>
        </div>

        {/* Main Display */}
        <div className="flex justify-end items-end h-16 overflow-hidden">
            <span className="font-orbitron text-4xl md:text-5xl lg:text-6xl text-neon drop-shadow-neon text-right break-all">
                {formatOperand(value) || "0"}
            </span>
        </div>
        
        {/* CRT/Scanline decorative effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20"></div>
    </div>
  );
};

export default Display;
