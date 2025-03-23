import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  useColorScheme,
  TouchableOpacity,
  Modal,
} from 'react-native';

interface InputBirthPropsType {
  birth: Date;
  setBirth: React.Dispatch<React.SetStateAction<Date>>;
}

export default function InputBirth({ birth, setBirth }: InputBirthPropsType) {
  const theme = useColorScheme();
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate) {
      setBirth(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          theme === 'dark' ? styles.darkLabel : styles.lightLabel,
        ]}
      >
        생년월일
      </Text>

      {/* 날짜 보여주는 터치 영역 */}
      <TouchableOpacity
        style={[
          styles.dateDisplay,
          theme === 'dark' ? styles.darkInput : styles.lightInput,
        ]}
        onPress={() => setShowPicker(true)}
      >
        <Text
          style={[
            styles.dateText,
            theme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          {birth.toLocaleDateString('ko-KR')}
        </Text>
      </TouchableOpacity>

      {/* iOS는 상단에 항상 보여지고, Android는 모달처럼 동작 */}
      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={birth}
          mode='date'
          display='default'
          onChange={onChange}
          locale='ko'
        />
      )}

      {/* iOS는 별도 모달로 띄우기 */}
      {Platform.OS === 'ios' && (
        <Modal visible={showPicker} transparent animationType='slide'>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.pickerContainer,
                theme === 'dark' ? styles.darkModal : styles.lightModal,
              ]}
            >
              <DateTimePicker
                value={birth}
                mode='date'
                display='spinner'
                onChange={onChange}
                locale='ko'
              />
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  lightLabel: {
    color: '#121212',
    marginBottom: 15,
  },
  darkLabel: {
    color: '#f5f5f5',
    marginBottom: 15,
  },
  dateDisplay: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1,
  },
  lightInput: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  darkInput: {
    backgroundColor: '#121212',
    borderColor: '#444',
  },
  dateText: {
    fontSize: 16,
  },
  lightText: {
    color: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pickerContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lightModal: {
    backgroundColor: '#fff',
  },
  darkModal: {
    backgroundColor: '#1e1e1e',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#32CD32',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});