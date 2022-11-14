/* eslint-disable no-unused-vars */

export interface IPropsPronounVerb {
  id: string;
  pronoun: string;
  pronounTranslation: string;
  saveVerbHandler: (id: string, verb: string, verbTranslation: string) => () => void;
  isToClear: boolean;
}
