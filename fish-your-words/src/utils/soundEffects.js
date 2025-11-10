// Sound effects using Web Audio API
// Simple synthesized sounds for bubble pops and effects

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.initAudioContext();
  }
  
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
      this.enabled = false;
    }
  }
  
  // Bubble pop sound for correct letter
  playCorrect() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Bubble pop: quick frequency sweep
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }
  
  // Wrong answer sound
  playWrong() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Low buzz sound
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }
  
  // Celebration sound for completing word
  playCelebration() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    // Play a sequence of ascending notes
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    notes.forEach((freq, index) => {
      const startTime = now + (index * 0.1);
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }
  
  // Splash sound when catching fish
  playSplash() {
    if (!this.enabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const noise = this.audioContext.createBufferSource();
    const noiseBuffer = this.audioContext.createBuffer(1, 4410, 44100); // 0.1s of noise
    const output = noiseBuffer.getChannelData(0);
    
    // Generate white noise
    for (let i = 0; i < 4410; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    noise.buffer = noiseBuffer;
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    noise.start(now);
    noise.stop(now + 0.15);
  }
  
  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  
  // Check if sound is enabled
  isEnabled() {
    return this.enabled;
  }
}

// Create singleton instance
const soundEffects = new SoundEffects();

export default soundEffects;

// Named exports for convenience
export const playCorrect = () => soundEffects.playCorrect();
export const playWrong = () => soundEffects.playWrong();
export const playCelebration = () => soundEffects.playCelebration();
export const playSplash = () => soundEffects.playSplash();
export const toggleSound = () => soundEffects.toggle();
export const isSoundEnabled = () => soundEffects.isEnabled();
