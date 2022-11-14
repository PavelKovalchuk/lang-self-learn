import { IGroupData, IPronounData, IVerbData } from 'types/elements';

import { IIndefiniteVerbData } from 'components/formsElements/IndefiniteVerb';
import { IWordTranslationData } from 'components/formsElements/WordTranslation';

export interface IBaseDocument {
  _id: string;
}

export interface IBaseUserDataDocument {
  userId: number;
}

export interface IPronounDataDocument extends IBaseDocument, IBaseUserDataDocument {
  pronouns: IPronounData[];
  pronounGroup: IWordTranslationData;
}

export interface IGroupsDataDocument extends IBaseDocument, IBaseUserDataDocument {
  groups: IGroupData[];
}

export interface IVerbsDataDocument extends IBaseDocument, IBaseUserDataDocument {
  indefinite: IIndefiniteVerbData;
  verbs: IVerbData[];
  selectedVerbsGroupsIds: string[];
  pronounsGroupId: string;
}
