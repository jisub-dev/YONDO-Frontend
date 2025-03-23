import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  receiptInfo: '발급' | '미발급';
  setReceiptInfo: (val: '발급' | '미발급') => void;
  receiptType: '개인' | '법인';
  setReceiptType: (val: '개인' | '법인') => void;
  receiptNumber: string;
  setReceiptNumber: (val: string) => void;
}

export default function CashReceiptOption({
  receiptInfo,
  setReceiptInfo,
  receiptType,
  setReceiptType,
  receiptNumber,
  setReceiptNumber,
}: Props) {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
        현금영수증 발급여부
      </Text>
      <View style={styles.buttonGroup}>
        {['발급', '미발급'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setReceiptInfo(option as '발급' | '미발급')}
            style={[
              styles.button,
              theme === 'dark' ? styles.darkButton : styles.lightButton,
              receiptInfo === option
                ? theme === 'dark'
                  ? styles.darkSelectedButton
                  : styles.lightSelectedButton
                : {},
            ]}
          >
            <Text
              style={
                receiptInfo === option
                  ? styles.selectedButtonText
                  : theme === 'dark'
                  ? styles.darkText
                  : styles.lightText
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {receiptInfo === '발급' && (
        <View style={styles.extraContainer}>
          <View style={theme === 'dark' ? styles.darkPickerWrapper : styles.lightPickerWrapper}>
            <Picker
              selectedValue={receiptType}
              onValueChange={(value) => setReceiptType(value as '개인' | '법인')}
              dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
              style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="개인" value="개인" />
              <Picker.Item label="법인" value="법인" />
            </Picker>
          </View>

          <TextInput
            style={theme === 'dark' ? styles.darkInput : styles.lightInput}
            placeholder="번호 입력"
            value={receiptNumber}
            onChangeText={(text) => setReceiptNumber(text.replace(/[^0-9]/g, '').slice(0, 30))}
            keyboardType="numeric"
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  lightButton: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  darkButton: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  lightSelectedButton: {
    backgroundColor: '#228B22',
    borderColor: '#228B22',
  },
  darkSelectedButton: {
    backgroundColor: '#32CD32',
    borderColor: '#32CD32',
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  lightText: {
    color: '#228B22',
    fontSize: 16,
    fontWeight: '600',
  },
  darkText: {
    color: '#32CD32',
    fontSize: 16,
    fontWeight: '600',
  },
  extraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  lightInput: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  darkInput: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
  },
  darkPickerWrapper: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    height: 50,
    flex: 0.8,
    justifyContent: 'center',
  },
  lightPickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    flex: 0.8,
    justifyContent: 'center',
  },
  darkPicker: {
    color: '#fff',
    width: '100%',
  },
  lightPicker: {
    color: '#333',
    width: '100%',
  },
  pickerItem: {
    height: 60,
    fontSize: 15,
  },
});