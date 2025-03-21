import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native';
import NTRPDetail from './NTRPDetail';

type NTRPType =
  | '0.1'
  | '0.5'
  | '0.7'
  | '1.0'
  | '1.5'
  | '2.0'
  | '2.5'
  | '3.0'
  | '3.5'
  | '4.0 이상';

interface NTRPPickerPropsType {
  ntrp: string;
  setNtrp: React.Dispatch<React.SetStateAction<NTRPType>>;
}

export default function NTRPPicker({ ntrp, setNtrp }: NTRPPickerPropsType) {
  const theme = useColorScheme();

  return (
    <View style={styles.pickerContainer}>
      <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
        NTRP 선택
      </Text>
      <View
        style={
          theme === 'dark'
            ? styles.darkPickerWrapper
            : styles.lightPickerWrapper
        }
      >
        <Picker
          selectedValue={ntrp}
          onValueChange={(itemValue) =>
            setNtrp(
              itemValue as
                | '0.1'
                | '0.5'
                | '0.7'
                | '1.0'
                | '1.5'
                | '2.0'
                | '2.5'
                | '3.0'
                | '3.5'
                | '4.0 이상'
            )
          }
          dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
          style={[
            theme === 'dark' ? styles.darkPicker : styles.lightPicker,
            // Platform.OS === 'android' ? styles.androidDropDown : null
          ]}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item
            label='0.1'
            value='0.1'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='0.5'
            value='0.5'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='0.7'
            value='0.7'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='1.0'
            value='1.0'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='1.5'
            value='1.5'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='2.0'
            value='2.0'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='2.5'
            value='2.5'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='3.0'
            value='3.0'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='3.5'
            value='3.5'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='4.0'
            value='4.0'
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
      <NTRPDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  lightPicker: {
    color: '#333',
    width: '100%',
  },
  darkPicker: {
    color: '#fff',
    width: '100%',
  },
  pickerItem: {
    height: 60, // Taller items for iOS
    fontSize: 15, // Consistent text size
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
  pickerContainer: {
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
});
