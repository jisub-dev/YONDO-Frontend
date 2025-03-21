import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Tab() {
  const theme = useColorScheme();

  return (
    <View
      style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
    >
      {/* <StatusBar style="light" /> */}
      <Text>personal training</Text>
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
