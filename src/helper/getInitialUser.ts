import { User } from "../components/types/Auth";
import { LOCAL_STORAGE_KEYS } from "../constant";

export const getInitialUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};
