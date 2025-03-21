import { Slot } from 'expo-router';
import { SessionProvider } from '../context/SessionProvider';
import { ThemeProvider } from '../ThemeContext'; // ✅ 다크모드 감지 추가
import { StatusBar } from 'expo-status-bar';

const IS_DEVELOP_AUTH = process.env.EXPO_PUBLIC_IS_DEVELOP_AUTH;

export default function Root() {
  return IS_DEVELOP_AUTH === 'true' ? (
    <SessionProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  ) : (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
