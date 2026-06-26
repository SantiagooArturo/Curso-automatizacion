"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import AuthShell from "@/components/auth/AuthShell";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CORAL = "bg-[linear-gradient(180deg,#ff7a3d_0%,#ec4115_100%)]";

function authErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Correo o contraseña incorrectos.";
    case "auth/invalid-email":
      return "El correo no es válido.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Inténtalo más tarde.";
    default:
      return "No pudimos iniciar sesión. Inténtalo de nuevo.";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.push("/");
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : "";
      setError(authErrorMessage(code));
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <span className="text-xs font-extrabold uppercase tracking-[1px] text-magenta">
        Bienvenido de vuelta
      </span>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">Inicia sesión</h1>
      <p className="mt-2 text-sm text-muted">
        Ingresa a tu cuenta Socio Cine de Santiago.
      </p>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-[#f3c2cf] bg-[#fdeef2] px-4 py-3 text-sm font-semibold text-magenta-2"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-[13px] font-bold text-[#0e3a8a]">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 bg-white text-[15px] focus-visible:border-magenta focus-visible:ring-magenta/25"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[13px] font-bold text-[#0e3a8a]">
              Contraseña
            </Label>
            <a href="#" className="text-[13px] font-bold text-coral hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-white pr-11 text-[15px] focus-visible:border-magenta focus-visible:ring-magenta/25"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[#0e3a8a]"
            >
              {showPw ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted select-none">
          <input type="checkbox" className="size-4 accent-[#ec1e7e]" />
          Mantener sesión iniciada
        </label>

        <Button
          type="submit"
          disabled={submitting}
          className={`${CORAL} h-12 w-full rounded-full text-[15px] font-extrabold tracking-wide text-white shadow-[0_8px_20px_rgba(236,65,21,0.3)] hover:brightness-105 disabled:opacity-70`}
        >
          {submitting ? "INGRESANDO…" : "INICIAR SESIÓN"}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        ¿Aún no eres socio?{" "}
        <Link href="/registro" className="font-extrabold text-magenta hover:underline">
          Únete gratis
        </Link>
      </p>
    </AuthShell>
  );
}
