// components/common/ModalSelect.tsx

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useColorScheme,
} from 'react-native';

interface ModalSelectProps<T> {
  label: string;
  value: T;
  options: T[];
  onChange: (val: T) => void;
}

export default function ModalSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: ModalSelectProps<T>) {
  const [visible, setVisible] = useState(false);
  const theme = useColorScheme();

  const selectOption = (option: T) => {
    onChange(option);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          theme === 'dark' ? styles.darkLabel : styles.lightLabel,
        ]}
      >
        {label}
      </Text>

      <TouchableOpacity
        style={[
          styles.selectBox,
          theme === 'dark' ? styles.darkInput : styles.lightInput,
        ]}
        onPress={() => setVisible(true)}
      >
        <Text
          style={[
            styles.valueText,
            theme === 'dark' ? styles.darkText : styles.lightText,
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType='slide'>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => selectOption(item)}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    // marginBottom: 8,
    alignSelf: 'flex-start',
  },
  lightLabel: {
    color: '#333',
  },
  darkLabel: {
    color: '#f5f5f5',
  },
  selectBox: {
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
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  valueText: {
    fontSize: 16,
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '50%',
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});