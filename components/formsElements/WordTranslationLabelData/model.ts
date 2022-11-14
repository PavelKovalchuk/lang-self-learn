/* eslint-disable no-unused-vars */

export interface IPropsWordTranslationLabelData {
  id: string;
  wordAriaLabel: string;
  wordPlaceholder: string;
  wordSaved: string;
  translationSaved: string;
  labelSaved: string;
  isToClear: boolean;
  isToRestore: boolean;
  deleteItemHandler: (id: string) => () => void;
  saveItemHandler: (param: {
    word: string;
    translation: string;
    label: string;
    id: string;
  }) => () => void;
}
