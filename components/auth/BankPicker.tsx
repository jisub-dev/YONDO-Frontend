import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet, useColorScheme } from 'react-native';

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
  refundBank: BankType;
  setRefundBank: React.Dispatch<React.SetStateAction<BankType>>;
}

export default function BankPicker({
  refundBank,
  setRefundBank,
}: BankPickerProps) {
  const theme = useColorScheme();

  return (
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
  );
}

const styles = StyleSheet.create({
  darkPicker: {
    color: '#fff',
    width: '100%',
  },
  lightPicker: {
    color: '#333',
    width: '100%',
  },
  pickerItem: {
    height: 60, // Taller items for iOS
    fontSize: 15, // Consistent text size
  },
});
