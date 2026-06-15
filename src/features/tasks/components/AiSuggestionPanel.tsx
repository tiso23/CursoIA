import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Alert, Stack, Typography } from '@mui/material';
import type { IceSuggestion } from '../types';
import { LoadingButton } from '../../../shared/components/LoadingButton';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';

type AiSuggestionPanelProps = {
  error: string;
  loading: boolean;
  suggestion: IceSuggestion | null;
  onSuggest: () => void;
};

export function AiSuggestionPanel({
  error,
  loading,
  onSuggest,
  suggestion,
}: AiSuggestionPanelProps) {
  return (
    <Stack spacing={1.5}>
      <LoadingButton
        loading={loading}
        onClick={onSuggest}
        startIcon={<AutoAwesomeIcon />}
        variant="outlined"
      >
        Sugerir ICE
      </LoadingButton>

      {error ? <ErrorMessage message={error} /> : null}

      {suggestion ? (
        <Alert severity="info">
          <Typography fontWeight={700} variant="body2">
            Sugerencia aplicada
          </Typography>
          <Typography variant="body2">{suggestion.reason}</Typography>
        </Alert>
      ) : null}
    </Stack>
  );
}
