import {
  IAbstractWordsPairData,
  IFinishRoundVerbResults,
  IVerbAnswer,
  IVerbsDataDocument,
} from 'types';

/* eslint-disable no-unused-vars */

export interface IShuffledData {
  pronouns: IAbstractWordsPairData[];
  verbs: IAbstractWordsPairData[];
}

export interface IFinishRoundVerbResultsParam {
  answers: IVerbAnswer[];
  mark: number;
  correctAnswers: number;
  verbData: IVerbsDataDocument;
}

export interface IPropsChoosePairCard {
  verbData: IVerbsDataDocument;
  onResetCardHandler: (id: string) => void;
  onFinishCardHandler: (params: IFinishRoundVerbResults) => void;
  isToReset: boolean;
}
