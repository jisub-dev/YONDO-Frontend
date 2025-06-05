import { Slot } from 'expo-router';
import { SessionProvider } from '../context/SessionProvider';
import { ThemeProvider } from '../ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useAxiosInterceptor } from '@/lib/axiosInterceptor';
import AxiosInterceptorWrapper from '@/lib/AxiosInterceptorWrapper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <AxiosInterceptorWrapper>
          <ThemeProvider>
            <Slot />
          </ThemeProvider>
        </AxiosInterceptorWrapper>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}