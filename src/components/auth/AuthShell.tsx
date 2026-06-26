import Link from "next/link";
import Logo from "@/components/site/Logo";

// Two-panel auth layout (brand panel + centered card). Shared by login & signup.
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full md:grid md:grid-cols-2">
      {/* Brand panel (desktop) */}
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

      {/* Form panel */}
      <section className="flex min-h-screen flex-col bg-paper">
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
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
