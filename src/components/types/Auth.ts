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
