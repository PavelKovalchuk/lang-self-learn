import { IAbstractWordsPairData, IVerbsDataDocument } from 'types';

export interface IShuffledData {
  pronouns: IAbstractWordsPairData[];
  verbs: IAbstractWordsPairData[];
}

export interface IPropsChoosePairCard {
  verbData: IVerbsDataDocument;
}
