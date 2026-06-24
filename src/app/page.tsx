import UtilityBar from "@/components/site/UtilityBar";
import SiteHeader from "@/components/site/SiteHeader";
import HeroCarousel from "@/components/site/HeroCarousel";
import FilterBar from "@/components/site/FilterBar";

export default function Home() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <HeroCarousel />
      <FilterBar />
    </>
  );
}
