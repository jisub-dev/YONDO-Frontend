// export default function PhoneInput() {
//   return (
//     <View style={styles.phoneContainer}>
//     <Text style={theme === 'dark' ? styles.darkLabel : styles.lightLabel}>
//       전화번호
//     </Text>
//     <View style={styles.phoneInputsContainer}>
//       <View
//         style={[
//           theme === 'dark'
//             ? styles.darkPickerWrapper
//             : styles.lightPickerWrapper,
//           styles.phonePrefixPicker,
//         ]}
//       >
//         <Picker
//           selectedValue={phonePrefix}
//           onValueChange={(itemValue) =>
//             setPhonePrefix(itemValue as '010' | '012' | '013' | '015')
//           }
//           dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
//           style={
//             theme === 'dark' ? styles.darkPicker : styles.lightPicker
//           }
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item
//             label='010'
//             value='010'
//             color={
//               Platform.OS === 'ios'
//                 ? theme === 'dark'
//                   ? '#fff'
//                   : '#000'
//                 : undefined
//             }
//           />
//           <Picker.Item
//             label='013'
//             value='013'
//             color={
//               Platform.OS === 'ios'
//                 ? theme === 'dark'
//                   ? '#fff'
//                   : '#000'
//                 : undefined
//             }
//           />
//           <Picker.Item
//             label='015'
//             value='015'
//             color={
//               Platform.OS === 'ios'
//                 ? theme === 'dark'
//                   ? '#fff'
//                   : '#000'
//                 : undefined
//             }
//           />
//         </Picker>
//       </View>
//       <Text
//         style={
//           theme === 'dark'
//             ? styles.darkPhoneSeparator
//             : styles.lightPhoneSeparator
//         }
//       >
//         -
//       </Text>
//       <TextInput
//         style={[
//           theme === 'dark'
//             ? styles.darkPhoneInput
//             : styles.lightPhoneInput,
//           styles.phoneInput,
//         ]}
//         placeholder='0000'
//         keyboardType='numeric'
//         value={phonePart1}
//         onChangeText={(text) =>
//           setPhonePart1(text.replace(/[^0-9]/g, '').slice(0, 4))
//         }
//         maxLength={4}
//         placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
//       />
//       <Text
//         style={
//           theme === 'dark'
//             ? styles.darkPhoneSeparator
//             : styles.lightPhoneSeparator
//         }
//       >
//         -
//       </Text>
//       <TextInput
//         style={[
//           theme === 'dark'
//             ? styles.darkPhoneInput
//             : styles.lightPhoneInput,
//           styles.phoneInput,
//         ]}
//         placeholder='0000'
//         keyboardType='numeric'
//         value={phonePart2}
//         onChangeText={(text) =>
//           setPhonePart2(text.replace(/[^0-9]/g, '').slice(0, 4))
//         }
//         maxLength={4}
//         placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
//       />
//     </View>
//   </View>
//   )
// }