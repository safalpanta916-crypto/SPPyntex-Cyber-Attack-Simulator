export type ScenarioId = 'phishing' | 'password' | 'bruteforce' | 'mitm' | 'sql-injection' | 'malware';
export type Risk = 'low' | 'medium' | 'high';

export interface Choice {
  id: string;
  label: string;
  detail: string;
  risk: Risk;
  outcome: string;
  explanation: string;
  defense: string;
  learning: string;
}

export interface Stage {
  title: string;
  situation: string;
  visual: string[];
  facts?: { label: string; value: string }[];
  choices: Choice[];
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  summary: string;
  difficulty: 'Beginner' | 'Intermediate';
  duration: string;
  icon: string;
  goals: string;
  attackerGoal: string;
  warningSigns: string[];
  impact: string;
  defenses: string[];
  stages: Stage[];
}

export interface DecisionRecord {
  stage: number;
  choiceId: string;
  choiceLabel: string;
  risk: Risk;
  outcome: string;
  explanation: string;
  defense: string;
}

export interface SimulationSession {
  scenarioId: ScenarioId;
  stageIndex: number;
  decisions: DecisionRecord[];
  selected?: DecisionRecord;
  complete: boolean;
}

export interface CompletedSimulation {
  id: string;
  scenarioId: ScenarioId;
  title: string;
  score: number;
  completedAt: string;
  decisionCount: number;
}

export interface LocalProgress {
  completed: CompletedSimulation[];
  seenScenarios: ScenarioId[];
}