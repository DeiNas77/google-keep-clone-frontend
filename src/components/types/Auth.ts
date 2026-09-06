export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type RegisterResponse = User;

export interface ApiResponse<T> {
  data: T | null;
  message: string;
}

