// Web Audio Ambient Synthesizer for Active Theory clone
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) return;

    // Master gain with gentle fade in
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);

    // Warm Lowpass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    // Harmonic chords (F minor celestial chord: F2, C3, Ab3, Eb4)
    const freqs = [87.31, 130.81, 207.65, 311.13];

    this.oscillators = freqs.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Subtle detune for rich spatial warmth
      osc.detune.setValueAtTime((i - 1.5) * 6, this.ctx!.currentTime);

      osc.connect(this.filter!);
      osc.start();
      return osc;
    });

    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.isPlaying = true;
  }

  private stop() {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1300);
  }
}

export const audioEngine = new AudioEngine();
