/* eslint-disable no-unused-vars */

export interface IIndefiniteVerbFields {
  verb: string;
  translation: string;
  id: string;
}

export interface IPropsIndefiniteVerb {
  saveIndefiniteHandler: (verb: string, translation: string) => () => void;
  isToClear: boolean;
}
