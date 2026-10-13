"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearAccessToken,
  getAccessToken,
  type AuthenticatedUser,
  type LoginResponse,
  setAccessToken,
} from "@/lib/auth";
import { apiFetch } from "@/lib/api";

type AuthContextValue = {
  user: AuthenticatedUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void Promise.resolve().then(() => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      return apiFetch<AuthenticatedUser>("/v1/auth/me")
        .then((authenticatedUser) => {
          if (isMounted) {
            setToken(accessToken);
            setUser(authenticatedUser);
          }
        })
        .catch(() => {
          clearAccessToken();
          if (isMounted) {
            setToken(null);
            setUser(null);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiFetch<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setAccessToken(response.access_token, response.expires_in);
    setToken(response.access_token);
    setUser(response.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch<{ mensaje: string }>("/v1/auth/logout", {
        method: "POST",
      });
    } finally {
      clearAccessToken();
      setToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isLoading,
    }),
    [isLoading, login, logout, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }
  return context;
}
