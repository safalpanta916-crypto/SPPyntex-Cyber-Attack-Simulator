import type { CompletedSimulation, LocalProgress, ScenarioId } from './types';

const STORAGE_KEY = 'sppyntex-cyber-lab-progress-v1';
const EMPTY: LocalProgress = { completed: [], seenScenarios: [] };

export function readProgress(): LocalProgress {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return EMPTY;
    const value = JSON.parse(stored) as Partial<LocalProgress>;
    return {
      completed: Array.isArray(value.completed) ? value.completed : [],
      seenScenarios: Array.isArray(value.seenScenarios) ? value.seenScenarios : [],
    };
  } catch {
    return EMPTY;
  }
}

function writeProgress(progress: LocalProgress): void {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* Storage may be disabled; the current session still works. */ }
}

export function markScenarioSeen(id: ScenarioId): LocalProgress {
  const progress = readProgress();
  if (!progress.seenScenarios.includes(id)) {
    const next = { ...progress, seenScenarios: [...progress.seenScenarios, id] };
    writeProgress(next);
    return next;
  }
  return progress;
}

export function saveCompletion(record: CompletedSimulation): LocalProgress {
  const progress = readProgress();
  const next = { completed: [record, ...progress.completed], seenScenarios: progress.seenScenarios.includes(record.scenarioId) ? progress.seenScenarios : [...progress.seenScenarios, record.scenarioId] };
  writeProgress(next);
  return next;
}

export function clearProgress(): LocalProgress {
  writeProgress(EMPTY);
  return EMPTY;
}