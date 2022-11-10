import { IBaseToastModalData } from 'components/ui';
import { IGroupData } from 'types';

export const DefaultGroup: IGroupData = {
  word: '',
  translation: '',
  label: '',
  id: '0',
};

export const DefaultToastMessage: IBaseToastModalData = {
  title: 'Adding Groups Set',
  message: '',
  type: 'warning',
};
