"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UtilityBar from "@/components/site/UtilityBar";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { useAuth } from "@/components/auth/AuthProvider";

function formatDate(value?: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CuentaPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // Protect the route: send anonymous visitors to login.
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <>
        <UtilityBar />
        <SiteHeader />
        <main className="grid min-h-[50vh] place-items-center bg-paper">
          <p className="text-sm font-semibold text-muted">Cargando tu cuenta…</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const initial = (user.displayName || user.email || "U").charAt(0).toUpperCase();
  const rows: { label: string; value: string }[] = [
    { label: "Nombre", value: user.displayName || "—" },
    { label: "Correo electrónico", value: user.email || "—" },
    { label: "Miembro desde", value: formatDate(user.metadata.creationTime) },
  ];

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <>
      <UtilityBar />
      <SiteHeader />

      <main className="bg-paper">
        {/* Hero band */}
        <section className="relative overflow-hidden bg-blue-900 px-6 pb-24 pt-14 text-center">
          <div className="hero-bg" aria-hidden="true" />
          <div className="relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-[1px] text-cyan">
              Socio Cine de Santiago
            </span>
            <h1 className="mt-2 text-4xl font-extrabold text-white">Mi cuenta</h1>
          </div>
        </section>

        {/* Profile card (overlaps the band) */}
        <section className="px-6">
          <div className="mx-auto -mt-16 max-w-2xl">
            <div className="rounded-2xl bg-white p-8 shadow-[0_18px_40px_rgba(10,35,99,0.12)]">
              <div className="flex items-center gap-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#ec1e7e,#c4135f)] text-2xl font-extrabold text-white">
                  {initial}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-2xl font-extrabold text-ink">
                    {user.displayName || "Socio"}
                  </h2>
                  <p className="truncate text-sm text-muted">{user.email}</p>
                </div>
              </div>

              <dl className="mt-8 divide-y divide-[#e6e9f4] border-t border-[#e6e9f4]">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <dt className="text-[13px] font-bold uppercase tracking-wide text-[#93a1c4]">
                      {row.label}
                    </dt>
                    <dd className="font-semibold text-ink sm:text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#d8def0] px-6 py-2.5 text-sm font-extrabold text-[#0e3a8a] hover:bg-[#f4f6fc]"
                >
                  ← Volver al inicio
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff7a3d_0%,#ec4115_100%)] px-6 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(236,65,21,0.3)] hover:brightness-105"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-20" />
      </main>

      <SiteFooter />
    </>
  );
}
