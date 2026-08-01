import { useContent } from '../content/index.jsx';
import { useToast } from './Toast.jsx';
import './PricingCards.css';

export default function PricingCards({ recommendedId }) {
  const { tiers } = useContent();
  const showToast = useToast();

  return (
    <section className="pricing" id="tiers">
      <div className="container center">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Choose your atmosphere</h2>
        <p className="section-sub centered">
          All plans include unlimited access to Earth's atmosphere (terms apply).
        </p>
        <div className="pricing-grid">
          {tiers.map((t) => {
            const cls = [
              'price-card',
              t.popular && 'popular',
              t.id === recommendedId && 'recommended',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <div className={cls} id={`tier-${t.id}`} key={t.id}>
                {t.popular && <div className="popular-tag">Most Popular</div>}
                {t.id === recommendedId && <div className="match-tag">Your Air Match</div>}
                <h3>{t.name}</h3>
                <p className="desc">{t.desc}</p>
                <div className="price">
                  <sup>$</sup>
                  {t.price}
                  <sub>/mo</sub>
                </div>
                <ul>
                  {t.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <button className={`btn btn-${t.ctaStyle}`} onClick={() => showToast(t.toast)}>
                  {t.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
