import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { Task, TaskInput } from '../types';
import { useTaskForm } from '../hooks/useTaskForm';
import { TaskForm } from './TaskForm';

type TaskFormDialogProps = {
  editingTask: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (taskInput: TaskInput) => void;
};

export function TaskFormDialog({ editingTask, onClose, onSave, open }: TaskFormDialogProps) {
  const { errors, getTaskInput, resetForm, setIceValue, setTextValue, values } = useTaskForm();

  useEffect(() => {
    if (open) {
      resetForm(editingTask ?? undefined);
    }
  }, [editingTask, open, resetForm]);

  const handleSave = () => {
    const taskInput = getTaskInput();

    if (!taskInput) {
      return;
    }

    onSave(taskInput);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TaskForm
          errors={errors}
          onIceChange={setIceValue}
          onTextChange={setTextValue}
          values={values}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
