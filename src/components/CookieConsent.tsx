"use client";

import { useSyncExternalStore, useCallback } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";

function getSnapshot(): boolean {
  return !localStorage.getItem(COOKIE_CONSENT_KEY);
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function CookieConsent() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    window.dispatchEvent(new StorageEvent("storage"));
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/80 flex-1">
          Este sitio usa cookies esenciales para su funcionamiento. Al continuar navegando, aceptas
          su uso. Consulta nuestra{" "}
          <a href="/privacidad" className="text-monad-primary hover:underline">
            politica de privacidad
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-monad-primary text-white text-sm font-mono uppercase tracking-wide px-5 py-2 rounded-full hover:brightness-110 transition-all"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
