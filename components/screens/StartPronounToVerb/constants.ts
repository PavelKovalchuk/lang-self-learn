import { IBaseToastModalData } from 'components/ui';
import { VERBS_GROUPS_TYPE } from 'variables';
import { ICustomVerbsCategory } from './model';

export const DefaultToastMessage: IBaseToastModalData = {
  title: 'Loading verbs by groups',
  message: '',
  type: 'warning',
};

export const CustomVerbsCategories: ICustomVerbsCategory[] = [
  {
    id: VERBS_GROUPS_TYPE.SMALLER_MARK_PRONOUN_TO_VERB,
    label: 'Verbs With Smaller Marks',
    value: VERBS_GROUPS_TYPE.SMALLER_MARK_PRONOUN_TO_VERB,
  },
];
