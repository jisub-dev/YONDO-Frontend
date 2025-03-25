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
import DateTimePicker from '@react-native-community/datetimepicker';
import InputBirth from './InputBirth';
import {
  BirthType,
  GenderType,
  IdentifierType,
  NameType,
  PasswordConfirmType,
  PasswordType,
} from '@/screen/RegisterScreen';

interface BasicInfoProps {
  theme: 'dark' | 'light' | null | undefined;
  identifier: IdentifierType;
  setIdentifier: (value: IdentifierType) => void;
  password: PasswordType;
  setPassword: (value: PasswordType) => void;
  passwordConfirm: PasswordConfirmType;
  setPasswordConfirm: (value: PasswordConfirmType) => void;
  name: NameType;
  setName: (value: NameType) => void;
  birth: BirthType;
  setBirth: React.Dispatch<React.SetStateAction<BirthType>>;
  gender: GenderType;
  setGender: (value: GenderType) => void;
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
  birth,
  setBirth,
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

      <InputBirth birth={birth} setBirth={setBirth} />

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
  birthContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  birthPickerContainer: {},
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
  lightLabelNoMarginBottom: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
  },
  darkLabelNoMarginBottom: {
    fontSize: 16,
    color: '#f5f5f5',
    alignSelf: 'flex-start',
  },
});
