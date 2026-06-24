import Logo from "@/components/site/Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <Logo width={180} />
          <p className="footer-blurb">
            Vive el cine como nunca antes. Estrenos, promociones y la mejor dulcería en un solo lugar.
          </p>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M13 22v-8h3l1-4h-4V7.5C13 6.6 13.4 6 14.7 6H17V2.3C16.5 2.2 15.4 2 14.2 2 11.6 2 10 3.6 10 6.7V10H7v4h3v8h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M23 7.2c-.3-1-1.1-1.8-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.6C2.1 5.4 1.3 6.2 1 7.2.5 9.1.5 12 .5 12s0 2.9.5 4.8c.3 1 1.1 1.8 2.1 2.1 1.9.6 8.9.6 8.9.6s7 0 8.9-.6c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19.6 7.7v3.4a8.5 8.5 0 0 1-4.9-1.6v6.7a6.4 6.4 0 1 1-6.4-6.4c.4 0 .8 0 1.1.1v3.5a3 3 0 1 0 2.1 2.8V2h3.4a5 5 0 0 0 4.7 5.7z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Información</h4>
          <a href="#">Sobre Cineplanet</a>
          <a href="#">Trabaja con nosotros</a>
          <a href="#">Sala de prensa</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Política de privacidad</a>
        </div>
        <div className="footer-col">
          <h4>Servicios</h4>
          <a href="#">Cineplanet Corporativo</a>
          <a href="#">Alquiler de salas</a>
          <a href="#">Publicidad en cines</a>
          <a href="#">Tarjetas regalo</a>
        </div>
        <div className="footer-col">
          <h4>Ayuda</h4>
          <a href="#">Preguntas frecuentes</a>
          <a href="#">Contacto</a>
          <a href="#">Libro de reclamaciones</a>
          <a href="#">Encuentra tu Cineplanet</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Cineplanet — Réplica visual. Todos los derechos reservados.</span>
        <span>Diseño demo · No afiliado</span>
      </div>
    </footer>
  );
}
