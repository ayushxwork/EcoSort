// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  audio,
  readStoredBoolean,
  writeStoredBoolean,
} from '../src/services/audio';
import { CHORD_PROGRESSION, MELODY_PATTERNS } from '../src/services/music';
import { installGlobalUiAudio } from '../src/services/uiAudio';

const SOUND_KEY = 'ecosort_sound_enabled';
const SLOW_KEY = 'ecosort_slow_mode';
const VOLUME_KEY = 'ecosort_volume';

describe('stored boolean preferences', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the default when nothing is stored', () => {
    expect(readStoredBoolean('missing_key', true)).toBe(true);
    expect(readStoredBoolean('missing_key', false)).toBe(false);
  });

  it('round-trips a value through localStorage', () => {
    writeStoredBoolean('flag', false);
    expect(window.localStorage.getItem('flag')).toBe('false');
    expect(readStoredBoolean('flag', true)).toBe(false);

    writeStoredBoolean('flag', true);
    expect(readStoredBoolean('flag', false)).toBe(true);
  });
});

describe('audio service preferences', () => {
  beforeEach(() => {
    window.localStorage.clear();
    audio.setSoundEnabled(true);
    audio.setSlowMode(false);
    audio.setVolume(0.85);
    audio.stopMusic();
  });

  it('defaults to sound enabled with a sane volume', () => {
    expect(audio.isSoundEnabled()).toBe(true);
    expect(audio.getVolume()).toBeGreaterThan(0);
    expect(audio.getVolume()).toBeLessThanOrEqual(1);
  });

  it('persists mute state to localStorage', () => {
    audio.setSoundEnabled(false);
    expect(audio.isSoundEnabled()).toBe(false);
    expect(window.localStorage.getItem(SOUND_KEY)).toBe('false');

    audio.setSoundEnabled(true);
    expect(window.localStorage.getItem(SOUND_KEY)).toBe('true');
  });

  it('persists slow mode to localStorage', () => {
    audio.setSlowMode(true);
    expect(audio.isSlowMode()).toBe(true);
    expect(window.localStorage.getItem(SLOW_KEY)).toBe('true');
  });

  it('clamps volume to the 0..1 range and persists it', () => {
    audio.setVolume(5);
    expect(audio.getVolume()).toBe(1);
    expect(window.localStorage.getItem(VOLUME_KEY)).toBe('1');

    audio.setVolume(-2);
    expect(audio.getVolume()).toBe(0);
  });

  it('does not throw when sound effects play without an AudioContext (jsdom)', () => {
    expect(() => {
      audio.playClick();
      audio.playPickup();
      audio.playThrow();
      audio.playCorrect();
      audio.playIncorrect();
      audio.playTruckHorn();
      audio.playLensActivate();
      audio.playTimerWarning();
      audio.playTimerUrgent();
      audio.playTruckJingle();
      audio.playCelebration();
    }).not.toThrow();
  });

  it('does not throw when speech synthesis is missing', () => {
    expect(() => audio.speak('Sort the waste.')).not.toThrow();
  });

  it('starts and stops background music without an AudioContext (jsdom)', () => {
    expect(() => {
      audio.startMusic();
      audio.stopMusic();
    }).not.toThrow();
  });

  it('unlock is safe to call without an AudioContext', () => {
    expect(() => audio.unlock()).not.toThrow();
  });
});

describe('background music engine', () => {
  beforeEach(() => {
    window.localStorage.clear();
    audio.setSoundEnabled(true);
    audio.stopMusic();
  });

  afterEach(() => {
    audio.stopMusic();
  });

  it('uses a four-chord progression with three notes per chord', () => {
    expect(CHORD_PROGRESSION).toHaveLength(4);
    CHORD_PROGRESSION.forEach((chord) => {
      expect(chord).toHaveLength(3);
      chord.forEach((freq) => expect(freq).toBeGreaterThan(0));
    });
  });

  it('has one melody pattern per chord', () => {
    expect(MELODY_PATTERNS).toHaveLength(CHORD_PROGRESSION.length);
    MELODY_PATTERNS.forEach((pattern) => {
      expect(pattern.length).toBeGreaterThan(0);
      pattern.forEach((freq) => expect(freq).toBeGreaterThan(0));
    });
  });

  it('does not report music as on when the AudioContext is missing', () => {
    audio.startMusic();
    expect(audio.isMusicOn()).toBe(false);
    audio.stopMusic();
  });

  it('keeps music off while sound is disabled', () => {
    audio.setSoundEnabled(false);
    audio.startMusic();
    expect(audio.isSoundEnabled()).toBe(false);
    expect(audio.isMusicOn()).toBe(false);
  });
});

describe('installGlobalUiAudio', () => {
  let clickSpy: ReturnType<typeof vi.spyOn>;
  let unlockSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    window.localStorage.clear();
    audio.setSoundEnabled(true);
    clickSpy = vi.spyOn(audio, 'playClick').mockImplementation(() => {});
    unlockSpy = vi.spyOn(audio, 'unlock').mockImplementation(() => {});
    installGlobalUiAudio();
  });

  afterEach(() => {
    clickSpy.mockRestore();
    unlockSpy.mockRestore();
  });

  it('plays a click when a button is clicked', () => {
    const button = document.createElement('button');
    button.textContent = 'Start';
    document.body.appendChild(button);

    button.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);

    button.remove();
  });

  it('skips disabled buttons', () => {
    const button = document.createElement('button');
    button.disabled = true;
    document.body.appendChild(button);

    button.click();
    expect(clickSpy).not.toHaveBeenCalled();

    button.remove();
  });

  it('ignores clicks on non-interactive elements', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    div.click();
    expect(clickSpy).not.toHaveBeenCalled();

    div.remove();
  });

  it('unlocks the AudioContext on the first pointer gesture', () => {
    window.dispatchEvent(new Event('pointerdown'));
    expect(unlockSpy).toHaveBeenCalled();
  });
});
