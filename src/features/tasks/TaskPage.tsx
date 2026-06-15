import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export function TaskPage() {
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

          <Paper
            elevation={0}
            sx={{
              border: 1,
              borderColor: 'divider',
              p: { xs: 2, md: 3 },
            }}
          >
            <Stack
              alignItems={{ xs: 'stretch', sm: 'center' }}
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <Typography component="h2" variant="h6">
                  Pantalla inicial del gestor
                </Typography>
                <Typography color="text.secondary">
                  La base esta lista para anadir tareas en los siguientes pasos.
                </Typography>
              </Box>

              <Button disabled startIcon={<AddIcon />} variant="contained">
                Nueva tarea
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
