import React from 'react';
import { createContext, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

type SessionType = {
  token: string | null;
  RT: string | null;
}

const AuthContext = createContext({
  signIn: (session: SessionType) => {},
  signOut: () => {},
  session: {
    token: null,
    RT: null,
  } as SessionType | null,
  isLoading: true,
});

interface SignInParamsType {
  token: string | null;
  RT: string | null;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [[isLoading, session], setSession] = useStorageState('session');

  // const signIn = ({token, RT}: SignInParamsType) => (
  //   setSession({token, RT})
  // )

  return (
    <AuthContext.Provider
      value={{
        signIn: (session: SessionType) => {
          console.log(`✅ SignIn 함수 호출 완료 ${session}`);
          console.log(session);
          setSession(session);
        },
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
