import React, { useCallback, useState, useRef } from 'react';
import LoginScreen from '@/screen/LoginScreen';
import RegisterScreen from '@/screen/RegisterScreen';
import { View, StyleSheet, Animated, useColorScheme } from 'react-native';
import ForgotScreen from '@/screen/ForgotPasswordScreen';
import { StatusBar } from 'expo-status-bar';

type PageType = 'login' | 'register' | 'forgot';

export default function Authentication() {
  const [page, setPage] = useState<PageType>('login');
  const opacity = useRef(new Animated.Value(1)).current; // ✅ 기본값 1
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const togglePage = useCallback(
    (toPage: any) => {
      Animated.timing(opacity, {
        toValue: 0, // ✅ 서서히 사라짐
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setPage(toPage);
        Animated.timing(opacity, {
          toValue: 1, // ✅ 서서히 나타남
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    },
    [opacity]
  );

  return (
    <View
      style={[
        styles.container,
        // Apply background color based on theme
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      {/* <StatusBar style="light" /> */}
      <Animated.View style={[styles.pageContainer, { opacity }]}>
        {page === 'login' ? (
          <LoginScreen togglePage={togglePage} />
        ) : page === 'register' ? (
          <RegisterScreen togglePage={togglePage} />
        ) : (
          <ForgotScreen togglePage={togglePage} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  pageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
