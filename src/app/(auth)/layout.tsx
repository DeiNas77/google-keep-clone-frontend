import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/src/constant";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-dvh overflow-auto bg-(--primary-color)">
      {/* Barra superior: volver a la app (el navbar/sidebar no viven acá) */}
      <header className="sticky top-0 z-10 flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/5 bg-(--primary-color)/90 backdrop-blur">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Volver a la app</span>
        </Link>
        <span className="text-sm text-white/60">Bienvenido</span>
      </header>

      {/* Contenido centrado */}
      <div className="flex flex-1 p-4">{children}</div>
    </section>
  );
}

