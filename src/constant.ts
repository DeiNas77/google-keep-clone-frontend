export const ROUTES = {
  HOME: "/",
  ARCHIVE: "/archive",
  TRASH: "/trash",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
} as const;

export const SIDEBAR_LINKS = [
  { href: ROUTES.HOME, text: "Notas", icon: "Lightbulb" },
  { href: ROUTES.ARCHIVE, text: "Archivar", icon: "Archive" },
  { href: ROUTES.TRASH, text: "Papelera", icon: "Trash" },
] as const;

export const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;
export const URI_BASE = process.env.NEXT_PUBLIC_URI_BASE;

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "gkcf-access-token",
  USER: "gkcf-user",
} as const;
