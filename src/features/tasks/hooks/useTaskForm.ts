import { useCallback, useState } from 'react';
import type { IceScore, Task, TaskInput } from '../types';
import { DEFAULT_ICE_SCORE, normalizeIceValue } from '../../../shared/utils/iceScore';

export type TaskFormValues = {
  title: string;
  description: string;
  iceScore: IceScore;
  aiReason: string;
};

export type TaskFormErrors = {
  title?: string;
  impact?: string;
  confidence?: string;
  ease?: string;
};

const emptyFormValues: TaskFormValues = {
  title: '',
  description: '',
  iceScore: DEFAULT_ICE_SCORE,
  aiReason: '',
};

function validateIceValue(value: number) {
  return Number.isFinite(value) && value >= 1 && value <= 10;
}

function validateForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'El titulo es obligatorio.';
  }

  if (!validateIceValue(values.iceScore.impact)) {
    errors.impact = 'Usa un valor entre 1 y 10.';
  }

  if (!validateIceValue(values.iceScore.confidence)) {
    errors.confidence = 'Usa un valor entre 1 y 10.';
  }

  if (!validateIceValue(values.iceScore.ease)) {
    errors.ease = 'Usa un valor entre 1 y 10.';
  }

  return errors;
}

function getFormValuesFromTask(task?: Task): TaskFormValues {
  if (!task) {
    return emptyFormValues;
  }

  return {
    title: task.title,
    description: task.description,
    iceScore: task.iceScore,
    aiReason: task.aiReason ?? '',
  };
}

export function useTaskForm() {
  const [values, setValues] = useState<TaskFormValues>(emptyFormValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  const resetForm = useCallback((task?: Task) => {
    setValues(getFormValuesFromTask(task));
    setErrors({});
  }, []);

  const setTextValue = useCallback((field: 'title' | 'description', value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }, []);

  const setIceValue = useCallback((field: keyof IceScore, value: number) => {
    setValues((currentValues) => ({
      ...currentValues,
      iceScore: {
        ...currentValues.iceScore,
        [field]: value,
      },
    }));
  }, []);

  const applyIceSuggestion = useCallback((iceScore: IceScore, reason: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      iceScore,
      aiReason: reason,
    }));
  }, []);

  const getTaskInput = useCallback((): TaskInput | null => {
    const formErrors = validateForm(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return null;
    }

    return {
      title: values.title,
      description: values.description,
      iceScore: {
        impact: normalizeIceValue(values.iceScore.impact),
        confidence: normalizeIceValue(values.iceScore.confidence),
        ease: normalizeIceValue(values.iceScore.ease),
      },
      aiReason: values.aiReason,
    };
  }, [values]);

  return {
    values,
    errors,
    resetForm,
    setTextValue,
    setIceValue,
    applyIceSuggestion,
    getTaskInput,
  };
}
