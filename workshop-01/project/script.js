/* =========================================================
   Cineplanet — Visual replica
   Carousel, mobile menu, dropdowns
   ========================================================= */

/* ---------- Stylized poster placeholders (SVG) ---------- */
function posterSVG({ title, subtitle, palette, motif }) {
  const [a, b, c] = palette;
  const motifs = {
    dragon: `
      <path d="M60 240 Q120 180 180 220 T280 200" stroke="${c}" stroke-width="3" fill="none" opacity=".7"/>
      <circle cx="180" cy="200" r="55" fill="${b}" opacity=".55"/>
      <circle cx="170" cy="195" r="8" fill="${c}"/>
      <path d="M120 260 Q200 240 270 280" stroke="${c}" stroke-width="2" fill="none" opacity=".5"/>`,
    figure: `
      <ellipse cx="180" cy="240" rx="70" ry="120" fill="${b}" opacity=".55"/>
      <circle cx="180" cy="170" r="22" fill="${c}" opacity=".75"/>
      <rect x="120" y="260" width="120" height="170" fill="${b}" opacity=".5"/>`,
    music: `
      <circle cx="180" cy="220" r="100" fill="${b}" opacity=".5"/>
      <path d="M140 200 v90 M170 180 v110 M200 200 v90 M230 180 v110" stroke="${c}" stroke-width="6" stroke-linecap="round" opacity=".7"/>`,
    horror: `
      <rect x="80" y="120" width="200" height="280" fill="${b}" opacity=".4"/>
      <circle cx="150" cy="240" r="14" fill="${c}"/>
      <circle cx="210" cy="240" r="14" fill="${c}"/>
      <path d="M140 320 Q180 300 220 320" stroke="${c}" stroke-width="3" fill="none"/>`,
    anime: `
      <circle cx="120" cy="180" r="36" fill="${c}" opacity=".7"/>
      <circle cx="200" cy="210" r="32" fill="#ffffff" opacity=".5"/>
      <circle cx="270" cy="180" r="28" fill="${b}" opacity=".7"/>
      <path d="M40 360 Q180 320 320 360" stroke="${c}" stroke-width="4" fill="none"/>`,
    sheep: `
      <ellipse cx="180" cy="320" rx="160" ry="40" fill="${b}" opacity=".5"/>
      <circle cx="120" cy="290" r="28" fill="#ffffff" opacity=".7"/>
      <circle cx="180" cy="280" r="32" fill="#ffffff" opacity=".75"/>
      <circle cx="240" cy="290" r="26" fill="#ffffff" opacity=".7"/>`,
    action: `
      <path d="M0 480 L180 220 L360 480 Z" fill="${b}" opacity=".5"/>
      <circle cx="180" cy="180" r="50" fill="${c}" opacity=".7"/>
      <path d="M120 200 L180 100 L240 200" stroke="${c}" stroke-width="4" fill="none"/>`,
    sci: `
      <circle cx="180" cy="240" r="80" fill="none" stroke="${c}" stroke-width="3"/>
      <circle cx="180" cy="240" r="120" fill="none" stroke="${c}" stroke-width="2" opacity=".5"/>
      <circle cx="180" cy="240" r="40" fill="${b}"/>
      <path d="M60 480 L120 380 L240 380 L300 480" stroke="${c}" stroke-width="2" fill="none"/>`,
  };
  return `
  <svg viewBox="0 0 360 540" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg-${title.replace(/\s/g,'')}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${a}"/>
        <stop offset="100%" stop-color="${b}"/>
      </linearGradient>
    </defs>
    <rect width="360" height="540" fill="url(#bg-${title.replace(/\s/g,'')})"/>
    ${motifs[motif] || ''}
    <rect x="0" y="380" width="360" height="160" fill="url(#bg-${title.replace(/\s/g,'')})" opacity=".25"/>
    <text x="180" y="450" text-anchor="middle" fill="#ffffff" font-family="Bowlby One, sans-serif" font-size="${title.length > 12 ? 28 : 38}" font-weight="800" letter-spacing="1">${title.toUpperCase()}</text>
    <text x="180" y="478" text-anchor="middle" fill="#ffffff" font-family="Mulish, sans-serif" font-size="11" font-weight="700" opacity=".75" letter-spacing="2">${subtitle}</text>
  </svg>`;
}

const movies = [
  { title: 'Mortal Kombat', subtitle: '7 DE MAYO · SOLO EN CINES', palette: ['#0e1a1a', '#1a3d2e', '#2dffa0'], motif: 'dragon', genre: 'Acción · 2D' },
  { title: 'La Niña', subtitle: '7 DE MAYO · SOLO EN CINES', palette: ['#1a0808', '#4a1414', '#ff5151'], motif: 'horror', genre: 'Terror · 2D' },
  { title: 'Billie Eilish', subtitle: 'EL TOUR · EN 3D', palette: ['#0a0033', '#1c1480', '#28d4ff'], motif: 'music', genre: 'Concierto · 3D' },
  { title: 'Nota de Voz', subtitle: 'UN MENSAJE DEL DEMONIO', palette: ['#240814', '#4a0a2e', '#ff2e5c'], motif: 'horror', genre: 'Suspenso · 2D' },
  { title: 'Mamoru Hosoda', subtitle: 'FILM ANNIVERSARY', palette: ['#0d3b66', '#3aa8c1', '#fff7c2'], motif: 'anime', genre: 'Anime · 2D' },
  { title: 'Las Ovejas', subtitle: '7 DE MAYO · SOLO EN CINES', palette: ['#5fa3ff', '#a6d36a', '#fef6c8'], motif: 'sheep', genre: 'Familiar · 2D' },
  { title: 'Renacer Estelar', subtitle: 'PRÓXIMAMENTE EN 3D', palette: ['#1a0a3a', '#5b14a8', '#ffd23f'], motif: 'sci', genre: 'Sci-Fi · 3D' },
  { title: 'Última Línea', subtitle: 'ESTRENO MUNDIAL', palette: ['#180a0a', '#7a2010', '#ffb43d'], motif: 'action', genre: 'Acción · 2D' },
  { title: 'Sombras', subtitle: 'TODOS GUARDAN UN SECRETO', palette: ['#0a0e24', '#2a3580', '#9bc1ff'], motif: 'figure', genre: 'Drama · 2D' },
  { title: 'El Bosque', subtitle: 'NO ENTRES SOLO', palette: ['#0a1a0e', '#1a4a2a', '#a8ff66'], motif: 'horror', genre: 'Terror · 2D' },
];

/* ---------- Carousel ---------- */
const track = document.getElementById('track');
const dots = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function buildCarousel() {
  track.innerHTML = movies.map((m, i) => `
    <div class="poster-card${i === 1 ? ' active' : ''}" data-idx="${i}">
      <div class="frame">
        <div class="poster-img">${posterSVG(m)}</div>
      </div>
      <span class="buy-badge">COMPRAR</span>
      <div class="title-pill">
        <span class="plus left">+</span>
        ${m.title}
        <span class="plus right">+</span>
      </div>
    </div>
  `).join('');
}

let pageIndex = 0;
function getPerView() {
  const w = window.innerWidth;
  if (w < 540) return 2;
  if (w < 860) return 3;
  if (w < 1100) return 4;
  return 6;
}
function totalPages() {
  const per = getPerView();
  return Math.max(1, Math.ceil(movies.length / per));
}
function renderDots() {
  const pages = totalPages();
  dots.innerHTML = Array.from({ length: pages }).map((_, i) =>
    `<span class="dot${i === pageIndex ? ' active' : ''}" data-page="${i}"></span>`
  ).join('');
  dots.querySelectorAll('.dot').forEach(d => {
    d.addEventListener('click', () => { pageIndex = +d.dataset.page; updateTrack(); });
  });
}
function updateTrack() {
  const per = getPerView();
  const card = track.querySelector('.poster-card');
  if (!card) return;
  const cardW = card.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  const offset = pageIndex * per * (cardW + gap);
  track.style.transform = `translateX(-${offset}px)`;
  renderDots();
}
prevBtn.addEventListener('click', () => {
  pageIndex = (pageIndex - 1 + totalPages()) % totalPages();
  updateTrack();
});
nextBtn.addEventListener('click', () => {
  pageIndex = (pageIndex + 1) % totalPages();
  updateTrack();
});
window.addEventListener('resize', () => {
  pageIndex = Math.min(pageIndex, totalPages() - 1);
  updateTrack();
});

buildCarousel();
requestAnimationFrame(updateTrack);

/* Auto-advance */
setInterval(() => {
  pageIndex = (pageIndex + 1) % totalPages();
  updateTrack();
}, 7000);

/* ---------- Películas grid ---------- */
const moviesGrid = document.getElementById('moviesGrid');
moviesGrid.innerHTML = movies.slice(0, 10).map(m => `
  <div class="movie-card">
    <div class="movie-poster-wrap">
      ${posterSVG(m)}
      <span class="movie-tag">2D · ESP</span>
    </div>
    <div class="movie-meta">
      <span class="movie-title">${m.title}</span>
      <span class="movie-genre">${m.genre}</span>
    </div>
    <div class="movie-actions">
      <button class="btn-buy">COMPRAR</button>
      <button class="btn-info" aria-label="Más info">+</button>
    </div>
  </div>
`).join('');

/* ---------- Promociones ---------- */
const promos = [
  {
    eyebrow: 'Martes y Miércoles',
    title: '2x1 con tu tarjeta Socio',
    desc: 'Disfruta dos entradas al precio de una en todas nuestras salas a nivel nacional.',
    palette: ['#ec1e7e', '#c4135f'],
    icon: '🎟'
  },
  {
    eyebrow: 'Combo Familiar',
    title: 'Canchita gigante + 4 bebidas',
    desc: 'El combo perfecto para compartir en familia los fines de semana.',
    palette: ['#f15a2b', '#ec4115'],
    icon: '🍿'
  },
  {
    eyebrow: 'BCP',
    title: 'Hasta 30% de descuento',
    desc: 'Pagando con tu tarjeta de crédito BCP en compra online.',
    palette: ['#102d7c', '#28d4ff'],
    icon: '💳'
  },
];
const promosGrid = document.getElementById('promosGrid');
promosGrid.innerHTML = promos.map(p => `
  <div class="promo-card">
    <div class="promo-art">
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pg-${p.title.replace(/\s/g,'')}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${p.palette[0]}"/>
            <stop offset="100%" stop-color="${p.palette[1]}"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#pg-${p.title.replace(/\s/g,'')})"/>
        <circle cx="60" cy="40" r="40" fill="rgba(255,255,255,0.12)"/>
        <circle cx="350" cy="160" r="60" fill="rgba(255,255,255,0.10)"/>
        <text x="200" y="120" text-anchor="middle" font-size="80">${p.icon}</text>
      </svg>
    </div>
    <div class="promo-body">
      <span class="promo-eyebrow">${p.eyebrow}</span>
      <span class="promo-title">${p.title}</span>
      <span class="promo-desc">${p.desc}</span>
      <span class="promo-link">VER MÁS →</span>
    </div>
  </div>
`).join('');

/* ---------- Dulcería ---------- */
const candy = [
  { name: 'Combo Mega', price: 'S/ 32.90', icon: '🍿', sub: 'Canchita grande + bebida' },
  { name: 'Combo Pareja', price: 'S/ 45.90', icon: '🥤', sub: '2 canchitas + 2 bebidas' },
  { name: 'Combo Familiar', price: 'S/ 58.90', icon: '🍫', sub: 'Combo grande + dulces' },
  { name: 'Nachos Premium', price: 'S/ 24.90', icon: '🌽', sub: 'Con queso y jalapeños' },
];
document.getElementById('candyGrid').innerHTML = candy.map(c => `
  <div class="candy-card">
    <div class="candy-art"><div style="font-size:84px;">${c.icon}</div></div>
    <span class="candy-name">${c.name}</span>
    <span class="movie-genre" style="color:var(--muted);font-size:12px;">${c.sub}</span>
    <span class="candy-price">${c.price}</span>
    <button class="candy-add">AÑADIR</button>
  </div>
`).join('');

/* ---------- Mobile menu ---------- */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
});

/* ---------- Filter button activation ---------- */
const goBtn = document.querySelector('.filter-go');
document.querySelectorAll('.filter-pick').forEach(p =>
  p.addEventListener('click', () => goBtn.classList.add('active'))
);
