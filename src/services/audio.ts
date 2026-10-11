/**
 * Audio Service
 * Provides speech synthesis (Eco mascot voice) and procedural Web Audio sound effects.
 * Sound preferences persist to localStorage so mute state survives page reloads.
 */

const SOUND_ENABLED_KEY = 'ecosort_sound_enabled';
const SLOW_MODE_KEY = 'ecosort_slow_mode';
const VOLUME_KEY = 'ecosort_volume';

export function readStoredBoolean(key: string, defaultValue: boolean): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return raw === 'true';
  } catch {
    return defaultValue;
  }
}

export function writeStoredBoolean(key: string, value: boolean): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Storage blocked (private mode). Ignore.
  }
}

function readStoredNumber(key: string, defaultValue: number): number {
  if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  } catch {
    return defaultValue;
  }
}

function writeStoredNumber(key: string, value: number): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Storage blocked (private mode). Ignore.
  }
}

class AudioService {
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private slowMode: boolean = false;
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private volume: number = 0.85;
  private lastPlayedAt: Record<string, number> = {};

  constructor() {
    this.soundEnabled = readStoredBoolean(SOUND_ENABLED_KEY, true);
    this.voiceEnabled = this.soundEnabled;
    this.slowMode = readStoredBoolean(SLOW_MODE_KEY, false);
    const storedVolume = readStoredNumber(VOLUME_KEY, this.volume);
    this.volume = Math.min(1, Math.max(0, storedVolume));
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = this.volume;
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }
  }

  /**
   * Unlock the AudioContext from a user gesture. Browsers start the context
   * in a suspended state and reject sound until a gesture happens.
   */
  public unlock() {
    this.initContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume();
    }
  }

  /** Destination node for every oscillator. Falls back to speakers. */
  private getOutput(): AudioNode | null {
    this.initContext();
    if (!this.audioCtx) return null;
    return this.masterGain ?? this.audioCtx.destination;
  }

  /**
   * Rate limit so rapid repeats never stack into noise.
   */
  private canPlay(id: string, cooldownMs: number): boolean {
    if (!this.soundEnabled) return false;
    const now = Date.now();
    const last = this.lastPlayedAt[id];
    if (last !== undefined && now - last < cooldownMs) return false;
    this.lastPlayedAt[id] = now;
    return true;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    this.voiceEnabled = enabled;
    writeStoredBoolean(SOUND_ENABLED_KEY, enabled);
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public setSlowMode(enabled: boolean) {
    this.slowMode = enabled;
    writeStoredBoolean(SLOW_MODE_KEY, enabled);
  }

  public isSlowMode(): boolean {
    return this.slowMode;
  }

  /** Master volume 0..1 applied to every sound effect. */
  public setVolume(volume: number) {
    const clamped = Math.min(1, Math.max(0, volume));
    this.volume = clamped;
    if (this.masterGain) {
      this.masterGain.gain.value = clamped;
    }
    writeStoredNumber(VOLUME_KEY, clamped);
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Mascot Speech: speaks short sentences with clear child-friendly cadence.
   */
  public speak(text: string) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop prior speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.slowMode ? 0.75 : 0.95;
    utterance.pitch = 1.15; // Friendly mascot pitch

    // Choose child-friendly or english voice if available
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (friendlyVoice) {
      utterance.voice = friendlyVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Sound effect: UI button click (soft filtered noise tick).
   */
  public playClick() {
    if (!this.canPlay('click', 45)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    if (!this.noiseBuffer) {
      const frameCount = Math.floor(this.audioCtx.sampleRate * 0.03);
      const buffer = this.audioCtx.createBuffer(1, frameCount, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
      }
      this.noiseBuffer = buffer;
    }

    const source = this.audioCtx.createBufferSource();
    source.buffer = this.noiseBuffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2400;
    filter.Q.value = 1.2;

    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(output);

    source.start(now);
    source.stop(now + 0.05);
  }

  /**
   * Sound effect: Pick up item (gentle pop)
   */
  public playPickup() {
    if (!this.canPlay('pickup', 100)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    const now = this.audioCtx.currentTime;

    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(output);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Sound effect: Throw whoosh
   */
  public playThrow() {
    if (!this.canPlay('throw', 120)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    const now = this.audioCtx.currentTime;

    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(output);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Sound effect: Correct sort (bright rising arpeggio with a sparkle note)
   */
  public playCorrect() {
    if (!this.canPlay('correct', 150)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();
      osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
      const start = now + idx * 0.06;

      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(idx === notes.length - 1 ? 0.14 : 0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

      osc.connect(gain);
      gain.connect(output);

      osc.start(start);
      osc.stop(start + 0.28);
    });
  }

  /**
   * Sound effect: Wrong bin (soft two-tone thud, gentle and non-punishing)
   */
  public playIncorrect() {
    if (!this.canPlay('incorrect', 180)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(196, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(output);
    osc.start(now);
    osc.stop(now + 0.2);

    const body = this.audioCtx.createOscillator();
    const bodyGain = this.audioCtx.createGain();
    body.type = 'triangle';
    body.frequency.setValueAtTime(98, now);
    bodyGain.gain.setValueAtTime(0.06, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    body.connect(bodyGain);
    bodyGain.connect(output);
    body.start(now);
    body.stop(now + 0.16);
  }

  /**
   * Sound effect: Garbage truck horn (low freq) at 10s warning.
   */
  public playTruckHorn() {
    if (!this.canPlay('truckHorn', 500)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    const now = this.audioCtx.currentTime;

    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.4);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(output);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * Sound effect: Eco Lens scan activation (sci-fi sweep).
   */
  public playLensActivate() {
    if (!this.canPlay('lens', 250)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    const now = this.audioCtx.currentTime;

    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(output);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * Sound effect: Timer warning ticking (gentle tick-tock at 30s).
   */
  public playTimerWarning() {
    if (!this.canPlay('timerWarning', 400)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    const now = this.audioCtx.currentTime;

    osc.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(output);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Sound effect: Timer urgent (faster tick at 10s).
   */
  public playTimerUrgent() {
    if (!this.canPlay('timerUrgent', 300)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    const now = this.audioCtx.currentTime;

    osc.frequency.setValueAtTime(600, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(output);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Sound effect: Cheerful garbage truck arrival jingle.
   */
  public playTruckJingle() {
    if (!this.canPlay('truckJingle', 400)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const melody = [523.25, 659.25, 523.25, 783.99, 659.25];
    const now = this.audioCtx.currentTime;

    melody.forEach((freq, idx) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();
      osc.type = 'triangle';
      const start = now + idx * 0.12;

      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

      osc.connect(gain);
      gain.connect(output);
      osc.start(start);
      osc.stop(start + 0.18);
    });
  }

  /**
   * Sound effect: Level complete celebration
   */
  public playCelebration() {
    if (!this.canPlay('celebration', 600)) return;
    const output = this.getOutput();
    if (!this.audioCtx || !output) return;

    const notes = [440, 554.37, 659.25, 880];
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();
      osc.type = 'triangle';
      const start = now + idx * 0.1;

      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

      osc.connect(gain);
      gain.connect(output);
      osc.start(start);
      osc.stop(start + 0.4);
    });
  }
}

export const audio = new AudioService();
