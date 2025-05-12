import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '../../context/SessionProvider';
import { StatusBar } from 'expo-status-bar';
import { useAxiosInterceptor } from '@/lib/axiosInterceptor';

const IS_DEVELOPMENT_AUTH = process.env.EXPO_PUBLIC_IS_DEVELOP_AUTH;

export default function AppLayout() {
  const { session, isLoading } = useSession();
  
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading && IS_DEVELOPMENT_AUTH !== 'true') {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (
    !session
    // && IS_DEVELOPMENT_AUTH !== 'true'
  ) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
