import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const theme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === 'dark' ? '#32CD32' : '#32CD32',
        tabBarActiveBackgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff', // 전체 tab bar 배경 (비활성 탭 포함)
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '매칭',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name='home' color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='reservation'
        options={{
          title: '예약내역',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name='bars' color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='personalTraining'
        options={{
          title: 'PT',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name='calendar' color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='myPage'
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={23} name='user' color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
