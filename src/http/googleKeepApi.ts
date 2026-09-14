import {
  LoginResponse,
  RegisterResponse,
  User,
} from "../components/types/Auth";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import httpClient from "./httpClient";
import { Note } from "../components/types/Note";
import { ApiResponse } from "../components/types/ApiResponse";
import { noteColorsImportant } from "../components/types/colors";

const handleError = <T>(error: unknown, result: ApiResponse<T>) => {
  const AxiosError = error as AxiosError<{ message?: string }>;
  const message =
    AxiosError.response?.data?.message || "Ocurrio un error inesperado";
  result.message = message;
  toast.error(message);
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

  async GetMe(): Promise<ApiResponse<User>> {
    const result: ApiResponse<User> = {
      data: null,
      message: "",
    };

    try {
      const response = await httpClient.get({
        url: "/auth/me",
      });

      result.data = response.data;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async UpdateUsernameProfile(username: string): Promise<ApiResponse<User>> {
    const result: ApiResponse<User> = {
      data: null,
      message: "",
    };

    try {
      const response = await httpClient.patch({
        url: "/auth/update-username-profile",
        body: { username },
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

  async UpdatePasswordProfile(
    currentPassword: string,
    newPassword: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const result: ApiResponse<{ message: string }> = {
      data: null,
      message: "",
    };

    try {
      const response = await httpClient.patch({
        url: "/auth/update-password-profile",
        body: { currentPassword, newPassword },
      });

      const { message } = response.data;
      result.data = { message };
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  //Notes Api

  async GetNotes(): Promise<ApiResponse<Note[]>> {
    const result: ApiResponse<Note[]> = {
      data: null,
      message: "",
    };

    try {
      const response = await httpClient.get({ url: "/notes" });

      result.data = response.data;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async CreateNotes(
    title: string,
    content: string,
    archived: boolean,
    trashed: boolean,
    importance: noteColorsImportant,
  ): Promise<ApiResponse<Note>> {
    const result: ApiResponse<Note> = {
      data: null,
      message: "",
    };
    try {
      const response = await httpClient.post({
        url: "/notes",
        body: { title, content, archived, trashed, importance },
      });

      result.data = response.data;

      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async UpdateNotes(
    id: string,
    updates: Partial<Note>,
  ): Promise<ApiResponse<Note>> {
    const result: ApiResponse<Note> = {
      data: null,
      message: "",
    };
    try {
      const response = await httpClient.patch({
        url: `/notes/${id}`,
        body: {
          ...updates,
        },
      });

      result.data = response.data;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async DeleteNotes(id: string): Promise<ApiResponse<{ message: string }>> {
    const result: ApiResponse<{ message: string }> = {
      data: null,
      message: "",
    };
    try {
      const response = await httpClient.delete({ url: `/notes/${id}` });
      const { message } = response.data;
      result.data = { message };
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }
}

export default new googleKeepApi();
