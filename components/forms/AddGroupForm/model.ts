import { IGroupsDataDocument } from 'types';

export interface IPropsAddGroupForm {
  userId: number;
  language: string;
  groupAPI: string;
  groupsData: IGroupsDataDocument[];
}
