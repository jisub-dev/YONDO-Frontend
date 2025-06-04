// screens/GenerateCourtRoomScreen.tsx
import React, { useState } from 'react';
import {
  Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform, Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '@/lib/axiosInstance';
import { useRouter } from 'expo-router';

export default function GenerateCourtRoomScreen({ visible, onClose }: {
  visible: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [courtId, setCourtId] = useState('');
  const [type, setType] = useState('2인 단식');
  const [ntrpMin, setNtrpMin] = useState('');
  const [ntrpMax, setNtrpMax] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [onOffFlag, setOnOffFlag] = useState(true);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreate = async () => {
    try {
      const body = {
        courtId: Number(courtId),
        type,
        ntrpMin: Number(ntrpMin),
        ntrpMax: Number(ntrpMax),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        onOffFlag
      };
      const res = await api.post('/api/court', body);
      Alert.alert('생성 성공', res.data.message);
      onClose();
      router.push('/court-room'); // 필요 시 ID 경로 추가
    } catch (err: any) {
      Alert.alert('에러', err?.response?.data?.message || '생성 중 오류 발생');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>매칭룸 생성</Text>
          <TextInput placeholder="Court ID" keyboardType="numeric" style={styles.input} onChangeText={setCourtId} />
          <TextInput placeholder="NTRP 최소" keyboardType="decimal-pad" style={styles.input} onChangeText={setNtrpMin} />
          <TextInput placeholder="NTRP 최대" keyboardType="decimal-pad" style={styles.input} onChangeText={setNtrpMax} />

          <TouchableOpacity onPress={() => setShowStartPicker(true)}>
            <Text>시작 시간: {startTime.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndPicker(true)}>
            <Text>종료 시간: {endTime.toLocaleString()}</Text>
          </TouchableOpacity>

          {showStartPicker && (
            <DateTimePicker
              value={startTime}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(_, date) => {
                setShowStartPicker(false);
                if (date) setStartTime(date);
              }}
            />
          )}
          {showEndPicker && (
            <DateTimePicker
              value={endTime}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(_, date) => {
                setShowEndPicker(false);
                if (date) setEndTime(date);
              }}
            />
          )}

          <View style={styles.buttonRow}>
            <Button title="취소" onPress={onClose} />
            <Button title="생성" onPress={handleCreate} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  }
});