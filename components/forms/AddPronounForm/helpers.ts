import { IPronounData, IWordTranslationData } from 'types';

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

const Helpers = {
  checkActiveSubmit,
};

export default Helpers;
