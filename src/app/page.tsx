import UtilityBar from "@/components/site/UtilityBar";
import SiteHeader from "@/components/site/SiteHeader";
import HeroCarousel from "@/components/site/HeroCarousel";
import FilterBar from "@/components/site/FilterBar";
import MoviesGrid from "@/components/site/MoviesGrid";

export default function Home() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <HeroCarousel />
      <FilterBar />
      <MoviesGrid />
    </>
  );
}
