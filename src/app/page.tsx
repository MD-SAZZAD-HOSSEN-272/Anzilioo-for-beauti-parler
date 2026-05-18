import { HomeHero } from "@/components/home/HomeHero";
import HomeHeroSlider from "@/components/home/HomeHeroSlider";
import { HomeSections } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HomeHeroSlider />
      <HomeHero />
      <HomeSections />
    </div>
  );
}

