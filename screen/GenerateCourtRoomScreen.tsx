// screens/GenerateCourtRoomScreen.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  useColorScheme,
  ScrollView,
  Switch,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '@/lib/axiosInstance';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: (room: any) => void;
}

const { width } = Dimensions.get('window');
const ntrpOptions = Array.from({ length: 10 }, (_, i) => (i * 0.5).toFixed(1));

export default function GenerateCourtRoomScreen({ visible, onClose, onSuccess }: Props) {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  
  const [courtId, setCourtId] = useState(1);
  const [type, setType] = useState('2인 단식');
  const [ntrpMin, setNtrpMin] = useState('0.0');
  const [ntrpMax, setNtrpMax] = useState('4.5');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [onOffFlag, setOnOffFlag] = useState(true);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    // 유효성 검사
    if (startTime >= endTime) {
      Alert.alert('시간 오류', '종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    if (Number(ntrpMin) > Number(ntrpMax)) {
      Alert.alert('NTRP 오류', '최소 NTRP는 최대 NTRP보다 작아야 합니다.');
      return;
    }

    setIsLoading(true);
    try {
      const body = {
        courtId,
        type,
        ntrpMin: Number(ntrpMin),
        ntrpMax: Number(ntrpMax),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        onOffFlag,
      };
      const res = await api.post('/api/court', body);
      Alert.alert('생성 완료', res.data.message || '매칭룸이 성공적으로 생성되었습니다', [
        { text: '확인', onPress: () => onSuccess(res.data.room) }
      ]);
    } catch (err: any) {
      Alert.alert('생성 실패', err?.response?.data?.message || '매칭룸 생성 중 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal visible={visible} transparent animationType='slide' statusBarTranslucent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, isDark ? styles.darkContainer : styles.lightContainer]}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Ionicons 
                name="tennisball" 
                size={24} 
                color="#00C851" 
                style={styles.headerIcon}
              />
              <Text style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>
                매칭룸 생성
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={isDark ? '#fff' : '#666'} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 코트 선택 */}
            <View style={styles.section}>
              <View style={styles.labelContainer}>
                <Ionicons name="location" size={16} color="#00C851" />
                <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                  테니스 코트
                </Text>
              </View>
              <View style={[styles.pickerContainer, isDark ? styles.pickerDark : styles.pickerLight]}>
                <Picker 
                  selectedValue={courtId} 
                  onValueChange={setCourtId}
                  style={styles.picker}
                  dropdownIconColor={isDark ? '#fff' : '#666'}
                >
                  {courtOptions.map(court => (
                    <Picker.Item 
                      key={court.id} 
                      label={court.name}
                      value={court.id}
                      color={isDark ? '#fff' : '#000'}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* 매칭 유형 */}
            <View style={styles.section}>
              <View style={styles.labelContainer}>
                <Ionicons name="people" size={16} color="#00C851" />
                <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                  매칭 유형
                </Text>
              </View>
              <View style={styles.typeButtonsContainer}>
                {['2인 단식', '4인 복식', '혼합 복식'].map((gameType) => (
                  <TouchableOpacity
                    key={gameType}
                    style={[
                      styles.typeButton,
                      type === gameType && styles.typeButtonActive,
                      isDark ? styles.typeButtonDark : styles.typeButtonLight
                    ]}
                    onPress={() => setType(gameType)}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      type === gameType && styles.typeButtonTextActive,
                      isDark ? styles.typeButtonTextDark : styles.typeButtonTextLight
                    ]}>
                      {gameType}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* NTRP 범위 */}
            <View style={styles.section}>
              <View style={styles.labelContainer}>
                <Ionicons name="stats-chart" size={16} color="#00C851" />
                <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                  NTRP 레벨 범위
                </Text>
              </View>
              <View style={styles.ntrpContainer}>
                <View style={styles.ntrpItem}>
                  <Text style={[styles.ntrpSubLabel, isDark ? styles.labelDark : styles.labelLight]}>
                    최소
                  </Text>
                  <View style={[styles.ntrpPickerContainer, isDark ? styles.pickerDark : styles.pickerLight]}>
                    <Picker
                      selectedValue={ntrpMin}
                      onValueChange={setNtrpMin}
                      style={styles.ntrpPicker}
                    >
                      {ntrpOptions.map(val => (
                        <Picker.Item 
                          key={val} 
                          label={val} 
                          value={val}
                          color={isDark ? '#fff' : '#000'}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.ntrpSeparator}>
                  <Text style={[styles.ntrpSeparatorText, isDark ? styles.labelDark : styles.labelLight]}>
                    ~
                  </Text>
                </View>
                <View style={styles.ntrpItem}>
                  <Text style={[styles.ntrpSubLabel, isDark ? styles.labelDark : styles.labelLight]}>
                    최대
                  </Text>
                  <View style={[styles.ntrpPickerContainer, isDark ? styles.pickerDark : styles.pickerLight]}>
                    <Picker
                      selectedValue={ntrpMax}
                      onValueChange={setNtrpMax}
                      style={styles.ntrpPicker}
                    >
                      {ntrpOptions.map(val => (
                        <Picker.Item 
                          key={val} 
                          label={val} 
                          value={val}
                          color={isDark ? '#fff' : '#000'}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>

            {/* 시간 설정 */}
            <View style={styles.section}>
              <View style={styles.labelContainer}>
                <Ionicons name="time" size={16} color="#00C851" />
                <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                  경기 시간
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.timeButton, isDark ? styles.timeButtonDark : styles.timeButtonLight]}
                onPress={() => setShowStartPicker(true)}
              >
                <View style={styles.timeContent}>
                  <Text style={[styles.timeLabel, isDark ? styles.timeLabelDark : styles.timeLabelLight]}>
                    시작 시간
                  </Text>
                  <Text style={[styles.timeValue, isDark ? styles.timeValueDark : styles.timeValueLight]}>
                    {formatDateTime(startTime)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={isDark ? '#ccc' : '#666'} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.timeButton, isDark ? styles.timeButtonDark : styles.timeButtonLight]}
                onPress={() => setShowEndPicker(true)}
              >
                <View style={styles.timeContent}>
                  <Text style={[styles.timeLabel, isDark ? styles.timeLabelDark : styles.timeLabelLight]}>
                    종료 시간
                  </Text>
                  <Text style={[styles.timeValue, isDark ? styles.timeValueDark : styles.timeValueLight]}>
                    {formatDateTime(endTime)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={isDark ? '#ccc' : '#666'} />
              </TouchableOpacity>
            </View>

            {/* 공개 설정 */}
            <View style={styles.section}>
              <View style={styles.visibilityContainer}>
                <View style={styles.visibilityContent}>
                  <View style={styles.labelContainer}>
                    <Ionicons 
                      name={onOffFlag ? "globe" : "lock-closed"} 
                      size={16} 
                      color="#00C851" 
                    />
                    <Text style={[styles.label, isDark ? styles.labelDark : styles.labelLight]}>
                      공개 설정
                    </Text>
                  </View>
                  <Text style={[styles.visibilityDescription, isDark ? styles.descriptionDark : styles.descriptionLight]}>
                    {onOffFlag ? '다른 사용자가 검색하고 참여할 수 있습니다' : '초대받은 사용자만 참여할 수 있습니다'}
                  </Text>
                </View>
                <Switch 
                  value={onOffFlag} 
                  onValueChange={setOnOffFlag}
                  trackColor={{ false: '#ccc', true: '#00C851' }}
                  thumbColor={onOffFlag ? '#fff' : '#f4f3f4'}
                  ios_backgroundColor="#ccc"
                />
              </View>
            </View>

            {/* DateTimePicker */}
            {showStartPicker && (
              <DateTimePicker
                value={startTime}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, date) => {
                  setShowStartPicker(false);
                  if (date) setStartTime(date);
                }}
                minimumDate={new Date()}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={endTime}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(_, date) => {
                  setShowEndPicker(false);
                  if (date) setEndTime(date);
                }}
                minimumDate={startTime}
              />
            )}
          </ScrollView>

          {/* 하단 버튼 */}
          <View style={[styles.footer, isDark ? styles.footerDark : styles.footerLight]}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.createButton, isLoading && styles.createButtonDisabled]}
              onPress={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.createButtonText}>생성 중...</Text>
              ) : (
                <>
                  <Ionicons name="add" size={16} color="#fff" style={{ marginRight: 4 }} />
                  <Text style={styles.createButtonText}>매칭룸 생성</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '70%',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 200, 81, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleLight: {
    color: '#1a1a1a',
  },
  titleDark: {
    color: '#fff',
  },
  closeButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  labelLight: {
    color: '#1a1a1a',
  },
  labelDark: {
    color: '#fff',
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pickerLight: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  pickerDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#404040',
  },
  picker: {
    height: 50,
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  typeButtonLight: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  typeButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#404040',
  },
  typeButtonActive: {
    backgroundColor: 'rgba(0, 200, 81, 0.1)',
    borderColor: '#00C851',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonTextLight: {
    color: '#666',
  },
  typeButtonTextDark: {
    color: '#ccc',
  },
  typeButtonTextActive: {
    color: '#00C851',
    fontWeight: '600',
  },
  ntrpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ntrpItem: {
    flex: 1,
  },
  ntrpSubLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  ntrpPickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  ntrpPicker: {
    height: 50,
  },
  ntrpSeparator: {
    alignItems: 'center',
    paddingTop: 20,
  },
  ntrpSeparatorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  timeButtonLight: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  timeButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#404040',
  },
  timeContent: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeLabelLight: {
    color: '#666',
  },
  timeLabelDark: {
    color: '#ccc',
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeValueLight: {
    color: '#1a1a1a',
  },
  timeValueDark: {
    color: '#fff',
  },
  visibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibilityContent: {
    flex: 1,
    marginRight: 16,
  },
  visibilityDescription: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  descriptionLight: {
    color: '#666',
  },
  descriptionDark: {
    color: '#ccc',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  footerLight: {
    borderTopColor: '#e9ecef',
  },
  footerDark: {
    borderTopColor: '#404040',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  createButton: {
    backgroundColor: '#00C851',
    shadowColor: '#00C851',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

// 실제 테니스 코트 데이터
const courtOptions = [
  { id: 1, name: '중앙 코트 A - 하드코트' },
  { id: 2, name: '중앙 코트 B - 하드코트' },
  { id: 3, name: '사이드 코트 1 - 클레이코트' },
  { id: 4, name: '사이드 코트 2 - 클레이코트' },
  { id: 5, name: '연습 코트 1 - 인조잔디' },
  { id: 6, name: '연습 코트 2 - 인조잔디' },
  { id: 7, name: '실내 코트 A - 하드코트' },
  { id: 8, name: '실내 코트 B - 하드코트' },
  { id: 9, name: 'VIP 코트 - 프리미엄 하드코트' },
  { id: 10, name: '토너먼트 코트 - 하드코트' }
];