import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useAuth } from '@/api/auth';
import { StatusBar } from 'expo-status-bar';
import { useStorageState } from '@/hooks/useStorageState';
import { useEffect } from 'react';
import { getStorageItem } from '@/hooks/useStorage';
import { useSession } from '@/context/SessionProvider';

export default function Tab() {
  const { logoutUser } = useAuth();
  const theme = useColorScheme();
  const { session, isLoading } = useSession();
  const [[isLoadingStorage, storageState], setStorageState] =
    useStorageState('session');

  useEffect(() => {
    if (!isLoading) {
      console.log('✅ 인덱스에서 컨텍스트 세션확인하기');
      console.log(session);
    }

    if (!isLoadingStorage) {
      console.log('✅ 인덱스에서 스토리지 세션확인하기');
      console.log(storageState);
    }
  }, [session]);

  return (
    <View
      style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
    >
      {/* <StatusBar style="light" /> */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={logoutUser}>Sign Out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
