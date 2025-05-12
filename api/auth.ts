import axios from 'axios';
import { useSession } from '@/context/SessionProvider';
import { useStorageState } from '@/hooks/useStorageState';
import {
  BirthType,
  BranchType,
  CareerType,
  GenderType,
  IdentifierType,
  NameType,
  NTRPType,
  PasswordType,
  PhonePart1Type,
  PhonePart2Type,
  PhonePrefixType,
  ReceiptInfoType,
  ReceiptNumberType,
  ReceiptTypeType,
  RefundAccountType,
  RefundBankType,
  TrainerIdType,
} from '@/screen/RegisterScreen';
import { reqParamsType } from '@/app/(app)/(tabs)/myPage';
import { api } from '@/lib/axiosInstance';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_API;
const IS_DEVELOP_AUTH = process.env.EXPO_PUBLIC_IS_DEVELOP_AUTH;

type registerDataType = {
  identifier: IdentifierType;
  password: PasswordType;
  name: NameType;
  gender: GenderType;
  phonePrefix: PhonePrefixType;
  phonePart1: PhonePart1Type;
  phonePart2: PhonePart2Type;
  branch: BranchType;
  birth: BirthType;
  ntrp: NTRPType;
  career: CareerType;
  refundAccount: RefundAccountType;
  refundBank: RefundBankType;
  receiptInfo: ReceiptInfoType;
  receiptType: ReceiptTypeType;
  receiptNumber: ReceiptNumberType;
  trainerId: TrainerIdType;
};

export function useAuth() {
  const { signIn, logoutUser: contextLogout } = useSession();

  const loginUser = async (identifier: string, password: string) => {
    console.log("로그인 요청");
    console.log(API_URL)
    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, {
        identifier,
        password,
      });

      if (!response.data) {
        throw new Error('Invalid login response');
      }

      signIn(response.data); // ✅ 세션 저장 (자동 로그인)
      return response.data;
    } catch (error: any) {
      console.log('로그인 실패:', error);
      throw error;
    }
  };

  const registerUser = async ({
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
  }: registerDataType) => {
    const phone = phonePrefix + '-' + phonePart1 + '-' + phonePart2;

    const requestParams = {
      identifier,
      password,
      name,
      gender,
      phone,
      branch,
      birth: birth.getFullYear().toString() + (birth.getMonth() + 1).toString() + birth.getDate().toString(),
      ntrp,
      career,
      refundAccount,
      refundBank,
      receiptInfo,
      receiptType,
      receiptNumber,
      trainerId,
    };

    console.log('requestParams:', requestParams);
    console.log(API_URL);
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        ...requestParams
      });
    } catch (error: any) {
      throw error;
    }
  };

  const logoutUser = async (identifier: IdentifierType | undefined) => {
    try {
      await axios.delete(`${API_URL}/api/auth/signin`, {
        data: {identifier}
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    contextLogout(identifier);
  };

  const updateUserInfo = async (
    {
      newPassword,
      refundAccount,
      refundBank,
      receiptInfo,
      receiptType,
      receiptNumber,
    }: reqParamsType,
    identifier: IdentifierType
  ) => {
    try {
      const requestParams: any = {};
  
      if (newPassword) requestParams.password = newPassword;
      if (refundAccount) requestParams.refundAccount = refundAccount;
      if (refundBank) requestParams.refundBank = refundBank;
      if (receiptInfo) requestParams.receiptInfo = receiptInfo;
      if (receiptType) requestParams.receiptType = receiptType;
      if (receiptNumber) requestParams.receiptNumber = receiptNumber;

      requestParams.identifier = identifier;
      // /api/auth/modify-info
      // ${identifier}
      console.log('📤 유저 정보 수정 요청 파라미터:', requestParams);
      console.log('📤 유저 정보 수정 요청 URL:', `${API_URL}/api/auth/modify-info`);
      const response = await api.patch(`${API_URL}/api/auth/modify-info`, requestParams);
      console.log('✅ 유저 정보 수정 응답:', response.data);
      return response.data;
    } catch (e: any) {
      console.error('❌ 유저 정보 수정 실패:', e.response?.data?.message || e.response);
      console.log(e.response);
      throw e;
    }
  };

  return {
    loginUser,
    registerUser,
    logoutUser,
    updateUserInfo
  };
}
