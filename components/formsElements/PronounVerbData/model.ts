export interface IPropsPronounVerbData {
  id: string;
  pronoun: string;
  pronounTranslation: string;
  saveVerbHandler: (id: string, verb: string, verbTranslation: string) => () => void;
  isToClear: boolean;
}
