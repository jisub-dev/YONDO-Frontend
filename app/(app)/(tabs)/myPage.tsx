// import { View, Text, StyleSheet, useColorScheme } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// export default function Tab() {
//   const theme = useColorScheme();

//   return (
//     <View
//       style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}
//     >
//       {/* <StatusBar style="light" /> */}
//       <Text>my page</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   darkContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//   },
//   lightContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
// });

import { getStorageItem } from '@/hooks/useStorage';
import { useFocusEffect } from 'expo-router';
import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Tab() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };


  return (
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};