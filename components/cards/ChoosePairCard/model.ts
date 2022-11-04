import { IRegularVerb } from 'types';

export interface IPropsChoosePairCard {
  verbData: IRegularVerb;
}

export interface IAnswer {
  verb: string;
  pronoun: string;
  verbIdPair: string;
  pronounIdPair: string;
  answerId: string;
  isCorrect: boolean | null;
}

export interface IShuffledData {
  pronouns: IPairData[];
  verbs: IPairData[];
}

export interface IPairData {
  text: string;
  pairId: string;
}
