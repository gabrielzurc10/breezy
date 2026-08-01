import { Link } from 'react-router-dom';
import FaqAccordion from '../components/FaqAccordion.jsx';
import { useContent } from '../content/index.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import './About.css';

export default function About() {
  usePageMeta(
    'About and FAQ: Breezy',
    'What Breezy is, why it exists, and transparent answers to the questions literally nobody asked.'
  );
  const { site } = useContent();

  return (
    <>
      <section className="about-intro">
        <div className="container">
          <div className="section-label">About Breezy</div>
          <h1 className="section-title">It's air. We know. Hear us out.</h1>
          <p className="about-lede">
            Breezy started with a simple question: what if the world's most abundant free
            resource had a subscription model? Since 2026 we've been hand-curating
            atmospheric blends at the world's finest altitudes and delivering them
            instantly via our patented "Open a Window" technology.
          </p>
          <div className="about-cards">
            <div className="about-card">
              <div className="about-icon" aria-hidden="true">🌬️</div>
              <h3>Our Mission</h3>
              <p>To make breathing feel exclusive, aspirational, and slightly more expensive.</p>
            </div>
            <div className="about-card">
              <div className="about-icon" aria-hidden="true">🏔️</div>
              <h3>Our Sourcing</h3>
              <p>
                Peak-altitude harvests by certified Air Sommeliers. The jars are proprietary.
                The air is not.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon" aria-hidden="true">📈</div>
              <h3>Our Traction</h3>
              <p>
                Venture-backed, carbon-confused, and trusted by {site.socialProofCount} breathers
                this month alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion />

      <section className="about-cta">
        <div className="container center">
          <h2 className="section-title">Still have questions?</h2>
          <p className="section-sub centered">
            Our Air Support team replies within one business breath. Or find your tier and
            skip the small talk.
          </p>
          <Link className="btn btn-primary" to="/pricing">
            Find your atmosphere →
          </Link>
        </div>
      </section>
    </>
  );
}
