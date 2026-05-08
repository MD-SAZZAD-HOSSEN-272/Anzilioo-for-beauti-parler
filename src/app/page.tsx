import { HomeHero } from "@/components/home/HomeHero";
import { HomeSections } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HomeHero />
      <HomeSections />
    </div>
  );
}

