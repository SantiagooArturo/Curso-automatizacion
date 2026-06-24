import { promos } from "@/lib/data";

export default function Promotions() {
  return (
    <section className="promos-section">
      <h2 className="cp-display light">Promociones</h2>
      <div className="promos-grid">
        {promos.map((p) => (
          <div className="promo-card" key={p.title}>
            <div className="promo-art">
              <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient
                    id={`pg-${p.title.replace(/\s/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={p.palette[0]} />
                    <stop offset="100%" stopColor={p.palette[1]} />
                  </linearGradient>
                </defs>
                <rect
                  width="400"
                  height="200"
                  fill={`url(#pg-${p.title.replace(/\s/g, "")})`}
                />
                <circle cx="60" cy="40" r="40" fill="rgba(255,255,255,0.12)" />
                <circle
                  cx="350"
                  cy="160"
                  r="60"
                  fill="rgba(255,255,255,0.10)"
                />
                <text x="200" y="120" textAnchor="middle" fontSize="80">
                  {p.icon}
                </text>
              </svg>
            </div>
            <div className="promo-body">
              <span className="promo-eyebrow">{p.eyebrow}</span>
              <span className="promo-title">{p.title}</span>
              <span className="promo-desc">{p.desc}</span>
              <span className="promo-link">VER MÁS →</span>
            </div>
          </div>
        ))}
      </div>
      <div className="see-more">
        <button className="see-more-btn outline">VER TODAS LAS PROMOCIONES</button>
      </div>
    </section>
  );
}
