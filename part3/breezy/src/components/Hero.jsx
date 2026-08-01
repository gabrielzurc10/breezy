import { Link } from 'react-router-dom';
import { useContent } from '../content/index.jsx';
import { useToast } from './Toast.jsx';
import './Hero.css';

const avatars = [
  { emoji: '🧑', bg: '#fcd34d' },
  { emoji: '👩', bg: '#a5f3fc' },
  { emoji: '🧔', bg: '#c4b5fd' },
  { emoji: '👱', bg: '#fda4af' },
  { emoji: '👩‍🦰', bg: '#86efac' },
];

export default function Hero() {
  const { site } = useContent();
  const showToast = useToast();

  return (
    <section className="hero" id="hero">
      <div className="badge">
        <span></span> {site.badge}
      </div>
      <h1>
        Premium <em>Artisanal Air</em>, Delivered&nbsp;Fresh
      </h1>
      <p>{site.heroSub}</p>
      <div className="hero-buttons">
        <Link className="btn btn-primary" to="/pricing">
          Start Breathing Better →
        </Link>
        <button
          className="btn btn-secondary"
          onClick={() => showToast('📺 Playing: "The Art of Nothing" (3 min)')}
        >
          ▶ Watch the Story
        </button>
      </div>
      <div className="social-proof">
        <div className="avatars" aria-hidden="true">
          {avatars.map((a) => (
            <span key={a.emoji} style={{ background: a.bg }}>
              {a.emoji}
            </span>
          ))}
        </div>
        <p>
          <strong>{site.socialProofCount}</strong> breathers joined this month
        </p>
      </div>
    </section>
  );
}
