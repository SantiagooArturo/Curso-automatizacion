export type Motif = "dragon" | "figure" | "music" | "horror" | "anime" | "sheep" | "action" | "sci";

export interface Movie {
  title: string;
  subtitle: string;
  palette: [string, string, string];
  motif: Motif;
  genre: string;
}
export interface Promo {
  eyebrow: string;
  title: string;
  desc: string;
  palette: [string, string];
  icon: string;
}
export interface Candy {
  name: string;
  price: string;
  icon: string;
  sub: string;
}

export const movies: Movie[] = [
  { title: "Mortal Kombat", subtitle: "7 DE MAYO · SOLO EN CINES", palette: ["#0e1a1a", "#1a3d2e", "#2dffa0"], motif: "dragon", genre: "Acción · 2D" },
  { title: "La Niña", subtitle: "7 DE MAYO · SOLO EN CINES", palette: ["#1a0808", "#4a1414", "#ff5151"], motif: "horror", genre: "Terror · 2D" },
  { title: "Billie Eilish", subtitle: "EL TOUR · EN 3D", palette: ["#0a0033", "#1c1480", "#28d4ff"], motif: "music", genre: "Concierto · 3D" },
  { title: "Nota de Voz", subtitle: "UN MENSAJE DEL DEMONIO", palette: ["#240814", "#4a0a2e", "#ff2e5c"], motif: "horror", genre: "Suspenso · 2D" },
  { title: "Mamoru Hosoda", subtitle: "FILM ANNIVERSARY", palette: ["#0d3b66", "#3aa8c1", "#fff7c2"], motif: "anime", genre: "Anime · 2D" },
  { title: "Las Ovejas", subtitle: "7 DE MAYO · SOLO EN CINES", palette: ["#5fa3ff", "#a6d36a", "#fef6c8"], motif: "sheep", genre: "Familiar · 2D" },
  { title: "Renacer Estelar", subtitle: "PRÓXIMAMENTE EN 3D", palette: ["#1a0a3a", "#5b14a8", "#ffd23f"], motif: "sci", genre: "Sci-Fi · 3D" },
  { title: "Última Línea", subtitle: "ESTRENO MUNDIAL", palette: ["#180a0a", "#7a2010", "#ffb43d"], motif: "action", genre: "Acción · 2D" },
  { title: "Sombras", subtitle: "TODOS GUARDAN UN SECRETO", palette: ["#0a0e24", "#2a3580", "#9bc1ff"], motif: "figure", genre: "Drama · 2D" },
  { title: "El Bosque", subtitle: "NO ENTRES SOLO", palette: ["#0a1a0e", "#1a4a2a", "#a8ff66"], motif: "horror", genre: "Terror · 2D" },
];

export const promos: Promo[] = [
  { eyebrow: "Martes y Miércoles", title: "2x1 con tu tarjeta Socio", desc: "Disfruta dos entradas al precio de una en todas nuestras salas a nivel nacional.", palette: ["#ec1e7e", "#c4135f"], icon: "🎟" },
  { eyebrow: "Combo Familiar", title: "Canchita gigante + 4 bebidas", desc: "El combo perfecto para compartir en familia los fines de semana.", palette: ["#f15a2b", "#ec4115"], icon: "🍿" },
  { eyebrow: "BCP", title: "Hasta 30% de descuento", desc: "Pagando con tu tarjeta de crédito BCP en compra online.", palette: ["#102d7c", "#28d4ff"], icon: "💳" },
];

export const candy: Candy[] = [
  { name: "Combo Mega", price: "S/ 32.90", icon: "🍿", sub: "Canchita grande + bebida" },
  { name: "Combo Pareja", price: "S/ 45.90", icon: "🥤", sub: "2 canchitas + 2 bebidas" },
  { name: "Combo Familiar", price: "S/ 58.90", icon: "🍫", sub: "Combo grande + dulces" },
  { name: "Nachos Premium", price: "S/ 24.90", icon: "🌽", sub: "Con queso y jalapeños" },
];
