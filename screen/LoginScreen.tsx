/**
 * 로그인 스크린입니다 (작성자 : 김혁중)
 * 추가적인 제약사항은 다음과 같습니다. (추후 업데이트 할 예정)
 * 로그인시 입력하는 데이터는 아이디와 비밀번호입니다.
 * 아이디는 8자리 이상이어야 하며 비밀번호는 8자리 이상입니다.
 * @BasicInfo
 * @params { togglePage }
 * @returns { JSX.Element }
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/api/auth';
import { router } from 'expo-router';

interface LoginProps {
  togglePage: (toString: string) => void;
}

export default function LoginScreen({ togglePage }: LoginProps) {
  const [identifier, setEmail] = useState('qqqqqqqq');
  const [password, setPassword] = useState('qqqqqqqq');
  const { loginUser } = useAuth();
  const theme = useColorScheme();

  const handleLogin = async () => {
    if (!identifier.trim()) {
      Alert.alert('아이디 오류', '아이디를 입력해주세요');
      return;
    }
    if (!password.trim()) {
      Alert.alert('비밀번호 오류', '비밀번호를 입력해주세요');
      return;
    }
    // if (password.length < 8) {
    //   Alert.alert("비밀번호 오류", "비밀번호는 8자리 이상입니다");
    //   return;
    // }

    try {
      await loginUser(identifier.trim(), password);
      Alert.alert('로그인 성공', '환영합니다!');
      router.replace('/');
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다');
        setPassword('');
      } else {
        console.error(error);
        Alert.alert('Internal Error');
      }
    }
  };

  return (
    <ScrollView
      style={theme === 'dark' ? styles.darkScrollView : styles.lightScrollView}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <View
        style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
      >
        <Text style={theme === 'dark' ? styles.darkTitle : styles.lightTitle}>
          {/* 🎾 연두테니스 <- 애매함*/}
          연두테니스
        </Text>
        <Text
          style={theme === 'dark' ? styles.darkSubTitle : styles.lightSubTitle}
        >
          로그인
        </Text>

        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder='아이디를 입력해주세요'
          value={identifier}
          onChangeText={(text) => setEmail(text.slice(0, 40))}
          autoCapitalize='none'
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder='비밀번호'
          value={password}
          onChangeText={(text) => setPassword(text.slice(0, 40))}
          secureTextEntry
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        {/* 로그인 버튼 */}
        <TouchableOpacity
          style={theme === 'dark' ? styles.darkButton : styles.lightButton}
          onPress={handleLogin}
        >
          <Text
            style={
              theme === 'dark'
                ? styles.darkButtonText1
                : styles.lightButtonText1
            }
          >
            로그인
          </Text>
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          style={
            theme === 'dark'
              ? styles.darkButtonOutline
              : styles.lightButtonOutline
          }
          onPress={() => togglePage('register')}
        >
          <Text
            style={
              theme === 'dark'
                ? styles.darkButtonText2
                : styles.lightButtonText2
            }
          >
            회원가입하러 가기
          </Text>
        </TouchableOpacity>

        {/* 비밀번호 찾기 */}
        <TouchableOpacity onPress={() => togglePage('forgot')}>
          <Text
            style={
              theme === 'dark'
                ? styles.darkForgotPasswordText
                : styles.lightForgotPasswordText
            }
          >
            비밀번호를 까먹었어요?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ScrollView 스타일
  lightScrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkScrollView: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  // 컨테이너 스타일
  lightContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  darkContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    alignItems: 'center',
  },

  // 제목 스타일
  lightTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#228B22', // 연두색(테니스 테마)
  },
  darkTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#32CD32', // 라이트 그린(다크 테마용)
  },
  lightSubTitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
  },
  darkSubTitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#f5f5f5',
  },

  // 입력 필드 스타일
  lightInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  darkInput: {
    backgroundColor: '#2a2a2a',
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
  },

  // 버튼 스타일
  lightButton: {
    backgroundColor: '#228B22',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  darkButton: {
    backgroundColor: '#32CD32',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  lightButtonOutline: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  darkButtonOutline: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  lightButtonText1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  darkButtonText1: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '600',
  },
  lightButtonText2: {
    color: '#228B22',
    fontSize: 16,
    fontWeight: '600',
  },
  darkButtonText2: {
    color: '#32CD32',
    fontSize: 16,
    fontWeight: '600',
  },

  // 비밀번호 찾기 스타일
  lightForgotPasswordText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  darkForgotPasswordText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
