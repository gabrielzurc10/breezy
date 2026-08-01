import { useEffect, useRef, useState } from 'react';
import { useContent } from '../content/index.jsx';
import './HowItWorks.css';

export default function HowItWorks() {
  const { steps } = useContent();
  const ref = useRef(null);
  const [reveal, setReveal] = useState('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    setReveal('ready');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReveal('inview');
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['how', reveal !== 'idle' && 'reveal-ready', reveal === 'inview' && 'in-view']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={cls} id="how">
      <div className="container center">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Three steps to better breathing</h2>
        <p className="section-sub centered">
          It's so simple, you've probably been doing it wrong your whole life.
        </p>
        <div className="steps" ref={ref}>
          {steps.map((s, i) => (
            <div className="step" key={s.title}>
              <div className="step-num" aria-hidden="true">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
