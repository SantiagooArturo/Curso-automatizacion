export default function AppDownload() {
  return (
    <section className="app-section">
      <div className="app-inner">
        <div className="app-copy">
          <h2>Descarga la app de Cineplanet</h2>
          <p>Compra tus entradas, acumula puntos y vive el cine donde estés.</p>
          <div className="store-row">
            <button className="store-btn">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M17.05 12.04c-.02-2.34 1.91-3.46 2-3.52-1.09-1.59-2.78-1.81-3.39-1.83-1.44-.15-2.81.85-3.55.85-.74 0-1.86-.83-3.06-.81-1.57.02-3.03.92-3.84 2.33-1.65 2.86-.42 7.07 1.18 9.39.78 1.13 1.7 2.4 2.91 2.36 1.18-.05 1.62-.76 3.04-.76s1.82.76 3.06.74c1.27-.02 2.07-1.15 2.84-2.29.9-1.31 1.27-2.59 1.29-2.66-.03-.01-2.46-.94-2.48-3.8zM14.7 5.27c.65-.79 1.09-1.88.97-2.97-.93.04-2.07.62-2.74 1.4-.6.69-1.12 1.8-.98 2.86 1.04.08 2.1-.53 2.75-1.29z" />
              </svg>
              <span>
                <small>Descarga en</small>
                <strong>App Store</strong>
              </span>
            </button>
            <button className="store-btn">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="#34d399" d="M3 3.5v17l9-8.5z" />
                <path fill="#60a5fa" d="M3 3.5L14 11l3-3z" />
                <path fill="#f87171" d="M3 20.5L14 13l3 3z" />
                <path fill="#fbbf24" d="M14 11l3-3 4 3-4 3z" />
              </svg>
              <span>
                <small>Disponible en</small>
                <strong>Google Play</strong>
              </span>
            </button>
          </div>
        </div>
        <div className="app-art" aria-hidden="true">
          <div className="phone-mock">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-strip" />
              <div className="phone-poster" />
              <div className="phone-rows">
                <span />
                <span />
                <span />
              </div>
              <div className="phone-cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
