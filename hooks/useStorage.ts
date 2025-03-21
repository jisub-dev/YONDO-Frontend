import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DeviceInfo from 'react-native-device-info';

// ✅ SecureStore를 동적으로 불러오기
const SecureStore = Platform.OS !== 'web' ? require('expo-secure-store') : null;

async function isRunningOnEmulator() {
  return await DeviceInfo.isEmulator();
}

export async function setStorageItem(key: string, value: string | null) {
  try {
    if (Platform.OS !== 'web') {
      const isEmulator = await isRunningOnEmulator();
      if (
        !isEmulator &&
        SecureStore &&
        (await SecureStore.isAvailableAsync())
      ) {
        if (value == null) {
          await SecureStore.deleteItemAsync(key);
        } else {
          await SecureStore.setItemAsync(key, value);
        }
        return;
      }
    }
    // ✅ 에뮬레이터 또는 웹인 경우 AsyncStorage 사용
    if (value == null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    console.error('Storage Error:', e);
  }
}

export async function getStorageItem(key: string) {
  try {
    if (Platform.OS !== 'web' && (await SecureStore.isAvailableAsync())) {
      return await SecureStore.getItemAsync(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  } catch (e) {
    console.error('Storage Error:', e);
    return null;
  }
}

export async function removeStorageItem(key: string) {
  try {
    if (Platform.OS !== 'web' && (await SecureStore.isAvailableAsync())) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (e) {
    console.error('Storage Error:', e);
  }
}
