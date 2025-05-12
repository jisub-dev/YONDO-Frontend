import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useStorageState } from '@/hooks/useStorageState';

export type SessionType = {
  token: string | null;
  RT: string | null;
  user: any | null; // 필요시 정확한 타입으로 교체
};

type SessionContextType = {
  session: SessionType | null;
  isLoading: boolean;
  setSession: (value: SessionType | null) => void;
  signIn: (newSession: SessionType) => void;
  logoutUser: (identifier?: string) => void;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: true,
  setSession: () => {},
  signIn: () => {},
  logoutUser: () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = (newSession: SessionType) => {
    console.log('✅ signIn 호출됨');
    setSession(newSession);
  };

  const logoutUser = (identifier?: string) => {
    console.log(`🚪 로그아웃: ${identifier}`);
    setSession(null);
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        isLoading,
        setSession,
        signIn,
        logoutUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);