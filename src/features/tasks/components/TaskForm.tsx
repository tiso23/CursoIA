import { Stack, TextField } from '@mui/material';
import type { IceScore } from '../types';
import type { TaskFormErrors, TaskFormValues } from '../hooks/useTaskForm';

type TaskFormProps = {
  errors: TaskFormErrors;
  values: TaskFormValues;
  onIceChange: (field: keyof IceScore, value: number) => void;
  onTextChange: (field: 'title' | 'description', value: string) => void;
};

export function TaskForm({ errors, onIceChange, onTextChange, values }: TaskFormProps) {
  return (
    <Stack spacing={2}>
      <TextField
        autoFocus
        error={Boolean(errors.title)}
        fullWidth
        helperText={errors.title}
        label="Titulo"
        onChange={(event) => onTextChange('title', event.target.value)}
        required
        value={values.title}
      />

      <TextField
        fullWidth
        label="Descripcion"
        minRows={3}
        multiline
        onChange={(event) => onTextChange('description', event.target.value)}
        value={values.description}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          error={Boolean(errors.impact)}
          fullWidth
          helperText={errors.impact}
          inputProps={{ min: 1, max: 10 }}
          label="Impacto"
          onChange={(event) => onIceChange('impact', Number(event.target.value))}
          type="number"
          value={values.iceScore.impact}
        />

        <TextField
          error={Boolean(errors.confidence)}
          fullWidth
          helperText={errors.confidence}
          inputProps={{ min: 1, max: 10 }}
          label="Confianza"
          onChange={(event) => onIceChange('confidence', Number(event.target.value))}
          type="number"
          value={values.iceScore.confidence}
        />

        <TextField
          error={Boolean(errors.ease)}
          fullWidth
          helperText={errors.ease}
          inputProps={{ min: 1, max: 10 }}
          label="Facilidad"
          onChange={(event) => onIceChange('ease', Number(event.target.value))}
          type="number"
          value={values.iceScore.ease}
        />
      </Stack>
    </Stack>
  );
}
