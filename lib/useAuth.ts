'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    id: string;
    email: string;
  };
}

export function useAuth(): AuthState {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check authentication status from localStorage or session
    const checkAuth = async () => {
      try {
        // Simulate auth check - in production, call your API
        const authToken = localStorage.getItem('auth_token');
        const userEmail = localStorage.getItem('user_email');

        if (authToken && userEmail) {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: {
              id: 'usr_12345',
              email: userEmail,
            },
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
          });
          // Redirect to login with returnTo param
          router.push(`/auth/login?returnTo=${window.location.pathname}`);
        }
      } catch (error) {
        console.error('[v0] Auth check failed:', error);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
        });
        router.push(`/auth/login?returnTo=${window.location.pathname}`);
      }
    };

    checkAuth();
  }, [router]);

  return authState;
}

export function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push(`/auth/login?returnTo=${window.location.pathname}`);
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  return auth;
}
