import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Alert, Button, Stack, Typography } from '@mui/material';
import type { IceSuggestion } from '../types';
import { LoadingButton } from '../../../shared/components/LoadingButton';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { IceScore } from './IceScore';

type AiSuggestionPanelProps = {
  accepted: boolean;
  error: string;
  loading: boolean;
  suggestion: IceSuggestion | null;
  onAccept: () => void;
  onSuggest: () => void;
};

export function AiSuggestionPanel({
  accepted,
  error,
  loading,
  onAccept,
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
          <Stack spacing={1.5}>
            <Typography fontWeight={700} variant="body2">
              Revisa la sugerencia
            </Typography>
            <IceScore iceScore={suggestion.iceScore} />
            <Typography variant="body2">{suggestion.reason}</Typography>
            <Button disabled={accepted} onClick={onAccept} size="small" variant="contained">
              {accepted ? 'Sugerencia aplicada' : 'Aplicar sugerencia'}
            </Button>
          </Stack>
        </Alert>
      ) : null}
    </Stack>
  );
}
