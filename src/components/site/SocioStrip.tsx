export default function SocioStrip() {
  return (
    <section className="socio-strip">
      <div className="socio-card">
        <div className="socio-text">
          <span className="socio-eyebrow">Socio Cineplanet</span>
          <h3>Acumula puntos en cada compra y disfruta de beneficios exclusivos</h3>
          <button className="cta-pill">QUIERO SER SOCIO</button>
        </div>
        <div className="socio-card-art" aria-hidden="true">
          <div className="loyalty-card">
            <div className="lc-top">
              <span>SOCIO</span>
              <strong>cineplanet</strong>
            </div>
            <div className="lc-num">5412 •••• •••• 7829</div>
            <div className="lc-bottom">
              <span>JUAN PÉREZ</span>
              <span>★ 1,240 pts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
