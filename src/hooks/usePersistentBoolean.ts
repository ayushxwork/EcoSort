import { useCallback, useState } from 'react';
import { readStoredBoolean, writeStoredBoolean } from '../services/audio';

export type SetStoredBoolean = (value: boolean | ((prev: boolean) => boolean)) => void;

/**
 * Boolean state that survives a page reload.
 * Reads from localStorage on first render and writes on every change.
 */
export function usePersistentBoolean(
  key: string,
  defaultValue: boolean
): [boolean, SetStoredBoolean] {
  const [value, setValue] = useState<boolean>(() => readStoredBoolean(key, defaultValue));

  const setStoredValue = useCallback<SetStoredBoolean>(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        writeStoredBoolean(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, setStoredValue];
}
