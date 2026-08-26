import Link from "next/link";
import { BadgeQuestionMark } from "lucide-react";
import { ROUTES } from "@/src/constant";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 min-h-full">
      <div className="animate-shake">
        <BadgeQuestionMark className="w-32 h-32 text-(--secondary-color)" />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Error 404</h1>
        <p className="text-white/60 text-lg">Ups, su página no se encuentra</p>
      </div>
      <Link
        href={ROUTES.HOME}
        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
