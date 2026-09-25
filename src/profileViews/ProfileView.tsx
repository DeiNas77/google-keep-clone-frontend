"use client";

import { User, Mail, ShieldCheck } from "lucide-react";
import type { User as UserType } from "@/src/components/types/Auth";

export const ProfileView = ({
  user,
}: {
  user: Pick<UserType, "username" | "email" | "avatarUrl">;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative mt-4">
        <div className="w-28 h-28 rounded-full bg-white/10 border-2 border-white/15 flex items-center justify-center overflow-hidden">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-white/40" />
          )}
        </div>
        <span className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-green-500 border-2 border-(--primary-color) flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
        </span>
      </div>

      {/* Nombre + email, arriba hacia abajo */}
      <h1 className="mt-4 text-3xl font-semibold text-white tracking-tight">
        {user.username}
      </h1>
      <p className="text-sm text-white/50 flex items-center gap-1.5 mt-2">
        <Mail className="w-4 h-4 shrink-0" />
        <span className="truncate">{user.email}</span>
      </p>

      {/* Info de cuenta en filas */}
      <div className="w-full mt-8 flex flex-col">
        <h2 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2 text-left">
          Información de cuenta
        </h2>
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <span className="text-sm text-white/50">Usuario</span>
          <span className="text-sm text-white font-medium">
            {user.username}
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <span className="text-sm text-white/50">Correo electrónico</span>
          <span className="text-sm text-white font-medium">{user.email}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-white/50">Sesión</span>
          <span className="text-sm text-green-400 font-medium">Activa</span>
        </div>
      </div>
    </div>
  );
};
