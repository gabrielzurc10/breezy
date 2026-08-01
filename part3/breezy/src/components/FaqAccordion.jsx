import { useState } from 'react';
import { useContent } from '../content/index.jsx';
import './FaqAccordion.css';

export default function FaqAccordion() {
  const { faqs, faqSource } = useContent();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container center">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Questions we made up</h2>
        <p className="section-sub centered">
          Transparent answers to the questions literally nobody asked.
        </p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className="faq-item" key={f.q}>
              <button
                className="faq-q"
                aria-expanded={openIndex === i}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {f.q}
              </button>
              <div className={`faq-a${openIndex === i ? ' open' : ''}`} id={`faq-a-${i}`}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
        {faqSource === 'wordpress' && (
          <p className="faq-source">
            These entries are managed in WordPress and load through its REST API.
          </p>
        )}
      </div>
    </section>
  );
}
