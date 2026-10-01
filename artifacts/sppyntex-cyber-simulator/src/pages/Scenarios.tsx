import { Link } from 'wouter';
import { ArrowRight, Clock3 } from 'lucide-react';
import { scenarios } from '../data/scenarios';
import { ScenarioIcon } from '../components/AppShell';

export default function Scenarios() {
  return <div className="content">
    <div className="page-head"><div><div className="eyebrow">Workspace / Attack Simulator</div><h1 className="page-title">Choose a scenario</h1><p className="page-description">Read a fictional situation, make a decision, and see what changes. Nothing here interacts with a real system.</p></div></div>
    <div className="scenario-grid">{scenarios.map(s=><article className="panel scenario-card" key={s.id} data-testid={`scenario-card-${s.id}`}>
      <div className="card-top"><div className="card-mark"><span className="scenario-icon"><ScenarioIcon name={s.icon}/></span><span className="eyebrow" style={{margin:0}}>Scenario / {String(s.id === 'sql-injection' ? 5 : scenarios.indexOf(s)+1).padStart(2,'0')}</span></div><span className="difficulty">{s.difficulty}</span></div>
      <h2>{s.title}</h2><p>{s.summary}</p>
      <div className="learn-label">You’ll practice</div><div className="goals">{s.goals}</div>
      <div className="scenario-card-footer"><span><Clock3 size={12} style={{verticalAlign:'-2px',marginRight:5}}/>{s.duration}</span><Link href={`/scenario/${s.id}`} className="button secondary" data-testid={`button-open-${s.id}`}>Open scenario <ArrowRight/></Link></div>
    </article>)}</div>
    <div className="panel defense-strip" style={{marginTop:15}}><div><div className="eyebrow">A note on safety</div><h2>Practice without the risk.</h2><p>All outcomes are predetermined learning examples. No credentials, network traffic, or target systems are involved.</p></div><Link href="/learning" className="button secondary">Browse learning notes <ArrowRight/></Link></div>
  </div>;
}