import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neon-bg flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon-dark rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

      <Calculator />

      {/* Footer / Credits */}
      <div className="absolute bottom-4 text-gray-600 text-xs font-orbitron tracking-widest opacity-40">
        NEON CALC SERIES // 2024
      </div>
    </div>
  );
};

export default App;
