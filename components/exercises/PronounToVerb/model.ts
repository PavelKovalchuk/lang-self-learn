import { IFinishRoundVerbResults, IVerbsDataDocument } from 'types';

/* eslint-disable no-unused-vars */

export interface IPropsPronounToVerb {
  verbs: IVerbsDataDocument[];
  verbsGroupsTitles: string[];
  onReturnHandlerCallback: () => void;
  onFinishHandlerCallback: (param: IFinishRoundVerbResults[]) => void;
}
