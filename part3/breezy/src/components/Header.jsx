import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const pages = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About / FAQ' },
];

const dead = (e) => e.preventDefault();

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e) => {
      if (!moreRef.current?.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [moreOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="header-wrap">
        <div className="utility-bar">
          <a href="#" onClick={dead}><span className="util-icon">📱</span> Breezy App</a>
          <a href="#" onClick={dead}><span className="util-icon">📅</span> Consultations</a>
          <a href="#" onClick={dead}><span className="util-icon">📞</span> 1-888-AIR-GOOD</a>
        </div>

        <div className="mid-bar">
          <Link className="nav-brand" to="/">
            <em>Breezy</em>&thinsp;™
          </Link>
          <div className="mid-links">
            <a href="#" onClick={dead}>Locations <span className="mini-arrow">▾</span></a>
            <a href="#" onClick={dead}>Rewards Club</a>
            <Link to="/#signup" className="book-btn">
              Book Air <span className="mini-arrow">▾</span>
            </Link>
          </div>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className="main-nav" aria-label="Main">
          <div className="location-badge">
            <div className="location-dot" aria-hidden="true">📍</div>
            SUMMIT
          </div>
          <div className="main-nav-links">
            {pages.map((p) => (
              <NavLink key={p.to} to={p.to} end={p.to === '/'}>
                {p.label}
              </NavLink>
            ))}
          </div>
          <div className="more-wrap" ref={moreRef}>
            <button
              className={`more-btn${moreOpen ? ' open' : ''}`}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More <span className="more-arrow">▼</span>
            </button>
            <div className={`more-dropdown${moreOpen ? ' open' : ''}`}>
              <a href="#" onClick={dead}>Air Menu</a>
              <a href="#" onClick={dead}>Careers</a>
              <a href="#" onClick={dead}>Directions</a>
            </div>
          </div>
        </nav>
      </div>

      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu" aria-label="Mobile">
        {pages.map((p) => (
          <NavLink key={p.to} to={p.to} end={p.to === '/'} onClick={closeMenu}>
            {p.label}
          </NavLink>
        ))}
        <a href="#" onClick={dead}>Air Menu</a>
        <a href="#" onClick={dead}>Careers</a>
        <a href="#" onClick={dead}>Directions</a>
        <a href="#" onClick={dead}>Locations</a>
        <a href="#" onClick={dead}>Rewards Club</a>
        <Link to="/#signup" onClick={closeMenu}>Book Air</Link>
      </nav>
    </>
  );
}
