import { IBaseAppUserData, IGroupsDataDocument } from 'types';

export interface IPropsStartPronounToVerb extends IBaseAppUserData {
  verbsGroups: IGroupsDataDocument[];
}
