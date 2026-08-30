import { useState, useRef } from "react";
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
} from "lucide-react";
import { IconButton } from "../common/IconButton";
import { NavbarProps } from "../types/NavbarProps";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useAppContext } from "../context/AppContext";
import { DropdownMenu } from "../common/DropdownMenu";

export const Navbar = ({
  handleOpen,
  handleGrid,
  setHandleGrid,
}: NavbarProps) => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(moreRef, () => setIsMoreOpen(false));
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  return (
    <nav className="flex justify-between w-full py-2 px-3.5 border-b items-center gap-2">
      {/* Left section */}
      <section className="flex items-center shrink-0">
        <IconButton icon={Menu} onClick={handleOpen} />
        <h1 className="text-2xl pl-2">Keep</h1>
      </section>

      {/* Search - Desktop & Tablet */}
      <form role="search" className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 lg:w-100"
        />
      </form>

      {/* Mobile search - expands in navbar */}
      <div className="flex md:hidden flex-1 justify-end">
        {isSearchOpen ? (
          <div className="flex items-center w-full gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--secondary-color) focus:border-(--secondary-color) text-(--secondary-color) placeholder-gray-400 text-sm"
                autoFocus
              />
            </div>
          </div>
        ) : (
          <IconButton icon={Search} onClick={() => setIsSearchOpen(true)} />
        )}
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
      {!isSearchOpen && (
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
              <DropdownMenu
                variant="more"
                onClose={() => setIsMoreOpen(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* User - Desktop only */}
      <div className="hidden md:block shrink-0 relative" ref={userMenuRef}>
        <IconButton
          icon={UserRoundPen}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        />
        {isUserMenuOpen && (
          <DropdownMenu
            variant="user"
            onClose={() => setIsUserMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

