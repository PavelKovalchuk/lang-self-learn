import { IBaseAppUserData, IGroupsDataDocument } from 'types';

export interface IPropsAddGroupForm extends IBaseAppUserData {
  groupAPI: string;
  groupsData: IGroupsDataDocument[];
}
