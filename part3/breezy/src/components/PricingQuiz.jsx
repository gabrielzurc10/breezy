import { useMemo, useState } from 'react';
import { useContent } from '../content/index.jsx';
import './PricingQuiz.css';

const QUESTIONS = [
  {
    q: 'Who will be doing the breathing?',
    options: [
      { label: 'Just me (and my houseplant)', votes: { casual: 2 } },
      { label: 'Me, but I breathe a lot', votes: { power: 2 } },
      { label: 'A whole team of professional breathers', votes: { enterprise: 2 } },
    ],
  },
  {
    q: 'How seriously do you take your air?',
    options: [
      { label: "It's fine, it's air", votes: { casual: 2 } },
      { label: "It's a lifestyle", votes: { power: 2 } },
      { label: "It's mission-critical infrastructure", votes: { enterprise: 2 } },
    ],
  },
  {
    q: 'Nostril optimization needs?',
    options: [
      { label: 'One nostril is plenty', votes: { casual: 2 } },
      { label: 'Both, obviously', votes: { power: 2 } },
      { label: "My entire org chart's nostrils", votes: { enterprise: 2 } },
    ],
  },
  {
    q: 'When something goes wrong with your air…',
    options: [
      { label: "I'll just open a window", votes: { casual: 2 } },
      { label: 'I expect an actual reply', votes: { power: 2 } },
      { label: 'I need a dedicated human on the phone', votes: { enterprise: 2 } },
    ],
  },
];

const TIER_ORDER = ['casual', 'power', 'enterprise'];

const REASONS = {
  casual: 'You breathe casually and you know it. No sense paying for nostrils you will not use.',
  power: 'You take breathing seriously enough to want both nostrils optimized and a support team that actually replies.',
  enterprise: 'Multiple breathers, mission-critical air, and a need for real humans on the phone. That is Enterprise Lung territory.',
};

export default function PricingQuiz({ onRecommend }) {
  const { tiers } = useContent();
  const [answers, setAnswers] = useState([]);
  const step = answers.length;
  const done = step === QUESTIONS.length;

  const recommendation = useMemo(() => {
    if (!done) return null;
    const scores = { casual: 0, power: 0, enterprise: 0 };
    answers.forEach((optIdx, qIdx) => {
      const votes = QUESTIONS[qIdx].options[optIdx].votes;
      for (const [tier, n] of Object.entries(votes)) scores[tier] += n;
    });
    const winner = TIER_ORDER.reduce((best, tier) =>
      scores[tier] > scores[best] ? tier : best
    );
    return tiers.find((t) => t.id === winner);
  }, [answers, done, tiers]);

  const pick = (optIdx) => setAnswers([...answers, optIdx]);

  const restart = () => {
    setAnswers([]);
    onRecommend?.(null);
  };

  const showMyTier = () => {
    if (!recommendation) return;
    onRecommend?.(recommendation.id);
    document
      .getElementById(`tier-${recommendation.id}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="quiz" id="quiz">
      <div className="quiz-head">
        <div className="section-label">Air Match™</div>
        <h2 className="quiz-title">Not sure which atmosphere is you?</h2>
        <p className="quiz-sub">
          Four questions. Zero DNA samples (this time). We match you to your tier.
        </p>
      </div>

      {!done ? (
        <div className="quiz-card" key={step}>
          <div className="quiz-progress" aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}>
            {QUESTIONS.map((_, i) => (
              <span
                key={i}
                className={i < step ? 'dot filled' : i === step ? 'dot active' : 'dot'}
              />
            ))}
          </div>
          <h3>{QUESTIONS[step].q}</h3>
          <div className="quiz-options">
            {QUESTIONS[step].options.map((opt, i) => (
              <button key={opt.label} className="quiz-option" onClick={() => pick(i)}>
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button className="quiz-back" onClick={() => setAnswers(answers.slice(0, -1))}>
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-card quiz-result">
          <p className="quiz-result-label">Your Air Match</p>
          <h3>{recommendation.name}</h3>
          <div className="quiz-price">
            <sup>$</sup>
            {recommendation.price}
            <sub>/mo</sub>
          </div>
          <p className="quiz-reason">{REASONS[recommendation.id]}</p>
          <div className="quiz-actions">
            <button className="btn btn-primary" onClick={showMyTier}>
              Show me my tier ↓
            </button>
            <button className="btn btn-secondary" onClick={restart}>
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
