
import { Link } from 'wouter';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { scenarios } from '../data/scenarios';
import type { LocalProgress } from '../lib/types';
import { ScenarioIcon } from '../components/AppShell';

export default function Overview({ progress }: { progress: LocalProgress }) {
  const seenCount = progress.seenScenarios.length;
  const completedCount = progress.completed.length;
  const featured = scenarios[0];

  const exploredPercent = Math.min(
    (seenCount / scenarios.length) * 100,
    100,
  );

  const completedPercent = Math.min(
    (completedCount / scenarios.length) * 100,
    100,
  );

  return (
    <div className="content sp-home">
      <section className="sp-hero">
        <div className="sp-hero-copy">
          <div className="sp-kicker">
            <span className="sp-kicker-dot" />
            YOUR INTERACTIVE SECURITY LAB
          </div>

          <h1>
            Think like a defender.
            <br />
            <span>Learn by doing.</span>
          </h1>

          <p className="sp-hero-description">
            Cybersecurity makes more sense when you face the decisions.
            Explore realistic situations, spot the warning signs, and
            discover what a safer response looks like.
          </p>

          <div className="sp-hero-actions">
            <Link
              href="/scenarios"
              className="sp-primary-button"
              data-testid="button-start-simulation"
            >
              <Play size={17} fill="currentColor" />
              Explore simulations
              <ArrowRight size={17} />
            </Link>

            <Link href="/learning" className="sp-text-button">
              Browse the learning guide
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="sp-hero-footnote">
            <ShieldCheck size={15} />
            Safe, fictional scenarios. No real systems are targeted.
          </div>
        </div>

        <div className="sp-hero-visual">
          <div className="sp-visual-top">
            <span className="sp-live-mark">
              <span />
              SIMULATION ENVIRONMENT
            </span>
            <span className="sp-visual-index">01 / 06</span>
          </div>

          <div className="sp-orbit" aria-hidden="true">
            <div className="sp-orbit-ring sp-ring-one" />
            <div className="sp-orbit-ring sp-ring-two" />
            <div className="sp-orbit-core">
              <ShieldCheck size={43} strokeWidth={1.35} />
            </div>
            <span className="sp-orbit-node sp-node-one" />
            <span className="sp-orbit-node sp-node-two" />
            <span className="sp-orbit-node sp-node-three" />
          </div>

          <div className="sp-visual-caption">
            <span>Observe <i /> Decide <i /> Defend</span>
            <strong>Every decision teaches you something.</strong>
          </div>
        </div>
      </section>

      <section className="sp-welcome-row">
        <div>
          <div className="sp-section-eyebrow">YOUR WORKSPACE</div>
          <h2>Progress, not perfection.</h2>
          <p>Pick up where you left off, or try something new.</p>
        </div>

        <div className="sp-personal-note">
          <Sparkles size={17} />
          <span>
            Built with curiosity by
            <strong> Safal Panta</strong>
          </span>
        </div>
      </section>

      <section className="sp-stat-grid" aria-label="Your learning progress">
        <div className="sp-stat-card">
          <span className="sp-stat-icon"><BookOpen size={19} /></span>
          <span className="sp-stat-label">Scenarios explored</span>
          <strong>{seenCount}<small> / {scenarios.length}</small></strong>
          <div className="sp-stat-track">
            <span style={{ width: `${exploredPercent}%` }} />
          </div>
        </div>

        <div className="sp-stat-card">
          <span className="sp-stat-icon"><CheckCircle2 size={19} /></span>
          <span className="sp-stat-label">Simulations completed</span>
          <strong>{completedCount}<small> completed</small></strong>
          <div className="sp-stat-track">
            <span style={{ width: `${completedPercent}%` }} />
          </div>
        </div>

        <div className="sp-stat-card sp-stat-message">
          <span className="sp-stat-icon"><ShieldCheck size={19} /></span>
          <span className="sp-stat-label">The goal</span>
          <strong>Think clearly.</strong>
          <p>Recognise risk. Choose a safer response.</p>
        </div>
      </section>

      <section className="sp-featured">
        <div className="sp-featured-heading">
          <div>
            <div className="sp-section-eyebrow">A GOOD PLACE TO START</div>
            <h2>Your first decision awaits.</h2>
          </div>
          <span className="sp-recommended">
            <Sparkles size={13} /> START HERE
          </span>
        </div>

        <Link
          href={`/scenario/${featured.id}`}
          className="sp-featured-card"
          data-testid={`card-overview-${featured.id}`}
        >
          <div className="sp-featured-icon">
            <ScenarioIcon name={featured.icon} />
          </div>

          <div className="sp-featured-copy">
            <span className="sp-card-overline">SCENARIO 01</span>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            <div className="sp-featured-meta">
              <span><Clock3 size={14} /> {featured.duration}</span>
              <span>{featured.difficulty}</span>
              <span>Interactive</span>
            </div>
          </div>

          <span className="sp-featured-cta">
            Start scenario <ArrowUpRight size={18} />
          </span>
        </Link>
      </section>

      <section className="sp-scenarios-section">
        <div className="sp-section-heading">
          <div>
            <div className="sp-section-eyebrow">THE SCENARIO LIBRARY</div>
            <h2>Different threats. Better decisions.</h2>
            <p>Choose a situation and work through it at your own pace.</p>
          </div>

          <Link href="/scenarios" className="sp-view-all">
            All scenarios <ArrowRight size={16} />
          </Link>
        </div>

        <div className="sp-scenario-grid">
          {scenarios.map((scenario, index) => (
            <Link
              key={scenario.id}
              href={`/scenario/${scenario.id}`}
              className="sp-scenario-card"
              data-testid={`card-overview-${scenario.id}`}
            >
              <div className="sp-scenario-card-top">
                <span className="sp-scenario-card-icon">
                  <ScenarioIcon name={scenario.icon} />
                </span>
                <span className="sp-scenario-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3>{scenario.title}</h3>
              <p>{scenario.summary}</p>

              <div className="sp-scenario-card-bottom">
                <span>{scenario.duration} · {scenario.difficulty}</span>
                <ArrowUpRight size={17} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="sp-history-section">
        <div className="sp-section-heading">
          <div>
            <div className="sp-section-eyebrow">YOUR JOURNEY</div>
            <h2>What you've worked through.</h2>
            <p>Your history is saved locally in this browser.</p>
          </div>
        </div>

        {progress.completed.length > 0 ? (
          <div className="sp-history-list">
            {progress.completed.slice(0, 4).map((item, index) => (
              <div
                className="sp-history-item"
                key={`${item.id}-${item.completedAt}`}
                data-testid={`history-item-${index}`}
              >
                <span className="sp-history-icon">
                  <CheckCircle2 size={19} />
                </span>
                <div className="sp-history-copy">
                  <strong>{item.title}</strong>
                  <span>
                    {new Date(item.completedAt).toLocaleDateString(
                      undefined,
                      { month: 'short', day: 'numeric', year: 'numeric' },
                    )}
                  </span>
                </div>
                <span className="sp-history-score">{item.score}/100</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sp-history-empty">
            <BookOpen size={22} />
            <div>
              <strong>Your journey starts with one decision.</strong>
              <p>Complete a simulation and your results will appear here.</p>
            </div>
            <Link href="/scenarios" className="sp-text-button">
              Get started <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>

      <div className="sp-bottom-note">
        <ShieldCheck size={16} />
        <span>
          This is an educational simulator. Scores reflect choices inside
          fictional scenarios, not real-world cybersecurity skill.
        </span>
      </div>
    </div>
  );
}
