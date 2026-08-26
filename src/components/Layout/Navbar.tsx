import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  LayoutGrid,
  RotateCcw,
  Settings,
  StretchHorizontal,
  UserRoundPen,
  X,
  MoreVertical,
  LogOut,
  User,
} from "lucide-react";
import { IconButton } from "../common/IconButton";
import { NavbarProps } from "../types/NavbarProps";

export const Navbar = ({
  handleOpen,
  handleGrid,
  setHandleGrid,
}: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // TODO: replace with actual auth state
  const isLoggedIn = false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between w-full py-2 px-3.5 border-b items-center gap-2">
      {/* Left section */}
      <section className="flex items-center shrink-0">
        <IconButton icon={Menu} onClick={handleOpen} />
        <h1 className="text-2xl pl-2">Keep</h1>
      </section>

      {/* Search - Desktop & Tablet */}
      <form
        role="search"
        className={`
          relative
          hidden md:block
          ${isSearchOpen ? "fixed inset-0 z-50 bg-white p-4 flex items-start md:static md:z-auto md:bg-transparent md:p-0 md:flex items-center" : ""}
        `}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 md:left-3 md:top-1/2" />
        <input
          type="text"
          placeholder="Buscar"
          className={`
            w-full pl-9 pr-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2
            md:w-full lg:w-100
            ${isSearchOpen ? "fixed top-4 left-4 right-16 z-50 md:static md:fixed md:top-auto md:left-auto md:right-auto md:z-auto" : ""}
          `}
          autoFocus={isSearchOpen}
        />
        {isSearchOpen && (
          <button
            type="button"
            className="fixed top-4 right-4 z-50 md:hidden"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </form>

      {/* Mobile search icon */}
      <div className="md:hidden">
        <IconButton icon={Search} onClick={() => setIsSearchOpen(true)} />
      </div>

      {/* Desktop icons - always visible */}
      <div className="hidden md:flex gap-2 shrink-0">
        <IconButton icon={RotateCcw} />
        <IconButton
          icon={handleGrid ? StretchHorizontal : LayoutGrid}
          onClick={() => setHandleGrid(!handleGrid)}
        />
        <IconButton icon={Settings} />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden gap-1 shrink-0 items-center">
        <IconButton
          icon={handleGrid ? StretchHorizontal : LayoutGrid}
          onClick={() => setHandleGrid(!handleGrid)}
        />

        {/* More options dropdown */}
        <div className="relative" ref={moreRef}>
          <IconButton
            icon={MoreVertical}
            onClick={() => setIsMoreOpen(!isMoreOpen)}
          />

          {isMoreOpen && (
            <div className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[160px] overflow-hidden">
              <button
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-t-lg"
                onClick={() => setIsMoreOpen(false)}
              >
                <RotateCcw className="w-4 h-4" />
                Actualizar
              </button>
              <button
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
                onClick={() => setIsMoreOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Configuración
              </button>
              <button
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-b-lg"
                onClick={() => setIsMoreOpen(false)}
              >
                <UserRoundPen className="w-4 h-4" />
                Cuenta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User - Desktop only */}
      <div className="hidden md:block shrink-0 relative" ref={userMenuRef}>
        <IconButton
          icon={UserRoundPen}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        />

        {isUserMenuOpen && (
          <div className="absolute right-0 top-full mt-1 bg-(--primary-color) border rounded-lg shadow-lg z-50 min-w-[200px] overflow-hidden">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Usuario
                      </p>
                      <p className="text-xs text-white/60">usuario@email.com</p>
                    </div>
                  </div>
                </div>
                <button
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm cursor-pointer hover:bg-[#1a3a5c] transition-colors rounded-b-lg"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <UserRoundPen className="w-4 h-4" />
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
