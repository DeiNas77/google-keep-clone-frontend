"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "@/src/constant";
import type { User } from "../types/Auth";
import { getInitialUser } from "@/src/helper/getInitialUser";

interface AuthContextProps {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  register: (user: User, token: string) => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getInitialUser());
    setIsLoading(false);
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setUser(null);
  };

  const register = (user: User, token: string) => login(user, token);

  const updateUser = (userData: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
