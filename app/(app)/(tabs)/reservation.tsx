import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/api/auth';
import { useStorageState } from '@/hooks/useStorageState';
import { useSession } from '@/context/SessionProvider';
import { useEffect } from 'react';

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


  const handleLogout = async () => {
    await logoutUser(session?.user?.identifier);
  }
  
  return (
    <View
      style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
    >
      {/* <StatusBar style="light" /> */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={handleLogout} style={{
          color: theme === 'dark' ? '#f5f5f5' : '#121212',
        }}>Sign Out</Text>
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
    color: '#f5f5f5',
  },
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    color: '#121212',
  },
});
