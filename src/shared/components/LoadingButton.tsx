import CircularProgress from '@mui/material/CircularProgress';
import Button, { type ButtonProps } from '@mui/material/Button';

type LoadingButtonProps = ButtonProps & {
  loading: boolean;
};

export function LoadingButton({
  children,
  disabled,
  loading,
  startIcon,
  ...buttonProps
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress color="inherit" size={16} /> : startIcon}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}
