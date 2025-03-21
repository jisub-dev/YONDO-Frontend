import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import BankPicker from './BankPicker';
import AccountInput from './AccountInput';

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

interface BankPickerProps {
  refundAccount: string;
  refundBank: BankType;
  setRefundBank: React.Dispatch<React.SetStateAction<BankType>>;
  setRefundAccount: React.Dispatch<React.SetStateAction<string>>;
}

export default function BankAndAccountInput({
  refundAccount,
  refundBank,
  setRefundBank,
  setRefundAccount,
}: BankPickerProps) {
  const theme = useColorScheme();

  return (
    <>
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
          <BankPicker refundBank={refundBank} setRefundBank={setRefundBank} />
        </View>
      </View>
      <AccountInput
        refundAccount={refundAccount}
        setRefundAccount={setRefundAccount}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
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
