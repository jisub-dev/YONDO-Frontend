import React from 'react';
import { createContext, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext({
  signIn: (token: string) => {},
  signOut: () => {},
  session: null as string | null,
  isLoading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (token) => setSession(token),
        signOut: () => setSession(null),
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  return useContext(AuthContext);
}
