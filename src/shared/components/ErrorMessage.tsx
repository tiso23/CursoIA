import { Alert } from '@mui/material';

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <Alert severity="error">{message}</Alert>;
}
