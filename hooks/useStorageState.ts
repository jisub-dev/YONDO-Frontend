import { useEffect, useCallback, useState } from 'react';
import { getStorageItem, setStorageItem } from './useStorage';

type SessionType = {
  token: string | null;
  RT: string | null;
};

export function useStorageState(key: string) {
  const [state, setState] = useState<SessionType | null>(null);
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
    async (value: SessionType | null) => {
      console.log(`✅ setValue 호출, key: ${key}`);
      setState(value);
      console.log(`✅ context의 값 확인`);
      console.log(state);
      await setStorageItem(key, value);
    },
    [key]
  );

  return [[isLoading, state], setValue] as const;
}
