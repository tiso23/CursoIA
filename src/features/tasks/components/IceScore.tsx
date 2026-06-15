import { Chip, Stack, Typography } from '@mui/material';
import type { IceScore as IceScoreType } from '../types';
import { calculateIceTotal } from '../../../shared/utils/iceScore';

type IceScoreProps = {
  iceScore: IceScoreType;
};

export function IceScore({ iceScore }: IceScoreProps) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <Chip label={`Impacto ${iceScore.impact}`} size="small" />
      <Chip label={`Confianza ${iceScore.confidence}`} size="small" />
      <Chip label={`Facilidad ${iceScore.ease}`} size="small" />
      <Typography color="primary" fontWeight={700} variant="body2">
        ICE {calculateIceTotal(iceScore)}
      </Typography>
    </Stack>
  );
}
