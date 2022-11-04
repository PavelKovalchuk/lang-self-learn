import { MouseEventHandler } from 'react';
import { IRegularVerbVariant, IVerbAnswer } from 'types';

export interface IPropsAnswerList {
  answers: IVerbAnswer[];
  variants: IRegularVerbVariant[];
  isFinishedTest: boolean;
  onRemoveItemHandler: (answerId: string) => MouseEventHandler<HTMLButtonElement> | undefined;
}
