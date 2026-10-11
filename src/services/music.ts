/**
 * Background music engine.
 * Procedural, asset-free four-chord loop (C - G - Am - F).
 * Scheduled against AudioContext time so it stays in sync and never drifts.
 */

export const CHORD_PROGRESSION: readonly number[][] = [
  [261.63, 329.63, 392.0], // C major
  [196.0, 246.94, 293.66], // G major
  [220.0, 261.63, 329.63], // A minor
  [174.61, 220.0, 261.63], // F major
];

export const MELODY_PATTERNS: readonly number[][] = [
  [392.0, 523.25, 659.25, 523.25], // G4 C5 E5 C5
  [293.66, 392.0, 493.88, 392.0], // D4 G4 B4 G4
  [329.63, 440.0, 523.25, 440.0], // E4 A4 C5 A4
  [261.63, 349.23, 440.0, 349.23], // C4 F4 A4 F4
];

export const BAR_DURATION_SECONDS = 2;

let isPlaying = false;
let schedulerTimer: ReturnType<typeof setInterval> | null = null;
let nextBarTime = 0;
let barIndex = 0;

function scheduleBar(ctx: AudioContext, output: GainNode, startTime: number, bar: number): void {
  const chord = CHORD_PROGRESSION[bar % CHORD_PROGRESSION.length];
  const melody = MELODY_PATTERNS[bar % MELODY_PATTERNS.length];

  chord.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.4);
    gain.gain.setValueAtTime(0.045, startTime + BAR_DURATION_SECONDS - 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + BAR_DURATION_SECONDS + 0.4);
    osc.connect(gain);
    gain.connect(output);
    osc.start(startTime);
    osc.stop(startTime + BAR_DURATION_SECONDS + 0.5);
  });

  melody.forEach((freq, idx) => {
    const noteStart = startTime + idx * (BAR_DURATION_SECONDS / melody.length);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, noteStart);
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.04, noteStart + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.55);
    osc.connect(gain);
    gain.connect(output);
    osc.start(noteStart);
    osc.stop(noteStart + 0.6);
  });
}

function runScheduler(ctx: AudioContext, output: GainNode): void {
  while (nextBarTime < ctx.currentTime + 0.8) {
    scheduleBar(ctx, output, nextBarTime, barIndex);
    nextBarTime += BAR_DURATION_SECONDS;
    barIndex += 1;
  }
}

export function startMusicLoop(ctx: AudioContext, output: GainNode): boolean {
  if (isPlaying) return false;
  if (typeof window === 'undefined') return false;

  isPlaying = true;
  barIndex = 0;
  nextBarTime = ctx.currentTime + 0.15;
  runScheduler(ctx, output);

  schedulerTimer = setInterval(() => {
    runScheduler(ctx, output);
  }, 250);

  return true;
}

export function stopMusicLoop(): void {
  if (schedulerTimer !== null) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
  }
  isPlaying = false;
}

export function isMusicPlaying(): boolean {
  return isPlaying;
}
