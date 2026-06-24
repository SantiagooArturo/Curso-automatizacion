import { candy } from "@/lib/data";

export default function Dulceria() {
  return (
    <section className="candy-section">
      <h2 className="section-title">Dulcería</h2>
      <p className="section-sub">Pide tu combo y recógelo sin colas</p>
      <div className="candy-grid">
        {candy.map((c) => (
          <div className="candy-card" key={c.name}>
            <div className="candy-art">
              <div style={{ fontSize: 84 }}>{c.icon}</div>
            </div>
            <span className="candy-name">{c.name}</span>
            <span
              className="movie-genre"
              style={{ color: "var(--color-muted, #6b7390)", fontSize: 12 }}
            >
              {c.sub}
            </span>
            <span className="candy-price">{c.price}</span>
            <button className="candy-add">AÑADIR</button>
          </div>
        ))}
      </div>
    </section>
  );
}
