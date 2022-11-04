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
