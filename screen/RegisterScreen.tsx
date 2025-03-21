/**
 * 회원가입 스크립입니다. (작성자 : 김혁중)
 * 추가적인 제약사항은 다음과 같습니다. (추후 업데이트 할 예정)
 * 사용자는 아이디, 비밀번호, 비밀번호 확인, 이름, 성별, 전화번호, 지점, 나이, NTRP, 환불계좌 은행, 환불계좌번호, 현금여수증 발급여부,
 * 트레이너 아이디를 입력해야 합니다.
 *
 * 아이디 제약사항 : 8자리 이상이어야 합니다.
 * 비밀번호 제약사항 : 8자리 이상이어야 합니다.
 * 이름 제약사항 : 이름은 5자 이하여야 합니다.
 * 성별 제약사항 : 남자와 여자 둘 중 하나여야 합니다.
 * 핸드폰 번호 제약사항 : 앞 부분은 010, 012, 103, 105중 하나의 값만 사용 가능합니다.
 * 지점 제약사항 : 지점은 신시가지점, 에코시티점, 혁신도시점 3개중 하나의 값이여야 합니다.
 * 나이 제약사항 : 나이는 1세 이상 80세 이하의 값만 사용 가능합니다.
 * NTRP : 0.1, 0.5, 0.7, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0이상 값들 중 하나만 사용가능합니다.
 * 환불계좌 은행 : KB국민은행, 우리은행, 신한은행, 하나은행, 광주은행, 경남은행, 대구은행, 부산은행, 전북은행,
 * 제주은행, 카카오뱅크, 케이뱅크, 토스뱅크, 농협은행, IBK기업은행 중 하나의 값이여야 합니다.
 * 환불계좌번호 : 숫자로 구성되어야 합니다.
 * 현금영수증 발급여부 : 예 아니오 둘 중 하나의 값만 사용가능합니다.
 * 트레이너 아이디 : 8자리 이상 트레이너 아이디여야합니다. 트레이너 디비로 접근하여 보여줍니다.
 *
 * 뒤로가기버튼으로 바꿀까요?
 *
 * @BasicInfo
 * @params { theme, identifier, setIdentifier, password, setPassword, passwordConfirm, setPasswordConfirm,
 * name, setName, age, setAge, gender, setGender }
 * @returns { JSX.Element }
 */

type BankType =
  | 'KB국민은행'
  | '우리은행'
  | '신한은행'
  | '하나은행'
  | '광주은행'
  | '경남은행'
  | '대구은행'
  | '부산은행'
  | '전북은행'
  | '제주은행'
  | '카카오뱅크'
  | '케이뱅크'
  | '토스뱅크'
  | '농협은행'
  | 'IBK기업은행';
type BranchType = '신시가지점' | '에코시티점' | '혁신도시점';
type PhonePrefixType = '010' | '012' | '013' | '015';
type NTRPType =
  | '0.1'
  | '0.5'
  | '0.7'
  | '1.0'
  | '1.5'
  | '2.0'
  | '2.5'
  | '3.0'
  | '3.5'
  | '4.0 이상';
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
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@/api/auth';
import { router } from 'expo-router';
import BasicInfo from '@/components/auth/BasicInfo';
import BankPicker from '@/components/auth/BankPicker';
import BankAndAccountInput from '@/components/auth/BankAndAccountInput';
import NTRPPicker from '@/components/auth/NTRPPicker';
import PhoneInput from '@/components/auth/PhoneInput';
import BranchPicker from '@/components/auth/BranchPicker';

interface RegisterProps {
  togglePage: (toPage: string) => void;
}

export default function RegisterScreen({ togglePage }: RegisterProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'남' | '여'>('남');
  const [phonePrefix, setPhonePrefix] = useState<PhonePrefixType>('010');
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [branch, setBranch] = useState<BranchType>('에코시티점');
  const [age, setAge] = useState('');
  const [ntrp, setNtrp] = useState<NTRPType>('0.1');
  const [refundAccount, setRefundAccount] = useState('');
  const [refundBank, setRefundBank] = useState<BankType>('전북은행');
  const [receiptInfo, setReceiptInfo] = useState<'발급' | '미발급'>('발급');
  const [trainerId, setTrainerId] = useState('');
  const { registerUser } = useAuth();
  const theme = useColorScheme();

  const validateKoreanName = (text: string) => /^[가-힣]{1,5}$/.test(text);

  const handleRegister = async () => {
    if (!identifier.trim())
      return Alert.alert('아이디 오류', '아이디를 입력해주세요.');
    if (identifier.trim().length < 8)
      return Alert.alert('아이디 오류', '아이디는 8자 이상으로 입력해주세요.');
    if (identifier.trim().length > 40)
      return Alert.alert('아이디 오류', '아이디는 40자 미만으로 입력해주세요');
    if (!password.trim())
      return Alert.alert('비밀번호 오류', '비밀번호를 입력해주세요.');
    if (password !== passwordConfirm)
      return Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
    if (password.length < 8)
      return Alert.alert(
        '비밀번호 오류',
        '비밀번호는 8자리 이상이어야 합니다.'
      );
    if (password.length > 40)
      return Alert.alert(
        '비밀번호 오류',
        '비밀번호는 40자 미만으로 입력해주세요.'
      );
    if (!validateKoreanName(name))
      return Alert.alert('이름 오류', '이름은 한글 5자 이하로 입력해주세요.');
    if (phonePart1.length !== 4 || phonePart2.length !== 4)
      return Alert.alert('전화번호 오류', '전화번호를 정확히 입력해주세요.');
    if (!refundAccount.match(/^\d+$/))
      return Alert.alert(
        '계좌번호 오류',
        '환불 계좌번호는 숫자만 입력해주세요.'
      );

    try {
      Alert.alert('회원가입 성공!', '환영합니다!');
      router.replace('/');
    } catch (error: any) {
      if (error.response?.status === 409) {
        Alert.alert('회원가입 실패', '이미 존재하는 아이디입니다.');
      } else {
        console.error(error);
        Alert.alert('회원가입 실패', 'Internal Error');
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
          연두테니스
        </Text>
        <Text
          style={theme === 'dark' ? styles.darkSubTitle : styles.lightSubTitle}
        >
          회원가입
        </Text>
        <BasicInfo
          theme={theme}
          identifier={identifier}
          setIdentifier={setIdentifier}
          password={password}
          setPassword={setPassword}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
        />

        <NTRPPicker ntrp={ntrp} setNtrp={setNtrp} />
        <PhoneInput
          phonePrefix={phonePrefix}
          setPhonePrefix={setPhonePrefix}
          phonePart1={phonePart1}
          setPhonePart1={setPhonePart1}
          phonePart2={phonePart2}
          setPhonePart2={setPhonePart2}
        />
        <BranchPicker branch={branch} setBranch={setBranch} />

        <BankAndAccountInput
          refundAccount={refundAccount}
          refundBank={refundBank}
          setRefundBank={setRefundBank}
          setRefundAccount={setRefundAccount}
        />

        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder='트레이너 아이디'
          value={trainerId}
          onChangeText={(text) => setTrainerId(text.replace(/[A-z]/g, ''))}
          autoCapitalize='none'
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        <TouchableOpacity
          onPress={() => {}}
          style={theme === 'dark' ? styles.darkButton : styles.lightButton}
        >
          <Text
            style={
              theme === 'dark'
                ? styles.darkButtonText1
                : styles.lightButtonText1
            }
          >
            회원가입
          </Text>
        </TouchableOpacity>
        {/* 로그인으로 이동 버튼 */}
        <TouchableOpacity
          onPress={() => togglePage('login')}
          style={
            theme === 'dark'
              ? styles.darkButtonOutline
              : styles.lightButtonOutline
          }
        >
          <Text
            style={
              theme === 'dark'
                ? styles.darkButtonText2
                : styles.lightButtonText2
            }
          >
            로그인하러 가기
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
    paddingVertical: 20,
    paddingBottom: 40,
  },

  // 컨테이너 스타일
  lightContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  darkContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    alignItems: 'center',
  },

  // 제목 스타일
  lightTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#228B22',
  },
  darkTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#32CD32',
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
  },
  darkButton: {
    backgroundColor: '#32CD32',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    marginTop: 15,
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
    marginTop: 15,
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
});