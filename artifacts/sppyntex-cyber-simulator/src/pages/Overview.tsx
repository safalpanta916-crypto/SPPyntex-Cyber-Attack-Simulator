import { Link } from 'wouter';
import { ArrowUpRight, BookOpen, Play, ShieldCheck } from 'lucide-react';
import { scenarios } from '../data/scenarios';
import type { LocalProgress } from '../lib/types';
import { ScenarioIcon } from '../components/AppShell';

export default function Overview({ progress }: { progress: LocalProgress }) {
  const seenCount = progress.seenScenarios.length;
  return <div className="content">
    <section className="overview-hero">
      <div className="panel hero-copy"><div className="eyebrow">Personal cybersecurity learning lab</div><h1>Learn by making the call.</h1><p>Learn how common cyber attacks work through safe interactive simulations.</p><Link href="/scenarios" className="button" data-testid="button-start-simulation"><Play size={14}/>Start a simulation</Link></div>
      <div className="panel hero-aside"><div><span className="lab-stamp">SPPYNTEX / FIELD LAB</span><h2>Decisions first.<br/>Theory after.</h2><p>Every scenario is fictional and runs in this browser.</p></div><div className="mini-path"><span>NOTICE</span><i/><span>DECIDE</span><i/><span>LEARN</span></div></div>
    </section>
    <div className="page-head"><div><div className="eyebrow">Workspace / Overview</div><h1 className="page-title">Your learning space</h1><p className="page-description">Pick up a scenario or revisit what you have completed. Progress stays in this browser.</p></div></div>
    <section className="overview-grid">
      <div className="panel panel-pad"><div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'center'}}><div><h2 className="section-title">Available scenarios</h2><p className="section-subtitle">Six fictional situations to explore</p></div><Link href="/scenarios" className="button secondary">Browse all <ArrowUpRight size={13}/></Link></div>
        <div className="scenario-list">{scenarios.map(s=><Link key={s.id} href={`/scenario/${s.id}`} className="scenario-row" data-testid={`card-overview-${s.id}`}><span className="scenario-icon"><ScenarioIcon name={s.icon}/></span><span><strong>{s.title}</strong><small>{s.duration} · {s.difficulty}</small></span><ArrowUpRight className="arrow"/></Link>)}</div>
      </div>
      <div style={{display:'grid',gap:14}}>
        <div className="panel panel-pad"><div><h2 className="section-title">Recently completed</h2><p className="section-subtitle">Your browser-saved simulation history</p></div>
          {progress.completed.length ? <div className="history-list">{progress.completed.slice(0,4).map((item,i)=><div className="history-item" key={item.id} data-testid={`history-item-${i}`}><div><strong>{item.title}</strong><small>{new Date(item.completedAt).toLocaleDateString(undefined,{month:'short',day:'numeric'})} · Simulation Score</small></div><span className="score-chip">{item.score}/100</span></div>)}</div> : <div className="empty-state"><span className="empty-symbol"><BookOpen/></span><strong>No simulations completed yet.</strong><p>Choose a scenario to make your first decisions.</p></div>}
        </div>
        <div className="panel panel-pad"><h2 className="section-title">Simulation progress</h2><p className="section-subtitle">Based on scenarios you have opened in this browser</p>
          <div className="progress-lines"><div><div className="progress-line-top"><span>Scenarios explored</span><span>{seenCount} / {scenarios.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:`${seenCount/scenarios.length*100}%`}}/></div></div><div><div className="progress-line-top"><span>Completed simulations</span><span>{progress.completed.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:`${Math.min(progress.completed.length/scenarios.length,1)*100}%`}}/></div></div></div>
          <p className="section-subtitle" style={{marginTop:14,display:'flex',alignItems:'center',gap:6}}><ShieldCheck size={12}/>A Simulation Score reflects decisions in a fictional scenario, not real-world skill.</p>
        </div>
      </div>
    </section>
  </div>;
}