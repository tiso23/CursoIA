import { useCallback, useMemo, useState } from 'react';
import type { Task, TaskInput } from '../types';
import {
  countTasksByStatus,
  normalizeIceScore,
  sortTasksByIce,
} from '../../../shared/utils/iceScore';

function createTaskId() {
  return crypto.randomUUID();
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const sortedTasks = useMemo(() => sortTasksByIce(tasks), [tasks]);
  const summary = useMemo(() => countTasksByStatus(tasks), [tasks]);

  const createTask = useCallback((taskInput: TaskInput) => {
    const now = new Date().toISOString();

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: createTaskId(),
        title: taskInput.title.trim(),
        description: taskInput.description.trim(),
        status: 'pending',
        iceScore: normalizeIceScore(taskInput.iceScore),
        aiReason: taskInput.aiReason?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  }, []);

  const updateTask = useCallback((taskId: string, taskInput: TaskInput) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: taskInput.title.trim(),
              description: taskInput.description.trim(),
              iceScore: normalizeIceScore(taskInput.iceScore),
              aiReason: taskInput.aiReason?.trim() || undefined,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }, []);

  const toggleTaskStatus = useCallback((taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending',
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }, []);

  return {
    tasks: sortedTasks,
    summary,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
  };
}
