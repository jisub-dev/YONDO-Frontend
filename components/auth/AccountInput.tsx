import { RefundAccountType } from '@/screen/RegisterScreen';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';

interface BankPickerProps {
  refundAccount: RefundAccountType;
  setRefundAccount: React.Dispatch<React.SetStateAction<RefundAccountType>>;
}

export default function ({ refundAccount, setRefundAccount }: BankPickerProps) {
  const theme = useColorScheme();
  return (
    <TextInput
      style={theme === 'dark' ? styles.darkInput : styles.lightInput}
      placeholder='환불 계좌번호 (숫자만 입력)'
      keyboardType='numeric'
      value={refundAccount}
      onChangeText={(text) => setRefundAccount(text.replace(/[^0-9]/g, ''))}
      placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
    />
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
});
