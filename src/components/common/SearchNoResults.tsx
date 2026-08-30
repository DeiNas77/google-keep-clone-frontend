import { SearchX } from "lucide-react";
import { SplashLayout } from "../Layout/SplashLayout";

export const SearchNoResults = ({ query }: { query?: string }) => {
  const text = query?.trim()
    ? `No se encontraron notas que coincidan con “${query.trim()}”`
    : "No se encontraron notas que coincidan con tu búsqueda";

  return <SplashLayout icon={SearchX} text={text} />;
};

