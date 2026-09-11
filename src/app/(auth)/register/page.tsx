"use client";

import Link from "next/link";
import { Camera, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constant";
import { useAuth } from "@/src/components/context/AuthContext";
import googleKeepApi from "@/src/http/googleKeepApi";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    const registered = await googleKeepApi.Register(
      form.username,
      form.email,
      form.password,
    );
    if (!registered.data) {
      setError(registered.message);
      setIsLoading(false);
      return;
    }

    const logged = await googleKeepApi.Login(form.username, form.password);
    if (!logged.data) {
      setError(registered.message);
      setIsLoading(false);
      return;
    }

    login(logged.data.user, logged.data.token);
    router.push(ROUTES.HOME);
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-full">
      <div className="bg-(--card-color) rounded-3xl p-8 w-full max-w-md mx-4 shadow-xl">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Crear cuenta
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Avatar placeholder (upload es post-MVP) */}
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
              placeholder="John Doe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="John@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/50 transition-colors"
              placeholder="Passw0rd!"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
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
