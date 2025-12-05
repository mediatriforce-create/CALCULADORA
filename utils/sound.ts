// Simple audio synthesizer for UI sounds
const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
};

export const playBeep = (freq: number = 600, type: OscillatorType = 'sine', duration: number = 0.1) => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Envelope for a "tech" feel
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const playClickSound = () => playBeep(800, 'square', 0.05);
export const playClearSound = () => playBeep(400, 'sawtooth', 0.15);
export const playEqualSound = () => playBeep(1200, 'sine', 0.2);
export const playMemorySound = () => playBeep(1000, 'triangle', 0.1);
