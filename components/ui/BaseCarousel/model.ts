import { ReactElement } from 'react';

export interface IPropsBaseCarousel {
  items: { component: ReactElement; id: string }[];
  className: string;
}
