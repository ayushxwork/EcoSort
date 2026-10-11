import { audio } from './audio';

/**
 * Global UI audio wiring.
 * - Unlocks the AudioContext on the first user gesture (browser autoplay policy).
 * - Plays a soft click on every interactive element (button, link, role=button).
 * One listener pair for the whole app, so no component needs its own wiring.
 */
export function installGlobalUiAudio(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const unlock = () => audio.unlock();
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const interactive = target.closest('button, [role="button"], a[href], select');
    if (!interactive) return;
    if (interactive instanceof HTMLButtonElement && interactive.disabled) return;

    audio.playClick();
  });
}
