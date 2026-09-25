"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, PenLine, KeyRound, ChevronLeft } from "lucide-react";
import { ROUTES } from "@/src/constant";
import { useAuth } from "@/src/components/context/AuthContext";
import { ProfileView } from "@/src/profileViews/ProfileView";
import { EditProfileView } from "@/src/profileViews/EditProfileView";
import { PasswordView } from "@/src/profileViews/PasswordView";

type ProfileTab = "profile" | "edit" | "password";

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  // Guest: no tiene perfil que mostrar
  if (!isLoggedIn || !user) {
    return (
      <section className="flex flex-1 items-center justify-center min-h-full p-4">
        <div className="bg-(--card-color) rounded-3xl p-8 w-full max-w-md mx-auto shadow-xl text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-white/40" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Necesitas iniciar sesión
          </h1>
          <p className="text-sm text-white/60 mb-6">
            Inicia sesión para ver y editar tu perfil
          </p>
          <Link
            href={ROUTES.LOGIN}
            className="inline-block w-full py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-(--primary-color)">
      {/* Barra superior del profile: SOLO volver — sin navbar ni sidebar */}
      <header className="sticky top-0 z-10 flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/5 bg-(--primary-color)/90 backdrop-blur">
        <button
          type="button"
          onClick={() => router.push(ROUTES.HOME)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <span className="text-sm text-white/60">Perfil</span>
      </header>

      {/* Contenido vertical, de arriba hacia abajo */}
      <div className="flex-1 w-full max-w-xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Vista según tab */}
        {activeTab === "profile" && (
          <ProfileView
            user={{
              username: user.username,
              email: user.email,
              avatarUrl: user.avatarUrl,
            }}
          />
        )}
        {activeTab === "edit" && (
          <EditProfileView initialUsername={user.username} />
        )}
        {activeTab === "password" && <PasswordView />}

        {/* Navegación inferior: tabs + logout */}
        <nav className="mt-5 pt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "profile"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <User className="w-4 h-4" />
            Mi perfil
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "edit"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <PenLine className="w-4 h-4" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "password"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            Contraseña
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
