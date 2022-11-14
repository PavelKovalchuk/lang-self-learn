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

export interface IGroupData {
  word: string;
  translation: string;
  label: string;
  id: string;
}

export interface IButtonsListItemData {
  text: string;
  id: string;
}

// Documents
export interface IBaseDocument {
  _id: string;
}

export interface IBaseUserDataDocument {
  userId: number;
}

export interface IPronounDataDocument extends IBaseDocument, IBaseUserDataDocument {
  pronouns: IPronounData[];
  pronounGroup: IWordTranslationData;
}

export interface IGroupsDataDocument extends IBaseDocument, IBaseUserDataDocument {
  groups: IGroupData[];
}

export interface IVerbsDataDocument extends IBaseDocument, IBaseUserDataDocument {
  indefinite: IIndefiniteVerbData;
  verbs: IVerbData[];
  selectedVerbsGroupsIds: string[];
  pronounsGroupId: string;
}
