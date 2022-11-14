import { IPronounData, IWordTranslationData } from 'types';
import { DefaultPronoun } from './constants';

const checkActiveSubmit = (pronouns: IPronounData[], pronounGroup: IWordTranslationData) => {
  let isSomeEmpty = false;

  if (!pronouns.length || !pronounGroup.translation || !pronounGroup.word) {
    return false;
  }

  pronouns.forEach((item) => {
    if (!item?.pronoun.trim().length) {
      isSomeEmpty = true;
    }
    if (!item?.translation.trim().length) {
      isSomeEmpty = true;
    }
  });

  if (isSomeEmpty) {
    return !isSomeEmpty;
  }

  return true;
};

const getPronounsToSave = (
  {
    translation,
    pronoun,
    id,
  }: {
    id: string;
    pronoun: string;
    translation: string;
  },
  prevPronouns: IPronounData[]
): IPronounData[] => {
  const pronounToEdit = prevPronouns.find((item) => {
    return item.id === id;
  });
  if (pronounToEdit) {
    return [
      ...prevPronouns.filter((item) => item.id !== id),
      { ...pronounToEdit, pronoun, translation },
    ];
  }
  return [
    ...prevPronouns,
    {
      pronoun: pronoun.trim(),
      translation: translation.trim(),
      id: String(prevPronouns.length + 1),
    },
  ];
};

const getPronounsToRemove = (id: string, prevPronouns: IPronounData[]): IPronounData[] => {
  return [
    ...prevPronouns
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: String(index + 1) })),
  ];
};

const getNewRowData = (prevPronouns: IPronounData[]): IPronounData[] => {
  if (!prevPronouns.length) {
    return [
      { ...DefaultPronoun, id: '1' },
      { ...DefaultPronoun, id: '2' },
    ];
  }
  return [...prevPronouns, { ...DefaultPronoun, id: String(prevPronouns.length + 1) }];
};

const Helpers = {
  checkActiveSubmit,
  getPronounsToSave,
  getPronounsToRemove,
  getNewRowData,
};

export default Helpers;
