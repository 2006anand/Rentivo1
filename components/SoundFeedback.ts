
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playUISound = (type: 'tap' | 'success' | 'pop') => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'tap') {
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.1);
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  } else if (type === 'success') {
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, now); // C5
    oscillator.frequency.exponentialRampToValueAtTime(659.25, now + 0.2); // E5
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  } else if (type === 'pop') {
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.15);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  }
};
