import type { IceScore, Task, TaskSummaryCounts } from '../../features/tasks/types';

export const DEFAULT_ICE_SCORE: IceScore = {
  impact: 5,
  confidence: 5,
  ease: 5,
};

export function calculateIceTotal(iceScore: IceScore) {
  return iceScore.impact * iceScore.confidence * iceScore.ease;
}

export function normalizeIceValue(value: number) {
  if (!Number.isFinite(value)) {
    return DEFAULT_ICE_SCORE.impact;
  }

  return Math.min(10, Math.max(1, Math.round(value)));
}

export function normalizeIceScore(iceScore: IceScore): IceScore {
  return {
    impact: normalizeIceValue(iceScore.impact),
    confidence: normalizeIceValue(iceScore.confidence),
    ease: normalizeIceValue(iceScore.ease),
  };
}

export function sortTasksByIce(tasks: Task[]) {
  return [...tasks].sort((firstTask, secondTask) => {
    const secondTotal = calculateIceTotal(secondTask.iceScore);
    const firstTotal = calculateIceTotal(firstTask.iceScore);

    return secondTotal - firstTotal;
  });
}

export function countTasksByStatus(tasks: Task[]): TaskSummaryCounts {
  return tasks.reduce<TaskSummaryCounts>(
    (summary, task) => ({
      pending: summary.pending + (task.status === 'pending' ? 1 : 0),
      completed: summary.completed + (task.status === 'completed' ? 1 : 0),
    }),
    { pending: 0, completed: 0 },
  );
}
