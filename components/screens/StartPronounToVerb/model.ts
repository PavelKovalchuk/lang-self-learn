import { Dispatch, SetStateAction } from 'react';

import {
  IBaseAppUserData,
  IFinishRoundVerbResults,
  IGroupsDataDocument,
  IUserTrainingData,
  IVerbsDataDocument,
  IVerbsTrainedData,
} from 'types';

import { IBaseToastModalData } from 'components/ui';

/* eslint-disable no-unused-vars */

export interface ICalculatedData {
  marks: number[];
  questions: number;
  corrects: number;
  points: number;
  averageMark: number;
}

export interface IPropsStartPronounToVerb extends IBaseAppUserData {
  verbsGroups: IGroupsDataDocument[];
}

export interface IUseMemoDataParam {
  selectedVerbsGroupsIds: string[];
  verbsGroups: IGroupsDataDocument[];
  finishResults: IFinishRoundVerbResults[];
}

export interface IUseMemoDataResult {
  isActiveSubmit: boolean;
  isGroupsExists: boolean;
  calculatedData: ICalculatedData | null;
  selectedVerbsGroupsTitles: string[];
}

export interface IGetUserTrainingToUpdateParam {
  param: IFinishRoundVerbResults[];
  language: string;
  userId: number;
}

// Requests
export interface IUseRequestsParam {
  language: string;
  userId: number;
  setVerbs: Dispatch<SetStateAction<IVerbsDataDocument[]>>;
  setToastModalResult: Dispatch<SetStateAction<IBaseToastModalData>>;
}

export interface IUseRequestsResult {
  loadVerbsHandler: (ids: string[]) => Promise<void>;
  updateVerbsHandler: (verbsToUpdate: IVerbsTrainedData[]) => Promise<void>;
  updateUserTrainingsHandler: (data: IUserTrainingData) => Promise<void>;
}
