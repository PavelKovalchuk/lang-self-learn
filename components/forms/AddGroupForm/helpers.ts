import { IGroupData } from 'types';
import { DefaultGroup } from './constants';

const checkActiveSubmit = (groups: IGroupData[]): boolean => {
  let isSomeEmpty = false;

  if (!groups.length) {
    return false;
  }

  groups.forEach((item) => {
    if (!item?.word.trim().length) {
      isSomeEmpty = true;
    }
    if (!item?.translation.trim().length) {
      isSomeEmpty = true;
    }
    if (!item?.label.trim().length) {
      isSomeEmpty = true;
    }
  });

  if (isSomeEmpty) {
    return !isSomeEmpty;
  }

  return true;
};

const getGroupsToSave = (
  {
    word,
    translation,
    label,
    id,
  }: {
    word: string;
    translation: string;
    label: string;
    id: string;
  },
  prevGroups: IGroupData[]
): IGroupData[] => {
  const groupToEdit = prevGroups.find((item) => {
    return item.id === id;
  });
  if (groupToEdit) {
    return [
      ...prevGroups.filter((item) => item.id !== id),
      { ...groupToEdit, word, translation, label },
    ];
  }
  return [
    ...prevGroups,
    {
      word: word.trim(),
      translation: translation.trim(),
      label: label.trim(),
      id: String(prevGroups.length + 1),
    },
  ];
};

const getGroupsToRemove = (id: string, prevGroups: IGroupData[]): IGroupData[] => {
  return [
    ...prevGroups
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: String(index + 1) })),
  ];
};

const getNewRowData = (prevGroups: IGroupData[]): IGroupData[] => {
  if (!prevGroups.length) {
    return [
      { ...DefaultGroup, id: '1' },
      { ...DefaultGroup, id: '2' },
    ];
  }
  return [...prevGroups, { ...DefaultGroup, id: String(prevGroups.length + 1) }];
};

const Helpers = {
  checkActiveSubmit,
  getGroupsToSave,
  getGroupsToRemove,
  getNewRowData,
};

export default Helpers;
