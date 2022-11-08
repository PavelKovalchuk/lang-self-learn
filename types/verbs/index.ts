export interface IRegularVerb {
  id: string;
  verb: string;
  translation: string;
  variants: IRegularVerbVariant[];
}

export interface IRegularVerbVariant {
  pronoun: string;
  verb: string;
  id: string;
}

export interface IVerbAnswer {
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

export interface IPronounData {
  pronoun: string;
  translation: string;
  id: string;
}
