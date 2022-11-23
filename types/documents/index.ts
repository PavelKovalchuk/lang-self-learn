import { ObjectId } from 'mongodb';

import { IGroupData, IPronounData, IVerbData } from 'types/elements';
import { IUserTrainingData } from 'types/training';

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

export interface IVerbsTrainedData extends IBaseDocument {
  lastDateTrained: string | Date;
  averageMark: number | null;
  marks: { [key: string]: number };
}

export interface IVerbsDataDocument extends IBaseUserDataDocument, IVerbsTrainedData {
  indefinite: IIndefiniteVerbData;
  verbs: IVerbData[];
  selectedVerbsGroupsIds: string[];
  pronounsGroupId: string;
  createdAt: string; // calculated on the backend
}

export interface IUserTrainingDocument extends IUserTrainingData, IBaseDocument {}

// General helpers
type Modify<T, R> = Omit<T, keyof R> & R;

// BackEnd
export type ModifiedObjectId<Type> = Modify<
  Type,
  {
    _id: ObjectId;
  }
>;
