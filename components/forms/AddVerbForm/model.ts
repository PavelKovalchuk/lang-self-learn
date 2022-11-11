import { IPronounDataDocument, IGroupsDataDocument, IBaseAppUserData } from 'types';

export interface IPropsAddVerbForm extends IBaseAppUserData {
  pronounsGroups: IPronounDataDocument[];
  verbsGroups: IGroupsDataDocument[];
}
