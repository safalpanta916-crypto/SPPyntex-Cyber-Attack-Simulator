import type { Choice, DecisionRecord, SimulationSession } from './types';

export function startSimulation(scenarioId: SimulationSession['scenarioId']): SimulationSession {
  return { scenarioId, stageIndex: 0, decisions: [], complete: false };
}

export function decide(session: SimulationSession, choice: Choice): SimulationSession {
  const record: DecisionRecord = {
    stage: session.stageIndex,
    choiceId: choice.id,
    choiceLabel: choice.label,
    risk: choice.risk,
    outcome: choice.outcome,
    explanation: choice.explanation,
    defense: choice.defense,
  };
  return { ...session, decisions: [...session.decisions, record], selected: record };
}

export function advance(session: SimulationSession, stageCount: number): SimulationSession {
  if (session.stageIndex + 1 >= stageCount) return { ...session, complete: true, selected: undefined };
  return { ...session, stageIndex: session.stageIndex + 1, selected: undefined };
}

export function simulationScore(session: SimulationSession): number {
  if (!session.decisions.length) return 0;
  const points = session.decisions.reduce((sum, decision) => sum + (decision.risk === 'low' ? 100 : decision.risk === 'medium' ? 62 : 28), 0);
  return Math.max(0, Math.min(100, Math.round(points / session.decisions.length)));
}

export function scoreLabel(score: number): string {
  return score >= 85 ? 'Strong' : score >= 65 ? 'Good' : score >= 40 ? 'Developing' : 'Needs review';
}