import { IRegularVerbVariant, IVerbAnswer } from 'types';

export interface IPropsAnswerList {
  answers: IVerbAnswer[];
  variants: IRegularVerbVariant[];
  isFinishedTest: boolean;
}
