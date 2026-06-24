import UtilityBar from "@/components/site/UtilityBar";
import SiteHeader from "@/components/site/SiteHeader";
import HeroCarousel from "@/components/site/HeroCarousel";
import FilterBar from "@/components/site/FilterBar";
import MoviesGrid from "@/components/site/MoviesGrid";
import Promotions from "@/components/site/Promotions";
import SocioStrip from "@/components/site/SocioStrip";
import Dulceria from "@/components/site/Dulceria";
import AppDownload from "@/components/site/AppDownload";
import SiteFooter from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />
      <HeroCarousel />
      <FilterBar />
      <MoviesGrid />
      <Promotions />
      <SocioStrip />
      <Dulceria />
      <AppDownload />
      <SiteFooter />
    </>
  );
}
