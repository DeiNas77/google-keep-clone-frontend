// components/common/DropdownMenu.tsx
// TODO(backend): cuando exista auth + usuarios:
//   - variant "user" (desktop): reemplazar "Iniciar sesión"/"Registrarse" por "Perfil" (link a /profile)
//   - variant "more" (mobile): agregar "Perfil" debajo de Settings (después del separator), en vez de login/register
import Link from "next/link";
import { LogOut, RotateCcw, Settings, User, UserRoundPen } from "lucide-react";
import { ROUTES } from "@/src/constant";

export const DropdownMenu = ({
  variant,
  onClose,
}: {
  variant: "more" | "user";
  onClose: () => void;
}) => {
  // TODO: replace with actual auth state
  const isLoggedIn = false;

  if (variant === "user") {
    return (
      <div className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[200px] overflow-hidden">
        {isLoggedIn ? (
          <>
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Usuario</p>
                  <p className="text-xs text-white/60">usuario@email.com</p>
                </div>
              </div>
            </div>
            <button
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
              onClick={() => onClose()}
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
    </div>
  );
};

