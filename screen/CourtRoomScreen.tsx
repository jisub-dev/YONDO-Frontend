// screens/CourtRoomScreen.tsx
import React, { useCallback, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, useColorScheme,
  TouchableOpacity, FlatList, Platform, Alert, 
  ActivityIndicator, RefreshControl, StatusBar,
  Animated, Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect, useRouter } from 'expo-router';
import { api } from '@/lib/axiosInstance';
import { MaterialIcons } from '@expo/vector-icons';
import GenerateCourtRoomScreen from './GenerateCourtRoomScreen';

type TabType = 'all' | 'online' | 'offline';

type CourtRoom = {
  id: number;
  hostId: string;
  courtId: number;
  type: string;
  ntrpMin: number;
  ntrpMax: number;
  onOffFlag: boolean;
  startTime: string;
  endTime: string;
  createdDate: string;
  detail: string;
};

const { width } = Dimensions.get('window');

export default function CourtRoomScreen() {
  const theme = useColorScheme();
  const router = useRouter();
  const isDark = theme === 'dark';
  
  const [courtList, setCourtList] = useState<CourtRoom[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [tab, setTab] = useState<TabType>('all');
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const colors = {
    primary: '#00C896',
    primaryLight: '#33D4AC',
    primaryDark: '#00A578',
    background: isDark ? '#0F0F0F' : '#FFFFFF',
    surface: isDark ? '#1A1A1A' : '#F8F9FA',
    surfaceElevated: isDark ? '#262626' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDark ? '#A0A0A0' : '#666666',
    textTertiary: isDark ? '#707070' : '#999999',
    border: isDark ? '#333333' : '#E5E5E5',
    borderLight: isDark ? '#2A2A2A' : '#F0F0F0',
    error: '#FF4757',
    success: '#2ED573',
    warning: '#FFA726',
    online: '#00C896',
    offline: '#8E8E93',
  };

  const fetchCourts = async (pageToLoad = 1, refresh = false) => {
    try {
      if (pageToLoad === 1) {
        refresh ? setRefreshing(true) : setInitialLoading(true);
      } else {
        setLoading(true);
      }

      const response = await api.get(`/api/court?page=${pageToLoad}&size=10`);
      const newRooms: CourtRoom[] = response.data.rooms || [];

      if (pageToLoad === 1) {
        setCourtList(newRooms);
      } else {
        setCourtList(prev => [...prev, ...newRooms]);
      }

      setHasNext(response.data.hasNext);
      setPage(response.data.currentPage);
    } catch (e: any) {
      console.log('❌ 요청 실패:', e?.response);
      Alert.alert('오류', '매칭룸 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setInitialLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCourts(1);
    }, [])
  );

  const handleRefresh = () => {
    setPage(1);
    setExpandedIds([]);
    fetchCourts(1, true);
  };

  const toggleExpand = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const formatDateTime = (isoStr: string) => {
    const date = new Date(isoStr);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '내일';
    if (diffDays === -1) return '어제';
    
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatTime = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getTimeStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'active';
    return 'ended';
  };

  const handleEnter = async (roomId: number) => {
    try {
      const res = await api.post('/api/court/entrance', { matchingRoomId: roomId });
      router.push(`/court-room/${roomId}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message || '입장 중 오류가 발생했습니다.';
      Alert.alert('입장 실패', msg);
    }
  };

  const filteredList = useMemo(() => {
    return courtList.filter(room => {
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
  }, [courtList, tab, startDate, endDate]);

  const getStatusInfo = (room: CourtRoom) => {
    const timeStatus = getTimeStatus(room.startTime, room.endTime);
    const isOnline = room.onOffFlag;
    
    if (!isOnline) {
      return { color: colors.offline, text: '비공개', icon: 'lock' as const };
    }
    
    switch (timeStatus) {
      case 'upcoming':
        return { color: colors.primary, text: '예정', icon: 'schedule' as const };
      case 'active':
        return { color: colors.success, text: '진행중', icon: 'play-circle' as const };
      case 'ended':
        return { color: colors.textTertiary, text: '종료', icon: 'check-circle' as const };
      default:
        return { color: colors.primary, text: '공개', icon: 'public' as const };
    }
  };

  const renderItem = ({ item }: { item: CourtRoom }) => {
    const isExpanded = expandedIds.includes(item.id);
    const statusInfo = getStatusInfo(item);
    const timeStatus = getTimeStatus(item.startTime, item.endTime);
    const canEnter = item.onOffFlag && timeStatus !== 'ended';

    return (
      <Animated.View style={[styles.cardContainer, { marginHorizontal: 16 }]}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={[
            styles.card,
            { backgroundColor: colors.surfaceElevated, borderColor: colors.border }
          ]}
          activeOpacity={0.95}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.color + '20' }]}>
              <MaterialIcons name={statusInfo.icon} size={16} color={statusInfo.color} />
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.expandButton}>
              <MaterialIcons 
                name={isExpanded ? "expand-less" : "expand-more"} 
                size={24} 
                color={colors.textSecondary} 
                onPress={() => toggleExpand(item.id)}
              />
            </TouchableOpacity>
          </View>

          {/* Main Info */}
          <View style={styles.cardContent}>
            <View style={styles.courtInfo}>
              <MaterialIcons name="sports-tennis" size={24} color={colors.primary} />
              <View style={styles.courtDetails}>
                <Text style={[styles.courtTitle, { color: colors.text }]}>
                  코트 {item.courtId} • {item.type}
                </Text>
                <Text style={[styles.courtSubtitle, { color: colors.textSecondary }]}>
                  호스트: {item.hostId}
                </Text>
              </View>
            </View>

            <View style={styles.ntrpContainer}>
              <View style={[styles.ntrpBadge, { backgroundColor: colors.surface }]}>
                <Text style={[styles.ntrpText, { color: colors.text }]}>
                  NTRP {item.ntrpMin} - {item.ntrpMax}
                </Text>
              </View>
            </View>
          </View>

          {/* Time Info */}
          <View style={styles.timeContainer}>
            <View style={styles.timeRow}>
              <MaterialIcons name="access-time" size={16} color={colors.textSecondary} />
              <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                {formatDateTime(item.startTime)} {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </Text>
            </View>
          </View>

          {/* Expanded Content */}
          {isExpanded && (
            <View style={[styles.expandedContent, { borderTopColor: colors.borderLight }]}>
              <View style={styles.detailRow}>
                <MaterialIcons name="event" size={18} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  생성일: {formatDateTime(item.createdDate)}
                </Text>
              </View>
              
              {item.detail && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="description" size={18} color={colors.textSecondary} />
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    {item.detail}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                disabled={!canEnter}
                style={[
                  styles.enterButton,
                  {
                    backgroundColor: canEnter ? colors.primary : colors.border,
                    opacity: canEnter ? 1 : 0.6,
                  }
                ]}
                onPress={() => handleEnter(item.id)}
                activeOpacity={canEnter ? 0.8 : 1}
              >
                <MaterialIcons 
                  name={canEnter ? "login" : "block"} 
                  size={18} 
                  color="#FFFFFF" 
                />
                <Text style={styles.enterButtonText}>
                  {canEnter ? '매칭룸 입장' : timeStatus === 'ended' ? '종료된 매칭' : '입장 불가'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const handleLoadMore = () => {
    if (hasNext && !loading && !refreshing) {
      fetchCourts(page + 1);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
        {([
          { key: 'all', label: '전체', icon: 'view-list' },
          { key: 'online', label: '공개', icon: 'public' },
          { key: 'offline', label: '비공개', icon: 'lock' }
        ] as const).map(({ key, label, icon }) => (
          <TouchableOpacity
            key={key}
            onPress={() => setTab(key)}
            style={[
              styles.tab,
              tab === key && { backgroundColor: colors.primary + '20' }
            ]}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name={icon} 
              size={20} 
              color={tab === key ? colors.primary : colors.textSecondary} 
            />
            <Text style={[
              styles.tabText,
              { color: tab === key ? colors.primary : colors.textSecondary }
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          onPress={() => setShowPicker('start')}
          style={[styles.dateFilter, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <MaterialIcons name="event" size={18} color={colors.textSecondary} />
          <Text style={[styles.filterText, { color: colors.text }]}>
            {startDate ? startDate.toLocaleDateString('ko-KR') : '시작일'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setShowPicker('end')}
          style={[styles.dateFilter, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <MaterialIcons name="event" size={18} color={colors.textSecondary} />
          <Text style={[styles.filterText, { color: colors.text }]}>
            {endDate ? endDate.toLocaleDateString('ko-KR') : '종료일'}
          </Text>
        </TouchableOpacity>

        {(startDate || endDate) && (
          <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
            <MaterialIcons name="clear" size={18} color={colors.error} />
            <Text style={[styles.resetText, { color: colors.error }]}>초기화</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Stats */}
      {/* <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          총 {filteredList.length}개의 매칭룸
        </Text>
      </View> */}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="sports-tennis" size={64} color={colors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>매칭룸이 없습니다</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        새로운 매칭룸을 생성해보세요
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          더 많은 매칭룸 불러오는 중...
        </Text>
      </View>
    );
  };

  if (initialLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary, marginTop: 16 }]}>
          매칭룸 목록을 불러오는 중...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        backgroundColor={colors.background} 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
      />
      
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            progressBackgroundColor={colors.surface}
          />
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.9}
      >
        <MaterialIcons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(null);
            if (selectedDate) {
              showPicker === 'start' ? setStartDate(selectedDate) : setEndDate(selectedDate);
            }
          }}
        />
      )}

      {/* Modal */}
      <GenerateCourtRoomScreen 
        visible={showModal} 
        onClose={() => setShowModal(false)}
        onSuccess={(room) => {
          setShowModal(false);
          handleRefresh();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    marginTop: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  dateFilter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  statsText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  expandButton: {
    padding: 4,
  },
  cardContent: {
    marginBottom: 12,
  },
  courtInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  courtDetails: {
    flex: 1,
    marginLeft: 12,
  },
  courtTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  courtSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  ntrpContainer: {
    alignItems: 'flex-start',
  },
  ntrpBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ntrpText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeContainer: {
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  expandedContent: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 12,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    flex: 1,
  },
  enterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  loadingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00C896',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});