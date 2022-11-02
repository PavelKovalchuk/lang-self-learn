export interface IRegularVerb {
  verb: string;
  translation: string;
  variants: IRegularVerbVariant[];
}

export interface IRegularVerbVariant {
  pronoun: string;
  verb: string;
}
