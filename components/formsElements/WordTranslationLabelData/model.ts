export interface IPropsWordTranslationLabelData {
  id: string;
  wordAriaLabel: string;
  wordPlaceholder: string;
  wordSaved: string;
  translationSaved: string;
  labelSaved: string;
  isToClear: boolean;
  deleteItemHandler: (id: string) => () => void;
  saveItemHandler: (word: string, translation: string, label: string, id: string) => () => void;
}
