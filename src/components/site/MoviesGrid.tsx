"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { movies } from "@/lib/data";
import { PosterSVG } from "@/lib/poster";

function MoviesGridInner() {
  return (
    <div className="movies-grid">
      {movies.slice(0, 10).map((m) => (
        <div key={m.title} className="movie-card">
          <div className="movie-poster-wrap">
            <PosterSVG
              title={m.title}
              subtitle={m.subtitle}
              palette={m.palette}
              motif={m.motif}
            />
            <span className="movie-tag">2D · ESP</span>
          </div>
          <div className="movie-meta">
            <span className="movie-title">{m.title}</span>
            <span className="movie-genre">{m.genre}</span>
          </div>
          <div className="movie-actions">
            <button className="btn-buy">COMPRAR</button>
            <button className="btn-info" aria-label="Más info">+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MoviesGrid() {
  return (
    <section className="movies-section">
      <h2 className="section-title">Películas</h2>
      <Tabs defaultValue="cartelera">
        <TabsList className="tabs !bg-transparent !p-0 !h-auto !rounded-none !w-auto">
          <TabsTrigger
            value="cartelera"
            className="tab !bg-transparent !shadow-none !rounded-none !px-1 !py-3.5 data-[active]:!bg-transparent data-[active]:!shadow-none"
          >
            EN CARTELERA
          </TabsTrigger>
          <TabsTrigger
            value="proximamente"
            className="tab !bg-transparent !shadow-none !rounded-none !px-1 !py-3.5 data-[active]:!bg-transparent data-[active]:!shadow-none"
          >
            PRÓXIMAMENTE
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cartelera">
          <MoviesGridInner />
        </TabsContent>
        <TabsContent value="proximamente">
          <MoviesGridInner />
        </TabsContent>
      </Tabs>
      <div className="see-more">
        <button className="see-more-btn">VER MÁS PELÍCULAS</button>
      </div>
    </section>
  );
}
