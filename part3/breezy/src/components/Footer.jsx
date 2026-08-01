import { Link } from 'react-router-dom';
import { useContent } from '../content/index.jsx';
import './Footer.css';

const dead = (e) => e.preventDefault();

export default function Footer() {
  const { site } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <em>Breezy</em>&thinsp;™
          </div>
          <p>{site.footerBlurb}</p>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li><Link to="/#features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><a href="#" onClick={dead}>API Docs</a></li>
            <li><a href="#" onClick={dead}>Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About (It's Air)</Link></li>
            <li><a href="#" onClick={dead}>Blog</a></li>
            <li><a href="#" onClick={dead}>Careers</a></li>
            <li><a href="#" onClick={dead}>Press Kit</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#" onClick={dead}>Privacy Policy</a></li>
            <li><a href="#" onClick={dead}>Terms of Service</a></li>
            <li><a href="#" onClick={dead}>Air EULA</a></li>
            <li><a href="#" onClick={dead}>Nostril Waiver</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">&copy; {year} Breezy</div>
    </footer>
  );
}
