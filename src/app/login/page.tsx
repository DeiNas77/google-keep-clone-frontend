import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="bg-(--card-color) rounded-3xl p-8 w-full max-w-md mx-4 shadow-xl">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Iniciar sesión
        </h1>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="tu@email.com"
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
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-white/60 text-sm mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-white hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
}
