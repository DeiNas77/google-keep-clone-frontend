import { Lightbulb, Archive, Trash, X, LucideIcon } from "lucide-react";
import { SidebarLink } from "../common/SidebarLink";
import { SidebarProps } from "../types/NavbarProps";
import { SIDEBAR_LINKS } from "@/src/constant";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Archive,
  Trash,
};

// Desktop Sidebar
export const SidebarDesktop = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`
        transition-all duration-200 border-r hidden md:block
        ${isOpen ? "w-64 overflow-auto" : "w-17 pl-1.5 overflow-hidden"}
      `}
    >
      <nav className="flex flex-col py-3 gap-1">
        {SIDEBAR_LINKS.map((items, index) => {
          const icons = items.icon;
          const iconsRender = iconMap[icons];
          return (
            <SidebarLink
              key={`sidebar-link-${index}`}
              href={items.href}
              text={items.text}
              icon={iconsRender}
              collapsed={!isOpen}
            />
          );
        })}
      </nav>
    </aside>
  );
};

// Mobile Sidebar (Drawer)
export const SidebarMobile = ({
  isOpen,
  onClose,
}: SidebarProps & { onClose: () => void }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-(--primary-color) border-r z-50 md:hidden overflow-auto transition-transform duration-250 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-3 gap-1">
          {SIDEBAR_LINKS.map((items, index) => {
            const IconComponent = iconMap[items.icon];
            return (
              <Link
                key={`sidebar-mobile-${index}`}
                href={items.href}
                className="flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-colors"
                onClick={onClose}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
                <span className="text-sm">{items.text}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
