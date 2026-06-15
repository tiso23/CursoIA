import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Task } from '../types';
import { IceScore } from './IceScore';

type TaskItemProps = {
  task: Task;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onToggleStatus: (taskId: string) => void;
};

export function TaskItem({ task, onDelete, onEdit, onToggleStatus }: TaskItemProps) {
  const isCompleted = task.status === 'completed';

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Stack spacing={0.75}>
              <Stack alignItems="center" direction="row" flexWrap="wrap" gap={1}>
                <Typography
                  component="h3"
                  sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                  variant="h6"
                >
                  {task.title}
                </Typography>
                <Chip
                  color={isCompleted ? 'success' : 'default'}
                  label={isCompleted ? 'Completada' : 'Pendiente'}
                  size="small"
                />
              </Stack>

              {task.description ? (
                <Typography color="text.secondary">{task.description}</Typography>
              ) : null}
            </Stack>

            <Stack direction="row" spacing={0.5}>
              <Tooltip title={isCompleted ? 'Marcar pendiente' : 'Completar'}>
                <IconButton
                  aria-label={isCompleted ? 'Marcar pendiente' : 'Completar'}
                  color={isCompleted ? 'success' : 'default'}
                  onClick={() => onToggleStatus(task.id)}
                >
                  {isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar">
                <IconButton aria-label="Editar" onClick={() => onEdit(task)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Eliminar">
                <IconButton aria-label="Eliminar" color="error" onClick={() => onDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <IceScore iceScore={task.iceScore} />

          {task.aiReason ? (
            <Typography color="text.secondary" variant="body2">
              {task.aiReason}
            </Typography>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
