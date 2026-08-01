import { useContent } from '../content/index.jsx';
import './Logos.css';

export default function Logos() {
  const { site } = useContent();

  return (
    <div className="logos">
      <p>Trusted by industry leaders who breathe</p>
      <div className="logo-row">
        {site.logos.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </div>
  );
}
