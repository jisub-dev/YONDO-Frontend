import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import BankPicker from './BankPicker';
import AccountInput from './AccountInput';
import { RefundAccountType, RefundBankType } from '@/screen/RegisterScreen';

interface BankPickerProps {
  refundAccount: RefundAccountType;
  refundBank: RefundBankType;
  setRefundBank: React.Dispatch<React.SetStateAction<RefundBankType>>;
  setRefundAccount: React.Dispatch<React.SetStateAction<RefundAccountType>>;
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
        <BankPicker refundBank={refundBank} setRefundBank={setRefundBank} />
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
    color: '#333',
    // alignSelf: 'flex-start',
  },
  darkLabel: {
    fontSize: 16,
    color: '#f5f5f5',
    // alignSelf: 'flex-start',
  },
});
