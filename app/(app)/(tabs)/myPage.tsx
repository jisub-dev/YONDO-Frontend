// // import { View, Text, StyleSheet, useColorScheme } from 'react-native';
// // import { StatusBar } from 'expo-status-bar';
// // export default function Tab() {
// //   const theme = useColorScheme();

// //   return (
// //     <View
// //       style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
// //     >
// //       {/* <StatusBar style="light" /> */}
// //       <Text>my page</Text>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   darkContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#121212',
// //   },
// //   lightContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f5f5f5',
// //   },
// // });

// import { useSession } from '@/context/SessionProvider';
// import { getStorageItem } from '@/hooks/useStorage';
// import axios from 'axios';
// import { useFocusEffect } from 'expo-router';
// import React, {useEffect, useState} from 'react';
// import {View, Button, StyleSheet} from 'react-native';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// const API_URL = process.env.EXPO_PUBLIC_DUMMY_LAP_API;

// export default function Tab() {
//   const [response, setResponse] = useState('');
//   const { session, isLoading } = useSession();

//   const press = () => {
//     console.log("✅ current Token(pressed button)");
//     console.log(session?.token);
//     (async function fetchTokenValidation() {
//       try {
//         const response = await axios.post(`${API_URL}/modify-info`, {
//           dummy: 'dummy',
//          },
//         {
//           headers: { Authorization: `Bearer ${session?.token}` }
//         });

//         console.log(response.data);
//       } catch(e) {
//         console.log(e);
//       }
//     })();
//   }

//   return (
//     <View style={styles.container}>
//       <Button onPress={press} title="버튼" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//   }
// })

import React, { useState, useEffect } from 'react';
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
import { router } from 'expo-router';
import { useAuth } from '@/api/auth';
import BankAndAccountInput from '@/components/auth/BankAndAccountInput';
import CashReceiptOption from '@/components/auth/CashReceiptOption';

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

export default function UserEditScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [refundAccount, setRefundAccount] = useState('');
  const [refundBank, setRefundBank] = useState<BankType>('전북은행');
  const [receiptInfo, setReceiptInfo] = useState<'발급' | '미발급'>('미발급');
  const [receiptType, setReceiptType] = useState<'개인' | '법인'>('개인');
  const [receiptNumber, setReceiptNumber] = useState<string>('');

  // const { updateUserInfo, getUserInfo } = useAuth();
  const theme = useColorScheme();

  // useEffect(() => {
  //   // 사용자 정보 로드
  //   loadUserInfo();
  // }, []);

  // const loadUserInfo = async () => {
  //   try {
  //     const userInfo = await getUserInfo();
  //     // 기존 사용자 정보 설정
  //     setRefundBank(userInfo.refundBank);
  //     setRefundAccount(userInfo.refundAccount);
  //     setReceiptInfo(userInfo.receiptInfo);
  //     setReceiptType(userInfo.receiptType);
  //     setReceiptNumber(userInfo.receiptNumber);
  //   } catch (error) {
  //     console.error('사용자 정보 로드 실패:', error);
  //     Alert.alert('오류', '사용자 정보를 불러오는데 실패했습니다.');
  //   }
  // };

  const handleUpdateInfo = async () => {
    // 비밀번호 변경 요청 시 유효성 검사
    if (newPassword) {
      if (newPassword !== passwordConfirm) {
        return Alert.alert('비밀번호 오류', '새 비밀번호가 일치하지 않습니다.');
      }

      if (newPassword.length < 8) {
        return Alert.alert(
          '비밀번호 오류',
          '비밀번호는 8자리 이상이어야 합니다.'
        );
      }

      if (newPassword.length > 40) {
        return Alert.alert(
          '비밀번호 오류',
          '비밀번호는 40자 미만으로 입력해주세요.'
        );
      }
    }

    // 계좌번호 유효성 검사
    if (!refundAccount.match(/^\d+$/)) {
      return Alert.alert(
        '계좌번호 오류',
        '환불 계좌번호는 숫자만 입력해주세요.'
      );
    }

    try {
      // 실제 API 호출 대신 성공 메시지 표시
      // await updateUserInfo({
      //   currentPassword: currentPassword,
      //   newPassword: newPassword || undefined,
      //   refundBank,
      //   refundAccount,
      //   receiptInfo,
      //   receiptType,
      //   receiptNumber
      // });

      Alert.alert(
        '정보 수정 성공',
        '사용자 정보가 성공적으로 수정되었습니다.',
        [{ text: '확인', onPress: () => router.back() }]
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('인증 오류', '현재 비밀번호가 올바르지 않습니다.');
      } else {
        console.error(error);
        Alert.alert('수정 실패', '정보 수정 중 오류가 발생했습니다.');
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
          회원정보 수정
        </Text>

        {/* 비밀번호 변경 섹션 */}
        <View style={styles.section}>
          <Text
            style={
              theme === 'dark'
                ? styles.darkSectionTitle
                : styles.lightSectionTitle
            }
          >
            비밀번호 변경
          </Text>

          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            새 비밀번호
          </Text>
          <TextInput
            style={theme === 'dark' ? styles.darkInput : styles.lightInput}
            placeholder='새 비밀번호 (8자 이상)'
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          />

          <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
            새 비밀번호 확인
          </Text>
          <TextInput
            style={theme === 'dark' ? styles.darkInput : styles.lightInput}
            placeholder='새 비밀번호 확인'
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          />
        </View>

        {/* 환불 정보 섹션 */}
        <View style={styles.section}>
          <Text
            style={
              theme === 'dark'
                ? styles.darkSectionTitle
                : styles.lightSectionTitle
            }
          >
            환불 정보
          </Text>

          {/* 환불 은행 정보 및 계좌번호 입력 */}
          <BankAndAccountInput
            refundAccount={refundAccount}
            refundBank={refundBank}
            setRefundBank={setRefundBank}
            setRefundAccount={setRefundAccount}
          />
        </View>

        {/* 현금영수증 섹션 */}
        <View style={styles.section}>
          <Text
            style={
              theme === 'dark'
                ? styles.darkSectionTitle
                : styles.lightSectionTitle
            }
          >
            현금영수증 정보
          </Text>

          <CashReceiptOption
            receiptInfo={receiptInfo}
            setReceiptInfo={setReceiptInfo}
            receiptType={receiptType}
            setReceiptType={setReceiptType}
            receiptNumber={receiptNumber}
            setReceiptNumber={setReceiptNumber}
          />
        </View>

        {/* 수정 완료 버튼 */}
        <TouchableOpacity
          onPress={handleUpdateInfo}
          style={theme === 'dark' ? styles.darkButton : styles.lightButton}
        >
          <Text
            style={
              theme === 'dark'
                ? styles.darkButtonText1
                : styles.lightButtonText1
            }
          >
            수정 완료
          </Text>
        </TouchableOpacity>

        {/* 취소 버튼 */}
        <TouchableOpacity
          onPress={() => router.back()}
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
            취소
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

  // 섹션 스타일
  section: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  lightSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#228B22',
    alignSelf: 'flex-start',
  },
  darkSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#32CD32',
    alignSelf: 'flex-start',
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
