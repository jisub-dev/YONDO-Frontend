import { Picker } from '@react-native-picker/picker';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

type PhonePrefixType = '010' | '012' | '013' | '015';
interface PhoneInputPropsType {
  phonePrefix: PhonePrefixType;
  setPhonePrefix: React.Dispatch<React.SetStateAction<PhonePrefixType>>;
  phonePart1: string;
  setPhonePart1: React.Dispatch<React.SetStateAction<string>>;
  phonePart2: string;
  setPhonePart2: React.Dispatch<React.SetStateAction<string>>;
}

export default function PhoneInput({
  phonePrefix,
  setPhonePrefix,
  phonePart1,
  setPhonePart1,
  phonePart2,
  setPhonePart2,
}: PhoneInputPropsType) {
  const theme = useColorScheme();

  return (
    <View style={styles.phoneContainer}>
      <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
        전화번호
      </Text>
      <View style={styles.phoneInputsContainer}>
        <View
          style={[
            theme === 'dark'
              ? styles.darkPickerWrapper
              : styles.lightPickerWrapper,
            styles.phonePrefixPicker,
          ]}
        >
          <Picker
            selectedValue={phonePrefix}
            onValueChange={(itemValue) =>
              setPhonePrefix(itemValue as '010' | '012' | '013' | '015')
            }
            dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
            style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item
              label='010'
              value='010'
              color={
                Platform.OS === 'ios'
                  ? theme === 'dark'
                    ? '#fff'
                    : '#000'
                  : undefined
              }
            />
            <Picker.Item
              label='013'
              value='013'
              color={
                Platform.OS === 'ios'
                  ? theme === 'dark'
                    ? '#fff'
                    : '#000'
                  : undefined
              }
            />
            <Picker.Item
              label='015'
              value='015'
              color={
                Platform.OS === 'ios'
                  ? theme === 'dark'
                    ? '#fff'
                    : '#000'
                  : undefined
              }
            />
          </Picker>
        </View>
        <Text
          style={
            theme === 'dark'
              ? styles.darkPhoneSeparator
              : styles.lightPhoneSeparator
          }
        >
          -
        </Text>
        <TextInput
          style={[
            theme === 'dark' ? styles.darkPhoneInput : styles.lightPhoneInput,
            styles.phoneInput,
          ]}
          placeholder='0000'
          keyboardType='numeric'
          value={phonePart1}
          onChangeText={(text) =>
            setPhonePart1(text.replace(/[^0-9]/g, '').slice(0, 4))
          }
          maxLength={4}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
        <Text
          style={
            theme === 'dark'
              ? styles.darkPhoneSeparator
              : styles.lightPhoneSeparator
          }
        >
          -
        </Text>
        <TextInput
          style={[
            theme === 'dark' ? styles.darkPhoneInput : styles.lightPhoneInput,
            styles.phoneInput,
          ]}
          placeholder='0000'
          keyboardType='numeric'
          value={phonePart2}
          onChangeText={(text) =>
            setPhonePart2(text.replace(/[^0-9]/g, '').slice(0, 4))
          }
          maxLength={4}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
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
  phoneInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  phonePrefixPicker: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
  },
  lightPicker: {
    color: '#333',
    width: '100%',
  },
  darkPicker: {
    color: '#fff',
    width: '100%',
  },
  // For iOS picker item styling
  pickerItem: {
    height: 60, // Taller items for iOS
    fontSize: 15, // Consistent text size
  },
  lightPhoneSeparator: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: 5,
  },
  darkPhoneSeparator: {
    fontSize: 20,
    color: '#f5f5f5',
    paddingHorizontal: 5,
  },
  lightPhoneInput: {
    backgroundColor: '#fff',
    width: '90%',
    height: 50,
    borderRadius: 8,
    // marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  darkPhoneInput: {
    backgroundColor: '#2a2a2a',
    width: '90%',
    height: 50,
    borderRadius: 8,
    // marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
  },
  phoneInput: {
    width: '25%',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
