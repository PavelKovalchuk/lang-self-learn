import { IGroupData } from 'types';

const checkActiveSubmit = (groups: IGroupData[]) => {
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

const Helpers = {
  checkActiveSubmit,
};

export default Helpers;
