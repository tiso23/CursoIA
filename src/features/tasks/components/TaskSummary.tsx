import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Paper, Stack, Typography } from '@mui/material';
import type { TaskSummaryCounts } from '../types';

type TaskSummaryProps = {
  summary: TaskSummaryCounts;
};

export function TaskSummary({ summary }: TaskSummaryProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Paper elevation={0} sx={{ border: 1, borderColor: 'divider', flex: 1, p: 2 }}>
        <Stack alignItems="center" direction="row" spacing={1.5}>
          <PendingActionsIcon color="primary" />
          <div>
            <Typography variant="body2" color="text.secondary">
              Pendientes
            </Typography>
            <Typography variant="h5">{summary.pending}</Typography>
          </div>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ border: 1, borderColor: 'divider', flex: 1, p: 2 }}>
        <Stack alignItems="center" direction="row" spacing={1.5}>
          <AssignmentTurnedInIcon color="secondary" />
          <div>
            <Typography variant="body2" color="text.secondary">
              Completadas
            </Typography>
            <Typography variant="h5">{summary.completed}</Typography>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
}
