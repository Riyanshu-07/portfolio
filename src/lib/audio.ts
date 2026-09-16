// Web Audio API Spatial & Synthesized Sound Engine
class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;

  constructor() {
    // Check if muted in localStorage
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('riyanshu_audio_muted');
      this.isMuted = savedMute === 'true';
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('riyanshu_audio_muted', muted ? 'true' : 'false');
    }
    if (muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!muted && this.ambientGain && this.ctx && this.isAmbientPlaying) {
      this.ambientGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.5);
    }
  }

  // Play a high-tech UI click sound
  public playClick(pan: number = 0) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      if (panner) {
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio error ignored safely
    }
  }

  // Play subtle hover blip
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // Spatial Physics Particle Bounce sound
  public playBounce(panX: number = 0, velocity: number = 1) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      const baseFreq = 140 + Math.min(velocity * 40, 360);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const vol = Math.min(0.15, 0.02 + velocity * 0.02);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);

      if (panner) {
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panX)), ctx.currentTime);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // Neural Laser / Impulse fire
  public playImpulse(pan: number = 0) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      if (panner) {
        panner.pan.setValueAtTime(pan, ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {}
  }

  // Neural synapse activation sweep
  public playNeuralPulse() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(640, ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(480, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  // AdaIN Style Transfer transformation chord
  public playStyleTransfer() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const freqs = [329.63, 440, 554.37, 659.25]; // E major 7th chord
    freqs.forEach((f, i) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.04);
        osc.frequency.exponentialRampToValueAtTime(f * 1.5, ctx.currentTime + 0.4 + i * 0.04);

        gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + 0.6);
      } catch (e) {}
    });
  }

  // System Boot Chime
  public playBoot() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const notes = [220, 277.18, 329.63, 440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + i * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.06, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      } catch (e) {}
    });
  }

  // Toggle ambient cyber drone
  public toggleAmbient() {
    const ctx = this.initCtx();
    if (!ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      }
      this.isAmbientPlaying = false;
      return false;
    } else {
      try {
        const gain = ctx.createGain();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 bass
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setTargetAtTime(this.isMuted ? 0 : 0.035, ctx.currentTime, 1.2);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        this.ambientGain = gain;
        this.ambientOsc = osc1;
        this.ambientOsc2 = osc2;
        this.isAmbientPlaying = true;
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundEngine = new SpatialAudioEngine();
