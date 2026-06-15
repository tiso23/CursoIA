export type TaskStatus = 'pending' | 'completed';

export type IceScore = {
  impact: number;
  confidence: number;
  ease: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  iceScore: IceScore;
  aiReason?: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = {
  title: string;
  description: string;
  iceScore: IceScore;
  aiReason?: string;
};

export type TaskSummaryCounts = {
  pending: number;
  completed: number;
};
