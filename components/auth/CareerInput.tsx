import { CareerType } from '@/screen/RegisterScreen';
import { useTheme } from '@/ThemeContext';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Text,
} from 'react-native';

interface CareerInputProps {
  career: CareerType;
  setCareer: (career: CareerType) => void;
}

export default function CareerInput({ career, setCareer }: CareerInputProps) {
  const theme = useColorScheme();

  return (
    <View style={styles.careerContainer}>
      <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
        경력
      </Text>
      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='경력을 입력해주세요'
        value={career}
        onChangeText={(text) => setCareer(text.toString())}
        keyboardType='number-pad'
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  careerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  darkLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#f5f5f5',
    alignSelf: 'flex-start',
  },
  lightLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
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
});
