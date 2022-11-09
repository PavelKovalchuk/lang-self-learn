export interface IPropsWordTranslationData {
  id: string;
  wordAriaLabel: string;
  wordPlaceholder: string;
  isToClear: boolean;
  saveWordHandler: (word: string, translation: string, id?: string) => () => void;
}
