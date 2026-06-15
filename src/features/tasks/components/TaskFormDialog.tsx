import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import type { IceSuggestion, Task, TaskInput } from '../types';
import { useTaskForm } from '../hooks/useTaskForm';
import { suggestIceScore } from '../api/suggestIceScore';
import { AiSuggestionPanel } from './AiSuggestionPanel';
import { TaskForm } from './TaskForm';

type TaskFormDialogProps = {
  editingTask: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (taskInput: TaskInput) => void;
};

const genericSuggestionError =
  'No se pudo generar la sugerencia. Puedes continuar con el calculo manual.';
const titleRequiredSuggestionError = 'Escribe un titulo antes de solicitar la sugerencia.';

export function TaskFormDialog({ editingTask, onClose, onSave, open }: TaskFormDialogProps) {
  const {
    applyIceSuggestion,
    errors,
    getTaskInput,
    resetForm,
    setIceValue,
    setTextValue,
    values,
  } = useTaskForm();
  const [suggestion, setSuggestion] = useState<IceSuggestion | null>(null);
  const [suggestionError, setSuggestionError] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) {
      resetForm(editingTask ?? undefined);
      setSuggestion(null);
      setSuggestionError('');
    }
  }, [editingTask, open, resetForm]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleClose = () => {
    abortControllerRef.current?.abort();
    onClose();
  };

  const handleSuggest = async () => {
    if (!values.title.trim()) {
      setSuggestion(null);
      setSuggestionError(titleRequiredSuggestionError);
      return;
    }

    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setSuggestionError('');
    setSuggestion(null);
    setIsSuggesting(true);

    try {
      const iceSuggestion = await suggestIceScore({
        title: values.title,
        description: values.description,
        signal: abortController.signal,
      });

      if (abortController.signal.aborted) {
        return;
      }

      applyIceSuggestion(iceSuggestion.iceScore, iceSuggestion.reason);
      setSuggestion(iceSuggestion);
    } catch {
      if (abortController.signal.aborted) {
        return;
      }

      setSuggestionError(genericSuggestionError);
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
        setIsSuggesting(false);
      }
    }
  };

  const handleSave = () => {
    const taskInput = getTaskInput();

    if (!taskInput) {
      return;
    }

    onSave(taskInput);
    handleClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <DialogTitle>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TaskForm
            errors={errors}
            onIceChange={setIceValue}
            onTextChange={setTextValue}
            values={values}
          />

          <AiSuggestionPanel
            error={suggestionError}
            loading={isSuggesting}
            onSuggest={handleSuggest}
            suggestion={suggestion}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
