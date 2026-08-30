export const ROUTES = {
  HOME: "/",
  ARCHIVE: "/archive",
  TRASH: "/trash",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const SIDEBAR_LINKS = [
  { href: ROUTES.HOME, text: "Notas", icon: "Lightbulb" },
  { href: ROUTES.ARCHIVE, text: "Archivar", icon: "Archive" },
  { href: ROUTES.TRASH, text: "Papelera", icon: "Trash" },
] as const;
