import { Fragment } from 'react';
import HeroSection from '../../components/home/HeroSection';
import HowToSection from '../../components/home/HowToSection';
import TokenomicsSection from '../../components/home/TokenomicsSection';
import RoadmapSection from '../../components/home/RoadmapSection';
import PartnersSection from '../../components/home/PartnersSection';
import FeaturesSection from '../../components/home/FeaturesSection';
import AlreadyConvincedSection from '../../components/about/AlreadyConvincedSection';

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <PartnersSection />
      <FeaturesSection />
      <HowToSection />
      <TokenomicsSection />
      <RoadmapSection />
      <AlreadyConvincedSection />
    </Fragment>
  );
}
