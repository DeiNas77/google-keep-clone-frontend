"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldAlert, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { ROUTES } from "@/src/constant";

export const GuestNoticeModal = () => {
  const { isGuestNoticeOpen, closeGuestNotice } = useAppContext();
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    if (isGuestNoticeOpen) {
      closeGuestNotice();
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGuestNotice();
      }
    };

    if (isGuestNoticeOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGuestNoticeOpen, closeGuestNotice]);

  if (!isGuestNoticeOpen) return null;

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-notice-title"
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
    >
      <div
        ref={modalRef}
        className="bg-(--card-color) border border-white/15 rounded-3xl w-full max-w-md p-6 shadow-2xl relative cursor-default"
      >
        <button
          type="button"
          onClick={closeGuestNotice}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-(--secondary-color)/20 border border-(--secondary-color)/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-(--secondary-color)" />
          </div>
          <div>
            <h2 id="guest-notice-title" className="text-lg font-semibold text-white">
              Aviso sobre tus notas
            </h2>
            <p className="text-xs text-(--secondary-color) font-medium">
              Almacenamiento local temporal
            </p>
          </div>
        </div>

        <div className="text-sm text-white/80 space-y-2.5 mb-6 leading-relaxed">
          <p>
            Las notas creadas en modo invitado se guardan únicamente en el
            navegador de este dispositivo.
          </p>
          <p className="text-xs text-white/60">
            Si borras los datos de navegación, utilizas modo incógnito o cambias de
            dispositivo, no podrás recuperarlas.
          </p>
          <div className="bg-(--input-color)/70 border border-white/10 rounded-xl p-3 text-xs text-white/90">
            Crea una cuenta o inicia sesión para guardarlas de forma permanente y
            sincronizarlas en la nube.
          </div>
        </div>

        <div>
          <Link
            href={ROUTES.REGISTER}
            onClick={closeGuestNotice}
            className="w-full py-3 px-4 bg-(--secondary-color) hover:brightness-110 text-white font-medium text-sm rounded-xl transition text-center cursor-pointer block"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </section>
  );
};
