import AssignmentIcon from '@mui/icons-material/Assignment';
import { Paper, Stack, Typography } from '@mui/material';
import type { Task } from '../types';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onToggleStatus: (taskId: string) => void;
};

export function TaskList({ tasks, onDelete, onEdit, onToggleStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: 'divider',
          p: { xs: 3, md: 4 },
          textAlign: 'center',
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <AssignmentIcon color="primary" fontSize="large" />
          <Typography component="h2" variant="h6">
            Todavia no hay tareas
          </Typography>
          <Typography color="text.secondary">
            Crea la primera tarea para empezar a priorizar con ICE.
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          task={task}
        />
      ))}
    </Stack>
  );
}
