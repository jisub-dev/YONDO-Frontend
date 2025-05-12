import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSession } from '@/context/SessionProvider';
import { api } from '@/lib/axiosInstance';
import { MaterialIcons } from '@expo/vector-icons';

export default function PTSessionScreen() {
  const theme = useColorScheme();
  const { session, isLoading } = useSession();
  const [ptList, setPtList] = useState([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (isLoading || !session?.token) return;

      (async () => {
        try {
          const response = await api.get('/api/PT/mypt');
          setPtList(response.data.pts);
        } catch (e: any) {
          console.log('❌ 요청 실패:', e?.response);
        }
      })();
    }, [isLoading, session])
  );

  const toggleExpand = (ptId: number) => {
    setExpandedIds(prev =>
      prev.includes(ptId) ? prev.filter(id => id !== ptId) : [...prev, ptId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '예약': return '#228B22';
      case '확인': return '#ff9900';
      case '완료': return '#1e90ff';
      case '취소': return '#dc143c';
      default: return theme === 'dark' ? '#ccc' : '#444';
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const isExpanded = expandedIds.includes(item.ptId);

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.ptId)} style={[styles.card, theme === 'dark' ? styles.darkCard : styles.lightCard]}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="fitness-center" size={24} color={theme === 'dark' ? '#32CD32' : '#228B22'} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.title, { color: theme === 'dark' ? '#32CD32' : '#228B22' }]}>Trainer ID: {item.trainerId}</Text>
            <Text style={styles.sub}>Used: {item.usedCount} / {item.totalCount}</Text>
          </View>
          <MaterialIcons name={isExpanded ? "expand-less" : "expand-more"} size={24} color={theme === 'dark' ? '#ccc' : '#555'} />
        </View>

        {isExpanded && (
          <View style={styles.scheduleBox}>
            {item.schedules.map((s: any, i: number) => (
              <Text key={i} style={{ color: getStatusColor(s.status), marginBottom: 4 }}>
                📅 {s.date} - {s.status}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            {/* <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#32CD32' : '#228B22' }]}>내 PT 예약 현황</Text> */}
            <Text style={[styles.headerSub, { color: theme === 'dark' ? '#ccc' : '#666' }]}>각 항목을 눌러 상세 일정을 확인하세요.</Text>
          </View>
        }
        data={ptList}
        keyExtractor={(item) => item.ptId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSub: {
    fontSize: 14,
    marginTop: 4,
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
  darkCard: {
    backgroundColor: '#1f1f1f',
    borderColor: '#32CD32',
    borderWidth: 1,
  },
  lightCard: {
    backgroundColor: '#fff',
    borderColor: '#228B22',
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
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  scheduleBox: {
    marginTop: 10,
    paddingLeft: 4,
  },
});
