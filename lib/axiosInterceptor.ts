import { useEffect } from 'react';
import { api } from './axiosInstance';
import { useSession } from '@/context/SessionProvider';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    token ? prom.resolve(token) : prom.reject(error);
  });
  failedQueue = [];
};

export const useAxiosInterceptor = () => {
  const { session, isLoading, setSession, logoutUser } = useSession();

  useEffect(() => {
    console.log('--- 인터셉터 useEffect 실행 ---');
    console.log('📦 isLoading:', isLoading, '/ token:', session?.token);

    if (isLoading || !session?.token) {
      console.log('* 세션 로딩 중이거나 없음 → 인터셉터 등록 생략');
      return;
    }

    const requestInterceptor = api.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${session.token}`;
      console.log('✅ 요청에 토큰 포함됨:', config.headers.Authorization);
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      res => res,
      async err => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
              })
              .catch(e => Promise.reject(e));
          }

          isRefreshing = true;
          try {
            const res = await api.post(`/api/tokens/refresh`, { RT: session.RT });
            const newToken = res.data.token;
            const newRT = res.data.RT;

            await setSession({
              token: newToken,
              RT: newRT,
              user: session.user,
            });

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            logoutUser();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [isLoading, session?.token]);
};