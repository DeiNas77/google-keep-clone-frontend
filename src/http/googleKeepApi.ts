import {
  ApiResponse,
  LoginResponse,
  RegisterResponse,
} from "../components/types/Auth";
import type { AxiosError } from "axios";
import httpClient from "./httpClient";

const handleError = <T>(error: unknown, result: ApiResponse<T>) => {
  const AxiosError = error as AxiosError<{ message?: string }>;
  const message =
    AxiosError.response?.data?.message || "Ocurrio un error inesperado";
  result.message = message;
  return result;
};

class googleKeepApi {
  async Register(
    username: string,
    email: string,
    password: string,
    avatarUrl?: string,
  ): Promise<ApiResponse<RegisterResponse>> {
    const result: ApiResponse<RegisterResponse> = {
      data: null,
      message: "",
    };
    try {
      const response = await httpClient.post({
        url: "/auth/register",
        body: { username, email, password, avatarUrl },
      });

      const {
        id,
        username: userUsername,
        email: userEmail,
        avatarUrl: userAvatarUrl,
        message,
      } = response.data;

      result.data = {
        id,
        username: userUsername,
        email: userEmail,
        avatarUrl: userAvatarUrl,
      };

      result.message = message;

      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async Login(
    identifier: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> {
    const result: ApiResponse<LoginResponse> = {
      data: null,
      message: "",
    };

    try {
      const response = await httpClient.post({
        url: "/auth/login",
        body: { identifier, password },
      });

      const { token, user, message } = response.data;

      result.data = {
        token,
        user,
      };

      result.message = message;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }
}

export default googleKeepApi;
