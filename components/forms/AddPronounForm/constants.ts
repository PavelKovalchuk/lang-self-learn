import { IBaseToastModalData } from 'components/ui';
import { IAddPronounData } from 'types';

export const DefaultPronoun: IAddPronounData = {
  pronoun: '',
  translation: '',
  id: '0',
};

export const DefaultToastMessage: IBaseToastModalData = {
  title: 'Adding Pronouns Set',
  message: '',
  type: 'warning',
};
