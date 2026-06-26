import type { Metadata } from "next";
import UtilityBar from "@/components/site/UtilityBar";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { dulceriaMenu } from "@/lib/dulceria";

export const metadata: Metadata = {
  title: "Dulcería — Cine de Santiago",
  description:
    "Arma tu combo y recógelo sin colas: canchitas, bebidas, nachos y dulces para tu película.",
};

export default function DulceriaPage() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-blue-900 px-6 py-16 text-center">
          <div className="hero-bg" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="cp-display light">Dulcería</h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#c8d4f0]">
              Arma tu combo y recógelo sin colas. Canchitas recién hechas, bebidas
              heladas y los snacks que tu película necesita.
            </p>

            {/* Category chips */}
            <nav className="mt-8 flex flex-wrap justify-center gap-3">
              {dulceriaMenu.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="rounded-full bg-white/12 px-5 py-2 text-sm font-extrabold text-white transition-colors hover:bg-white/25"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ============ CATEGORIES ============ */}
        {dulceriaMenu.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-24 px-6 pt-14 first:pt-12"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="flex items-center gap-3">
                <span className="h-7 w-1.5 rounded bg-magenta" />
                <h2 className="text-3xl font-extrabold text-[#0e3a8a]">
                  {cat.title}
                </h2>
              </div>

              <div className="candy-grid">
                {cat.items.map((item) => (
                  <div className="candy-card" key={item.name}>
                    <div className="candy-art">
                      <div style={{ fontSize: 84 }}>{item.icon}</div>
                    </div>
                    <span className="candy-name">{item.name}</span>
                    <span
                      className="movie-genre"
                      style={{ color: "var(--color-muted, #6b7390)", fontSize: 12 }}
                    >
                      {item.sub}
                    </span>
                    <span className="candy-price">{item.price}</span>
                    <button className="candy-add">AÑADIR</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ============ HOW IT WORKS ============ */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-[1180px] gap-6 rounded-[22px] bg-[linear-gradient(135deg,#ec1e7e_0%,#c4135f_60%,#840a3f_100%)] p-8 text-white shadow-[0_22px_40px_rgba(196,19,95,0.3)] sm:p-10 md:grid-cols-3">
            {[
              { n: "1", t: "Elige tu combo", d: "Arma tu pedido desde la app o la web." },
              { n: "2", t: "Paga online", d: "Con tarjeta o tu cuenta Socio y acumula puntos." },
              { n: "3", t: "Recoge sin colas", d: "Pasa directo al mostrador exprés de tu cine." },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-start gap-2">
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-lg font-extrabold text-magenta-2">
                  {step.n}
                </span>
                <h3 className="mt-2 text-xl font-extrabold">{step.t}</h3>
                <p className="text-sm text-white/85">{step.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
