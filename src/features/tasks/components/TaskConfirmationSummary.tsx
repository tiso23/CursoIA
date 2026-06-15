import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Stack, Typography } from '@mui/material';
import type { Task } from '../types';
import { IceScore } from './IceScore';

type TaskConfirmationSummaryProps = {
  task: Task;
};

export function TaskConfirmationSummary({ task }: TaskConfirmationSummaryProps) {
  return (
    <Alert icon={<CheckCircleIcon />} severity="success">
      <Stack spacing={1}>
        <Typography fontWeight={700}>Tarea guardada: {task.title}</Typography>
        <IceScore iceScore={task.iceScore} />
      </Stack>
    </Alert>
  );
}
