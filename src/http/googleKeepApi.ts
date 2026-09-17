import {
  LoginResponse,
  RegisterResponse,
  User,
} from "../components/types/Auth";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import httpClient from "./httpClient";
import { GetNotesResponse, Note } from "../components/types/Note";
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

  async GetNotes(params: {
    q?: string;
    page?: number;
    limit?: number;
    archived?: boolean;
    trashed?: boolean;
  } = {}): Promise<ApiResponse<GetNotesResponse>> {
    const result: ApiResponse<GetNotesResponse> = {
      data: null,
      message: "",
    };

    try {
      const searchParams = new URLSearchParams();
      if (params.q !== undefined) searchParams.append("q", params.q);
      if (params.page !== undefined)
        searchParams.append("page", String(params.page));
      if (params.limit !== undefined)
        searchParams.append("limit", String(params.limit));
      if (params.archived !== undefined)
        searchParams.append("archived", String(params.archived));
      if (params.trashed !== undefined)
        searchParams.append("trashed", String(params.trashed));

      const query = searchParams.toString();
      const url = query ? `/notes?${query}` : "/notes";

      const response = await httpClient.get({ url });

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
      result.message = response.data?.message ?? "";

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

      const { message, ...noteData } = response.data;
      result.data = noteData;
      result.message = message;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async DeleteNoteById(id: string): Promise<ApiResponse<{ message: string }>> {
    const result: ApiResponse<{ message: string }> = {
      data: null,
      message: "",
    };
    try {
      const response = await httpClient.delete({ url: `/notes/${id}` });
      const { message } = response.data;
      result.data = { message };
      result.message = message;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }

  async DeleteTrashedNotes(): Promise<ApiResponse<{ message: string }>> {
    const result: ApiResponse<{ message: string }> = {
      data: null,
      message: "",
    };
    try {
      const response = await httpClient.delete({ url: "/notes/trash" });
      const { message } = response.data;
      result.data = { message };
      result.message = message;
      return result;
    } catch (error) {
      return handleError(error, result);
    }
  }
}

export default new googleKeepApi();
