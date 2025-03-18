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
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@/api/auth';
import { router } from 'expo-router';

interface RegisterProps {
  togglePage: (toPage: string) => void;
}

export default function RegisterScreen({ togglePage }: RegisterProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'남' | '여'>('남');
  const [phonePrefix, setPhonePrefix] = useState<'010' | '011'>('010');
  const [phonePart1, setPhonePart1] = useState('');
  const [phonePart2, setPhonePart2] = useState('');
  const [branch, setBranch] = useState<'a' | 'b' | 'c'>('a');
  const [age, setAge] = useState('');
  const [ntrp, setNtrp] = useState('0.0');
  const [refundAccount, setRefundAccount] = useState('');
  const [refundBank, setRefundBank] = useState<'신한은행' | '우리은행'>('신한은행');
  const [receiptInfo, setReceiptInfo] = useState<'발급' | '미발급'>('발급');
  const [trainerId, setTrainerId] = useState('');
  const { registerUser } = useAuth();
  const theme = useColorScheme();

  const validateKoreanName = (text: string) => /^[가-힣]{1,5}$/.test(text);

  const handleRegister = async () => {
    if (!identifier.trim()) return Alert.alert('아이디 오류', '아이디를 입력해주세요.');
    if (!password.trim()) return Alert.alert('비밀번호 오류', '비밀번호를 입력해주세요.');
    if (password !== passwordConfirm) return Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
    if (password.length < 8) return Alert.alert('비밀번호 오류', '비밀번호는 8자리 이상이어야 합니다.');
    if (!validateKoreanName(name)) return Alert.alert('이름 오류', '이름은 한글 5자 이하로 입력해주세요.');
    if (phonePart1.length !== 4 || phonePart2.length !== 4) return Alert.alert('전화번호 오류', '전화번호를 정확히 입력해주세요.');
    if (!refundAccount.match(/^\d+$/)) return Alert.alert('계좌번호 오류', '환불 계좌번호는 숫자만 입력해주세요.');

    try {
      // await registerUser({
      //   identifier,
      //   password,
      //   name,
      //   gender,
      //   phone: `${phonePrefix}-${phonePart1}-${phonePart2}`,
      //   branch,
      //   age: parseInt(age),
      //   ntrp,
      //   refund_account: refundAccount,
      //   refund_bank: refundBank,
      //   receipt_info: receiptInfo,
      //   trainer_id: trainerId || null, // 선택 입력
      // });

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
      <Text style={theme === 'dark' ? styles.darkPickerLabel : styles.lightPickerLabel}>
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
      <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
        <Text style={theme === 'dark' ? styles.darkTitle : styles.lightTitle}>
          연두테니스
        </Text>
        <Text style={theme === 'dark' ? styles.darkSubTitle : styles.lightSubTitle}>
          회원가입
        </Text>

        {/* 기본 정보 */}
        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="아이디를 입력해주세요"
          value={identifier}
          onChangeText={(text) => setIdentifier(text.slice(0, 40))}
          autoCapitalize="none"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="비밀번호 (8자리 이상)"
          value={password}
          onChangeText={(text) => setPassword(text.slice(0, 40))}
          secureTextEntry
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
        
        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text.slice(0, 40))}
          secureTextEntry
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="이름 (한글 5자 이내)"
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="나이"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        {/* 성별 선택 */}
        <View style={styles.genderContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            성별
          </Text>
          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              onPress={() => setGender('남')}
              style={[
                theme === 'dark' ? styles.darkGenderButton : styles.lightGenderButton,
                gender === '남' ? (theme === 'dark' ? styles.darkSelectedButton : styles.lightSelectedButton) : {}
              ]}
            >
              <Text style={gender === '남' ? styles.selectedButtonText : (theme === 'dark' ? styles.darkButtonText2 : styles.lightButtonText2)}>
                남성
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('여')}
              style={[
                theme === 'dark' ? styles.darkGenderButton : styles.lightGenderButton,
                gender === '여' ? (theme === 'dark' ? styles.darkSelectedButton : styles.lightSelectedButton) : {}
              ]}
            >
              <Text style={gender === '여' ? styles.selectedButtonText : (theme === 'dark' ? styles.darkButtonText2 : styles.lightButtonText2)}>
                여성
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 전화번호 */}
        <View style={styles.phoneContainer}>
          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            전화번호
          </Text>
          <View style={styles.phoneInputsContainer}>
            <View style={[theme === 'dark' ? styles.darkPickerWrapper : styles.lightPickerWrapper, styles.phonePrefixPicker]}>
              <Picker
                selectedValue={phonePrefix}
                onValueChange={(itemValue) => setPhonePrefix(itemValue as '010' | '011')}
                dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
                style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
              >
                <Picker.Item label="010" value="010" color={theme === 'dark' ? '#fff' : '#000'} />
                <Picker.Item label="011" value="011" color={theme === 'dark' ? '#fff' : '#000'} />
              </Picker>
            </View>
            <Text style={theme === 'dark' ? styles.darkPhoneSeparator : styles.lightPhoneSeparator}>-</Text>
            <TextInput
              style={[theme === 'dark' ? styles.darkInput : styles.lightInput, styles.phoneInput]}
              placeholder="0000"
              keyboardType="numeric"
              value={phonePart1}
              onChangeText={text => setPhonePart1(text.replace(/[^0-9]/g, '').slice(0, 4))}
              maxLength={4}
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
            />
            <Text style={theme === 'dark' ? styles.darkPhoneSeparator : styles.lightPhoneSeparator}>-</Text>
            <TextInput
              style={[theme === 'dark' ? styles.darkInput : styles.lightInput, styles.phoneInput]}
              placeholder="0000"
              keyboardType="numeric"
              value={phonePart2}
              onChangeText={text => setPhonePart2(text.replace(/[^0-9]/g, '').slice(0, 4))}
              maxLength={4}
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
            />
          </View>
        </View>

        {/* 지점 선택 */}
        {renderPickerContainer('지점 선택', (
          <View style={theme === 'dark' ? styles.darkPickerWrapper : styles.lightPickerWrapper}>
            <Picker
              selectedValue={branch}
              onValueChange={(itemValue) => setBranch(itemValue as 'a' | 'b' | 'c')}
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
            >
              <Picker.Item label="A 지점" value="a" color={theme === 'dark' ? '#fff' : '#000'} />
              <Picker.Item label="B 지점" value="b" color={theme === 'dark' ? '#fff' : '#000'} />
              <Picker.Item label="C 지점" value="c" color={theme === 'dark' ? '#fff' : '#000'} />
            </Picker>
          </View>
        ))}

        {/* NTRP 레벨 */}
        {renderPickerContainer('NTRP 레벨', (
          <View style={theme === 'dark' ? styles.darkPickerWrapper : styles.lightPickerWrapper}>
            <Picker
              selectedValue={ntrp}
              onValueChange={setNtrp}
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
            >
              {['0.0', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0'].map(level => (
                <Picker.Item key={level} label={level} value={level} color={theme === 'dark' ? '#fff' : '#000'} />
              ))}
            </Picker>
          </View>
        ))}

        {/* 환불 계좌 정보 */}
        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="환불 계좌번호 (숫자만 입력)"
          keyboardType="numeric"
          value={refundAccount}
          onChangeText={text => setRefundAccount(text.replace(/[^0-9]/g, ''))}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />

        {renderPickerContainer('은행 선택', (
          <View style={theme === 'dark' ? styles.darkPickerWrapper : styles.lightPickerWrapper}>
            <Picker
              selectedValue={refundBank}
              onValueChange={(itemValue) => setRefundBank(itemValue as '신한은행' | '우리은행')}
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
            >
              <Picker.Item label="신한은행" value="신한은행" color={theme === 'dark' ? '#fff' : '#000'} />
              <Picker.Item label="우리은행" value="우리은행" color={theme === 'dark' ? '#fff' : '#000'} />
            </Picker>
          </View>
        ))}

        {/* 영수증 발급 여부 */}
        {renderPickerContainer('영수증 발급 여부', (
          <View style={theme === 'dark' ? styles.darkPickerWrapper : styles.lightPickerWrapper}>
            <Picker
              selectedValue={receiptInfo}
              onValueChange={(itemValue) => setReceiptInfo(itemValue as '발급' | '미발급')}
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
            >
              <Picker.Item label="발급" value="발급" color={theme === 'dark' ? '#fff' : '#000'} />
              <Picker.Item label="미발급" value="미발급" color={theme === 'dark' ? '#fff' : '#000'} />
            </Picker>
          </View>
        ))}

        {/* 선택 사항: 트레이너 ID */}
        <TextInput
          style={theme === 'dark' ? styles.darkInput : styles.lightInput}
          placeholder="트레이너 ID (선택사항)"
          value={trainerId}
          onChangeText={setTrainerId}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
        
                {/* 회원가입 버튼 */}
                <TouchableOpacity onPress={handleRegister} style={theme === 'dark' ? styles.darkButton : styles.lightButton}>
          <Text style={theme === 'dark' ? styles.darkButtonText1 : styles.lightButtonText1}>
            회원가입
          </Text>
        </TouchableOpacity>

        {/* 로그인으로 이동 버튼 */}
        <TouchableOpacity onPress={() => togglePage('login')} style={theme === 'dark' ? styles.darkButtonOutline : styles.lightButtonOutline}>
          <Text style={theme === 'dark' ? styles.darkButtonText2 : styles.lightButtonText2}>
            로그인하러 가기
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /** ✅ 스크롤 뷰 스타일 **/
  lightScrollView: {
    backgroundColor: '#ffffff',
  },
  darkScrollView: {
    backgroundColor: '#121212',
  },
  scrollContentContainer: {
    flexGrow: 1,
    padding: 20,
  },

  /** ✅ 전체 컨테이너 **/
  lightContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
  },

  /** ✅ 제목 및 부제목 **/
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

  /** ✅ 입력 필드 **/
  lightInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
    backgroundColor: '#fff',
  },
  darkInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#eee',
    backgroundColor: '#1e1e1e',
  },

  /** ✅ 입력 필드 라벨 **/
  lightLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  darkLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },

  /** ✅ 성별 버튼 **/
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  lightGenderButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  darkGenderButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#2e2e2e',
  },
  lightSelectedButton: {
    backgroundColor: '#647486',
  },
  darkSelectedButton: {
    backgroundColor: '#f1f5f9',
  },
  selectedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /** ✅ 전화번호 입력 **/
  phoneContainer: {
    marginBottom: 15,
  },
  phoneInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    textAlign: 'center',
  },
  lightPhoneSeparator: {
    fontSize: 20,
    color: '#000',
  },
  darkPhoneSeparator: {
    fontSize: 20,
    color: '#fff',
  },

  /** ✅ 전화번호 앞자리 선택 Picker **/
  phonePrefixPicker: {
    width: 100,
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },

  /** ✅ Picker 스타일 **/
  pickerContainer: {
    marginBottom: 15,
  },
  lightPickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  darkPickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
  },
  lightPickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  darkPickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  lightPicker: {
    height: 50,
    color: '#000',
  },
  darkPicker: {
    height: 50,
    color: '#fff',
  },

  /** ✅ 버튼 스타일 **/
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
});