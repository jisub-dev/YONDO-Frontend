import React, { useState, useEffect, useCallback } from 'react';
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
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '@/api/auth';
import BankAndAccountInput from '@/components/auth/BankAndAccountInput';
import CashReceiptOption from '@/components/auth/CashReceiptOption';
import { PasswordType, ReceiptInfoType, ReceiptNumberType, ReceiptTypeType, RefundAccountType, RefundBankType } from '@/screen/RegisterScreen';
import { useSession } from '@/context/SessionProvider';

export type reqParamsType = {
  newPassword?: PasswordType,
  refundAccount?: RefundAccountType,
  refundBank?: RefundBankType,
  receiptInfo?: ReceiptInfoType,
  receiptType?: ReceiptTypeType,
  receiptNumber?: ReceiptNumberType, 
}

export const bankCodeToKorean: Record<string, RefundBankType> = {
  KOREA_BANK: "한국은행",
  NH_BANK: "농협은행",
  SUHYUP_BANK: "수협은행",
  KDB_BANK: "산업은행",
  IBK_BANK: "기업은행",
  KEB_HANA_BANK: "KEB하나은행",
  KB_KOOKMIN_BANK: "KB국민은행",
  SHINHAN_BANK: "신한은행",
  WOORI_BANK: "우리은행",
  SC_FIRST_BANK: "SC제일은행",
  DGB_DAEGU_BANK: "DGB대구은행",
  BNK_BUSAN_BANK: "BNK부산은행",
  BNK_KYONGNAM_BANK: "BNK경남은행",
  KJB_JEONBUK_BANK: "전북은행",
  JJB_JEJU_BANK: "제주은행",
  KAKAO_BANK: "카카오뱅크",
  K_BANK: "케이뱅크",
  TOSS_BANK: "토스뱅크",
  POST_OFFICE_BANK: "우체국예금보험",
  CITI_BANK: "한국씨티은행",
};


export default function UserEditScreen() {
  const [newPassword, setNewPassword] = useState<PasswordType>('')
  const [passwordConfirm, setPasswordConfirm] = useState<PasswordType>('');
  const [refundAccount, setRefundAccount] = useState<RefundAccountType>('');
  const [refundBank, setRefundBank] = useState<RefundBankType>('전북은행');
  const [receiptInfo, setReceiptInfo] = useState<ReceiptInfoType>('미발급');
  const [receiptType, setReceiptType] = useState<ReceiptTypeType>('개인');
  const [receiptNumber, setReceiptNumber] = useState<ReceiptNumberType>('');

  const theme = useColorScheme();
  const { session } = useSession();
  const { updateUserInfo } = useAuth();

  // 🔄 세션 정보로 초기값 세팅
  useFocusEffect(
    useCallback(() => {
      if (!session?.user) return;
      setRefundBank(bankCodeToKorean[session.user.refundBank] || '전북은행');
      setRefundAccount(session.user.refundAccount || '');
      setReceiptInfo(session.user.receiptInfo || '미발급');
      setReceiptType(session.user.receiptType || '개인');
      setReceiptNumber(session.user.receiptNumber || '');
    }, [])
  )

  const handleUpdateInfo = async () => {
    // if (!session?.user?.identifier) return;
    if (!session?.token || !session?.user?.identifier) {
      console.warn('세션 정보 없음 → 요청 중단');
      return;
    } else {
      console.log("token in update user : " + session.token);
    }
  
    const updateFields: reqParamsType = {};
  
    if (newPassword) {
      if (newPassword !== passwordConfirm)
        return Alert.alert('비밀번호 오류', '새 비밀번호가 일치하지 않습니다.');
      if (newPassword.length < 8)
        return Alert.alert('비밀번호 오류', '비밀번호는 8자리 이상이어야 합니다.');
      if (newPassword.length > 40)
        return Alert.alert('비밀번호 오류', '비밀번호는 40자 미만으로 입력해주세요.');
  
      updateFields.newPassword = newPassword;
    }
  
    if (!refundAccount.match(/^\d+$/)) {
      return Alert.alert('계좌번호 오류', '환불 계좌번호는 숫자만 입력해주세요.');
    }
  
    // ✅ 기존값과 비교 후 변경된 경우만 추가
    if (refundAccount !== session.user.refundAccount) {
      updateFields.refundAccount = refundAccount;
    }
  
    if (refundBank !== bankCodeToKorean[session.user.refundBank]) {
      updateFields.refundBank = refundBank;
    }
  
    if (receiptInfo !== session.user.receiptInfo) {
      updateFields.receiptInfo = receiptInfo;
    }
  
    if (receiptType !== session.user.receiptType) {
      updateFields.receiptType = receiptType;
    }
  
    if (receiptNumber !== session.user.receiptNumber) {
      updateFields.receiptNumber = receiptNumber;
    }
  
    // 아무 것도 변경되지 않은 경우
    if (Object.keys(updateFields).length === 0) {
      return Alert.alert('수정 사항 없음', '변경된 정보가 없습니다.');
    }
  
    try {
      await updateUserInfo(updateFields, session.user.identifier);
  
      Alert.alert(
        '정보 수정 성공',
        '사용자 정보가 성공적으로 수정되었습니다.', 
        [{ text: '확인'
          // , onPress: () => router.back()
         }]
      );
    } catch (error: any) {
      throw error;
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
