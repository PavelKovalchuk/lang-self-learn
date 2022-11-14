/* eslint-disable no-unused-vars */

export interface IWordTranslationFields {
  word: string;
  translation: string;
  id: string;
}

export interface IPropsWordTranslation {
  id: string;
  wordAriaLabel: string;
  wordPlaceholder: string;
  isToClear: boolean;
  saveWordHandler: (word: string, translation: string, id?: string) => () => void;
}
