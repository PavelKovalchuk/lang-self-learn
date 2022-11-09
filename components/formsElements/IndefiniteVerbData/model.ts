export interface IPropsIndefiniteVerbData {
  saveIndefiniteHandler: (verb: string, translation: string) => () => void;
  isToClear: boolean;
}
