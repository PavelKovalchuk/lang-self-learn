import { IBaseAppUserData, IGroupsDataDocument } from 'types';

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
