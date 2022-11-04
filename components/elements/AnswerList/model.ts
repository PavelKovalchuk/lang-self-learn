import { MouseEventHandler } from 'react';
import { IRegularVerbVariant, IVerbAnswer } from 'types';

/* eslint-disable no-unused-vars */

export interface IPropsAnswerList {
  answers: IVerbAnswer[];
  variants: IRegularVerbVariant[];
  isFinishedTest: boolean;
  onRemoveItemHandler: (answerId: string) => MouseEventHandler<HTMLButtonElement> | undefined;
}
