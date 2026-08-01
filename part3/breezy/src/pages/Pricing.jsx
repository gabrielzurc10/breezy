import { useState } from 'react';
import PricingQuiz from '../components/PricingQuiz.jsx';
import PricingCards from '../components/PricingCards.jsx';
import Stats from '../components/Stats.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function Pricing() {
  usePageMeta(
    'Pricing: Breezy',
    'Choose your atmosphere. Three tiers of premium artisanal air, from Casual Breather to Enterprise Lung.'
  );

  const [recommendedId, setRecommendedId] = useState(null);

  return (
    <>
      <PricingQuiz onRecommend={setRecommendedId} />
      <PricingCards recommendedId={recommendedId} />
      <Stats />
      <Testimonials />
    </>
  );
}
