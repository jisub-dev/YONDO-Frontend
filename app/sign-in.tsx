import React, { useCallback, useState, useRef } from 'react';
import LoginScreen from '@/screen/LoginScreen';
import RegisterScreen from '@/screen/RegisterScreen';
import { View, StyleSheet, Animated } from 'react-native';
import ForgotScreen from '@/screen/ForgotPasswordScreen';

type PageType = 'login' | 'register' | 'forgot';

export default function Authentication() {
  const [page, setPage] = useState<PageType>('login');
  const opacity = useRef(new Animated.Value(1)).current; // ✅ 기본값 1

  const togglePage = useCallback(
    (toPage: any) => {
      Animated.timing(opacity, {
        toValue: 0, // ✅ 서서히 사라짐
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setPage(toPage);
        Animated.timing(opacity, {
          toValue: 1, // ✅ 서서히 나타남
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    },
    [opacity]
  );

  return (
    <View style={styles.container}>
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageContainer: { width: '100%', height: '100%', position: 'absolute' }, // ✅ 페이지가 겹치도록
});
