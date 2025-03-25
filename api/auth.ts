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
  const { signIn, signOut } = useSession();

  const loginUser = async (identifier: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/sessions`, {
        identifier,
        password,
      });

      if (!response.data) {
        throw new Error('Invalid login response');
      }

      signIn(response.data); // ✅ 세션 저장 (자동 로그인)
      return response.data;
    } catch (error: any) {
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
    const receiptDetail = receiptType + ' : ' + receiptNumber;

    const requestParams = {
      identifier,
      password,
      name,
      gender,
      phone,
      branch,
      birth,
      ntrp,
      career,
      refundAccount,
      refundBank,
      receiptInfo,
      receiptDetail,
      trainerId,
    };
    // try {
    //   const response = await axios.post(`${API_URL}/register`, {
    //     requestParams
    //   });

    //   if (!response.data?.token) {
    //     throw new Error('Invalid registration response');
    //   }

    //   signIn(response.data.token);
    //   return response.data.token;
    // } catch (error: any) {
    //   throw error;
    // }
  };

  const logoutUser = async () => {
    if (IS_DEVELOP_AUTH !== 'true') {
      try {
        await axios.post(`${API_URL}/logout`);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    signOut();
  };

  const verifyRefreshTokenAndGetNewTokenAndRefreshToken = async () => {
    const [[isLoading, session], setSession] = useStorageState('session');
    try {
      const response = await axios.post(`${API_URL}/verify-refreshToken`, {
        RT: session?.RT,
      });

      if (!response.data) {
        throw new Error('Invalid login response');
      }

      setSession(response.data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    loginUser,
    registerUser,
    logoutUser,
    verifyRefreshTokenAndGetNewTokenAndRefreshToken,
  };
}
