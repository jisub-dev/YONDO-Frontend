import { useEffect, useCallback, useState } from 'react';
import { getStorageItem, setStorageItem } from './useStorage';
import { userType } from '@/context/SessionProvider';

type SessionType = {
  token: string | null;
  RT: string | null;
  user: userType | null,
};

export function useStorageState(key: string) {
  const [state, setState] = useState<SessionType | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storedValue = await getStorageItem(key);
      const parsedValue = storedValue ? JSON.parse(storedValue) : null;
      setState(parsedValue); // ✅ 파싱된 객체로 상태 설정
      setLoading(false);
    }
    loadStorage();
  }, [key]);

  const setValue = useCallback(
    async (value: SessionType | null) => {
      console.log(`✅ setValue 호출, key: ${key}`);
      setState(value); // 이건 UI용 업데이트
  
      // 🔥 여기! value를 직접 사용하도록 수정
      console.log(`✅ 저장할 세션 값:`, value);
      await setStorageItem(key, value);
    },
    [key]
  );

  return [[isLoading, state], setValue] as const;
}
