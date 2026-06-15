import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab, Stack, Typography } from '@mui/material';
import type { Task, TaskInput } from './types';
import { useTasks } from './hooks/useTasks';
import { TaskFormDialog } from './components/TaskFormDialog';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { TaskConfirmationSummary } from './components/TaskConfirmationSummary';

export function TaskPage() {
  const { createTask, deleteTask, summary, tasks, toggleTaskStatus, updateTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmedTask, setConfirmedTask] = useState<Task | null>(null);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskInput: TaskInput) => {
    if (editingTask) {
      updateTask(editingTask.id, taskInput);
      setConfirmedTask({
        ...editingTask,
        ...taskInput,
        updatedAt: new Date().toISOString(),
      });
      return;
    }

    createTask(taskInput);
    setConfirmedTask({
      id: 'preview',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...taskInput,
    });
  };

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: { xs: 3, md: 6 } }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography component="h1" variant="h4">
              Gestor de tareas ICE
            </Typography>
            <Typography color="text.secondary">
              Crea tareas, ajusta su ICE y prioriza el trabajo pendiente.
            </Typography>
          </Stack>

          <TaskSummary summary={summary} />

          {confirmedTask ? <TaskConfirmationSummary task={confirmedTask} /> : null}

          <TaskList
            onDelete={deleteTask}
            onEdit={handleOpenEdit}
            onToggleStatus={toggleTaskStatus}
            tasks={tasks}
          />
        </Stack>
      </Container>

      <Fab
        aria-label="Crear tarea"
        color="primary"
        onClick={handleOpenCreate}
        sx={{ bottom: 24, position: 'fixed', right: 24 }}
      >
        <AddIcon />
      </Fab>

      <TaskFormDialog
        editingTask={editingTask}
        onClose={handleCloseForm}
        onSave={handleSaveTask}
        open={isFormOpen}
      />
    </Box>
  );
}
