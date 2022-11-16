import { IVerbsDataDocument } from 'types';

export interface IPropsPronounToVerb {
  verbs: IVerbsDataDocument[];
  verbsGroupsTitles: string[];
  onReturnHandlerCallback: () => void;
}
