// components/common/DropdownMenu.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, RotateCcw, Settings, User, UserRoundPen } from "lucide-react";
import { ROUTES } from "@/src/constant";
import { useAuth } from "../context/AuthContext";

export const DropdownMenu = ({
  variant,
  onClose,
}: {
  variant: "more" | "user";
  onClose: () => void;
}) => {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    onClose();
    router.push(ROUTES.HOME);
  };

  if (variant === "user") {
    return (
      <div className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[200px] overflow-hidden">
        {isLoggedIn && user ? (
          <>
            <Link
              href={ROUTES.PROFILE}
              className="px-4 py-3 border-b border-white/10 flex items-center
              gap-3 hover:bg-[#1a3a5c] transition-colors"
              onClick={() => onClose()}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <button
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              href={ROUTES.LOGIN}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
              onClick={() => onClose()}
            >
              <User className="w-4 h-4" />
              Iniciar sesión
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-b-lg"
              onClick={() => onClose()}
            >
              <UserRoundPen className="w-4 h-4" />
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[180px] overflow-hidden">
      <button
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-t-lg"
        onClick={() => onClose()}
      >
        <RotateCcw className="w-4 h-4" />
        Actualizar
      </button>
      <button
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
        onClick={() => onClose()}
      >
        <Settings className="w-4 h-4" />
        Configuración
      </button>
      <div className="border-t border-white/10" />
      {isLoggedIn && user ? (
        <>
          <Link
            href={ROUTES.PROFILE}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
            onClick={() => onClose()}
          >
            <User className="w-4 h-4" />
            Mi perfil
          </Link>
          <button
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-b-lg"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión ({user.username})
          </button>
        </>
      ) : (
        <>
          <Link
            href={ROUTES.LOGIN}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
            onClick={() => onClose()}
          >
            <User className="w-4 h-4" />
            Iniciar sesión
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-b-lg"
            onClick={() => onClose()}
          >
            <UserRoundPen className="w-4 h-4" />
            Registrarse
          </Link>
        </>
      )}
    </div>
  );
};
