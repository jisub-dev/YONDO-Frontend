import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModalSelect from '../common/ModalSelect';
import { refundBankList, RefundBankType } from '@/screen/RegisterScreen';

interface BankPickerProps {
  refundBank: RefundBankType;
  setRefundBank: React.Dispatch<React.SetStateAction<RefundBankType>>;
}

export default function BankPicker({
  refundBank,
  setRefundBank,
}: BankPickerProps) {

  return (
    <ModalSelect
      label=''
      value={refundBank}
      options={refundBankList}
      onChange={(val) => setRefundBank(val as RefundBankType)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
