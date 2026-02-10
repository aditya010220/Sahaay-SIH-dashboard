import React, { useMemo, useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const scaleOptions = [
  { value: 0, label: '0 - Not at all' },
  { value: 1, label: '1 - Several days' },
  { value: 2, label: '2 - More than half the days' },
  { value: 3, label: '3 - Nearly every day' },
];

const gad7Questions = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid, as if something awful might happen',
];

const phq9Questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself—or that you are a failure or have let your family down',
  'Trouble concentrating on things, such as reading or watching television',
  'Moving or speaking noticeably slowly; or being so restless/fidgety that you move more than usual',
  'Thoughts that you would be better off dead, or of hurting yourself in some way',
];

const severityForGAD = (score) => {
  if (score <= 4) return { level: 'Minimal anxiety', variant: 'success' };
  if (score <= 9) return { level: 'Mild anxiety', variant: 'secondary' };
  if (score <= 14) return { level: 'Moderate anxiety', variant: 'warning' };
  return { level: 'Severe anxiety', variant: 'danger' };
};

const severityForPHQ = (score) => {
  if (score <= 4) return { level: 'Minimal depression', variant: 'success' };
  if (score <= 9) return { level: 'Mild depression', variant: 'secondary' };
  if (score <= 14) return { level: 'Moderate depression', variant: 'warning' };
  if (score <= 19) return { level: 'Moderately severe depression', variant: 'danger' };
  return { level: 'Severe depression', variant: 'danger' };
};

const ScoreBadge = ({ label, score, max, variant }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-heading font-semibold text-foreground">{score} / {max}</p>
      </div>
      <Button size="sm" variant={variant}>{variant === 'danger' ? 'High' : variant === 'warning' ? 'Moderate' : 'Low'}</Button>
    </div>
  );
};

const QuestionGroup = ({ title, description, questions, namePrefix, values, onChange }) => {
  return (
    <section className="glass-card p-6 rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="divide-y divide-border">
        {questions.map((q, idx) => (
          <div key={`${namePrefix}-${idx}`} className="py-4">
            <div className="mb-3">
              <p className="font-medium text-foreground">{idx + 1}. {q}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {scaleOptions.map((opt) => {
                const id = `${namePrefix}-${idx}-${opt.value}`;
                const checked = values[idx] === opt.value;
                return (
                  <label key={id} htmlFor={id} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-accent/40 ${checked ? 'bg-accent/60 border-primary' : ''}`}>
                    <input
                      id={id}
                      type="radio"
                      name={`${namePrefix}-${idx}`}
                      value={opt.value}
                      className="h-4 w-4 text-primary"
                      checked={checked}
                      onChange={() => onChange(idx, opt.value)}
                    />
                    <span className="text-sm text-foreground">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const SelfAssessmentForm = () => {
  const [gadAnswers, setGadAnswers] = useState(Array(gad7Questions.length).fill(null));
  const [phqAnswers, setPhqAnswers] = useState(Array(phq9Questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const allAnswered = useMemo(() => (
    gadAnswers.every((v) => v !== null) && phqAnswers.every((v) => v !== null)
  ), [gadAnswers, phqAnswers]);

  const gadScore = useMemo(() => gadAnswers.reduce((sum, v) => sum + (v ?? 0), 0), [gadAnswers]);
  const phqScore = useMemo(() => phqAnswers.reduce((sum, v) => sum + (v ?? 0), 0), [phqAnswers]);

  const gadSeverity = useMemo(() => severityForGAD(gadScore), [gadScore]);
  const phqSeverity = useMemo(() => severityForPHQ(phqScore), [phqScore]);

  const suicideRisk = useMemo(() => {
    // PHQ-9 item 9 (index 8)
    const v = phqAnswers[8];
    return v !== null && v > 0;
  }, [phqAnswers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allAnswered) return;
    setShowResults(true);
  };

  const handleReset = () => {
    setGadAnswers(Array(gad7Questions.length).fill(null));
    setPhqAnswers(Array(phq9Questions.length).fill(null));
    setShowResults(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Instructions */}
      <section className="glass-card p-6 rounded-xl">
        <div className="flex items-start gap-3">
          <Icon name="Info" className="text-primary mt-1" size={20} />
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Instructions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Over the last 2 weeks, how often have you been bothered by the following problems?
              Use: 0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <QuestionGroup
        title="Section A: Anxiety (GAD-7)"
        questions={gad7Questions}
        namePrefix="gad"
        values={gadAnswers}
        onChange={(idx, val) => setGadAnswers((prev) => prev.map((v, i) => (i === idx ? val : v)))}
      />

      <QuestionGroup
        title="Section B: Depression (PHQ-9)"
        questions={phq9Questions}
        namePrefix="phq"
        values={phqAnswers}
        onChange={(idx, val) => setPhqAnswers((prev) => prev.map((v, i) => (i === idx ? val : v)))}
      />

      {/* Crisis Alert */}
      {suicideRisk && (
        <div className="glass-card p-6 rounded-xl border border-error/30 bg-error/5">
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" className="text-error mt-1" size={20} />
            <div>
              <h4 className="text-lg font-heading font-semibold text-error">Important: Immediate Support Recommended</h4>
              <p className="text-sm text-error mt-1">
                Your response suggests thoughts of self-harm. If you are in immediate danger, please call emergency services. For support:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="danger" iconName="Phone" iconPosition="left">Call 988</Button>
                <Button variant="outline" iconName="MessageCircle" iconPosition="left" onClick={(e) => { e.preventDefault(); window.location.href = '/ai-chatbot-support'; }}>Chat with AI Support</Button>
                <Button variant="secondary" iconName="Calendar" iconPosition="left" onClick={(e) => { e.preventDefault(); window.location.href = '/appointment-booking'; }}>Book Emergency Appointment</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" iconName="CheckCircle" iconPosition="left" disabled={!allAnswered}>Calculate Results</Button>
        <Button type="button" variant="outline" onClick={handleReset} iconName="RotateCcw">Reset</Button>
      </div>

      {/* Results */}
      {showResults && (
        <section className="glass-card p-6 rounded-xl">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreBadge label="GAD-7 (Anxiety)" score={gadScore} max={21} variant={gadSeverity.variant} />
            <ScoreBadge label="PHQ-9 (Depression)" score={phqScore} max={27} variant={phqSeverity.variant} />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Anxiety Severity</p>
              <p className="text-base font-medium text-foreground">{gadSeverity.level}</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Depression Severity</p>
              <p className="text-base font-medium text-foreground">{phqSeverity.level}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">This screening does not provide a diagnosis. Please consult a licensed professional for clinical assessment.</p>
        </section>
      )}
    </form>
  );
};

export default SelfAssessmentForm;
