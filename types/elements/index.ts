export interface IAbstractWordsPairData {
  text: string;
  pairId: string;
}

export interface IVerbAnswer {
  verb: string;
  pronoun: string;
  verbIdPair: string;
  pronounIdPair: string;
  answerId: string;
  isCorrect: boolean | null;
}

export interface IPronounData {
  pronoun: string;
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

export interface IGroupData {
  word: string;
  translation: string;
  label: string;
  id: string;
}

export interface IAnswerMarkData {
  title: string;
  mark: number;
}

export interface IFinishRoundVerbResults {
  mark: number;
  id: string;
  title: string;
  questions: number;
  corrects: number;
  points: number;
}
