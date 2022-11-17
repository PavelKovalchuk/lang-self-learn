import { ReactNode } from 'react';

export interface IPropsBaseModal {
  title: string;
  children: ReactNode;
  isShown: boolean;
  onClose: () => void;
}
