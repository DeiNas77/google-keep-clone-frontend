import Link from "next/link";
import { Camera, User } from "lucide-react";
import { ROUTES } from "@/src/constant";

export default function RegisterPage() {
  return (
    <section className="flex flex-1 items-center justify-center min-h-full">
      <div className="bg-(--card-color) rounded-3xl p-8 w-full max-w-md mx-4 shadow-xl">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Crear cuenta
        </h1>
        <form className="flex flex-col gap-4">
          {/* Avatar upload */}
          <div className="flex justify-center mb-2">
            <button
              type="button"
              className="relative w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:border-white/50 transition-colors overflow-hidden group"
            >
              <User className="w-10 h-10 text-white/40 group-hover:text-white/60 transition-colors" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </button>
            <input type="file" accept="image/*" className="hidden" />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="tu_usuario"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Repetir contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Crear cuenta
          </button>
        </form>
        <p className="text-center text-white/60 text-sm mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href={ROUTES.LOGIN} className="text-white hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
