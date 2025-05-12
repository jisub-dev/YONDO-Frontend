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

export type IdentifierType = string;
export type PasswordType = string;
export type PasswordConfirmType = string;
export type NameType = string;
export type PhonePrefixType = '010' | '012' | '013' | '015';
export type GenderType = '남' | '여';
export type PhoneType = string;
export type PhonePart1Type = string;
export type PhonePart2Type = string;
export type BranchType = '신시가지점' | '에코시티점' | '혁신도시점';
export type BirthType = Date;
export type NTRPType =
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
export type CareerType = string;
export type RefundBankType =
 | "한국은행"
 | "농협은행"
 | "수협은행"
 | "산업은행"
 | "기업은행"
 | "KEB하나은행"
 | "KB국민은행"
 | "신한은행"
 | "우리은행"
 | "SC제일은행"
 | "DGB대구은행"
 | "BNK부산은행"
 | "BNK경남은행"
 | "전북은행"
 | "제주은행"
 | "카카오뱅크"
 | "케이뱅크"
 | "토스뱅크"
 | "우체국예금보험"
 | "한국씨티은행"
export type RefundAccountType = string;
export type ReceiptInfoType = '발급' | '미발급';
export type ReceiptTypeType = '개인' | '법인';
export type ReceiptNumberType = string;
export type TrainerIdType = string;
export type RoleType = 'MEMBER' | 'TRAINER' | 'MANAGER';
export const refundBankList = [
  "한국은행",
  "농협은행",
  "수협은행",
  "산업은행",
  "기업은행",
  "KEB하나은행",
  "KB국민은행",
  "신한은행",
  "우리은행",
  "SC제일은행",
  "DGB대구은행",
  "BNK부산은행",
  "BNK경남은행",
  "전북은행",
  "제주은행",
  "카카오뱅크",
  "케이뱅크",
  "토스뱅크",
  "우체국예금보험",
  "한국씨티은행"
]

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
import ModalSelect from '@/components/common/ModalSelect';
import CashReceiptOption from '@/components/auth/CashReceiptOption';
import CareerInput from '@/components/auth/CareerInput';
import axios from 'axios';

interface RegisterProps {
  togglePage: (toPage: string) => void;
}

export default function RegisterScreen({ togglePage }: RegisterProps) {
  const [identifier, setIdentifier] = useState<IdentifierType>('');
  const [password, setPassword] = useState<PasswordType>('');
  const [passwordConfirm, setPasswordConfirm] =
    useState<PasswordConfirmType>('');
  const [name, setName] = useState<NameType>('');
  const [gender, setGender] = useState<GenderType>('남');
  const [phonePrefix, setPhonePrefix] = useState<PhonePrefixType>('010');
  const [phonePart1, setPhonePart1] = useState<PhonePart1Type>('');
  const [phonePart2, setPhonePart2] = useState<PhonePart2Type>('');
  const [branch, setBranch] = useState<BranchType>('에코시티점');

  const [birth, setBirth] = useState<BirthType>(new Date());

  const [ntrp, setNtrp] = useState<NTRPType>('0.1');
  const [career, setCareer] = useState<CareerType>('');
  const [refundAccount, setRefundAccount] = useState<RefundAccountType>('');
  const [refundBank, setRefundBank] = useState<RefundBankType>('전북은행');
  const [receiptInfo, setReceiptInfo] = useState<ReceiptInfoType>('미발급');
  const [receiptType, setReceiptType] = useState<ReceiptTypeType>('개인');
  const [receiptNumber, setReceiptNumber] = useState<ReceiptNumberType>('');
  const [trainerId, setTrainerId] = useState<TrainerIdType>('');
  const { registerUser } = useAuth();
  const theme = useColorScheme();

  const validateKoreanName = (text: string) => /^[가-힣]{1,5}$/.test(text);

  const handleRegister = async () => {
    // ✅ 필수 필드 공백 검사
    if (!identifier.trim()) return Alert.alert('아이디 오류', '아이디를 입력해주세요.');
    if (!password.trim()) return Alert.alert('비밀번호 오류', '비밀번호를 입력해주세요.');
    if (!passwordConfirm.trim()) return Alert.alert('비밀번호 확인 오류', '비밀번호 확인을 입력해주세요.');
    if (!name.trim()) return Alert.alert('이름 오류', '이름을 입력해주세요.');
    if (!phonePrefix.trim() || !phonePart1.trim() || !phonePart2.trim()) return Alert.alert('전화번호 오류', '전화번호를 입력해주세요.');
    if (!branch.trim()) return Alert.alert('지점 오류', '지점을 선택해주세요.');
    if (!birth) return Alert.alert('생년월일 오류', '생년월일을 입력해주세요.');
    if (!career) return Alert.alert('경력 오류', '경력을 입력해주세요.');
    if (!ntrp.trim()) return Alert.alert('NTRP 오류', 'NTRP를 선택해주세요.');
    if (!refundAccount.trim()) return Alert.alert('계좌번호 오류', '환불 계좌번호를 입력해주세요.');
    if (!refundBank.trim()) return Alert.alert('환불 은행 오류', '환불 은행을 선택해주세요.');
    if (!receiptInfo.trim()) return Alert.alert('현금영수증 오류', '현금영수증 발급 여부를 선택해주세요.');
    if (!receiptType.trim()) return Alert.alert('영수증 유형 오류', '현금영수증 유형을 선택해주세요.');
    if (!receiptNumber.trim()) return Alert.alert('영수증 번호 오류', '현금영수증 번호를 입력해주세요.');
  
    // ✅ 조건별 유효성 검사
    if (identifier.length < 8) return Alert.alert('아이디 오류', '아이디는 8자 이상이어야 합니다.');
    if (identifier.length > 40) return Alert.alert('아이디 오류', '아이디는 40자 이하여야 합니다.');
  
    if (password.length < 8) return Alert.alert('비밀번호 오류', '비밀번호는 8자 이상이어야 합니다.');
    if (password.length > 40) return Alert.alert('비밀번호 오류', '비밀번호는 40자 이하여야 합니다.');
    if (password !== passwordConfirm) return Alert.alert('비밀번호 오류', '비밀번호와 확인값이 일치하지 않습니다.');
  
    if (!validateKoreanName(name)) return Alert.alert('이름 오류', '이름은 한글 1~5자 이내여야 합니다.');
  
    if (!['남', '여'].includes(gender)) return Alert.alert('성별 오류', '성별은 남 또는 여 중 하나여야 합니다.');
  
    const validPrefixes = ['010', '012', '013', '015'];
    if (!validPrefixes.includes(phonePrefix)) return Alert.alert('전화번호 오류', '전화번호 앞자리는 010, 012, 013, 015 중 하나여야 합니다.');
    if (phonePart1.length !== 4 || phonePart2.length !== 4) return Alert.alert('전화번호 오류', '전화번호 뒷자리는 4자리씩 입력해주세요.');
  
    const validBranches = ['신시가지점', '에코시티점', '혁신도시점'];
    if (!validBranches.includes(branch)) return Alert.alert('지점 오류', '지점은 신시가지점, 에코시티점, 혁신도시점 중 하나여야 합니다.');
  
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    if (age < 1 || age > 80) return Alert.alert('나이 오류', '나이는 1세 이상 80세 이하여야 합니다.');
  
    const validNTRP = ['0.1', '0.5', '0.7', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0 이상'];
    if (!validNTRP.includes(ntrp)) return Alert.alert('NTRP 오류', '올바른 NTRP 값을 선택해주세요.');
  
    if (!refundAccount.match(/^\d+$/)) return Alert.alert('계좌번호 오류', '환불 계좌번호는 숫자만 입력해주세요.');
  
    if (!refundBankList.includes(refundBank)) return Alert.alert('은행 오류', '유효하지 않은 은행입니다.');
  
    if (!['발급', '미발급'].includes(receiptInfo)) return Alert.alert('현금영수증 오류', '발급 여부는 "발급" 또는 "미발급"이어야 합니다.');
  
    if (!['개인', '법인'].includes(receiptType)) return Alert.alert('현금영수증 유형 오류', '현금영수증 유형은 개인 또는 법인이어야 합니다.');
  
    if (trainerId.length > 0 && trainerId.length < 8) return Alert.alert('트레이너 아이디 오류', '트레이너 아이디는 8자 이상이어야 합니다.');
  
    try {
      await registerUser({
        identifier,
        password,
        name,
        gender,
        phonePrefix,
        phonePart1,
        phonePart2,
        branch,
        birth,
        ntrp,
        career,
        refundAccount,
        refundBank,
        receiptInfo,
        receiptType,
        receiptNumber,
        trainerId,
      });
      Alert.alert('회원가입 성공!', '로그인이 필요합니다.');
      router.replace('/sign-in');
    } catch (error: any) {
      if (error.response?.status === 409) {
        if (error.response?.data?.message === "phonenumber is already in use") {
          return Alert.alert('전화번호 오류', '이미 존재하는 전화번호입니다');
        } else if (error.response?.data?.message === "Identifier is already in use") {
          return Alert.alert('아이디 오류', '이미 존재하는 아이디입니다.');
        } else {
          console.log(error);
          return Alert.alert("에러 핸들링 실패", "개발자는 에러를 확인할 것");
        }
      } else {
        console.log(error.response?.data?.message ?? error);
        return Alert.alert('회원가입 실패', 'Internal Error');
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

        {/* 아이디, 비밀번호, 비밀번호 확인, 이름, 나이, 성별 입력 */}
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
          birth={birth}
          setBirth={setBirth}
          gender={gender}
          setGender={setGender}
        />

        {/* NTRP 입력 */}
        <NTRPPicker ntrp={ntrp} setNtrp={setNtrp} />

        <CareerInput career={career} setCareer={setCareer} />

        {/* 전화번호 입력 */}
        <PhoneInput
          phonePrefix={phonePrefix}
          setPhonePrefix={setPhonePrefix}
          phonePart1={phonePart1}
          setPhonePart1={setPhonePart1}
          phonePart2={phonePart2}
          setPhonePart2={setPhonePart2}
        />

        {/* 지점 입력 */}
        <BranchPicker branch={branch} setBranch={setBranch} />

        {/* 환불 은행 정보 및 계좌번호 입력 */}
        <BankAndAccountInput
          refundAccount={refundAccount}
          refundBank={refundBank}
          setRefundBank={setRefundBank}
          setRefundAccount={setRefundAccount}
        />

        <CashReceiptOption
          receiptInfo={receiptInfo}
          setReceiptInfo={setReceiptInfo}
          receiptType={receiptType}
          setReceiptType={setReceiptType}
          receiptNumber={receiptNumber}
          setReceiptNumber={setReceiptNumber}
        />

        {/* 트레이너 아이디 입력 */}
        <View style={styles.trainerContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            트레이너 입력
          </Text>

          <TextInput
            style={theme === 'dark' ? styles.darkInput : styles.lightInput}
            placeholder='트레이너 아이디'
            value={trainerId}
            onChangeText={setTrainerId}
            autoCapitalize='none'
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          />
        </View>

        {/* 회원가입 버튼 */}
        <TouchableOpacity
          onPress={handleRegister}
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
    marginBottom: 5,
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
    marginBottom: 5,
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
  trainerContainer: {
    width: '100%',
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
