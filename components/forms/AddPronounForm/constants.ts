import { IBaseToastModalData } from 'components/ui';
import { IPronounData, IWordTranslationData } from 'types';

export const DefaultPronoun: IPronounData = {
  pronoun: '',
  translation: '',
  id: '0',
};

export const DefaultToastMessage: IBaseToastModalData = {
  title: 'Adding Pronouns Set',
  message: '',
  type: 'warning',
};

export const DefaultPronounGroup: IWordTranslationData = {
  word: '',
  translation: '',
  id: '0',
};
