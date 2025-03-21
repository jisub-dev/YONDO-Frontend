import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useAuth } from '@/api/auth';
import { StatusBar } from 'expo-status-bar';

export default function Tab() {
  const { logoutUser } = useAuth();
  const theme = useColorScheme();

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
