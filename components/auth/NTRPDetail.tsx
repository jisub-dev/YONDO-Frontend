import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function NTRPDetail() {
  const theme = useColorScheme();
  return (
    <View
      style={
        theme === 'dark' ? styles.darkTextWrapper : styles.lightTextWrapper
      }
    >
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        0.1 : 나는 레드 볼 강습 중이다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        0.5 : 나는 오렌지 볼 강습 중이다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        0.7 : 나는 그린 볼 강습 중이다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        1.0 : 나는 옐로우 볼 강습 중이고, 테니스 라켓을 처음 잡아봤다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        1.5 : 나는 경험이 부족한 테린이다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        2.0 : 스윙이 불 안정해서 원하는 곳으로 못 보낸다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        2.5 : 어느 정도 폼이 갖춰졌다. 보통 세기의 볼은 칠 수 있다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        3.0 : 원하는 곳으로 보내지만 길이 조절은 불가능 하다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        3.5 : 안정성/거리/길이/스핀까지 적용 가능하다.
      </Text>
      <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>
        4.0 : 나는 테니스 고수이다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  darkTextWrapper: {
    marginTop: 10,
    paddingLeft: 5,
  },
  lightTextWrapper: {
    marginTop: 15,
    paddingLeft: 5,
  },
  lightText: {
    fontSize: 13,
    // marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
  },
  darkText: {
    fontSize: 13,
    // marginBottom: 8,
    color: '#f5f5f5',
    alignSelf: 'flex-start',
  },
});
