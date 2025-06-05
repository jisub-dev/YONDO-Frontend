import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '@/lib/axiosInstance';

export default function CourtRoomDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleExit = async () => {
    try {
      const res = await api.post('/api/court/exit', { matchingRoomId: Number(id) });
      Alert.alert('퇴장 완료', res.data.message);
      router.replace('/');
    } catch (err: any) {
      const msg = err?.response?.data?.message || '퇴장 실패';
      Alert.alert('오류', msg);
    }
  };

  console.log(id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎾 매칭룸 {id}번에 입장했습니다.</Text>
      <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
        <Text style={styles.exitButtonText}>나가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#f5f5f5', padding: 24
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  exitButton: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});