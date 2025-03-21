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

  const renderPickerContainer = (label: string, children: React.ReactNode) => (
    <View style={styles.pickerContainer}>
      <Text
        style={
          theme === 'dark' ? styles.darkPickerLabel : styles.lightPickerLabel
        }
      >
        {label}
      </Text>
      {children}
    </View>
  );

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
        <View style={styles.pickerContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            NTRP 선택
          </Text>
          <View
            style={
              theme === 'dark'
                ? styles.darkPickerWrapper
                : styles.lightPickerWrapper
            }
          >
            <Picker
              selectedValue={ntrp}
              onValueChange={(itemValue) =>
                setNtrp(
                  itemValue as
                    | '0.1'
                    | '0.5'
                    | '0.7'
                    | '1.0'
                    | '1.5'
                    | '2.0'
                    | '2.5'
                    | '3.0'
                    | '3.5'
                    | '4.0 이상'
                )
              }
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={[
                theme === 'dark' ? styles.darkPicker : styles.lightPicker,
                // Platform.OS === 'android' ? styles.androidDropDown : null
              ]}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item
                label='0.1'
                value='0.1'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='0.5'
                value='0.5'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='0.7'
                value='0.7'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='1.0'
                value='1.0'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='1.5'
                value='1.5'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='2.0'
                value='2.0'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='2.5'
                value='2.5'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='3.0'
                value='3.0'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='3.5'
                value='3.5'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='4.0'
                value='4.0'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
            </Picker>
          </View>
          <View
            style={
              theme === 'dark'
                ? styles.darkTextWrapper
                : styles.lightTextWrapper
            }
          >
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              0.1 : 나는 레드 볼 강습 중이다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              0.5 : 나는 오렌지 볼 강습 중이다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              0.7 : 나는 그린 볼 강습 중이다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              1.0 : 나는 옐로우 볼 강습 중이고, 테니스 라켓을 처음 잡아봤다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              1.5 : 나는 경험이 부족한 테린이다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              2.0 : 스윙이 불 안정해서 원하는 곳으로 못 보낸다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              2.5 : 어느 정도 폼이 갖춰졌다. 보통 세기의 볼은 칠 수 있다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              3.0 : 원하는 곳으로 보내지만 길이 조절은 불가능 하다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              3.5 : 안정성/거리/길이/스핀까지 적용 가능하다.
            </Text>
            <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
              4.0 : 나는 테니스 고수이다.
            </Text>
          </View>
        </View>

        <View style={styles.phoneContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            전화번호
          </Text>
          <View style={styles.phoneInputsContainer}>
            <View
              style={[
                theme === 'dark'
                  ? styles.darkPickerWrapper
                  : styles.lightPickerWrapper,
                styles.phonePrefixPicker,
              ]}
            >
              <Picker
                selectedValue={phonePrefix}
                onValueChange={(itemValue) =>
                  setPhonePrefix(itemValue as '010' | '012' | '013' | '015')
                }
                dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
                style={
                  theme === 'dark' ? styles.darkPicker : styles.lightPicker
                }
                itemStyle={styles.pickerItem}
              >
                <Picker.Item
                  label='010'
                  value='010'
                  color={
                    Platform.OS === 'ios'
                      ? theme === 'dark'
                        ? '#fff'
                        : '#000'
                      : undefined
                  }
                />
                <Picker.Item
                  label='013'
                  value='013'
                  color={
                    Platform.OS === 'ios'
                      ? theme === 'dark'
                        ? '#fff'
                        : '#000'
                      : undefined
                  }
                />
                <Picker.Item
                  label='015'
                  value='015'
                  color={
                    Platform.OS === 'ios'
                      ? theme === 'dark'
                        ? '#fff'
                        : '#000'
                      : undefined
                  }
                />
              </Picker>
            </View>
            <Text
              style={
                theme === 'dark'
                  ? styles.darkPhoneSeparator
                  : styles.lightPhoneSeparator
              }
            >
              -
            </Text>
            <TextInput
              style={[
                theme === 'dark'
                  ? styles.darkPhoneInput
                  : styles.lightPhoneInput,
                styles.phoneInput,
              ]}
              placeholder='0000'
              keyboardType='numeric'
              value={phonePart1}
              onChangeText={(text) =>
                setPhonePart1(text.replace(/[^0-9]/g, '').slice(0, 4))
              }
              maxLength={4}
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
            />
            <Text
              style={
                theme === 'dark'
                  ? styles.darkPhoneSeparator
                  : styles.lightPhoneSeparator
              }
            >
              -
            </Text>
            <TextInput
              style={[
                theme === 'dark'
                  ? styles.darkPhoneInput
                  : styles.lightPhoneInput,
                styles.phoneInput,
              ]}
              placeholder='0000'
              keyboardType='numeric'
              value={phonePart2}
              onChangeText={(text) =>
                setPhonePart2(text.replace(/[^0-9]/g, '').slice(0, 4))
              }
              maxLength={4}
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
            />
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            지점 선택
          </Text>
          <View
            style={
              theme === 'dark'
                ? styles.darkPickerWrapper
                : styles.lightPickerWrapper
            }
          >
            <Picker
              selectedValue={branch}
              onValueChange={(itemValue) =>
                setBranch(
                  itemValue as '신시가지점' | '에코시티점' | '혁신도시점'
                )
              }
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item
                label='신시가지점'
                value='신시가지점'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='에코시티점'
                value='에코시티점'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='혁신도시점'
                value='혁신도시점'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
            </Picker>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            환불 은행
          </Text>
          <View
            style={
              theme === 'dark'
                ? styles.darkPickerWrapper
                : styles.lightPickerWrapper
            }
          >
            <Picker
              selectedValue={refundBank}
              onValueChange={(itemValue) =>
                setRefundBank(
                  itemValue as
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
                    | 'IBK기업은행'
                )
              }
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item
                label='KB국민은행'
                value='KB국민은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='우리은행'
                value='우리은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='신한은행'
                value='신한은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='하나은행'
                value='하나은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='광주은행'
                value='광주은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='경남은행'
                value='경남은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='대구은행'
                value='대구은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='부산은행'
                value='부산은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='전북은행'
                value='전북은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='제주은행'
                value='제주은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='카카오뱅크'
                value='카카오뱅크'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='케이뱅크'
                value='케이뱅크'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='토스뱅크'
                value='토스뱅크'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='농협은행'
                value='농협은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
              <Picker.Item
                label='IBK기업은행'
                value='IBK기업은행'
                color={
                  Platform.OS === 'ios'
                    ? theme === 'dark'
                      ? '#fff'
                      : '#000'
                    : undefined
                }
              />
            </Picker>
          </View>
        </View>
        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder='환불 계좌번호 (숫자만 입력)'
          keyboardType='numeric'
          value={refundAccount}
          onChangeText={(text) => setRefundAccount(text.replace(/[^0-9]/g, ''))}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder='트레이너 아이디'
          value={trainerId}
          onChangeText={(text) => setTrainerId(text.replace(/[^0-9]/g, ''))}
          autoCapitalize='none'
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
        {/* 회원가입 버튼 */}
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
    paddingBottom: 40, // Add more padding at the bottom
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
    color: '#228B22', // 연두색(테니스 테마)
  },
  darkTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
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

  lightPhoneInput: {
    backgroundColor: '#fff',
    width: '90%',
    height: 50,
    borderRadius: 8,
    // marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  darkPhoneInput: {
    backgroundColor: '#2a2a2a',
    width: '90%',
    height: 50,
    borderRadius: 8,
    // marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
  },
  // 라벨 스타일
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
  lightText: {
    fontSize: 13,
    // marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
  },
  darkText: {
    fontSize: 13,
    // marginBottom: 8,
    color: '#f5f5f5',
    alignSelf: 'flex-start',
  },
  darkTextWrapper: {
    marginTop: 10,
    paddingLeft: 5,
  },
  lightTextWrapper: {
    marginTop: 15,
    paddingLeft: 5,
  },
  // 전화번호 스타일
  phoneContainer: {
    width: '100%',
    marginBottom: 15,
  },
  phoneInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phonePrefixPicker: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
  },
  phoneInput: {
    width: '25%',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  lightPhoneSeparator: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: 5,
  },
  darkPhoneSeparator: {
    fontSize: 20,
    color: '#f5f5f5',
    paddingHorizontal: 5,
  },

  // 픽커 스타일
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  lightPickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  darkPickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#f5f5f5',
  },
  lightPickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    // overflow: 'hidden',
    // height: 50, // Match input height
  },
  darkPickerWrapper: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    // overflow: 'hidden',
    // height: 50, // Match input height
  },
  lightPicker: {
    color: '#333',
    width: '100%',
  },
  darkPicker: {
    color: '#fff',
    width: '100%',
  },
  // For iOS picker item styling
  pickerItem: {
    height: 60, // Taller items for iOS
    fontSize: 15, // Consistent text size
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
  androidDropDown: {
    paddingLeft: 100,
  },
});
