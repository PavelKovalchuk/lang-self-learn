import { IPairData, IVerbAnswer } from 'types';

export interface IPropsVariantsList {
  ariaLabelGroup: string;
  variantType: 'pronoun' | 'verb';
  pairsData: IPairData[];
  answers: IVerbAnswer[];
  currentAnswer: IVerbAnswer | null;
  onClickHandler: (pairId: string, text: string) => () => void;
}
