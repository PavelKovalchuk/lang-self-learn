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

export interface IWordTranslationData {
  word: string;
  translation: string;
  id: string;
}

export interface IVerbData {
  pronoun: string;
  pronounTranslation: string;
  verb: string;
  verbTranslation: string;
  id: string;
}

export interface IIndefiniteVerbData {
  verb: string;
  translation: string;
  id: string;
}

// Documents
export interface IPronounDataDocument {
  _id: string;
  userId: number;
  pronouns: IPronounData[];
  pronounGroup: IWordTranslationData;
}
