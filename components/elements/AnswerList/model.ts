import { MouseEventHandler } from 'react';
import { IVerbAnswer, IVerbData } from 'types';

/* eslint-disable no-unused-vars */

export interface IPropsAnswerList {
  answers: IVerbAnswer[];
  variants: IVerbData[];
  isFinishedTest: boolean;
  onRemoveItemHandler: (answerId: string) => MouseEventHandler<HTMLButtonElement> | undefined;
}
