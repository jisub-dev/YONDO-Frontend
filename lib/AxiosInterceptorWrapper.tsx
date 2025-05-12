import { ReactNode, useEffect } from 'react';
import { useAxiosInterceptor } from '@/lib/axiosInterceptor';

export default function AxiosInterceptorWrapper({ children }: { children: ReactNode }) {
  console.log('🚀 AxiosInterceptorWrapper 실행됨');
  useAxiosInterceptor(); // ✅ 세션 context 접근 가능!
  return <>{children}</>;
}