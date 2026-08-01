import { useContent } from '../content/index.jsx';
import './Stats.css';

export default function Stats() {
  const { site } = useContent();

  return (
    <section className="stats" id="stats">
      <div className="stats-grid">
        {site.stats.map((s) => (
          <div className="stat" key={s.label}>
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
