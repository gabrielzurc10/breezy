import { useContent } from '../content/index.jsx';
import './Testimonials.css';

export default function Testimonials() {
  const { testimonials } = useContent();

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-label">Testimonials</div>
        <h2 className="section-title light">Don't take our word for it</h2>
        <p className="section-sub">Real reviews from real breathers. Probably.</p>
        <div className="test-grid">
          {testimonials.map((t) => (
            <div className="test-card" key={t.name}>
              <div className="stars" aria-label={`${t.stars.length} star rating`}>{t.stars}</div>
              <blockquote>“{t.quote}”</blockquote>
              <div className="test-author">
                <div className="test-avatar" style={{ background: t.avatarBg }} aria-hidden="true">
                  {t.avatar}
                </div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
