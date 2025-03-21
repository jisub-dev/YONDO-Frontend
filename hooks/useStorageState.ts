import { useEffect, useCallback, useState } from 'react';
import { getStorageItem, setStorageItem } from './useStorage';

export function useStorageState(key: string) {
  const [state, setState] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storedValue = await getStorageItem(key);
      setState(storedValue);
      setLoading(false);
    }
    loadStorage();
  }, [key]);

  const setValue = useCallback(
    async (value: string | null) => {
      setState(value);
      await setStorageItem(key, value);
    },
    [key]
  );

  return [[isLoading, state], setValue] as const;
}
