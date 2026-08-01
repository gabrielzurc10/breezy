import { useState } from 'react';
import { useContent } from '../content/index.jsx';
import { useToast } from './Toast.jsx';
import './Newsletter.css';

const isValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export default function Newsletter() {
  const { site } = useContent();
  const showToast = useToast();
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid(email)) {
      showToast('🎉 Welcome to Breezy! Check your inbox (or just inhale).');
      setEmail('');
    } else {
      showToast('⚠️ Please enter a valid email. We need it for... air reasons.');
    }
  };

  return (
    <section className="newsletter" id="signup">
      <div className="container">
        <div className="nl-box">
          <h2>Ready to breathe different?</h2>
          <p>
            Join {site.socialProofCount} breathers. Get weekly air quality insights and
            exclusive nostril tips.
          </p>
          <form className="nl-form" onSubmit={onSubmit} noValidate>
            <input
              type="email"
              placeholder="you@breathe.io"
              autoComplete="email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Subscribe Free →
            </button>
          </form>
          <p className="nl-fine">
            No spam. Just air. Unsubscribe by holding your breath for 60 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
