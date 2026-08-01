import Hero from '../components/Hero.jsx';
import Logos from '../components/Logos.jsx';
import Features from '../components/Features.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Home() {
  usePageMeta(
    'Breezy',
    "Hand-curated atmospheric blends sourced from the world's finest altitudes. Because you deserve air with character."
  );

  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Newsletter />
    </>
  );
}
