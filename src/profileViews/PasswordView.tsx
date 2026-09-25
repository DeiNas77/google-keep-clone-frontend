"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import googleKeepApi from "@/src/http/googleKeepApi";

export const PasswordView = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Completa todos los campos");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    const response = await googleKeepApi.UpdatePasswordProfile(
      currentPassword,
      newPassword,
    );

    if (!response.data) {
      setError(response.message);
      setIsLoading(false);
      return;
    }

    setSuccess(response.data.message || "Contraseña actualizada");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-left text-2xl font-semibold text-white tracking-tight">
        Cambiar contraseña
      </h1>
      <p className="text-left text-sm text-white/50">
        Elige una contraseña segura que no uses en otros sitios
      </p>

      <div className="w-full mt-6 flex flex-col gap-4">
        <div className="text-left">
          <label className="block text-sm text-white/70 mb-1">
            Contraseña actual
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
            placeholder="••••••••"
          />
        </div>
        <div className="text-left">
          <label className="block text-sm text-white/70 mb-1">
            Nueva contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
            placeholder="••••••••"
          />
          <p className="text-xs text-white/40 mt-1.5">
            Mínimo 6 caracteres, una mayúscula, un número y un carácter especial
          </p>
        </div>
        <div className="text-left">
          <label className="block text-sm text-white/70 mb-1">
            Repetir nueva contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm text-center">{success}</p>
        )}

        <button
          type="button"
          onClick={handleUpdate}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Actualizando...
            </span>
          ) : (
            "Actualizar contraseña"
          )}
        </button>
      </div>
    </div>
  );
};

