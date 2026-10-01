import { ShieldCheck, UserRound, Server, Mail, Fingerprint, Database, Router, Bug, CircleAlert, Code2 } from 'lucide-react';
import type { Scenario } from '../lib/types';

const nodeIcons = [UserRound, Router, Server];

export function ScenarioVisual({ scenario, labels }: { scenario: Scenario; labels?: string[] }) {
  const defaultLabels = scenario.id === 'phishing' ? ['Message', 'You', 'Unknown page'] : scenario.id === 'mitm' ? ['You', 'Network', 'Service'] : scenario.id === 'sql-injection' ? ['Form input', 'Application', 'Database'] : scenario.id === 'malware' ? ['Process', 'System', 'Response'] : scenario.id === 'password' ? ['Simulated attempts', 'Account', 'Controls'] : ['Attempt stream', 'Demo account', 'Controls'];
  const nodes = labels ?? defaultLabels;
  const iconSet = scenario.id === 'phishing' ? [Mail, UserRound, CircleAlert] : scenario.id === 'password' || scenario.id === 'bruteforce' ? [Fingerprint, UserRound, ShieldCheck] : scenario.id === 'sql-injection' ? [UserRound, Code2, Database] : scenario.id === 'malware' ? [Bug, Server, ShieldCheck] : [UserRound, Router, Server];
  return <div className="panel visual-panel" data-testid={`visual-${scenario.id}`}>
    <div className="visual-head"><span>Concept map</span><span>Fictional flow / no live connection</span></div>
    <div className="diagram">{nodes.slice(0,3).map((node, i) => {
      const Icon = iconSet[i] as typeof UserRound;
      return <div className="diagram-node" key={`${node}-${i}`}><Icon aria-hidden="true"/>{node}</div>;
    }).flatMap((node, i, arr) => i < arr.length - 1 ? [node, <span className="diagram-arrow" key={`arrow-${i}`} aria-hidden="true"/>] : [node])}</div>
  </div>;
}