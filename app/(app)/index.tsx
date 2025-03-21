import { Text, View } from 'react-native';

import { useSession } from '../../context/SessionProvider';
import { useAuth } from '@/api/auth';

export default function Index() {
  const { logoutUser } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={logoutUser}>Sign Out</Text>
    </View>
  );
}
