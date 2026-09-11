"use client";

import Link from "next/link";
import { ROUTES } from "@/src/constant";
import { FormEvent, useState } from "react";
import googleKeepApi from "@/src/http/googleKeepApi";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const response = await googleKeepApi.Login(identifier, password);
    if (!response.data) {
      setError(response.message);
      setIsLoading(false);
      return;
    }
    login(response.data.user, response.data.token);
    router.push(ROUTES.HOME);
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-full">
      <div className="bg-(--card-color) rounded-3xl p-8 w-full max-w-md mx-4 shadow-xl">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Iniciar sesión
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Email o usuario
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="john@email.com o John Doe"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <p className="text-xs text-white/40 mt-1">
              Puedes iniciar sesión con tu correo o tu usuario
            </p>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg cursor-pointer transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando sesión...." : "Iniciar sesión"}
          </button>
        </form>
        <p className="text-center text-white/60 text-sm mt-6">
          ¿No tienes cuenta?{" "}
          <Link href={ROUTES.REGISTER} className="text-white hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
}
