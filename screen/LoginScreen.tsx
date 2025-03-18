import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
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
    <View
      style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
    >
      <Text style={theme === 'dark' ? styles.darkTitle : styles.lightTitle}>
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

      {/* ✅ 다크모드 버튼 스타일 적용 */}
      <TouchableOpacity
        style={theme === 'dark' ? styles.darkButton : styles.lightButton}
        onPress={handleLogin}
      >
        <Text
          style={
            theme === 'dark' ? styles.darkButtonText1 : styles.lightButtonText1
          }
        >
          로그인
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          theme === 'dark'
            ? styles.darkButtonOutline
            : styles.lightButtonOutline
        }
        onPress={() => {
          togglePage('register');
        }}
      >
        <Text
          style={
            theme === 'dark' ? styles.darkButtonText2 : styles.lightButtonText2
          }
        >
          회원가입하러 가기
        </Text>
      </TouchableOpacity>

      <Text
        style={
          theme === 'dark'
            ? styles.darkForgotPasswordText
            : styles.lightForgotPasswordText
        }
        onPress={() => {
          togglePage('forgot');
        }}
      >
        비밀번호를 까먹었어여?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  lightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  darkTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  lightSubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 15,
  },
  darkSubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 15,
  },
  lightInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  darkInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#eee',
  },
  lightButton: {
    backgroundColor: '#647486',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  darkButton: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  lightButtonOutline: {
    borderColor: '#262d34',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  darkButtonOutline: {
    borderColor: '#bbb',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  darkButtonText1: {
    color: '#2e1111',
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkButtonText2: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText1: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButtonText2: {
    color: '#313143',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightForgotPasswordText: {
    // borderColor: "#000",
    // borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    color: '#313143',
    fontSize: 10,
    fontWeight: 'semibold',
  },
  darkForgotPasswordText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'semibold',
  },
});
