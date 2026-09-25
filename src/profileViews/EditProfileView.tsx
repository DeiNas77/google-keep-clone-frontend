"use client";

import { useState } from "react";
import { User, Camera, Loader2 } from "lucide-react";
import googleKeepApi from "@/src/http/googleKeepApi";
import { useAuth } from "@/src/components/context/AuthContext";

export const EditProfileView = ({
  initialUsername,
}: {
  initialUsername: string;
}) => {
  const { updateUser } = useAuth();
  const [username, setUsername] = useState(initialUsername);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!username.trim()) {
      setError("El usuario no puede estar vacío");
      return;
    }

    setIsLoading(true);
    const response = await googleKeepApi.UpdateUsernameProfile(username.trim());

    if (!response.data) {
      setError(response.message);
      setIsLoading(false);
      return;
    }

    updateUser(response.data);
    setSuccess(response.message || "Perfil actualizado");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="w-full text-left text-2xl font-semibold text-white tracking-tight">
        Editar perfil
      </h1>
      <p className="w-full text-left text-sm text-white/50">
        Actualiza la información visible de tu cuenta
      </p>

      {/* Avatar */}
      <div className="w-full mt-6 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/15 flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-white/40" />
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border-2 border-(--primary-color) flex items-center justify-center cursor-pointer transition-colors">
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAvatarUrl(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>
        <p className="text-xs text-white/40">
          La subida real al backend llega en una fase futura
        </p>
      </div>

      {/* Form */}
      <div className="w-full flex flex-col gap-4">
        <div className="text-left">
          <label className="block text-sm text-white/70 mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm text-center">{success}</p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </span>
          ) : (
            "Guardar cambios"
          )}
        </button>
      </div>
    </div>
  );
};

