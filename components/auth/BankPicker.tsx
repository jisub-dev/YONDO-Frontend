import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModalSelect from '../common/ModalSelect';
import { RefundBankType } from '@/screen/RegisterScreen';

interface BankPickerProps {
  refundBank: RefundBankType;
  setRefundBank: React.Dispatch<React.SetStateAction<RefundBankType>>;
}

export default function BankPicker({
  refundBank,
  setRefundBank,
}: BankPickerProps) {
  const bankOptions: RefundBankType[] = [
    'KB국민은행',
    '우리은행',
    '신한은행',
    '하나은행',
    '광주은행',
    '경남은행',
    '대구은행',
    '부산은행',
    '전북은행',
    '제주은행',
    '카카오뱅크',
    '케이뱅크',
    '토스뱅크',
    '농협은행',
    'IBK기업은행',
  ];

  return (
    <ModalSelect
      label=''
      value={refundBank}
      options={bankOptions}
      onChange={(val) => setRefundBank(val as RefundBankType)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
