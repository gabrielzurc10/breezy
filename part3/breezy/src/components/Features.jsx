import { useContent } from '../content/index.jsx';
import './Features.css';

export default function Features() {
  const { features } = useContent();

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-label">Why Breezy</div>
        <h2 className="section-title">Air, but make it ✨ premium ✨</h2>
        <p className="section-sub">
          We ruined a perfectly free resource by adding a subscription model. You're welcome.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.iconBg }} aria-hidden="true">
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
