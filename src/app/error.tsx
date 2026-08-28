"use client";

import { useEffect } from "react";
import { Bug } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 min-h-full">
      <Bug className="w-32 h-32 text-(--secondary-color)" />

      <h2 className="text-3xl text-white">
        Algo mal ocurrido, reintentalo nuevamente
      </h2>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}
