import { IBaseToastModalData } from 'components/ui';
import { IWordTranslationData } from 'components/formsElements/WordTranslation';
import { IPronounData } from 'types';

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
