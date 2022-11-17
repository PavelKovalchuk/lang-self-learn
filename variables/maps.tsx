import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

import { MARKS } from './marks';

export const MARKS_TO_COLORS_MAP = {
  [MARKS.FINE]: 'var(--color-success-500)',
  [MARKS.GOOD]: 'var(--color-success-100)',
  [MARKS.MEDIUM]: 'var(--color-grey-300)',
  [MARKS.BAD]: 'var(--color-error-100)',
  [MARKS.TERRIBLE]: 'var(--color-error-500)',
};

export const MARKS_TO_ICONS_MAP = {
  [MARKS.FINE]: <CheckCircleFill color={`${MARKS_TO_COLORS_MAP[MARKS.FINE]}`} size={24} />,
  [MARKS.GOOD]: <CheckCircleFill color={`${MARKS_TO_COLORS_MAP[MARKS.GOOD]}`} size={24} />,
  [MARKS.MEDIUM]: <CheckCircleFill color={`${MARKS_TO_COLORS_MAP[MARKS.MEDIUM]}`} size={24} />,
  [MARKS.BAD]: <XCircleFill color={`${MARKS_TO_COLORS_MAP[MARKS.BAD]}`} size={24} />,
  [MARKS.TERRIBLE]: <XCircleFill color={`${MARKS_TO_COLORS_MAP[MARKS.TERRIBLE]}`} size={24} />,
};
