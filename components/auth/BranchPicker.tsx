import { BranchType } from '@/screen/RegisterScreen';
import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native';

interface BranchPickerPropsType {
  branch: BranchType;
  setBranch: React.Dispatch<React.SetStateAction<BranchType>>;
}

export default function BranchPicker({
  branch,
  setBranch,
}: BranchPickerPropsType) {
  const theme = useColorScheme();
  return (
    <View style={styles.pickerContainer}>
      <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
        지점 선택
      </Text>
      <View
        style={
          theme === 'dark'
            ? styles.darkPickerWrapper
            : styles.lightPickerWrapper
        }
      >
        <Picker
          selectedValue={branch}
          onValueChange={(itemValue) => setBranch(itemValue as BranchType)}
          dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
          style={theme === 'dark' ? styles.darkPicker : styles.lightPicker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item
            label='신시가지점'
            value='신시가지점'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='에코시티점'
            value='에코시티점'
            color={
              Platform.OS === 'ios'
                ? theme === 'dark'
                  ? '#fff'
                  : '#000'
                : undefined
            }
          />
          <Picker.Item
            label='혁신도시점'
            value='혁신도시점'
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
    </View>
  );
}

const styles = StyleSheet.create({
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
  lightText: {
    fontSize: 13,
    // marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
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
  lightPickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  darkPickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#f5f5f5',
  },
  pickerItem: {
    height: 60, // Taller items for iOS
    fontSize: 15, // Consistent text size
  },
  lightPicker: {
    color: '#333',
    width: '100%',
  },
  darkPicker: {
    color: '#fff',
    width: '100%',
  },
});
