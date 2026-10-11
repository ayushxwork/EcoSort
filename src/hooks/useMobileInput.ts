import { useEffect, useState } from 'react';

/** True on touch/coarse-pointer devices (phones, tablets). */
export function useCoarsePointer(): boolean {
  const [coarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  return coarse;
}

/** True while the viewport is in portrait orientation (live). */
export function useIsPortrait(): boolean {
  const [portrait, setPortrait] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(orientation: portrait)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const onChange = () => setPortrait(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return portrait;
}
