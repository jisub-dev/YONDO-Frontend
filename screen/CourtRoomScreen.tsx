// screens/CourtRoomScreen.tsx
import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, useColorScheme,
  TouchableOpacity, FlatList, Platform, Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect, useRouter } from 'expo-router';
import { api } from '@/lib/axiosInstance';
import { MaterialIcons } from '@expo/vector-icons';
import GenerateCourtRoomScreen from './GenerateCourtRoomScreen';

// 타입 정의
type TabType = 'all' | 'online' | 'offline';

export default function CourtRoomScreen() {
  const theme = useColorScheme();
  const router = useRouter();
  const [courtList, setCourtList] = useState([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [tab, setTab] = useState<TabType>('all');
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await api.get('/api/court');
          setCourtList(response.data.rooms || []);
        } catch (e: any) {
          console.log('❌ 요청 실패:', e?.response);
        }
      })();
    }, [])
  );

  const toggleExpand = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleEnter = async (roomId: number) => {
    try {
      const res = await api.post('/api/court/entrance', { matchingRoomId: roomId });
      Alert.alert('입장 성공', res.data.message);
      router.push(`/court-room/${roomId}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message || '입장 중 오류가 발생했습니다.';
      Alert.alert('입장 실패', msg);
    }
  };

  const filteredList = courtList.filter(room => {
    const isOnline = room.onOffFlag;
    const start = new Date(room.startTime);
    const inDateRange =
      (!startDate || start >= startDate) &&
      (!endDate || start <= endDate);

    return (
      (tab === 'all' || (tab === 'online' && isOnline) || (tab === 'offline' && !isOnline))
      && inDateRange
    );
  });

  const renderItem = ({ item }: { item: any }) => {
    const isExpanded = expandedIds.includes(item.id);
    const isOnline = item.onOffFlag;

    return (
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        style={[
          styles.card,
          isOnline
            ? theme === 'dark'
              ? styles.onlineDarkCard
              : styles.onlineLightCard
            : theme === 'dark'
              ? styles.offlineDarkCard
              : styles.offlineLightCard
        ]}
      >
        <View style={styles.cardHeader}>
          <MaterialIcons name="sports-tennis" size={24} color={isOnline ? '#32CD32' : '#999'} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.title, { color: isOnline ? '#32CD32' : '#999' }]}>Court ID: {item.courtId}</Text>
            <Text style={[styles.sub, { color: theme === 'dark' ? '#ddd' : '#666' }]}>Host: {item.hostId}</Text>
            <Text style={[styles.sub, { color: theme === 'dark' ? '#ddd' : '#666' }]}>NTRP: {item.ntrpMin} - {item.ntrpMax}</Text>
          </View>
          <MaterialIcons name={isExpanded ? "expand-less" : "expand-more"} size={24} color={theme === 'dark' ? '#eee' : '#555'} />
        </View>

        {isExpanded && (
          <View style={styles.scheduleBox}>
            <Text style={{ color: theme === 'dark' ? '#eee' : '#444' }}>시작: {formatDate(item.startTime)}</Text>
            <Text style={{ color: theme === 'dark' ? '#eee' : '#444' }}>종료: {formatDate(item.endTime)}</Text>
            <Text style={{ color: theme === 'dark' ? '#eee' : '#444' }}>생성: {formatDate(item.createdDate)}</Text>
            <TouchableOpacity
              disabled={!isOnline}
              style={[styles.enterButton, { backgroundColor: isOnline ? '#32CD32' : '#999' }]}
              onPress={() => handleEnter(item.id)}
            >
              <Text style={styles.enterButtonText}>{isOnline ? '입장하기' : '입장 불가'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <View style={styles.tabContainer}>
        {(['all', 'online', 'offline'] as TabType[]).map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setTab(type)}
            style={[styles.tab, tab === type && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab === type && styles.activeTabText]}>
              {type === 'all' ? '전체' : type === 'online' ? '온라인' : '오프라인'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setShowPicker('start')}>
          <Text style={styles.filterText}>시작일: {startDate ? startDate.toLocaleDateString('ko-KR') : '전체'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker('end')}>
          <Text style={styles.filterText}>종료일: {endDate ? endDate.toLocaleDateString('ko-KR') : '전체'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetFilters}>
          <Text style={styles.resetButton}>초기화</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(null);
            if (selectedDate) {
              showPicker === 'start' ? setStartDate(selectedDate) : setEndDate(selectedDate);
            }
          }}
        />
      )}

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Floating + button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowModal(true)}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <GenerateCourtRoomScreen visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 16,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#32CD32',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#32CD32',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  filterText: {
    color: '#32CD32',
  },
  resetButton: {
    color: '#dc143c',
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  onlineDarkCard: {
    backgroundColor: '#1f1f1f',
    borderColor: '#32CD32',
    borderWidth: 1,
  },
  offlineDarkCard: {
    backgroundColor: '#1f1f1f',
    borderColor: '#999',
    borderWidth: 1,
  },
  onlineLightCard: {
    backgroundColor: '#fff',
    borderColor: '#228B22',
    borderWidth: 1,
  },
  offlineLightCard: {
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  sub: {
    fontSize: 13,
    marginTop: 2,
  },
  scheduleBox: {
    marginTop: 10,
    paddingLeft: 4,
  },
  enterButton: {
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  enterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#32CD32',
    borderRadius: 32,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
