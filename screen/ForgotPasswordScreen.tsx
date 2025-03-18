import { Text, View } from 'react-native';

interface ForgotProps {
  togglePage: (toPage: string) => void;
}

export default function ForgotScreen({ togglePage }: ForgotProps) {
  return (
    <View>
      <Text>Forgot page</Text>
    </View>
  );
}
