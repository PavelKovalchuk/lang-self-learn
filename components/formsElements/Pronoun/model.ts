/* eslint-disable no-unused-vars */

export interface IPropsPronoun {
  id: string;
  savePronounHandler: (id: string, pronoun: string, translation: string) => () => void;
  deletePronounHandler: (id: string) => () => void;
  pronounSaved: string;
  translationSaved: string;
}
