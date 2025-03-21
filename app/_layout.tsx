import { Slot } from 'expo-router';
import { SessionProvider } from '../context/SessionProvider';
import { ThemeProvider } from '../ThemeContext'; // ✅ 다크모드 감지 추가

export default function Root() {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
