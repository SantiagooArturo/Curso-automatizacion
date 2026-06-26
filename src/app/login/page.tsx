"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import Logo from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CORAL = "bg-[linear-gradient(180deg,#ff7a3d_0%,#ec4115_100%)]";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Auth wiring (Firebase) comes in a later iteration — UI only for now.
  }

  return (
    <main className="min-h-screen w-full md:grid md:grid-cols-2">
      {/* ============ BRAND PANEL (desktop) ============ */}
      <aside className="relative hidden overflow-hidden bg-blue-900 md:flex md:min-h-screen md:flex-col md:justify-between md:p-12 text-white">
        <div className="hero-bg" aria-hidden="true" />

        <Link href="/" className="relative z-10 inline-block" aria-label="Cine de Santiago">
          <Logo width={190} />
        </Link>

        <div className="relative z-10 max-w-md">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-extrabold tracking-wide">
            Socio Cine de Santiago
          </span>
          <h2 className="mt-5 text-4xl leading-tight font-extrabold xl:text-5xl">
            Vive el cine como nunca antes.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#c8d4f0]">
            Acumula puntos en cada compra, recibe promociones exclusivas y compra
            tus entradas en segundos.
          </p>

          {/* Loyalty card flourish (reuses the site component styling) */}
          <div className="mt-10 max-w-[340px]">
            <div className="loyalty-card">
              <div className="lc-top">
                <span>SOCIO</span>
                <strong>Cine de Santiago</strong>
              </div>
              <div className="lc-num">5412 •••• •••• 7829</div>
              <div className="lc-bottom">
                <span>JUAN PÉREZ</span>
                <span>★ 1,240 pts</span>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-[#8d9bc4]">
          © 2026 Cine de Santiago — Réplica visual. Diseño demo · No afiliado.
        </p>
      </aside>

      {/* ============ FORM PANEL ============ */}
      <section className="flex min-h-screen flex-col bg-paper">
        {/* Mobile brand header (hidden on desktop where the panel above shows) */}
        <div className="flex items-center justify-between bg-[linear-gradient(180deg,#06185a_0%,#0a2363_100%)] px-6 py-4 md:hidden">
          <Link href="/" aria-label="Cine de Santiago">
            <Logo width={150} />
          </Link>
          <Link href="/" className="text-sm font-bold text-white/80 hover:text-white">
            ← Inicio
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-12">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-[0_18px_40px_rgba(10,35,99,0.12)] sm:p-9">
            <span className="text-xs font-extrabold uppercase tracking-[1px] text-magenta">
              Bienvenido de vuelta
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-ink">Inicia sesión</h1>
            <p className="mt-2 text-sm text-muted">
              Ingresa a tu cuenta Socio Cine de Santiago.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
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
                className={`${CORAL} h-12 w-full rounded-full text-[15px] font-extrabold tracking-wide text-white shadow-[0_8px_20px_rgba(236,65,21,0.3)] hover:brightness-105`}
              >
                INICIAR SESIÓN
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#e6e9f4]" />
              <span className="text-xs font-semibold text-muted">o continúa con</span>
              <span className="h-px flex-1 bg-[#e6e9f4]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-[#e6e9f4] py-2.5 text-sm font-bold text-[#0e3a8a] hover:bg-[#f4f6fc]"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-[#e6e9f4] py-2.5 text-sm font-bold text-[#0e3a8a] hover:bg-[#f4f6fc]"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                  <path d="M13 22v-8h3l1-4h-4V7.5C13 6.6 13.4 6 14.7 6H17V2.3C16.5 2.2 15.4 2 14.2 2 11.6 2 10 3.6 10 6.7V10H7v4h3v8h3z" />
                </svg>
                Facebook
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-muted">
              ¿Aún no eres socio?{" "}
              <a href="#" className="font-extrabold text-magenta hover:underline">
                Únete gratis
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
