import { IAbstractWordsPairData, IVerbsDataDocument } from 'types';

/* eslint-disable no-unused-vars */

export interface IShuffledData {
  pronouns: IAbstractWordsPairData[];
  verbs: IAbstractWordsPairData[];
}

export interface IPropsChoosePairCard {
  verbData: IVerbsDataDocument;
  onFinishCardHandler: (mark: number) => void;
  isToReset: boolean;
}
