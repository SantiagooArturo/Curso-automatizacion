export interface DulceriaItem {
  name: string;
  price: string;
  icon: string;
  sub: string;
}

export interface DulceriaCategory {
  id: string;
  title: string;
  items: DulceriaItem[];
}

// Dulcería menu. Single source of content — the seam for Firestore later.
export const dulceriaMenu: DulceriaCategory[] = [
  {
    id: "combos",
    title: "Combos",
    items: [
      { name: "Combo Mega", price: "S/ 32.90", icon: "🍿", sub: "Canchita grande + bebida" },
      { name: "Combo Pareja", price: "S/ 45.90", icon: "🥤", sub: "2 canchitas + 2 bebidas" },
      { name: "Combo Familiar", price: "S/ 58.90", icon: "🍫", sub: "Combo grande + dulces" },
      { name: "Combo Dúo", price: "S/ 39.90", icon: "🎬", sub: "Canchita + 2 bebidas medianas" },
    ],
  },
  {
    id: "canchitas",
    title: "Canchitas",
    items: [
      { name: "Canchita Salada", price: "S/ 18.90", icon: "🍿", sub: "Tamaño grande" },
      { name: "Canchita Mantequilla", price: "S/ 21.90", icon: "🧈", sub: "Extra mantequilla" },
      { name: "Canchita Caramelo", price: "S/ 22.90", icon: "🍯", sub: "Dulce y crocante" },
      { name: "Canchita Mixta", price: "S/ 24.90", icon: "🍿", sub: "Salada + caramelo" },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    items: [
      { name: "Gaseosa Grande", price: "S/ 12.90", icon: "🥤", sub: "32 oz · sabores surtidos" },
      { name: "Limonada Frozen", price: "S/ 14.90", icon: "🧋", sub: "Frappé de limón" },
      { name: "Agua Mineral", price: "S/ 6.90", icon: "💧", sub: "Con o sin gas" },
      { name: "Café Americano", price: "S/ 9.90", icon: "☕", sub: "Recién pasado" },
    ],
  },
  {
    id: "dulces",
    title: "Dulces & Snacks",
    items: [
      { name: "Nachos con Queso", price: "S/ 24.90", icon: "🧀", sub: "Con jalapeños" },
      { name: "Hot Dog Clásico", price: "S/ 16.90", icon: "🌭", sub: "Con papas al hilo" },
      { name: "Chocolate", price: "S/ 8.90", icon: "🍫", sub: "Barra premium" },
      { name: "Gomitas", price: "S/ 7.90", icon: "🐻", sub: "Bolsa surtida" },
    ],
  },
];
