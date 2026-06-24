export function getPerView(width: number): number {
  if (width < 540) return 2;
  if (width < 860) return 3;
  if (width < 1100) return 4;
  return 6;
}

export function totalPages(count: number, perView: number): number {
  return Math.max(1, Math.ceil(count / perView));
}

export function nextPage(page: number, pages: number): number {
  return (page + 1) % pages;
}

export function prevPage(page: number, pages: number): number {
  return (page - 1 + pages) % pages;
}
