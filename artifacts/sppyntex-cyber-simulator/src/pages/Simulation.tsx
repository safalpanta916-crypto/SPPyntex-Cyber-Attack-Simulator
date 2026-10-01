import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, Link } from 'wouter';
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { scenarioById, isScenarioId } from '../data/scenarios';
import type { LocalProgress, SimulationSession } from '../lib/types';
import { advance, decide, scoreLabel, simulationScore, startSimulation } from '../lib/engine';
import { markScenarioSeen, saveCompletion } from '../lib/storage';
import { ScenarioVisual } from '../components/ScenarioVisual';

export default function Simulation({ onProgress }: { onProgress: (progress: LocalProgress) => void }) {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const scenario = params.id && isScenarioId(params.id) ? scenarioById(params.id) : undefined;
  const [session, setSession] = useState<SimulationSession | null>(() => scenario ? startSimulation(scenario.id) : null);
  const savedRef = useRef(false);

  useEffect(() => {
    if (scenario) {
      onProgress(markScenarioSeen(scenario.id));
      if (!session || session.scenarioId !== scenario.id) {
        setSession(startSimulation(scenario.id));
        savedRef.current = false;
      }
    }
  }, [scenario?.id]);

  useEffect(() => {
    if (!scenario || !session?.complete || savedRef.current) return;
    savedRef.current = true;
    const next = saveCompletion({
      id: `${Date.now()}-${scenario.id}`, scenarioId: scenario.id, title: scenario.title,
      score: simulationScore(session), completedAt: new Date().toISOString(), decisionCount: session.decisions.length,
    });
    onProgress(next);
  }, [session, scenario, onProgress]);

  if (!scenario || !session) return <div className="content"><div className="panel empty-state"><strong>That scenario is not available.</strong><p>Choose one from the scenario list.</p><Link href="/scenarios" className="button">Browse scenarios</Link></div></div>;
  const stage = scenario.stages[session.stageIndex];
  const step = session.stageIndex + 1;
  const restart = () => { setSession(startSimulation(scenario.id)); savedRef.current = false; };
  const selectChoice = (id: string) => {
    const choice = stage.choices.find(c => c.id === id);
    if (choice) setSession(current => current ? decide(current, choice) : current);
  };
  const nextStage = () => setSession(current => current ? advance(current, scenario.stages.length) : current);

  return <div className="content">
    <div className="sim-heading"><div><div className="eyebrow"><Link href="/scenarios" className="text-link">Scenarios</Link> / {scenario.title}</div><h1>{scenario.title}</h1><div className="progress-track large"><div className="progress-fill" style={{width:`${session.complete ? 100 : step/scenario.stages.length*100}%`}}/></div></div><span className="stage-counter">{session.complete ? 'COMPLETE' : `STAGE ${String(step).padStart(2,'0')} / ${String(scenario.stages.length).padStart(2,'0')}`}</span></div>
    {session.complete ? <Completion scenario={scenario} session={session} onRestart={restart}/> : <>
      <div className="sim-layout">
        <div className="sim-main">
          <ScenarioVisual scenario={scenario} labels={stage.visual}/>
          <section className="panel stage-panel">
            <div className="eyebrow">Situation / {String(step).padStart(2,'0')}</div><h2>{stage.title}</h2><p>{stage.situation}</p>
            {stage.facts && <div className="detail-grid">{stage.facts.map(f=><div className="detail-item" key={f.label}><small>{f.label}</small><span>{f.value}</span></div>)}</div>}
            {session.selected ? <>
              <div className={`outcome-banner risk-${session.selected.risk}`} data-testid="simulation-outcome"><div className="outcome-label">{session.selected.risk} risk · decision recorded</div><h3>{session.selected.outcome}</h3><p>{session.selected.explanation}</p></div>
              <div className="detail-item" style={{marginBottom:14}}><small>Recommended defense</small><span>{session.selected.defense}</span></div>
              <div className="situation-card"><strong>Takeaway</strong><br/>{stage.choices.find(c=>c.id===session.selected?.choiceId)?.learning}</div>
              <button className="button" onClick={nextStage} data-testid="button-next-stage">{session.stageIndex === scenario.stages.length-1 ? 'See simulation result' : 'Continue to next stage'} <ArrowRight/></button>
            </> : <>
              <div className="situation-card">{scenario.id === 'phishing' ? 'Look for clues before you decide. Each choice changes what happens in this fictional scenario.' : 'What would you do next? Each choice leads to a different learning outcome.'}</div>
              <div className="choice-list">{stage.choices.map((choice,index)=><button className="choice-button" key={choice.id} onClick={()=>selectChoice(choice.id)} data-testid={`choice-${scenario.id}-${choice.id}`}><span className="choice-number">0{index+1}</span><span><strong>{choice.label}</strong><small>{choice.detail}</small></span></button>)}</div>
            </>}
          </section>
        </div>
        <aside className="sim-aside">
          <div className="panel aside-block"><div className="eyebrow">Scenario notes</div><h3>What is at stake</h3><p>{scenario.attackerGoal}</p><div className="divider"/><h3>Warning signs</h3><ul className="aside-list">{scenario.warningSigns.slice(0,4).map(x=><li key={x}>{x}</li>)}</ul></div>
          <div className="panel aside-block" style={{marginTop:12}}><h3>Reduce the risk</h3><ul className="aside-list">{scenario.defenses.slice(0,4).map(x=><li key={x}>{x}</li>)}</ul></div>
          <button className="button ghost" style={{marginTop:7}} onClick={restart} data-testid="button-restart"><RotateCcw/>Restart this scenario</button>
        </aside>
      </div>
    </>}
  </div>;
}

function Completion({ scenario, session, onRestart }: { scenario: NonNullable<ReturnType<typeof scenarioById>>; session: SimulationSession; onRestart: () => void }) {
  const score = simulationScore(session);
  const lowCount = session.decisions.filter(d=>d.risk==='low').length;
  const midCount = session.decisions.filter(d=>d.risk==='medium').length;
  const outcomeGrade = scoreLabel(score);
  return <div className="sim-layout">
    <div className="sim-main">
      <div className="eyebrow">Simulation complete / {scenario.title}</div><h2 style={{fontSize:26,letterSpacing:'-.045em',margin:'0 0 8px'}}>A decision trail, not a skills test.</h2>
      <p className="page-description" style={{margin:'0 0 17px'}}>Review what happened at each step, then try a different path if you like.</p>
      <div className="panel result-score" data-testid="simulation-score"><div className="score-number">{score}<small> / 100</small></div><div><div className="eyebrow" style={{margin:0}}>Simulation Score</div><p>This score reflects choices in this fictional run only. It is not a measure of real-world cybersecurity skill.</p></div></div>
      <div className="score-categories"><div className="score-category"><small>Risk recognition</small><strong>{outcomeGrade}</strong></div><div className="score-category"><small>Decision making</small><strong>{outcomeGrade}</strong></div><div className="score-category"><small>Defensive awareness</small><strong>{lowCount > 1 ? 'Strong' : lowCount ? 'Developing' : 'Review again'}</strong></div></div>
      <div className="panel panel-pad"><h2 className="section-title">Your decisions</h2><p className="section-subtitle">Different choices can lead to different outcomes.</p><div className="history-list">{session.decisions.map((d,i)=><div className="history-item" key={`${d.stage}-${d.choiceId}`} style={{alignItems:'flex-start'}}><div><strong>{String(i+1).padStart(2,'0')} · {d.choiceLabel}</strong><small>{d.outcome}</small><small style={{color:'#aeb8bd'}}>{d.explanation}</small></div><span className={`score-chip ${d.risk==='high'?'risk-high':''}`}>{d.risk}</span></div>)}</div></div>
      <div style={{display:'flex',gap:8,marginTop:14,flexWrap:'wrap'}}><button className="button" onClick={onRestart} data-testid="button-run-again"><RotateCcw/>Try again</button><Link href="/scenarios" className="button secondary" data-testid="link-all-scenarios">All scenarios <ArrowRight/></Link></div>
    </div>
    <aside className="sim-aside"><div className="panel aside-block"><div className="eyebrow">Defense / recap</div><h3>Reduce the risk</h3><p>{scenario.impact}</p><div className="divider"/><ul className="aside-list">{scenario.defenses.map(x=><li key={x}>{x}</li>)}</ul><div className="divider"/><p><Check size={13} style={{verticalAlign:'-3px',color:'#83cba5',marginRight:5}}/>{lowCount} lower-risk choices · {midCount} choices to consider</p><button className="button ghost" style={{marginTop:12}} onClick={onRestart}><RotateCcw/>Restart scenario</button></div></aside>
  </div>;
}