import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

// ✅ 테마 컨텍스트 생성
const ThemeContext = createContext('light');

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme() || 'light'; // ✅ 다크모드 감지
  return (
    <ThemeContext.Provider value={colorScheme}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ 커스텀 훅으로 쉽게 테마 사용 가능
export function useTheme() {
  return useContext(ThemeContext);
}
