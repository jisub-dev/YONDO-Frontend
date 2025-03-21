/**
 * 회원가입 중 Picker를 사용하지 않는 입력에 대한 컴포넌트입니당. (작성자 : 김혁중)
 * 추가적인 제약사항은 다음과 같습니다. (추후 업데이트 할 예정)
 *
 * @BasicInfo
 * @params { theme, identifier, setIdentifier, password, setPassword, passwordConfirm, setPasswordConfirm,
 * name, setName, age, setAge, gender, setGender }
 * @returns { JSX.Element }
 */

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface BasicInfoProps {
  theme: 'dark' | 'light' | null | undefined;
  identifier: string;
  setIdentifier: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  gender: '남' | '여';
  setGender: (value: '남' | '여') => void;
}

export default function BasicInfo({
  theme,
  identifier,
  setIdentifier,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  name,
  setName,
  age,
  setAge,
  gender,
  setGender,
}: BasicInfoProps) {
  return (
    <>
      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='아이디를 입력해주세요'
        value={identifier}
        onChangeText={(text) => setIdentifier(text.slice(0, 40))}
        autoCapitalize='none'
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />

      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='비밀번호 (8자리 이상)'
        value={password}
        onChangeText={(text) => setPassword(text.slice(0, 40))}
        secureTextEntry
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />

      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='비밀번호 확인'
        value={passwordConfirm}
        onChangeText={(text) => setPasswordConfirm(text.slice(0, 40))}
        secureTextEntry
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />

      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='이름 (한글 5자 이내)'
        value={name}
        onChangeText={setName}
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />

      <TextInput
        style={theme === 'dark' ? styles.darkInput : styles.lightInput}
        placeholder='나이'
        keyboardType='numeric'
        value={age}
        onChangeText={setAge}
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
      />

      <View style={styles.genderContainer}>
        <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
          성별
        </Text>
        <View style={styles.genderButtonsContainer}>
          <TouchableOpacity
            onPress={() => setGender('남')}
            style={[
              theme === 'dark'
                ? styles.darkGenderButton
                : styles.lightGenderButton,
              gender === '남'
                ? theme === 'dark'
                  ? styles.darkSelectedButton
                  : styles.lightSelectedButton
                : {},
            ]}
          >
            <Text
              style={
                gender === '남'
                  ? styles.selectedButtonText
                  : theme === 'dark'
                    ? styles.darkButtonText2
                    : styles.lightButtonText2
              }
            >
              남성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGender('여')}
            style={[
              theme === 'dark'
                ? styles.darkGenderButton
                : styles.lightGenderButton,
              gender === '여'
                ? theme === 'dark'
                  ? styles.darkSelectedButton
                  : styles.lightSelectedButton
                : {},
            ]}
          >
            <Text
              style={
                gender === '여'
                  ? styles.selectedButtonText
                  : theme === 'dark'
                    ? styles.darkButtonText2
                    : styles.lightButtonText2
              }
            >
              여성
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  genderContainer: {
    width: '100%',
    marginBottom: 15,
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lightGenderButton: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  darkGenderButton: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginHorizontal: 5,
    backgroundColor: '#2a2a2a',
  },
  lightSelectedButton: {
    backgroundColor: '#228B22',
    borderColor: '#228B22',
  },
  darkSelectedButton: {
    backgroundColor: '#32CD32',
    borderColor: '#32CD32',
  },
  selectedButtonText: {
    color: '#fff',
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
  lightLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
  },
  darkLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#f5f5f5',
    alignSelf: 'flex-start',
  },
});
