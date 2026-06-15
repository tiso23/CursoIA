import { Box, Container, Stack, Typography } from '@mui/material';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { useTasks } from './hooks/useTasks';

export function TaskPage() {
  const { deleteTask, summary, tasks, toggleTaskStatus } = useTasks();

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: { xs: 3, md: 6 } }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography component="h1" variant="h4">
              Gestor de tareas ICE
            </Typography>
            <Typography color="text.secondary">
              Prioriza tus tareas por impacto, confianza y facilidad.
            </Typography>
          </Stack>

          <TaskSummary summary={summary} />
          <TaskList
            onDelete={deleteTask}
            onToggleStatus={toggleTaskStatus}
            tasks={tasks}
          />
        </Stack>
      </Container>
    </Box>
  );
}
